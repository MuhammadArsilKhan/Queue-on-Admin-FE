import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth.service'
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{


    loginForm!:FormGroup;
    error: boolean = false;

    constructor(private _fb: FormBuilder, private authService: AuthService, public router: Router) { }

    ngOnInit(): void {
      this.loginForm = this._fb.group({
        username: ['', [<any>Validators.required]],
        password: ['', [<any>Validators.required]]
      });
    }

  onSubmit(model: any) {
    this.authService.login(model.username, model.password)
    .pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }))
    .subscribe((response:any) => {
      if(response.responseMessage === 'OK') {
        localStorage.setItem("access_token", response.content.accessToken);
        this.error = false;
        this.router.navigate(['/dashboard/']);
      } else {
        this.error = true;
      }

    })
  }

}
