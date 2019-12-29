import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Coffee} from '../../Logic/Coffee';
import {GeolocationService} from '../geolocation.service';
import {TastingRating} from '../../Logic/TastingRating';
import {DataService} from '../data.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit {
  coffee: Coffee;
  types = ['Espresso', 'Ristretto', 'Americano', 'Cappuccino', 'Frappe'];
  constructor(private route: ActivatedRoute,
              private geolocation: GeolocationService,
              private router: Router,
              private dataservice: DataService) { }

  routingSubscription: any;
  tastingRatingChange(checked: boolean) {
    if (checked) {
      this.coffee.tasteRating = new TastingRating();
    } else {
      this.coffee.tasteRating = null;
    }
  }
  save() {
   this.dataservice.save(this.coffee, result => {
     console.log('The result is: ', JSON.stringify(result));
     if (result) {
       this.router.navigate(['/']);
     }
   });
  }
  cancel() {
   this.router.navigate(['/']);
  }
  ngOnInit() {
    this.coffee = new Coffee();
    this.routingSubscription = this.route.params.subscribe( params => {
      console.log(params['id']);
    });
    this.geolocation.requestLocation(location => {
      this.coffee.location.latitude = location.latitude;
      this.coffee.location.longitude = location.longitude;
    });
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.routingSubscription.unsubscribe();
  }
}
