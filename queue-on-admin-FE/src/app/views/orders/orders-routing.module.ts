import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Orders',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: OrdersComponent,
        data: {
          title: 'Orders-List',
        },
      },
      {
        path: ':orderId/details',
        component: OrderDetailsComponent,
        data: {
          title: 'Order-Details',
        },
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class OrdersRoutingModule {}