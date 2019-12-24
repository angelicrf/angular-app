import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "./core/auth.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'angelique-dashboard';
  displayMessage:string;
  @Input() public parentData;

  constructor(private auth: AuthService, private userName: AuthService){}


  logout(){
    this.auth.logout();
  }

  ngOnInit(): void {
    this.userName.displayMessage.subscribe(displayMessage => this.displayMessage = displayMessage);
  }
}
