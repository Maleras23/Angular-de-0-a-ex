import { Gif } from '../interfaces/gif.interface';
import { GiphyItem } from './../interfaces/giphy.interfaces';


// esto va a recibir el objeto de IPA y regresemos un objeto vasado en nuestra interface
export class GifMapper {
  static mapGiphyItemToGif(item: GiphyItem): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    };
  }

  // este metodo tomara cada elemeto y usanda la funcion anterior combertira cada elemento y devolvera un arreglo de todos los elementos convertidos
  static mapGiphyItemsToGifarray(items: GiphyItem[]):Gif[]{
    return items.map(this.mapGiphyItemToGif);
  }
}


