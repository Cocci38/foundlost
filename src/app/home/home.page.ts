import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sessionStorage: any;
  username: string;

  constructor(private route: ActivatedRoute, private router: Router, private toastController: ToastController) {
    // Si il n'y a pas de session utilisateur on est renvoyé sur la page de connexion sinon on peut rester et on stocke les paramètres de session pour s'en servir plus loin
    if (!sessionStorage.getItem('username')) {
      this.router.navigateByUrl("/sign-up");
    } else {
      this.username = sessionStorage.getItem('username');
      // console.log(sessionStorage.getItem('username'));
    }
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
    // On supprime la session (username et user_email)
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user_email');
    sessionStorage.removeItem('id_user');
    // On redirige vers la page de connexion
    this.router.navigateByUrl("/sign-up");
    // On lance le toat de déconnexion réussi
    this.account();
  }


}
