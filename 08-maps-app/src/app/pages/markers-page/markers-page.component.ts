import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';
import { v4 as UUIDv4 } from 'uuid';
import { JsonPipe } from '@angular/common';



//  aqui estamos estableciendo la llave o el token
mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxglMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
  // esta es la referencia al elemento html que va a mostrar nuestro mapa
  divElement = viewChild<ElementRef>('map');

  // esta es una referencia a la constante del mapa que nos sirve para poder cambiar el mapa dependiendo del cambio de zoom
  map = signal <mapboxgl.Map|null>(null);

  //  esto va a contener los marcadores que hagamos en el mapa
  markers = signal<Marker[]>([])

  async ngAfterViewInit() {
    // aqui hacemos una validacion para asegurarnos de terner un valor
    if ( !this.divElement()?.nativeElement) return;

    // establecemos un timeout de 80 milecimas de segundo para der tiempo que el elemento se costruya y el mapa se vea completo y bien
    await new Promise((resolve) => setTimeout(resolve, 80))

    const element = this.divElement()?.nativeElement;

    // aqui vamos a mandar a llamar el codigo de inicializacion del mapa
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-1.878568, 50.719027], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    //* Abajo tenemos como colocar marcadores en el mapa video 11
    // // !con esto colocamos el marcador en el mapa
    // const marker = new mapboxgl.Marker({
    //   // !esto hace al marcador movible
    //   draggable: false,
    //   // !cambia el color del icono del marcador
    //   // color: 'blue'
    // })
    //   .setLngLat([-1.878568, 50.719027])
    //   .addTo(map)

    //   // !este es un listener para el marcador que nos da la infor de el mismo cuando deja de moverse
    // marker.on('dragend', (event) => {
    //   console.log(event)
    // })
    // ** Hasta aqui

    // este metodo va a realizar la inicializacion del map en la senal map
    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map){
    // este es un litserner de cuando se haga un click en el mapa
    map.on('click', (event)=> this.mapClick(event));

    // aqui establesemos la instancia del mapa
    this.map.set(map);

  }

  // este es un metodo para que cree los marcadores en el mapa
  mapClick( event: mapboxgl.MapMouseEvent){

    if (!this.map()) return;
    const map = this.map()!;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    // aqui se crea el marcador
    const mapboxmarker = new mapboxgl.Marker({
      // !esto hace al marcador movible
      draggable: false,
      // !cambia el color del icono del marcador
      color: color
    })
    // aqui establecemos las coordenadas
      .setLngLat([event.lngLat.lng, event.lngLat.lat])
      // aqui lo agregamos al map
      .addTo(map)

      // esta es una constante que contiene la info del nuevo marker
      const newMarker: Marker = {
        id: UUIDv4(),
        mapboxglMarker: mapboxmarker
      }

      // aqui agregamos el nuevo marcador a los ya existentes
      this.markers.update((markers) => [newMarker, ...markers]);
      // this.markers.set([newMarker, ...this.markers()]);

      console.log(this.markers());
  }

  // este metodo hace que cuando selecciones un marcador el mapa te lleve a ese punto con una animacion
  flyToMarker(lngLat: LngLatLike){
    if (!this.map()) return;

    this.map()?.flyTo({
      center: lngLat
    })
  }

  deleteMarker(marker: Marker){
    if (!this.map()) return;

    const map = this.map()!;

    // este metodo elimina el marcador del mapa pero no de la lista de marcadores
    marker.mapboxglMarker.remove();

    // para eliminar marcadores de la lista
    this.markers.set( this.markers().filter((m) => m.id !== marker.id))
    // this.markers.update( this.markers().filter((m) => m.id !== marker.id))




  }
}
