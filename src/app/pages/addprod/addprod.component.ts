import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { error } from 'console';

@Component({
  selector: 'app-addprod',
  templateUrl: './addprod.component.html',
  styleUrls: ['./addprod.component.scss']
})
export class AddprodComponent implements OnInit {
  public registerForm: FormGroup | any;
  registered: boolean = false
  error: boolean = false
  errorUndefined: boolean = false
  loading: boolean = false

  constructor(
    public inventoryService: InventoryService,
    private router: Router,
    private formBuilder: FormBuilder,

  ) {

    this.registerForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      describe: ['', Validators.required],
      logo: ['', Validators.required],
      date_free: [''],
      date_review: [{value: '', disabled: true}],
    });
  }

  ngOnInit(): void {
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

  makeRegister() {
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

    this.inventoryService.setProd(body)
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
