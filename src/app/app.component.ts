import { Component } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { UserService } from './api/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, public apiService: UserService, public http : HttpClient) {
  }
}
