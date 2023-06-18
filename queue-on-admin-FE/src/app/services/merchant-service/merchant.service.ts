import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {EndPoints} from '../../../endpoints'

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private http : HttpClient) { }

  getMerchants(page: number, limit: number, type: string) {
    const headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem("access_token")});
    return this.http.get(EndPoints.apiUrl + '/merchants?page=' + page + "&limit=" + limit + "&type=" + type, {headers: headers});
  }

  getMerchantDetails(identifier: string) {
    const headers = new HttpHeaders({authorization : 'Bearer ' + localStorage.getItem("access_token")});
    return this.http.get(EndPoints.apiUrl + '/merchants/' + identifier, {headers: headers});
  }
}
