import { Injectable } from '@angular/core';
import {Setting} from '../../models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Setting = {

    allowRegistration: true,
    disabledBalanceOnAdd: false,
    disableBalanceOnEdit: false

};
  constructor() {
    if(localStorage.getItem('settings') != null) {
      this.settings = JSON.parse((localStorage.getItem('settings')));
    }
  }
  getSetting(): Setting {
    return this.settings;
}
  changettings(settings: Setting) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
