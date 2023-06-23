import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  get() {
    return [
      {
        id: "9135965777083781",
        name: "name 2",
        description: "description",
        logo: "./assets/images/logo.png",
        date_release: new Date(),
        date_revision: new Date()
      },
      {
        id: "10892390988011513",
        name: "name 1",
        description: "description",
        logo: "./assets/images/logo.png",
        date_release: new Date(),
        date_revision: new Date()
      },
      {
        id: "3807256301499029",
        name: "name 3",
        description: "description",
        logo: "./assets/images/logo.png",
        date_release: new Date(),
        date_revision: new Date()
      },
      {
        id: "6051992818684109",
        name: "name 9",
        description: "description",
        logo: "./assets/images/logo.png",
        date_release: new Date(),
        date_revision: new Date()
      },
    ];
  }
}
