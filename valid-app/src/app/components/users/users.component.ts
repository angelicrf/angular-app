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
  enableAdd = true;
  currentClasses = {};
  currentStyles = {};
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
          },
          image: 'https://loremflickr.com/320/240/dog',
          isActive: true,
          balance: 100,
          registered: new Date('01/02/2020 08:30:00')
        },
        {
          firstName: 'Kevin',
          lastName: 'Kastner',
          age: 65,
          address: {
            street: '87th Ave South',
            city: 'Lynwood',
            state: 'WA'
          },
          image: 'https://loremflickr.com/g/320/240/paris',
          isActive: false,
          balance: 200,
          registered: new Date('01/09/2020 07:30:00')
        },
        {
          firstName: 'John',
          lastName: 'McKenzi',
          age: 25,
          address: {
            street: '98tth NorthWest',
            city: 'MercerIsland',
            state: 'WA'
          },
          image: 'https://loremflickr.com/320/240/paris,girl/all',
          isActive: true,
          balance: 300,
          registered: new Date('01/05/2020 10:50:00')
        }
      ];
      this.loaded = true;
      this.shpwExtended = true;
      this.setCurrentClasses();
      this.setCurrentStyles();
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
  setCurrentClasses() {
    this.currentClasses = {
      'btn-success': this.enableAdd,
      'big-text': this.shpwExtended
    };
  }
  setCurrentStyles() {
    this.currentStyles = {
      'padding-top': this.shpwExtended ? '0' : '60px',
      'font-size': this.shpwExtended ? '' : '40px'
    };
  }
}
