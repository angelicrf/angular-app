import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {SettingsService} from '../../services/settings.service';
import {Setting} from '../../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Setting;

  constructor(private authService: AuthService,
              private router: Router,
              private flshMessage: FlashMessagesService,
              private settingService: SettingsService) { }

  ngOnInit() {
    this.settings = this.settingService.getSetting();
  }
  onSubmit() {
    this.settingService.changettings(this.settings);
    this.flshMessage.show('Setting saved',{
      cssClass: 'alert-success',
      timeout: 4000
    });
    }
}
