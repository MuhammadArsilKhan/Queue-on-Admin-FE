import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantsComponent } from './merchants/merchants.component';
import { MerchantDetailsComponent } from './merchant-details/merchant-details.component';

const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Merchants',
      },
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'list',
        },
        {
          path: 'list',
          component: MerchantsComponent,
          data: {
            title: 'Merchants-List',
          },
        },
        {
          path: ':merchantId/details', 
          component: MerchantDetailsComponent,
          data: {
            title: 'Merchants-Details',
          },
        },
      ]
    }
  ];
  
  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
    })
    export class MerchantsRoutingModule {}