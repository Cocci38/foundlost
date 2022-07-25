import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.page.html',
  styleUrls: ['./viewentry.page.scss'],
})
export class ViewentryPage implements OnInit {
  
  // bdUrl: any;
  // view: any;
  viewId: any;
  viewData = {
    status: '',
    description: '',
    location: '',
    date: '',
    firstname: '',
    lastname: '',
    email: ''
  };
  constructor(public http : HttpClient, private route: ActivatedRoute) { 
    this.getEntry();
    this.route.params.subscribe(params => {
      console.log('L\'id de la route est: ', params.id);
      // this.bdUrl = 'http://localhost/ionicserver/retrieve-data.php?id='+ params.id;
    });
  }

  ngOnInit() {
    // this.viewId = this.route.snapshot.paramMap.get('id');
    // console.log(this.viewId);
    
  }

  getEntry() {
    this.viewId = this.route.snapshot.params['id'];
    console.log(this.viewId);
    this.readAPI('http://localhost/ionicserver/retrieve-data.php?id='+this.viewId).subscribe((data) => {
      this.viewData.status = data['status'];
      this.viewData.description = data['description'];
      this.viewData.location = data['location'];
      this.viewData.date = data['date'];
      this.viewData.firstname = data['firstname'];
      this.viewData.lastname = data['lastname'];
      this.viewData.email = data['email'];
      // console.log(this.entryData[0].id );
      
    });
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }

}
