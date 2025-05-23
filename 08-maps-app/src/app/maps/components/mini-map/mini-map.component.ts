import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import mapboxgl from 'mapbox-gl';

//  aqui estamos estableciendo la llave o el token
mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styles:`
    div {
      width: 100%;
      height: 260px;
    }
  `,
})
// vamos a implementar el ciclo de vida de angular donde queremos que se cree el mapa
export class MiniMapComponent implements AfterViewInit{

  // propiedad que resivira las cordenadas desde el componente padre
  lngLat = input.required< {lng: number, lat: number} >();

  // esta es la referencia al elemento html que va a mostrar nuestro mapa
  divElement = viewChild<ElementRef>('map');

  // esto es para hacer mas flesible el componente ya que al hacerlo el interactive: false no se puede mover y tampo camiar el zoom
  zoom = input<number>(14);




  async ngAfterViewInit() {
    // aqui hacemos una validacion para asegurarnos de terner un valor en el elemento HTML
    if ( !this.divElement()?.nativeElement) return;

    // establecemos un timeout de 80 milecimas de segundo para der tiempo que el elemento se costruya y el mapa se vea completo y bien
    await new Promise((resolve) => setTimeout(resolve, 80))

    // para hacer la lectura del codigo mas facil agregamos como una constante la referencia al elemnto html antes hecha
    const element = this.divElement()?.nativeElement;

    // aqui vamos a mandar a llamar el codigo de inicializacion del mapa
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat(), // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      interactive: false, // permite mover o no el mapa
    });

    // creamos el marcador
    new mapboxgl.Marker()
      // le damos las cordenadas
      .setLngLat(this.lngLat())
      // lo agregamos al mapa
      .addTo(map)
  }
}
