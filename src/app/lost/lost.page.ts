// Importation des dépendances
import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.page.html',
  styleUrls: ['./lost.page.scss'],
})
export class LostPage implements OnInit {
  // Propriétés : 
  sessionStorage: any;
  username: string;
  lostForm: FormGroup;
  status: number;
  description: string;
  date: Date;
  location: string;
  firstname: string;
  lastname: string;
  email: string;
  user_id: number;
  isSubmitted = false;

  constructor(public apiService: UserService, public formBuilder: FormBuilder, public toastController: ToastController, private route: ActivatedRoute, private router: Router) {

    // Si il n'y a pas une session utilisateur on est renvoyé sur la page de connexion sinon on peut rester et on stocke les paramètre de session pour s'en servir plus loin
    if (!sessionStorage.getItem('username')) {
      this.router.navigateByUrl("/sign-up");
    } else {
      this.username = sessionStorage.getItem('username');
      // this.id_user = sessionStorage.getItem('id_user');
      // console.log(sessionStorage.getItem('id_user'));
    }
  }
  // Méthodes : 
  ngOnInit() {
    // Pattern pour la sécurisation du formulaire
    this.lostForm = this.formBuilder.group({
      status: ['0'],
      description: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{10,250}$')]],
      date: [null, Validators.required],
      location: ['', [Validators.required, Validators.pattern('^[a-zA-Z-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$')]],
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,25}$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,25}$')]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      user_id: [sessionStorage.getItem('id_user')]
    });
  }
  // getDate(e: { target: { value: string | number | Date; }; }) {
  //   let date = new Date(e.target.value).toISOString().substring(0, 10);
  //   this.lostForm.get('date').setValue(date, {
  //     onlyself: true
  //   })
  // }

  // Pour accéder au contrôle du formulaire directement via le template :
  get errorControl() {
    return this.lostForm.controls;
  }

  // Les Toast : 
  // Si le formulaire est valide
  async valide() {
    let toast = await this.toastController.create({
      message: "Formulaire envoyée",
      duration: 3000,
      color: "success",
      position: "bottom"
    })
    toast.present();
  }
  // Si le formulaire est invalide
  async invalid() {
    let toast = await this.toastController.create({
      message: "Formulaire non envoyée",
      duration: 3000,
      color: "danger",
      position: "bottom"
    })
    toast.present();
  }
  // Si la déconnexion réussi
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
    // On supprime la session (username et id_user)
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id_user');
    sessionStorage.clear();
    // On redirige vers la page de connexion
    this.router.navigateByUrl("/sign-up");
    // On lance le toat de déconnexion réussi
    this.account();
  }

  // Validation du formulaire pour déclarer un objet perdu :
  submitForm() {
    // On passe isSubmitted à true (pour afficher les erreurs une fois le formulaire soumis)
    this.isSubmitted = true;
    // Si le formulaire n'est pas valide, on envoie le toast invalid et on retourne faux
    if (!this.lostForm.valid) {
      console.log('Le formulaire n\'est pas valide');
      this.invalid();
      return false;
    } else {
      console.log(this.lostForm.value)
      // Sinon le formulaire est valide, on envoie le formulaire vers le serveur
      this.apiService.submitForm(this.lostForm.value).subscribe((res) => {
        console.log("SUCCES ===", res);
        // Si la réponse est égale à true, on lance le toats valid
        if (res == true) {
          this.isSubmitted = false;
          this.valide();
          this.router.navigateByUrl("/lostlist");
        } else {
          // Sinon on envoie le toat invalid
          this.invalid();
        }
      });
      // On repasse isSubmitted à false
      this.isSubmitted = false;
    }
    // On vide le formulaire
    this.lostForm.reset();
  }



}