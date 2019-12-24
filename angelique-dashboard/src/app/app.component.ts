import { Component, OnInit } from '@angular/core';
import {AuthService} from "./core/auth.service";
import {LoginComponent}from "./login/login.component"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'angelique-dashboard';
  nh:LoginComponent;

  constructor(private auth: AuthService){}


  logout(){
    this.auth.logout();
  }

  ngOnInit(): void {

  }
}
