import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from "../../../services/order-service/order.service";
import { FormGroup, FormBuilder } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders: any = [];
  loadingFlag : boolean = true;

  pageNumber: number = 0;
  limit: number = 10;
  totalRecords: number = 0;

  currentPage = 1;
  itemsPerPage = 2;

  searchForm!:FormGroup;

  constructor(private orderService: OrderService ,public router: Router, private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this._fb.group({
      searchTerm: ['']
    });
    this.getOrdersList(this.pageNumber)
  }

  getOrdersList(page:number) {
    this.loadingFlag = true;
    this.pageNumber=page;
    this.currentPage = page;
    this.orderService.getOrders(this.pageNumber, this.limit, this.searchForm.value.searchTerm)
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
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }

  get displayedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.orders.slice(startIndex, endIndex);
  }

  showDetails(identifier:string) {
    this.router.navigate(['/orders/' + identifier + '/details/']);
  }

  onSearch(model: any) {
    // Implement your search logic here
    this.getOrdersList(this.pageNumber)
  }
}
