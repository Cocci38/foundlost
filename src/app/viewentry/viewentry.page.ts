// Importation des dépendances
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.page.html',
  styleUrls: ['./viewentry.page.scss'],
})
export class ViewentryPage implements OnInit {
  // Propriétés : 
  viewId: any;
  viewData = {
    id: '',
    status: '',
    description: '',
    location: '',
    date: '',
    firstname: '',
    lastname: '',
    email: '',
    users_id: ''
  };
  username: string;
  id_user: string;
  constructor(public http: HttpClient, private route: ActivatedRoute, private router: Router, public apiService: UserService, private toastController: ToastController) {

    this.route.params.subscribe(params => {
      console.log('L\'id de la route est: ', params.id);
      // Si il n'y a pas de session utilisateur on est renvoyé sur la page de connexion sinon on peut rester et on stocke les paramètres de session pour s'en servir plus loin
      if (!sessionStorage.getItem('username')) {
        this.router.navigateByUrl("/sign-up");
      } else {
        this.username = sessionStorage.getItem('username');
        this.id_user = sessionStorage.getItem('id_user');
        // console.log(sessionStorage.getItem('username'));
      }
      // this.bdUrl = 'http://localhost/ionicserver/retrieve-data.php?id='+ params.id;
    });
  }

  // Toast de déconnexion réussi
  async account() {
    let toast = await this.toastController.create({
      message: "Vous êtes déconnecté",
      duration: 3000,
      color: "success",
      position: "bottom"
    })
    toast.present();
  }

  // Méthodes : 
  ngOnInit() {
    // this.viewId = this.route.snapshot.paramMap.get('id');
    // console.log(this.viewId);
    this.getEntry();
  }
  // Fonction pour lire les données qui arrive du serveur
  getEntry() {
    // On récupère l'id de l'objet et on le stocke dans viewId pour l'injecter dans la route 
    this.viewId = this.route.snapshot.params['id'];
    // console.log(this.viewId);
    // On lit les données et on les stockes dans viewData
    this.readAPI('http://localhost/ionicserver/retrieve-data.php?id=' + this.viewId).subscribe((data) => {
      this.viewData.id = data['id_object'];
      this.viewData.status = data['status'];
      this.viewData.description = data['description'];
      this.viewData.location = data['location'];
      this.viewData.date = data['date'];
      this.viewData.firstname = data['firstname'];
      this.viewData.lastname = data['lastname'];
      this.viewData.email = data['email'];
      this.viewData.users_id = data['users_id'];
      // console.log(this.entryData[0].id );
    });
  }

  // Fonction pour supprimer un objet
  delete(viewData: any) {
    this.apiService.deleteViewData(this.viewData.id).subscribe((viewData) => {
      this.getEntry();
      if (delete (this.viewData.id)) {
        this.router.navigateByUrl("/home");
      }
      console.log(this.viewData.id);

    });
    // viewData.resetForm();
  }
  // Fonction pour modifier le status de l'objet
  update(viewData: any) {
    this.apiService.updateViewData(this.viewData.id).subscribe((viewData) => {
      this.getEntry();
      console.log(this.viewData.status);
      this.router.navigate(["/viewentry/"+this.viewData.id])
    });
  }
  // Fonction de déconnexion
  disconnect() {
    // On supprime la session (username et id_user)
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id_user');
    sessionStorage.clear();
    // On redirige vers la page de connexion
    this.router.navigateByUrl("/sign-up");
    // On lance le toat de déconnexion réussi
    this.account();
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }
}
