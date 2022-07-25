import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.page.html',
  styleUrls: ['./viewentry.page.scss'],
})
export class ViewentryPage implements OnInit {
  bdUrl = 'http://localhost/ionicserver/retrieve-data.php?id=6';
  entryData = [];
  viewData = {
    status: '',
    description: '',
    location: '',
    date: '',
    firstname: '',
    lastname: '',
    email: ''
  };
  constructor(public http : HttpClient) { 
    this.getEntry();
  }

  ngOnInit() {
  }

  getEntry() {
    this.readAPI(this.bdUrl).subscribe((data) => {
      this.viewData.status = data['status'];
      this.viewData.description = data['description'];
      this.viewData.location = data['location'];
      this.viewData.date = data['date'];
      this.viewData.date = data['firstname'];
      this.viewData.date = data['lastname'];
      this.viewData.date = data['email'];
      // console.log(this.entryData[0].id );
      
    });
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }

}
