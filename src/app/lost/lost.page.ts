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
  isSubmitted = false;
  constructor(public apiService: UserService, public formBuilder: FormBuilder, public toastController: ToastController, private route: ActivatedRoute, private router: Router) {
    if (!sessionStorage.getItem('username')) {
      this.router.navigateByUrl("/sign-up");
    } else {
      this.username = sessionStorage.getItem('username');
      console.log(sessionStorage.getItem('username'));
    }
  }

  ngOnInit() {
    this.lostForm = this.formBuilder.group({
      status: ['0'],
      description: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,}$')]],
      date: [null, Validators.required],
      location: ['', [Validators.required, Validators.pattern('^[a-zA-Z-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,}$')]],
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,}$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,}$')]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }
  // getDate(e: { target: { value: string | number | Date; }; }) {
  //   let date = new Date(e.target.value).toISOString().substring(0, 10);
  //   this.lostForm.get('date').setValue(date, {
  //     onlyself: true
  //   })
  // }
  get errorControl() {
    return this.lostForm.controls;
  }

  async valide() {
    if (this.lostForm.valid) {
      let toast = await this.toastController.create({
        message: "Demande envoyée",
        duration: 3000,
        color: "success",
        position: "middle"
      })
      toast.present();
    } else {
      let toast = await this.toastController.create({
        message: "Demande non envoyée",
        duration: 3000,
        color: "danger",
        position: "middle"
      })
      toast.present();
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
  submitForm() {
    this.isSubmitted = true;
    if (!this.lostForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.lostForm.value)
      this.apiService.submitForm(this.lostForm.value).subscribe((res) => {
        console.log("SUCCES ===", res);
      })
      this.isSubmitted = false;
    }
    this.lostForm.reset();
  }



}