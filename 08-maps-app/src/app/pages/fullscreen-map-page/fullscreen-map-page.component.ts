import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';

//  aqui estamos estableciendo la llave o el token
mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [ DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.component.html',
  styles:`
    div {
      width: 100vw;
      height: calc(100vh - 64px);
    }

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `,
})
export class FullscreenMapPageComponent implements AfterViewInit {
  // esta es la referencia al elemento html que va a mostrar nuestro mapa
  divElement = viewChild<ElementRef>('map');

  // esta es una referencia a la constante del mapa que nos sirve para poder cambiar el mapa dependiendo del cambio de zoom
  map = signal <mapboxgl.Map|null>(null);

  // esto contiene el nivel del zoom
  zoom = signal(10)

  // esto contiene las cordenadas de lo que estas viendo en el mapa
  coordinates = signal({
    lng: -74.5,
    lat: 40,
  });

  // para conectar el zoom con el mapa lo podemos hacer atravez de un efecto, que se disparara cada vez que cambiemos el valor de la senal zoom
  zoomEffect = effect(() => {
    if ( !this.map() ) return;

    // this.map()?.zoomTo(this.zoom());
    this.map()?.setZoom(this.zoom());
  })

  async ngAfterViewInit() {
    // aqui hacemos una validacion para asegurarnos de terner un valor
    if ( !this.divElement()?.nativeElement) return;

    // establecemos un timeout de 80 milecimas de segundo para der tiempo que el elemento se costruya y el mapa se vea completo y bien
    await new Promise((resolve) => setTimeout(resolve, 80))

    const element = this.divElement()?.nativeElement;

    // desestructuramos las cordenadas en dos constantes para que sea vea mas facil en el codigo cuando las coloquemos en el mapa
    const {lat, lng} = this.coordinates();

    // aqui vamos a mandar a llamar el codigo de inicializacion del mapa
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });

    // este metodo va a realizar la inicializacion del map en la senal map
    this.mapListeners(map);
  }

  mapListeners( map: mapboxgl.Map) {

    // aqui estamos creando un listener en el mapa para que cada vez que el zoom cambie de cualquier forma sea notificado y con esa notidicacion se cambie la senal
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    // aqui creamos otro listener sobre el movimiento para que nos las cordenadas cuando termine de moverse el mapa
    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    })

    // aqui tienes un listener que se dispara despues que el mapa esta cargado
    map.on('load', () => {
      console.log('Map loaded')
    })

    // Aqui agragamos algunos controles del mapa que ya vienen en el paquete
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    // aqui estamos inicializando nuestro mapa colocando en la senal la variable del mapa
    this.map.set(map)
  }





}
