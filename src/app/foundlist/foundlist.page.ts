import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foundlist',
  templateUrl: './foundlist.page.html',
  styleUrls: ['./foundlist.page.scss'],
})
export class FoundlistPage implements OnInit {
  foundApiUrl = '';
  foundData = {
    status: 1,
    description: '',
    location: '',
    date: ''
  };
  constructor(public http: HttpClient) { 
    this.readAPI('http://localhost/ionicserver/retrieve-data.php').subscribe((data) => {
      console.log(data);
      console.log(data['0']);

        this.foundData.status = data['status'];
        this.foundData.description = data['description'];
        this.foundData.location = data['location'];
        this.foundData.date = data['date'];
    })
  }
  readAPI (URL: string) {
    return this.http.get(URL);
  }
  ngOnInit() {
  }

}