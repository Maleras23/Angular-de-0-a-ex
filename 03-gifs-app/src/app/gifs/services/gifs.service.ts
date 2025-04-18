import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

// esta funcion es la que va a leer del localStorage
const loadFromLocalStorage = () => {

  // esta linea es la que toma del localStorage
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '{}';

  // esta linea transforma el string que resivimos del localStorage y lo combierte en un objeto
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
};

@Injectable({providedIn: 'root'})
export class GifService {
  private http = inject(HttpClient);

  // esta senal va a contener el estado de nuestros gifs
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  // este es un objeto que que contendra el historial de busquedas
  // todo: necesito generar trendingGifs en el localStorage, se puede encontar en la seccion 5
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());

  // este objeto tomara las llaves de todas las cosas que las personas a buscado
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()))

  constructor(){
    this.loadTrending();
  }

  // este efecto esta destinado solo a grabar en el localStorage pero no a leer de el por lo que si refrescas el navegador igual pierdes la informacion, tienes que hacer otro effect que leea del localStorage
  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  })

  // este metodo realizara el llamado a la peticion http
  loadTrending(){
    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`,{
      params: {
        api_key: environment.giphyApikey,
        limit: 20,
      }
    })
    // este subcribe se realiza para hacer la peticion http sin esto la peticion no se hace
    .subscribe((resp) => {
      // aqui resivimos la data y la convertimos a un arreglo segun nuestra interface, que es mucho mas facil de manejar
      const gifs = GifMapper.mapGiphyItemsToGifarray(resp.data);
      // Colocamos esa data en la senal que creamos para tal fin
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log( { gifs });
    });
  }

  searchGifs(query: string): Observable<Gif[]>{
    return this.http
      .get<GiphyResponse>(`${ environment.giphyUrl }/gifs/search`,{
        params: {
          api_key: environment.giphyApikey,
          q: query,
          limit: 20,
        }
      })
      // este es un metodo rxjs que nos permite tranformar las emiciones de los observables
      // pipe en particular es un metodo que nos permite encandenar funcionamientos especiales de los observables
      .pipe(
        map(({ data }) => data),
        map( (items) => GifMapper.mapGiphyItemsToGifarray(items)),

        // tanto tap como map son efectos secundarios
        // TODO: Historial
        tap ( items => {
          this.searchHistory.update( history => ({
            ...history,
            [query.toLowerCase()]: items,
          }))
        })

      );
    // .subscribe((resp) =>{
    //   const gifs = GifMapper.mapGiphyItemsToGifarray(resp.data)
    //   console.log({ search: gifs})
    // });
  }

  getHistoryGifs( query: string):Gif[] {
    return this.searchHistory()[query] ?? [];
  }


}
