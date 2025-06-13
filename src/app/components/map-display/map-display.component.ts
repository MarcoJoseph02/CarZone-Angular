import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import {
  GoogleMapsModule,
  MapMarker,
  MapInfoWindow,
  MapAdvancedMarker,
  MapDirectionsService,
} from '@angular/google-maps';
import { map, Observable } from 'rxjs';
import { GoogleMapData } from '../../models/branch';

@Component({
  selector: 'app-map-display',
  imports: [CommonModule, GoogleMapsModule, MapInfoWindow],
  templateUrl: './map-display.component.html',
  styleUrl: './map-display.component.css',
})
export class MapDisplayComponent {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  mapData!: GoogleMapData;
  @Input({ required: true })
  get googleMapData() {
    return this.mapData;
  }
  set googleMapData(data: GoogleMapData) {
    this.mapData = data;
    this.options.center = {
      lat: data.position.lat+0.008,
      lng: data.position.lng,
    };
  }

  center: google.maps.LatLngLiteral = {
    lat: 30,
    lng: 31,
  };

  options: google.maps.MapOptions = {
    zoom: 12,
    center: this.center,
    mapId: '1f394e2c07bb3fd18c5772a1',
  };

  mapInfoWindowOptions: google.maps.InfoWindowOptions = {
    headerDisabled: true,
  };

  toggleInfoWindow(marker: MapAdvancedMarker) {
    this.infoWindow.infoWindow?.isOpen;
    if (this.infoWindow.infoWindow?.isOpen) {
      this.infoWindow.close();
    } else {
      this.infoWindow.open(marker);
    }
  }
}
