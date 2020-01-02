import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Coffee} from '../../Logic/Coffee';
import {Router} from '@angular/router';
import {GeolocationService} from '../geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: [Coffee];

  constructor(private data: DataService,
              private router: Router,
              private geoLocation: GeolocationService) { }
  goDetails(coffee: Coffee) {
   this.router.navigate(['/coffee', coffee._id]);
  }
  goMap(coffee: Coffee) {
    location.href = this.geoLocation.getMapLink(coffee.location);
  }
  share(coffee: Coffee) {
    const shareText = `I had this coffee at ${coffee.place} and for me
         it is a ${coffee.rating} star coffee.`;
    const newVariable = (window.navigator as any);

    if ('share' in navigator) {
       newVariable.share({
         title: coffee.name,
         text: shareText,
         url: window.location.href
       })
       .then( () => console.log('shared'))
         .catch( () => console.log(('Error Sharing.')));
     } else {
       location.href = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
     }
  }
  ngOnInit() {

    this.data.getList(list => {
      this.list = list;
      console.log('the list is : ', this.list);
    });
  }

}
