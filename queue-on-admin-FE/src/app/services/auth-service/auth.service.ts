import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import {EndPoints} from '../../../endpoints'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  login(username: string, password: any) {
    let data = {
      username: username,
      password: password
    }
    return this.http.post<any>(EndPoints.apiUrl + '/auth/token', data);
  }
}
