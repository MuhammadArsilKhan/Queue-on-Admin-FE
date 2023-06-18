import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {EndPoints} from '../../../endpoints'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }

  getMerchantOrders(merchantIdentifier:string, page: number, limit: number) {
    const headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem("access_token")});
    return this.http.get(EndPoints.apiUrl + '/orders/active?merchantIdentifier=' + merchantIdentifier + '&page=' + page + "&limit=" + limit, {headers: headers});
  }

  getCustomerOrders(customerIdentifier:string, page: number, limit: number) {
    const headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem("access_token")});
    return this.http.get(EndPoints.apiUrl + '/orders/history?customerIdentifier=' + customerIdentifier + '&page=' + page + "&limit=" + limit, {headers: headers});
  }

  getOrders(page: number, limit: number, searchQuery: string) {
    const headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem("access_token")});
    return this.http.get(EndPoints.apiUrl + '/orders/history?page=' + page + '&limit=' + limit + '&searchQuery=' + searchQuery, {headers: headers});
  }

  getOrderDetails(customerIdentifier:string) {
    const headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem("access_token")});
    return this.http.get(EndPoints.apiUrl + '/orders?orderIdentifier=' + customerIdentifier, {headers: headers});
  }
}
