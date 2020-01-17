import { Component, OnInit, ViewChild } from '@angular/core';
import {Client} from '../../../models/Client';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ClientService} from '../../services/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disabledBalancedAdded = true;
  @ViewChild('clientForm', {static: false}) form: any;
  constructor(private flashms: FlashMessagesService , private clservice: ClientService, private router: Router) { }

  ngOnInit() {
  }
 onSubmit({value, valid}: {value: Client , valid: boolean}) {
   console.log(value, valid);
   if (this.disabledBalancedAdded) {
     value.balance = 0;
   }
   if (!valid) {
    this.flashms.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 4000});
     // tslint:disable-next-line:align
   } else {
     this.clservice.newClient(value);
     this.flashms.show('New client Added', {cssClass: 'alert-success', timeout: 4000});
     this.router.navigate(['/']);
   }
 }
}
