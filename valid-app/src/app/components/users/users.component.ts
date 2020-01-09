import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  shpwExtended = false;
  loaded = false;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.users = [
        {
          firstName: 'Angelique',
          lastName: 'Refahiyat',
          age: 30,
          address: {
            street: '65th Ave North',
            city: 'Bellevue',
            state: 'WA'
          }
        },
        {
          firstName: 'Kevin',
          lastName: 'Kastner',
          age: 65,
          address: {
            street: '87th Ave South',
            city: 'Lynwood',
            state: 'WA'
          }
        },
        {
          firstName: 'John',
          lastName: 'McKenzi',
          age: 25,
          address: {
            street: '98tth NorthWest',
            city: 'MercerIsland',
            state: 'WA'
          }
        }
      ];
      this.loaded = true;
      this.shpwExtended = true;
      this.addUser({
        firstName: 'David',
        lastName: 'Johnson',
    /*    age: 45,
        address: {
          street: '12th Ave West',
          city: 'Redmond',
          state: 'WA'
        }*/
      });

    }, 2000);

  }
  addUser(user: User) {
    this.users.push(user);
  }

}
