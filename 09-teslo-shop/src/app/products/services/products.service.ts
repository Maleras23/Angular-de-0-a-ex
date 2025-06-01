import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '@products/interfaces/product.interface';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

export interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({providedIn: 'root'})
export class ProductsService {

  private http = inject(HttpClient);

  //? Para tener un cache nos creamos un espacio que lo va a contener
  private productsCache = new Map<string, ProductsResponse>();

  // este sera el cache de un producto unico
  private productCache = new Map<string, Product>();

  getProducts( options: Options): Observable<ProductsResponse>{

    const { limit = 9, offset = 0, gender = '' } = options;

    //? Creamos la llave para el cache que sera un identificador unico
    const key = `${limit}-${offset}-${gender}`
    //? revisamos si esa llave ya existe en nuesto calle y si existe entonces detenemos la ejecucion y devolvemos el valor de esa llave
    if ( this.productsCache.has(key)){
      return of (this.productsCache.get(key)!);
    }

    return this.http.get<ProductsResponse>(`${baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender,
      }
    })
    .pipe(
      tap((resp) => console.log(resp)),
      // ? cada vez que busquemos algo nuevo se va a grabar en el cache para no tener que volverlo a buscar la siguiente vez
      tap( (resp) => this.productsCache.set(key, resp)));
  }

  getProductByIdSlug(idSlug: string): Observable<Product>{
    // en este caso el isdlug sera el identificador unico
    const key = idSlug;
    if (this.productCache.has(key)){
      return of (this.productCache.get(key)!)
    }

    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)
    .pipe(
      delay(2000),
      tap((resp) => this.productCache.set(key, resp)));
  }

}
