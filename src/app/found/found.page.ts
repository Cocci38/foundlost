import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-found',
  templateUrl: './found.page.html',
  styleUrls: ['./found.page.scss'],
})
export class FoundPage implements OnInit {
  foundForm: FormGroup;
  status: number;
  description: string;
  date: Date;
  location: string;
  firstname: string;
  lastname: string;
  email: string;
  isSubmitted = false;
  constructor(public apiService: UserService, public formBuilder: FormBuilder, public toastController: ToastController) {
  }

  ngOnInit() {
    this.foundForm = this.formBuilder.group({
      status: ['1'],
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
  //   this.foundForm.get('date').setValue(date, {
  //     onlyself: true
  //   })
  // }
  get errorControl() {
    return this.foundForm.controls;
  }
  // valide() {
  //   try {
  //     this.toastController.dismiss().then(() => {
  //     }).catch(() => {
  //     }).finally(() => {
  //       console.log('Closed')
  //     });
  //   } catch(e) {}
  //   this.toastController.create({
  //     header: '',
  //     message: 'Demande envoyée',
  //     position: 'bottom',
  //     cssClass: 'toast-custom-class',
  //     buttons: [
  //       {
  //         side: 'end',
  //         icon: '',
  //         handler: () => {
  //           console.log('');
  //         }
  //       }, {
  //         side: 'end',
  //         text: 'Close',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('');
  //         }
  //       }
  //     ]
  //   }).then((toast) => {
  //     toast.present();
  //   });
  // }
  submitForm() {
    this.isSubmitted = true;
    if (!this.foundForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.foundForm.value)
      this.apiService.submitForm(this.foundForm.value).subscribe((res) => {
        console.log("SUCCES ===", res);
      })
      this.isSubmitted = false;
    }
    this.foundForm.reset();
  }



}