import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService} from '../api/user.service';


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
    id: '',
    status: '',
    description: '',
    location: '',
    date: '',
    firstname: '',
    lastname: '',
    email: ''
  };
  constructor(public http : HttpClient, private route: ActivatedRoute, public apiService: UserService) { 
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
    // console.log(this.viewId);
    this.readAPI('http://localhost/ionicserver/retrieve-data.php?id='+this.viewId).subscribe((data) => {
      this.viewData.id = data['id_object'];
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
  delete(viewData: any) {
    this.apiService.deleteViewData(this.viewData.id).subscribe((res) => {
      this.getEntry();
      console.log(res);
      
    });
  }
  update(viewData: any) {
    
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }  
}
