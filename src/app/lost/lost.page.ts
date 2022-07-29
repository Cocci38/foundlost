import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { NgForm} from "@angular/forms";

@Component({
  selector: 'app-lost',
  templateUrl: './lost.page.html',
  styleUrls: ['./lost.page.scss'],
})
export class LostPage implements OnInit {
  status: boolean;
  description: string;
  date: Date;
  location: string;
  firstname: string;
  lastname: string;
  email: string;
  isSubmitted: boolean;
  constructor(public apiService: UserService) { 
  }

  ngOnInit() {
  }
  submitForm(form: NgForm) {
    let data = {
      status: 0,
      description: this.description,
      date: this.date,
      location: this.location,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      tos: false
    }
    console.log(data);
    
    this.apiService.submitForm(data).subscribe((res) => {
      console.log("SUCCES ===", res);
      // if (!this.description && !this.date && !this.location && !this.firstname && !this.lastname && !this.email) {
      //   this.isSubmitted = true;
      // }else {
      //   this.isSubmitted!;
      // }
      this.isSubmitted = true;
  });
  
  form.resetForm();
}
  nosubmitForm(e){
    e.preventDefault();
  }
}

