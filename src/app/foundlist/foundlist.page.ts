import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-foundlist',
  templateUrl: './foundlist.page.html',
  styleUrls: ['./foundlist.page.scss'],
})
export class FoundlistPage implements OnInit {
  sessionStorage: any;
  username: string;
  bdUrl = 'http://localhost/ionicserver/retrieve-data.php';
  entryData = [];
  constructor(public http : HttpClient, private route: ActivatedRoute, private router: Router) { 
    if (!sessionStorage.getItem('username')) {
      this.router.navigateByUrl("/sign-up");
    } else {
      this.username = sessionStorage.getItem('username');
      console.log(sessionStorage.getItem('username'));
    }
    this.getEntry();
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
  disconnect() {
    sessionStorage.removeItem('username');
    this.router.navigateByUrl("/sign-up");
}
  readAPI (URL: string) {
    return this.http.get(URL);
  }
  ngOnInit() {
  }

}