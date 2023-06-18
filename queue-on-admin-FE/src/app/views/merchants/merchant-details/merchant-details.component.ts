import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from "../../../services/merchant-service/merchant.service";
import { OrderService } from "../../../services/order-service/order.service";
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-merchant-details',
  templateUrl: './merchant-details.component.html',
  styleUrls: ['./merchant-details.component.scss']
})
export class MerchantDetailsComponent implements OnInit  {

  identifier: any = null;

  orders: any = [];
  merchant: any;
  pageNumber: number = 0;
  limit: number = 10;
  totalRecords: number = 0;

  currentPage = 1;
  itemsPerPage = 2;
  merchantType : string = "resturant";
  loadingFlag : boolean = true;

  constructor(private orderService: OrderService, private merchantService: MerchantService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.loadingFlag = true;
    if(localStorage.getItem("access_token") == null ) {
      this.router.navigate(['/login']);
    }
    this.route.paramMap.subscribe(params => {
      this.identifier = params.get('merchantId');
      this.merchantService.getMerchantDetails(this.identifier)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.router.navigate(['/login']);
        return throwError(error);
      }))
      .subscribe((response:any) => {
        this.merchant = response.content;
        this.getOrders(0);
        this.loadingFlag = false;
      } )    
  });
  }

  getOrders(page:number) {
    this.loadingFlag = true;
    this.pageNumber=page;
    this.currentPage = page;
    this.orderService.getMerchantOrders(this.identifier, this.pageNumber, this.limit)
    .pipe(catchError((error: HttpErrorResponse) => {
      this.router.navigate(['/login']);
      return throwError(error);
    }))
    .subscribe((response:any) => {
      this.orders = response.content.content;
      this.totalRecords = response.content.totalElements;
      this.loadingFlag = false;
    })
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.limit);
  }

  get displayedData(): any[] {
    const startIndex = (this.pageNumber - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    return this.orders.slice(startIndex, endIndex);
  }
  
  getorderDetails(identifier:string) {
    this.router.navigate(['/orders/' + identifier + '/details/']);
  }

}
