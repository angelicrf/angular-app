import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../../models/Client';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(private clService: ClientService,
              private router: Router,
              private ActiveRoute: ActivatedRoute,
              private flshMessage: FlashMessagesService) { }

  ngOnInit() {
    this.id = this.ActiveRoute.snapshot.params.id;
    this.clService.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
        this.client = client;
        console.log(this.client);
    }});

  }
  onDeleteClick(){

  }

}
