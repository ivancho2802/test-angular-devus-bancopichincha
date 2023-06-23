import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  url: string = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros";

  constructor(public http: HttpClient) { }

  getProds(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}/bp/products`, this.header_config())
  }

  /**
   * 
   * @param id 
   * @returns 200 true false
   */
  verifyProd(id:string){
    return this.http.get<any>(`${this.url}/bp/products/verification?id=${id}`, this.header_config())

  }

  /**
   * 
   * @param id 
   * @returns 200 producto eliminado con exito 404 no encuentra el id 400 falta header
   */
  deleteProd(id:string){
    return this.http.delete<any>(`${this.url}/bp/products?id=${id}`, this.header_config())

  }

  /**
   * 
   * @param body {
   *  id
   *  name
   *  description
   *  logo
   *  date_release
   *  date_revision
   * } 
   * @returns 200 body 404 no encuentra el id 400 falta header 206 name description no debe ser nulo
   */
  putProd(body:any){
    return this.http.put<any>(`${this.url}/bp/products`, body, this.header_config())

  }

  /**
   * 
   * @param body {
   *  id
   *  name
   *  description
   *  logo
   *  date_release
   *  date_revision
   * } 
   * @returns 200 body 404 no encuentra el id 400 falta header 206 name description no debe ser nulo
   */
  setProd(body:any){
    return this.http.post<any>(`${this.url}/bp/products`, body, this.header_config())

  }

  public header_config() {
    let head: any = {
      'Content-Type': 'application/json',
      'X-Date-Current': JSON.stringify(new Date())
    }
    head.authorId = "64649409a7b32cd0af482ede1593e53e962449e"
    const httpOptions = {
      headers: new HttpHeaders(head)
    };
    return httpOptions;
  };
}
