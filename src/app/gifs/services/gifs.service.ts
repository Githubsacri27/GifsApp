import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Servicio para gestionar el historial de búsquedas de GIFs.
 */
@Injectable({ providedIn: 'root' })
export class GifsService {

  // Arreglo privado para almacenar el historial de tags de búsqueda.
  private _tagsHistory: string[] = [];
  private apiKey: string = '3BOLXTr8M79lmv6XT25b93IR46vBzxdx';
  private serviceUrl: string ='https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) {}

  /**
   * Obtiene una copia del historial de tags de búsqueda.
   * @returns {string[]} Una copia del historial de tags.
   */
  get tagsHistory() {
    return [...this._tagsHistory];
  }

  /**
   * Organiza el historial de tags. Si el tag ya existe, la mueve al principio.
   * Mantiene un máximo de 10 tags en el historial.
   * @param {string} tag - El tag a organizar en el historial.
   */
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  /**
   * Busca un tag y lo agrega al historial de búsqueda.
   * @param {string} tag - El tag a buscar.
   */
   searchTag(tag: string):void{
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag)

    this.http.get(`${this.serviceUrl}/search`, {params})
    .subscribe(resp =>{
      console.log(resp);
    })
  
  }
}