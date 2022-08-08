import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  loginForm: FormGroup;
  isSubmitted = false;
  isConnect = false;
  isInscrire = false;
  isConnexion = false;

  constructor(public apiService: UserService, public formBuilder: FormBuilder, private toastController: ToastController, private route: ActivatedRoute, private router: Router, public http: HttpClient) {
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,}$')]],
      user_email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{8,}$')]]
    });
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,}$')]],
      user_email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,}$')]]
    });
  }
  get errorControl() {
    return this.signUpForm.controls && this.loginForm.controls;
  }
  connect() {
    console.log('connection');
    this.isConnect = true;
  }
  inscrire() {
    console.log('inscription');
    this.isInscrire = true;
  }
  async unique_email() {
    let toast = await this.toastController.create({
      message: "L'email existe déjà",
      duration: 3000,
      color: "danger",
      position: "middle"
    })
    toast.present();
  }
  async singUpClear() {
    let toast = await this.toastController.create({
      message: "Votre compte a bien été créée",
      duration: 3000,
      color: "success",
      position: "middle"
    })
    toast.present();
  }
  async loginClear() {
    let toast = await this.toastController.create({
      message: "L'email, le nom d'utilisateur ou le mot de passe est erroné",
      duration: 3000,
      color: "danger",
      position: "middle"
    })
    toast.present();
  }
  submitSignUpForm() {
    this.isSubmitted = true;
    if (this.signUpForm.valid) {
      //console.log(this.signUpForm.value)
      this.username = this.signUpForm.value['username'];
      this.apiService.submitSignUpForm(this.signUpForm.value).subscribe((res) => {
        console.log("SUCCES ===", res);
        if (res == false) {
          this.unique_email();
        }
        if (res == true) {
          sessionStorage.setItem('username', this.username);
          this.router.navigateByUrl("/home");
          this.singUpClear();
        } else {
          sessionStorage.clear();
        }

      });
      this.isSubmitted = false;
    } else {
      console.log('Le formulaire n\'est pas valide');
      return false;
    }

    this.signUpForm.reset();
  }

  submitLoginForm() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.username = this.loginForm.value['username'];
      console.log(this.username);
      this.apiService.submitLoginForm(this.loginForm.value).subscribe((res) => {
        console.log("SUCCES ===", res);
        if (res == true) {
          sessionStorage.setItem('username', this.username)
          this.router.navigateByUrl("/home");
        } 
        if (res == false) {
          sessionStorage.clear();
          this.loginClear();
        }
      });
      this.isSubmitted = false;
    } else {
      console.log('Le formulaire n\'est pas valide');
      return false;
    }
    this.loginForm.reset();
  }
}
