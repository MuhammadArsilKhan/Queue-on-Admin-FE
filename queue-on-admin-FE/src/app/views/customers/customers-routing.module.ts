import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component'; 

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Customers',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: CustomersComponent,
        data: {
          title: 'Customers-List',
        },
      },
      {
        path: ':customerId/details',
        component: CustomerDetailsComponent,
        data: {
          title: 'Customer-Details',
        },
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CustomersRoutingModule {}