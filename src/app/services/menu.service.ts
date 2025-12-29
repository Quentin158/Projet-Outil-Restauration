import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EtatMenu, Menu } from '../models/menu';
import { Plat } from '../models/plat';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  readonly menuAPI = environment.apiUrl+'/menus';
  readonly platAPI = environment.apiUrl+'/plats';
  constructor(private http : HttpClient) { }

  getMenus(etatFiltre: string = '', motCle: string = ''): Observable<Menu[]> {
    let params = new HttpParams();
    if (etatFiltre) {
      params = params.set('etat', etatFiltre);
    }
    if (motCle) {
      params = params.set('q', motCle);
    }
    return this.http.get<Menu[]>(this.menuAPI, { params })
    }
    getMenu( id:number ) : Observable<Menu> {
      return this.http.get<Menu>(this.menuAPI+"/"+id);
    }
    addMenu( nouveauMenu:Menu ) : Observable<Menu> {
      return this.http.post<Menu>(this.menuAPI, nouveauMenu);
    }
    updateMenu(menu: Menu) : Observable<Menu> {
      return this.http.put<Menu>(this.menuAPI+"/"+menu.id, menu);
    }
    deleteMenu(id: number) : Observable<Menu> {
      return this.http.delete<Menu>(this.menuAPI+"/"+id);
    }
    getPlats(menuId: number) : Observable<Plat[]> {
      return this.http.get<Plat[]>(`${this.menuAPI}/${menuId}/plats`);
    }
    addPlat(plat: Plat): Observable<Plat> {
      return this.http.post<Plat>(this.platAPI, plat);
    }
  
    updatePlat(plat: Plat): Observable<Plat> {
      return this.http.put<Plat>(`${this.platAPI}/${plat.id}`, plat);
    }
  
    deletePlat(id: number): Observable<void> {
      return this.http.delete<void>(`${this.platAPI}/${id}`);
    }
  }
