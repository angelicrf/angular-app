import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../../models/Client';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disabledBalanceOnEdit = true;

  constructor(
    private clService: ClientService,
    private router: Router,
    private ActiveRoute: ActivatedRoute,
    private flshMessage: FlashMessagesService,
    private settingService: SettingsService
  ) {
  }

  ngOnInit() {
    this.id = this.ActiveRoute.snapshot.params.id;
    this.clService.getClient(this.id).subscribe(client => {
      this.client = client;
      console.log(this.client);
    });
    this.disabledBalanceOnEdit = this.settingService.getSetting().disableBalanceOnEdit;
  }

  onSubmit({value, valid}: { value: Client, valid: boolean }) {
    if (!valid) {
      this.flshMessage.show('please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      value.id = this.id;
      this.clService.updateClient(value);
      this.flshMessage.show('Client updated', {
        cssClass: 'alert-success', timeout: 5000
      });
      this.router.navigate(['/client/' + this.id]);
    }
    // return {value, valid};
  }

}
