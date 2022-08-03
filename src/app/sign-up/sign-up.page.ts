import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpForm: FormGroup;
  username: string;
  user_email: string;
  password: string;
  isSubmitted = false;

  constructor(public apiService: UserService, public formBuilder: FormBuilder, private toastController: ToastController) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,}$')]],
      user_email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,}$')]]
    });
  }
  get errorControl() {
    return this.signUpForm.controls;
  }
  async valide() {
    if (this.signUpForm.valid) {
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

  submitSignUpForm() {
    this.isSubmitted = true;
    if (!this.signUpForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.signUpForm.value)
      this.apiService.submitSignUpForm(this.signUpForm.value).subscribe((res) => {
        console.log("SUCCES ===", res);
      })
      this.isSubmitted = false;
    }
    this.signUpForm.reset();
  }

}
