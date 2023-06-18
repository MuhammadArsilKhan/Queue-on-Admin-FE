import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from "../../../services/order-service/order.service";
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit  {

  identifier: any = null;
  order: any = null;
  loadingFlag: boolean = true;

  constructor(private orderService: OrderService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("access_token") == null ) {
      this.router.navigate(['/login']);
    }
    this.route.paramMap.subscribe(params => {
      this.identifier = params.get('orderId');
      this.orderService.getOrderDetails(this.identifier)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.router.navigate(['/login']);
        return throwError(error);
      }))
      .subscribe((response:any) => {
        this.order = response.content;
        this.loadingFlag = false;
      } )    
  });
    
  }
}
