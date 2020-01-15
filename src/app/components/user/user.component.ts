import {Component, OnInit} from '@angular/core';
import { User } from '../../models/User';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit{

  user: User;

  constructor() {
  }
  ngOnInit() {
    this.user = {
      firstName: 'Angelique',
      lastName: 'Refahiyat',
      age: 30,
      address: {
        street: '65th Ave North',
        city: 'Bellevue',
        state: 'WA'
      }
    };
  }

  SayHello() {
    console.log(`Hello ${this.user.firstName}`);
  }
  showAge() {
    return this.user.age + 2;
  }
}
