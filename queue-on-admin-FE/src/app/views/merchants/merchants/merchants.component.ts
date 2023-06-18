import { Component, OnInit } from '@angular/core';
import { MerchantService } from "../../../services/merchant-service/merchant.service";
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss']
})
export class MerchantsComponent implements OnInit{

  loadingFlag: boolean = false;
  merchants: any = [];
  pageNumber: number = 0;
  limit: number = 10;
  totalRecords: number = 0;

  currentPage = 1;
  itemsPerPage = 2;
  merchantType : string = "resturant"
  constructor(private merchantService: MerchantService, public router: Router) {}

  ngOnInit(): void {
    this.loadingFlag = true;
    if(localStorage.getItem("access_token") == null ) {
      this.router.navigate(['/login']);
    }
    this.getMerchantsList(this.pageNumber)
  }

  getMerchantsList(page:number) {
    this.loadingFlag = true;
    this.pageNumber=page;
    this.currentPage = page;
    this.merchantService.getMerchants(this.pageNumber, this.limit, this.merchantType)
    .pipe(catchError((error: HttpErrorResponse) => {
      this.router.navigate(['/login']);
      return throwError(error);
    }))
    .subscribe((response:any) => {
      this.merchants = response.content.content;
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
    return this.merchants.slice(startIndex, endIndex);
  }

  showDetails(identifier:string) {
    this.router.navigate(['/merchants/' + identifier + '/details/']);
  }

}
