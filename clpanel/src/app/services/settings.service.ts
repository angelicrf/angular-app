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
  constructor() { }
  getSetting(): Setting {
    return this.settings;
}
}
