import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {EndPoints} from '../../../endpoints'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http : HttpClient) { }


  getCustomers(page: number, limit: number) {
    const headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem("access_token")});
    return this.http.get(EndPoints.apiUrl + '/customers?page=' + page + "&limit=" + limit, {headers: headers});
  }

  getCustomerDetails(identifier: string) {
    const headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem("access_token")});
    return this.http.get(EndPoints.apiUrl + '/customers/' + identifier, {headers: headers});
  }
}
