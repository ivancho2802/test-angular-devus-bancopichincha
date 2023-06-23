import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddprodComponent } from './addprod.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core';

describe('AddprodComponent', () => {
  let component: AddprodComponent;
  let fixture: ComponentFixture<AddprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule, 
        RouterTestingModule, 
        FormsModule, 
        ReactiveFormsModule
      ],
      declarations: [ AddprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check init and disable button enviar', () => {
    const element: DebugElement = fixture.nativeElement.querySelector('#send');
    console.log(element);

    expect(element.attributes["disabled"]).toBeTruthy();
  });

  it('valid fromulary', () => {
    let validation = false
    const element: DebugElement = fixture.nativeElement.querySelector('#send');
    console.log(element);

    if(!element.attributes["disabled"]){
      validation = false
    }
    const inputId: DebugElement = fixture.nativeElement.querySelector('#id');
    const inputName: DebugElement = fixture.nativeElement.querySelector('#name');
    const inputDescribe: DebugElement = fixture.nativeElement.querySelector('#describe');
    const inputLogo: DebugElement = fixture.nativeElement.querySelector('#logo');
    const inputdate_free: DebugElement = fixture.nativeElement.querySelector('#date_free');
    const inputdate_review: DebugElement = fixture.nativeElement.querySelector('#date_review');
    
    inputId.attributes["value"] = "id";
    inputName.attributes["value"] = "name";
    inputDescribe.attributes["value"] = "describe";
    inputLogo.attributes["value"] = "logo";
    
    if(element.attributes["disabled"]){
      validation = true
    }

    expect(validation).toBeTruthy();
  });
});
