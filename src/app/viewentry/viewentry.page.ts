import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
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
    email: '',
    users_id: ''
  };
  username: string;
  id_user: string;
  constructor(public http : HttpClient, private route: ActivatedRoute, private router: Router, public apiService: UserService) { 
    
    this.route.params.subscribe(params => {
      console.log('L\'id de la route est: ', params.id);
      if (!sessionStorage.getItem('username')) {
        this.router.navigateByUrl("/sign-up");
      } else {
        this.username = sessionStorage.getItem('username');
        this.id_user = sessionStorage.getItem('id_user');
        // console.log(sessionStorage.getItem('username'));
      }
      // this.bdUrl = 'http://localhost/ionicserver/retrieve-data.php?id='+ params.id;
    });
  }

  ngOnInit() {
    // this.viewId = this.route.snapshot.paramMap.get('id');
    // console.log(this.viewId);
    this.getEntry();
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
      this.viewData.users_id = data['users_id'];
      // console.log(this.entryData[0].id );
    });
  }
  delete(viewData: any) {
    this.apiService.deleteViewData(this.viewData.id).subscribe((viewData) => {
      this.getEntry();
      if (delete(this.viewData.id)) {
        this.router.navigateByUrl("/home");
      }
      console.log(this.viewData.id);
      
    });
    // viewData.resetForm();
  }
  update(viewData: any) {
    this.apiService.updateViewData(this.viewData.id).subscribe((viewData) => {
      this.getEntry();
      console.log(this.viewData.status);
      
    });
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }  
}
