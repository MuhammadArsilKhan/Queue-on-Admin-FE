import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../../../services/customer-service/customer.service";
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit{

  pageNumber: number = 0;
  limit: number = 10;
  customers: any = [];
  totalRecords: number = 0;
  loadingFlag: boolean = false;

  currentPage = 1;
  itemsPerPage = 2;

  constructor(private customerService: CustomerService, public router: Router) {}

  ngOnInit(): void {
    this.loadingFlag = true;
    if(localStorage.getItem("access_token") == null ) {
      this.router.navigate(['/login']);
    }
    this.getCustomersList(this.pageNumber) 
    this.loadingFlag = false;
  }

  getCustomersList(page:number) {
    this.loadingFlag = true;
    this.pageNumber=page;
    this.currentPage = page;
    this.customerService.getCustomers(this.pageNumber, this.limit)
    .pipe(catchError((error: HttpErrorResponse) => {
      this.router.navigate(['/login']);
      return throwError(error);
    }))
    .subscribe((response:any) => {
      this.customers = response.content.content;
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
    return this.customers.slice(startIndex, endIndex);
  }

  showDetails(identifier:string) {
    this.router.navigate(['/customers/' + identifier + '/details/']);
  }
  

}
