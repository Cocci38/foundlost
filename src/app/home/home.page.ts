import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sessionStorage: any;
  username: string;
  constructor(private route: ActivatedRoute, private router: Router) {
    if (!sessionStorage.getItem('username')) {
      this.router.navigateByUrl("/sign-up");
    } else {
      this.username = sessionStorage.getItem('username');
      console.log(sessionStorage.getItem('username'));
    }

  }
  disconnect() {
      sessionStorage.removeItem('username');
      this.router.navigateByUrl("/sign-up");
  }
    

}
