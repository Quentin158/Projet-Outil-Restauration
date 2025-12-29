export enum EtatMenu {
    ACTIF   = "actif",
    INACTIF  = "inactif",
  }

export class Menu {
    constructor(
        public id : number = 0,
        public nom : string = "",
        public description : string = "",
        public date_creation : string = new Date().toISOString().split('T')[0],
        public statut: EtatMenu = EtatMenu.ACTIF,
    ) {}
}
