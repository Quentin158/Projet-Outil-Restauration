import { Component, Input } from '@angular/core';
import { EtatMenu, Menu } from '../../models/menu';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { Plat } from '../../models/plat';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {
  @Input()
  public menu:Menu = new Menu()
  readonly statutMenu = EtatMenu
  public totalCalories: number = 0
  
  constructor(
    private menuService : MenuService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onCalculCalories()
  }

  onDetail(menuId: number) {
    this.router.navigate(['/menu', menuId]);
  }

  onProgresse(evenement: Event) {
    evenement.stopPropagation();
    switch (this.menu.statut) {
      case EtatMenu.INACTIF:
        this.menu.statut = EtatMenu.ACTIF
        this.menuService.updateMenu(this.menu).subscribe({
          next: menu => this.menu = menu,
          error: err => console.log("Erreur de mise à jour de la tâche", err)
        })
        break;
    }
  }
  onRegresse(evenement: Event) {
    evenement.stopPropagation();
    switch (this.menu.statut) {
      case EtatMenu.ACTIF:
        this.menu.statut = EtatMenu.INACTIF
        this.menuService.updateMenu(this.menu).subscribe({
          next: menu => this.menu = menu,
          error: err => console.log("Erreur de mise à jour de la tâche", err)
        })
        break;
    }
  }

  onSupprime(evenement: Event) : void {
    evenement.stopPropagation();
    if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
      this.menuService.deleteMenu(this.menu.id).subscribe({
        next: () => this.router.navigateByUrl('/').then(() => {
          this.router.navigateByUrl('/menus');
        }),
        error: err => console.log("Erreur de suppression de la tâche", err)
      })
    }else{
      console.log("Suppression annulée")
    }
  }

  onCalculCalories() {
    this.menuService.getPlats(this.menu.id).subscribe({
      next: (plats: Plat[]) => {
        this.totalCalories = plats.reduce((total, plat) => total + plat.calories, 0)
      },
      error: err => console.log("Erreur de récupération des plats", err)
    })
  }
}
