import { Injectable } from '@angular/core';
import {Coffee} from '../Logic/Coffee';
import {PlaceLocation} from '../Logic/PlaceLocation';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  productos: any[] = [];

  constructor(private http: HttpClient ) { }
  public endpoint = 'https://young-tundra-14994.herokuapp.com' + encodeURIComponent(process.env.SERVER_PORT);


  get(coffeeId: string, callback) {
 /*   //console.log(`here is the ${this.endpoint}`);*/
    this.http.get(`${this.endpoint}/coffees/${coffeeId}`)
      .subscribe(response => {
        callback(response);
      });
  }
  getList(callback) {
   /* const list = [
      new Coffee('Double Espresso', 'Sunny Cafe', new PlaceLocation(
        '123 Market St' , 'San Francisco'
      )),
      new Coffee('Caramel Americano', 'Star Cafe', new PlaceLocation(
        'Gran Via 34' , 'Madrid'
      ))
    ];
    callback(list);*/
 this.http.get(`${this.endpoint}/coffees`)
   .subscribe(response => {
     console.log(response);
     callback(response);
 });
  }
  save(coffee, callback) {
    if (coffee._id) {
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee)
        .subscribe(response => {
          callback(true);
          });
    } else {
      this.http.post(`${this.endpoint}/coffees`, coffee)
        .subscribe(response => {
          callback(true);
        });
    }
  }
}
