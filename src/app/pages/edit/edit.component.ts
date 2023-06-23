import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  myParam: string='';
  public registerForm: FormGroup | any;
  registered:boolean = false
  error:boolean = false
  errorUndefined:boolean = false
  loading:boolean = false

  constructor(
    public inventoryService: InventoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    
    this.registerForm = this.formBuilder.group({
      id: [{value: '', disabled: true}],
      name: ['', Validators.required],
      describe: ['', Validators.required],
      logo: ['', Validators.required],
      date_free: [''],
      date_review: [{value: '', disabled: true}],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.myParam = params['prods']);

    this.setData()
  }

  setData(){
    console.log("this.myParam", this.myParam)
    if(!this.myParam){
      return
    }

    let prod:any = JSON.parse(this.myParam)
    console.log("prod", prod)
    console.log("this.myParam", this.myParam)
    this.registerForm.controls['id'].setValue(prod.id);
    this.registerForm.controls['name'].setValue(prod.name);
    this.registerForm.controls['describe'].setValue(prod.description);
    this.registerForm.controls['logo'].setValue(prod.logo);
    let date_free = prod.date_release.substring(0, 10);
    this.registerForm.controls['date_free'].setValue(date_free);
    let date_review = prod.date_revision.substring(0, 10);
    this.registerForm.controls['date_review'].setValue(date_review);
    
  }

  back() {
    this.router.navigateByUrl('/home', { replaceUrl: true })

  }

  reset() {
    this.registerForm.reset();
    this.registered = false;
    this.error = false;
    this.errorUndefined = false;
    this.loading = false

  }

  makeEdit(){
    console.warn(this.registerForm.value);
    this.loading = true

    let body = {
      id: this.registerForm.value.id,
      name: this.registerForm.value.name,
      description: this.registerForm.value.describe,
      logo: this.registerForm.value.logo,
      date_release: this.registerForm.value.date_free,
      date_revision: this.registerForm.value.date_review
    }

    this.inventoryService.putProd(body)
      .subscribe((prods: any) => {
        console.log("setProd", prods)
        this.registered = true
        this.loading = false
      }, (error) => {
        if (error.status == 206) {
          this.error = true
        }
        else {
          this.errorUndefined = true

        }
        this.loading = false
      })

  }

  calculateDate() {
    
    if (!this.registerForm.controls['date_free'].value)
      return;

    let dateFree = new Date(this.registerForm.controls['date_free'].value);

    let dateReview = dateFree.setFullYear(dateFree.getFullYear() + 1);

    console.log("date_review", new Date(dateReview))

     //yyyy-MM-dd
    let dateReviewFormat = new Date(dateReview).toISOString();

    let format = dateReviewFormat.substring(0, 10);

    this.registerForm.controls['date_review'].setValue(format);

  }
}
