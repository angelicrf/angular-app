import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    age: null,
    address: {
      street: '',
      city: '',
      state: ''
    }
  };
  users: User[];
  shpwExtended = false;
  loaded = false;
  enableAdd = true;
  showUseForm = true;
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
          registered: new Date('01/02/2020 08:30:00'),
          hide: true
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
          registered: new Date('01/09/2020 07:30:00'),
          hide: false
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
          registered: new Date('01/05/2020 10:50:00'),
          hide: true
        }
      ];
      this.loaded = true;
      this.shpwExtended = true;
      this.setCurrentClasses();
      this.setCurrentStyles();

    }, 2000);

  }
  addUser() {
    this.user.isActive = true;
    this.user.registered = new Date();
    this.users.push(this.user);
    this.user = {
      firstName: '',
      lastName: '',
      age: null,
      address: {
        street: '',
        city: '',
        state: ''
      }
    };
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
  fireEvent(e) {
    console.log('the button is clicked.', e.target.value);
  }
  toggleHide(user: User) {
    user.hide = !user.hide;
  }
  onSubmit(e) {
    console.log(e.target.value);
    e.preventDefault();
  }
}
