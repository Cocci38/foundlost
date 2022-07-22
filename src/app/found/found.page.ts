import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { NgForm} from "@angular/forms";

@Component({
  selector: 'app-found',
  templateUrl: './found.page.html',
  styleUrls: ['./found.page.scss'],
})
export class FoundPage implements OnInit {
  //foundForm: FormGroup;
  status: boolean;
  description: string;
  date: Date;
  location: string;
  firstname: string;
  lastname: string;
  email: string;
  isSubmitted = false;
  constructor(public apiService: UserService) { 
    // this.foundForm = new FormGroup({
    //   // status: new FormControl(''),
    //   description: new FormControl(''),
    //   date: new FormControl(''),
    //   location: new FormControl(''),
    //   firstname: new FormControl(''),
    //   lastname: new FormControl(''),
    //   email: new FormControl(''),
    // });
  }

  ngOnInit() {

  }
  submitForm(form: NgForm) {
    let data = {
      status: 1,
      description: this.description,
      date: this.date,
      location: this.location,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email
    }
    console.log(data, form);
    this.apiService.submitForm(data).subscribe((res) => {
      if (!this.description && !this.date && !this.location && !this.firstname && !this.lastname && !this.email) {
        this.isSubmitted = true;
      }else {
        this.isSubmitted = false;
      }
      console.log("SUCCES ===", res);
  });
    form.resetForm();
}
}
