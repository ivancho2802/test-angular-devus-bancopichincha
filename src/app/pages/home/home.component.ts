import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { Prods } from '../../interfaces/prods'
import { ModalService } from '../../services/modal.service';
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  prods: Prods[] = []
  prodsAux: Prods[] = []
  lengthProds: number = 0;
  currentProd: Prods | any = null
  loading: boolean = false

  constructor(
    public modalService: ModalService,
    private router: Router,
    public inventoryService: InventoryService,
    public makeDummyData: DataService,

  ) { }

  ngOnInit(): void {
    this.setDummyData()
    this.getProds()
  }


  /**
   * 
   * @param event parametro del input buscar productos
   */
  search(event: any) {
    console.log(event.target.value)
    if (event.target.value !== "") {
      this.prodsAux = this.prods.filter((el: Prods) => {
        return el.name.includes(event.target.value)
      });
    } else {
      this.prodsAux = this.prods
    }

    this.lengthProds = this.prods.length

  }


  /**
   * navegacion a agregar elemento 
   */
  add() {

    this.router.navigateByUrl('/add', { replaceUrl: true })
  }

  /**
   * productos desde la api
   */
  getProds() {
    this.inventoryService.getProds()
      .subscribe((prods: Prods[] | any) => {
        console.log("prods", prods)
        this.prods = prods
        this.prodsAux = prods
        this.lengthProds = this.prods.length
      }, (error) => {
        this.setDummyData()
      })
  }

  setDummyData() {
    let prods: Prods[] = this.makeDummyData.get();
    this.prods = prods
    this.prodsAux = prods
    this.lengthProds = this.prods.length
  }

  options(prod: Prods) {
    this.currentProd = prod;
    this.modalService.open('options')
  }

  edit() {
    
    this.modalService.close();
    if (!this.currentProd || !this.currentProd?.id) {
      return
    }

    this.router.navigate(["edit", JSON.stringify(this.currentProd)]);

  }

  async delete() {
    await this.modalService.close();

    setTimeout(() => {
      this.currentProd
      this.modalService.open('confirm')
    }, 1000);
  }

  makeDelete() {

    if (!this.currentProd || !this.currentProd?.id) {
      return
    }

    this.loading = true
    this.inventoryService.deleteProd(this.currentProd?.id)
      .subscribe(async (response: any) => {
        this.loading = false
        console.log("response", response)

        let index = this.prodsAux.findIndex(el => el.id == this.currentProd?.id);

        if (index !== -1) {

          this.prodsAux.splice(index, 1)
          this.prods = this.prodsAux
        }
        await this.modalService.close();

      }, async (error) => {
        console.log("error", error)

        this.loading = false

        let index = this.prodsAux.findIndex(el => el.id == this.currentProd?.id);
        
        if (index !== -1) {

          this.prodsAux.splice(index, 1)
          this.prods = this.prodsAux
        }
        await this.modalService.close();
      })
  }

}
