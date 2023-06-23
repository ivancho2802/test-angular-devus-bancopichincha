import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { DataService } from '../../services/data.service'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Prods } from '../../interfaces/prods';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let myService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: DataService, useValue: new DataService() }
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent]
    })
      .compileComponents();

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    myService = TestBed.get(DataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it(`should have all records prods`, () => {

    let prodsDummy: Prods[] = myService.get();

    const elements: DebugElement[] = fixture.debugElement.queryAll(By.css('.prod'))
    expect(elements?.length).toBe(prodsDummy.length);
  });
});
