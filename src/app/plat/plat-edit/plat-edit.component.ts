import { Component, Input } from '@angular/core';
import { Plat } from '../../models/plat';
import { MenuService } from '../../services/menu.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plat-edit',
  templateUrl: './plat-edit.component.html',
  styleUrls: ['./plat-edit.component.css']
})
export class PlatEditComponent {
  @Input() plat: Plat = new Plat();

  constructor(private menuService: MenuService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.plat.id) {
        this.menuService.updatePlat(this.plat).subscribe({
          next: plat => { console.log('Plat mis à jour', plat); 
                        this.rafraichirPlat(); },
          error: err => console.log('Erreur de mise à jour du plat', err)
        });
      } else {
        this.menuService.addPlat(this.plat).subscribe({
          next: plat => { console.log('Plat créé', plat),
                        this.rafraichirPlat(); },
          error: err => console.log('Erreur de création du plat', err)
        });
      }
    }
  }

  private rafraichirPlat() {
    const urlActuelle = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(urlActuelle);
    });
  }
}