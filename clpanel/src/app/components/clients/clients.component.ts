import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;
  constructor(private clservice: ClientService) { }

  ngOnInit() {
    this.clservice.getClient().subscribe(client => {
      console.log(client);
      this.clients = client;
      this.getTotalOwed();
    });
  }
  getTotalOwed() {
    // tslint:disable-next-line:no-shadowed-variable
   this.totalOwed = this.clients.reduce((total, client) => {
      return total + client.balance;

    }, 0);

  }

}
