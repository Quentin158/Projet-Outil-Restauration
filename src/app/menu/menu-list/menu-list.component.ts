import { Component } from '@angular/core';
import { EtatMenu, Menu } from '../../models/menu';
import { map, Observable } from 'rxjs';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent {
  public menus! : Observable<Menu[]>
  public etatChargement: 'chargement' | 'chargé' | 'erreur' = 'chargement';
  public etatFiltre: EtatMenu | '' = '';
  public etatMenu = EtatMenu;
  public motCle : string = '';

  constructor(
    private menuService : MenuService
  ) { }

  ngOnInit() {
    const sauvegardeFiltre = sessionStorage.getItem('filtre');
    if (sauvegardeFiltre) {
      this.etatFiltre = sauvegardeFiltre as EtatMenu;
    }
    const sauvegardeMotCle = sessionStorage.getItem('motCle');
    if (sauvegardeMotCle) {
      this.motCle = sauvegardeMotCle;
    }
    this.menus = this.menuService.getMenus(this.etatFiltre, this.motCle).pipe(
      map((menus: Menu[]) => menus.filter((menu: Menu) => 
        (this.etatFiltre === '' || menu.statut === this.etatFiltre) &&
        (this.motCle === '' || menu.nom.includes(this.motCle) || menu.description.includes(this.motCle))
      ))
    );
    this.menus.subscribe({
      next: () => {
        this.etatChargement = 'chargé'
      },
      error: err => {
        console.log("Erreur de chargement des tâches", err)
        this.etatChargement = 'erreur'
      }
    })    
  }

  filtre() {
    sessionStorage.setItem('filtre', this.etatFiltre);
    sessionStorage.setItem('motCle', this.motCle);
    this.ngOnInit();
  }
}
