import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lostlist',
  templateUrl: './lostlist.page.html',
  styleUrls: ['./lostlist.page.scss'],
})
export class LostlistPage implements OnInit {
  sessionStorage: any;
  username: string;
  bdUrl = 'http://localhost/ionicserver/retrieve-data.php';
  entryData = [];
  constructor(public http: HttpClient, private route: ActivatedRoute, private router: Router) {
    if (!sessionStorage.getItem('username')) {
      this.router.navigateByUrl("/sign-up");
    } else {
      this.username = sessionStorage.getItem('username');
      console.log(sessionStorage.getItem('username'));
    }
    this.getEntry();
  }

  ngOnInit() {

  }
  getEntry() {
    this.readAPI(this.bdUrl).subscribe((data) => {

      for (let i = 0; i < Object.keys(data).length; i++) {
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
      // console.log(this.entryData[0].id );

    });
  }
  disconnect() {
    sessionStorage.removeItem('username');
    this.router.navigateByUrl("/sign-up");
}
  readAPI(URL: string) {
    return this.http.get(URL);
  }

  // viewentry() {
  //   return this.path('viewentry');
  // }

}
