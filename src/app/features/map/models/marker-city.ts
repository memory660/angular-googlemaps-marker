import { City } from './city';
import { Marker } from './marker';

export interface MarkerCity {
  id: number;
  marker: Marker;
  city: City;
}
