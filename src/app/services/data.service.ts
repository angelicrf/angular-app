import { Injectable } from '@angular/core';
import {User} from '../models/User';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 users: User[];
 data: Observable<any>;

  constructor() {
 //   setTimeout(() => {
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

   // }, 2000);

  }
  getData() {
    this.data = new Observable<any>(observer => {
      setTimeout( () => {
        observer.next(1);
      });
    });
    return this.data;
  }
  getUsers(): Observable<User[]> {
    console.log('This is comming from the service');
    return of(this.users);
  }
}
