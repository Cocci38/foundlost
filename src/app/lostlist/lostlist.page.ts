import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lostlist',
  templateUrl: './lostlist.page.html',
  styleUrls: ['./lostlist.page.scss'],
})
export class LostlistPage implements OnInit {
  // description: string;
  // location: string;
  // date: Date;
  // lostData = {
  //   description: '',
  //   location: '',
  //   date: ''
  // };
  bdUrl = 'http://localhost/ionicserver/retrieve-data.php';
  entryData = [];
  constructor(public http : HttpClient) {
    this.getEntry();
  }

  ngOnInit() {
  }
  getEntry() {
    this.readAPI(this.bdUrl).subscribe((data) => {
      
      for (let i = 0; i<Object.keys(data).length; i++) {
        this.entryData[i] = {
          "id": data[i].id_object,
          "status": data[i].status,
          "description": data[i].description,
          "date": data[i].date,
          "location": data[i].location,
          "firstname": data[i].firstname,
          "lastname": data[i].lastname,
          "email": data[i].email,
        };
      }
      
    });
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }

}
