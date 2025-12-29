import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { EtatMenu, Menu } from '../../models/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrl: './menu-edit.component.css'
})
export class MenuEditComponent {
  public menu: Menu = new Menu();
  readonly etatMenu = EtatMenu;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idMenu = this.route.snapshot.params['id'];
    this.menu = new Menu();
    if (idMenu) {
      this.menuService.getMenu(idMenu).subscribe({
        next: menu => this.menu = {...menu},
        error: err => this.router.navigateByUrl('/menus')
      })
    }
  }  

  public onSubmit(leFormulaire: NgForm): void{
    if (leFormulaire.valid){
      let ObservableAction
      if (this.menu.id) {
        ObservableAction = this.menuService.updateMenu(this.menu);
      } else {
        ObservableAction = this.menuService.addMenu(this.menu);
      }
      ObservableAction.subscribe({
        next: menu => {
          console.log("Enregistrement OK : ", menu)
          this.router.navigateByUrl('/menus')
        },
        error: err => {
          console.log("ERREUR de sauvegarde : ", err)
        }
      })
    }
  }
} 
