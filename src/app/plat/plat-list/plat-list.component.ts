import { Component, Input, OnInit } from '@angular/core';
import { Plat } from '../../models/plat';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-plat-list',
  templateUrl: './plat-list.component.html',
  styleUrl: './plat-list.component.css'
})
export class PlatListComponent implements OnInit {
  @Input() menuId!: number;
  
  plats: Plat[] = [];
  platSelectione: Plat = new Plat();
  afficherFormulairePlat: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
      this.loadPlats();
  }

  loadPlats(): void{
    if (this.menuId){
      this.menuService.getPlats(this.menuId).subscribe({
        next: plats => this.plats = plats,
        error: err => console.log("Erreur lors de la récupération des plats", err)
      })
    }
  }

  selectPlat(plat: Plat): void {
    this.platSelectione = { ...plat };
    this.afficherFormulairePlat = true;
  }

  nouveauPlat(): void {
    this.platSelectione = new Plat();
    this.afficherFormulairePlat = true;
  }

  fermerFormulairePlat(): void {
    this.afficherFormulairePlat = false;
  }

  deletePlat(plat: Plat): void {
    if(confirm("Voulez-vous vraiment supprimer ce plat ?")){
      this.menuService.deletePlat(plat.id).subscribe({
        next: () => this.loadPlats(),
        error: err => console.log("Erreur lors de la suppression du plat")
      })
    }
  }
}
