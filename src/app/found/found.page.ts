import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-found',
  templateUrl: './found.page.html',
  styleUrls: ['./found.page.scss'],
})
export class FoundPage implements OnInit {
  foundForm: FormGroup;
  constructor(public apiService: UserService) { 
    this.foundForm = new FormGroup({
      // status: new FormControl(''),
      description: new FormControl(''),
      date: new FormControl(''),
      location: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
    });
  }

  ngOnInit() {
  }
  submitForm() {
    let data = {
      description: '',
      status: 1,
      date: '',
      location: '',
      firstname: '',
      lastname: '',
      email: ''
    }
    this.apiService.submitForm(data).subscribe((res) => {
      console.log("SUCCES ===", res);
  })
}

}
