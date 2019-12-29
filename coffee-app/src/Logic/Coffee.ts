import {PlaceLocation} from './PlaceLocation';
import {TastingRating} from './TastingRating';

export class Coffee {

  type: string;
  rating: number;
  notes: string;
  tasteRating: TastingRating;

  constructor(public name: string = '',
              public place: string = '',
              public location: PlaceLocation = null) {
     this.location = new PlaceLocation();
     this.tasteRating = new TastingRating();
  }
}
