import { Component, OnInit } from '@angular/core';
import {Client} from '../../../models/Client';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private flshMessage: FlashMessagesService,
              private settingService: SettingsService) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this.settingService.getSetting().allowRegistration;
  }
  onLogoutClick() {
    this.authService.logOut();
    this.flshMessage.show('you are now Logged out',
      {
        cssClass: 'alert-success',
        timeout: 5000
      });
    this.router.navigate(['/login']);
  }
}
