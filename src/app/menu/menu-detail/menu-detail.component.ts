import { Component, OnInit } from '@angular/core';
import { Menu } from '../../models/menu';
import { MenuService } from '../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Plat } from '../../models/plat';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrl: './menu-detail.component.css'
})
export class MenuDetailComponent implements OnInit {

  menu : Menu = new Menu()
  plats: Plat[] = []
  
  constructor(
    private menuService : MenuService,
    private router       : Router,
    private route        : ActivatedRoute
  ) {}

  ngOnInit(): void {
        this.loadPlats(this.menu.id)
    this.loadMenu()

  }

  loadMenu(): void {
    const id  = this.route.snapshot.params['id']
    this.menuService.getMenu(id).subscribe({
      next: menu => this.menu = menu,
      error: err => this.router.navigateByUrl('/menus') 
    })
  }

  loadPlats(menuId: number): void {
    this.menuService.getPlats(menuId).subscribe({
      next: plats => this.plats = plats,
      error: err => console.log("Erreur lors de la récupération des plats", err)
    });
  }
}