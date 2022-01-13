export interface Marker {
  id?: number;
  latitude: number;
  longitude: number;
  markerDraggable: boolean;
  zoom: number;
  address: string;
}
