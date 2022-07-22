import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lostlist',
  templateUrl: './lostlist.page.html',
  styleUrls: ['./lostlist.page.scss'],
})
export class LostlistPage implements OnInit {
  lostData = {
    description: '',
    location: '',
    date: ''
  };
  bdUrl = 'http://localhost/ionicserver/retrieve-data.php';
  entryData = [];
  constructor(public http: HttpClient) {
    this.getEntry();
  }

  ngOnInit() {
  }
  getEntry() {
    this.readAPI(this.bdUrl).subscribe((data) => {
      console.log(data[0]['description']);
      
      for (let index = 0; index < Object.keys(data).length; index++) {
        this.lostData[index] = {
          "id": data[index].id_object,
          "status": data[index].status,
          "description": data[index].description,
          "date": data[index].date,
          "location": data[index].location,
          "firstname": data[index].firstname,
          "lastname": data[index].lastname,
          "email": data[index].email
        };
        console.log(data[index]);
        
      }
    });
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }

}
