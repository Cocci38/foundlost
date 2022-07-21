import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';

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
  constructor(public apiService: UserService) { 
  }

  ngOnInit() {
  }
  submitForm() {
    let data = {
      status: 0,
      description: this.description,
      date: this.date,
      location: this.location,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email
    }
    console.log(data);
    
    this.apiService.submitForm(data).subscribe((res) => {
      console.log("SUCCES ===", res);
  })
}

}

