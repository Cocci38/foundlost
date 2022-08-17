// Importation des modules
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-foundlist',
  templateUrl: './foundlist.page.html',
  styleUrls: ['./foundlist.page.scss'],
})
export class FoundlistPage implements OnInit {
  sessionStorage: any;
  username: string;
  // On stocke dans bdUrl l'URL du serveur backend
  bdUrl = 'http://localhost/ionicserver/retrieve-data.php';
  // On crée le tableau entryData pour pouvoir stocker les données
  entryData = [];

  // On récupère les services par injection de dépendance
  constructor(public http: HttpClient, private route: ActivatedRoute, private router: Router, private toastController: ToastController) {
    // Si il n'y a pas de session utilisateur on est renvoyé sur la page de connexion sinon on peut rester et on stocke les paramètres de session pour s'en servir plus loin
    if (!sessionStorage.getItem('username')) {
      this.router.navigateByUrl("/sign-up");
    } else {
      this.username = sessionStorage.getItem('username');
      // console.log(sessionStorage.getItem('username'));
    }
    this.getEntry();
  }
  // Fonction pour lire les données qui arrive du serveur
  getEntry() {
    this.readAPI(this.bdUrl).subscribe((data) => {
      // On fait une boucle pour parcourir les données qui arrive du serveur
      for (let i = 0; i < Object.keys(data).length; i++) {
        // On les stocke dans le tableau entryData
        this.entryData[i] = {
          "id": data[i].id_object,
          "status": data[i].status,
          "description": data[i].description,
          "date": data[i].date,
          "location": data[i].location,
          "firstname": data[i].firstname,
          "lastname": data[i].lastname,
          "email": data[i].email,
        };
      }
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

  // Fonction de déconnexion
  disconnect() {
    // On supprime la session (username, user_email et id_user)
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user_email');
    sessionStorage.removeItem('id_user');
    // On redirige vers la page de connexion
    this.router.navigateByUrl("/sign-up");
    // On lance le toat de déconnexion réussi
    this.account();
  }
  // On retourner la réponse de l'url dans un objet JSON
  readAPI(URL: string) {
    return this.http.get(URL);
  }
  ngOnInit() {
  }

}