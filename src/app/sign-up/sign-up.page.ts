// Importation des modules
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
  // id_user: number;
  // username: string;
  // user_email: string;
  password: string;
  loginForm: FormGroup;
  isSubmitted = false;
  isConnect = false;
  isInscrire = false;
  isConnexion = false;

  constructor(public apiService: UserService, public formBuilder: FormBuilder, private toastController: ToastController, private route: ActivatedRoute, private router: Router, public http: HttpClient) {
  }

  ngOnInit() {
    // Pattern pour la sécurisation des formulaires
    this.signUpForm = this.formBuilder.group({
      id_user: [''],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,}$')]],
      user_email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-?!*+/]{8,}$')]]
    });
    this.loginForm = this.formBuilder.group({
      // username: ['', [Validators.required, Validators.pattern('^[a-zA-Z-\' æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,}$')]],
      user_email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-?!*+/]{8,}$')]]
    });
  }

  // Pour afficher les erreurs :
  get errorControl() {
    return this.signUpForm.controls && this.loginForm.controls;
  }

  // Fonction pour rendre visible ou invisible une partie de la page : 
  // Pour afficher ou non le formulaire de connection
  connect() {
    console.log('connection');
    this.isConnect = true;
  }
  // Pour afficher ou non le formulaire d'inscription
  inscrire() {
    console.log('inscription');
    this.isInscrire = true;
  }

  // Toast : 
  // Pour l'email unique
  async unique_email() {
    let toast = await this.toastController.create({
      message: "L'email existe déjà",
      duration: 3000,
      color: "danger",
      position: "bottom"
    })
    toast.present();
  }
  // Pour l'inscription réussi
  async singUpClear() {
    let toast = await this.toastController.create({
      message: "Votre compte a bien été créée",
      duration: 3000,
      color: "success",
      position: "bottom"
    })
    toast.present();
  }
  // Si l'email est erroné
  async loginError() {
    let toast = await this.toastController.create({
      message: "L'email ou le mot de passe est erroné",
      duration: 3000,
      color: "danger",
      position: "bottom"
    })
    toast.present();
  }

  // Validation des formulaires :
  // D'inscription
  submitSignUpForm() {
    this.isSubmitted = true;
    // Si le formulaire est valide
    if (this.signUpForm.valid) {
      // On récupère le nom de l'utilisateur et l'email et on le stocke (pour la session si fait après pas de récup possible)
      // this.username = this.signUpForm.value['username'];
      // this.user_email = this.signUpForm.value['user_email'];
      // On effectue la validation
      this.apiService.submitSignUpForm(this.signUpForm.value).subscribe((res) => {
        console.log("SUCCES ===", res);
        // Si la réponse est false, l'email existe déjà donc pas de validation
        if (res == false) {
          this.unique_email();
        }
        // Si la réponse est true, la validation fonctionne 
        if (res) {
          // On récupère le nom d'utilisateur, l'email et id_user pour la session
          sessionStorage.setItem('username', res['username']);
          sessionStorage.setItem('user_email', res['user_email']);
          sessionStorage.setItem('id_user', res['id_user']);
          // On envoie l'utilisatuer sur la page home
          this.router.navigateByUrl("/home");
          this.singUpClear();
        }
      });
      this.isSubmitted = false;
      // Sinon le formulaire n'est pas valide
    } else {
      console.log('Le formulaire n\'est pas valide');
      return false;
    }
    this.signUpForm.reset();
  }
  // De connexion
  submitLoginForm() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      //console.log(this.loginForm.value)
      // this.username = this.loginForm.value['username'];
      // this.user_email = this.loginForm.value['user_email'];
      // console.log(this.username);
      this.apiService.submitLoginForm(this.loginForm.value).subscribe((res) => {
        // console.log("SUCCES ===", res);
        if (res) {
          sessionStorage.setItem('username', res['username']);
          sessionStorage.setItem('user_email', res['user_email']);
          sessionStorage.setItem('id_user', res['id_user']);
          this.router.navigateByUrl("/home");
        }
        if (res == false) {
          this.loginError();
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
