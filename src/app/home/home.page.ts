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
    if (!sessionStorage.getItem('username')) {
      this.router.navigateByUrl("/sign-up");
    } else {
      this.username = sessionStorage.getItem('username');
      console.log(sessionStorage.getItem('username'));
    }
  }
  async account() {
    let toast = await this.toastController.create({
      message: "Vous êtes déconnecté",
      duration: 3000,
      color: "success",
      position: "middle"
    })
    toast.present();
  }
  disconnect() {
    sessionStorage.removeItem('username');
    this.router.navigateByUrl("/sign-up");
    this.account();
  }


}
