import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantsComponent } from './merchants/merchants.component';
import { MerchantsRoutingModule } from './merchants-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { HttpClientModule } from '@angular/common/http';
import { MerchantDetailsComponent } from './merchant-details/merchant-details.component';


@NgModule({
  declarations: [
    MerchantsComponent,
    MerchantDetailsComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    MerchantsRoutingModule,
    CommonModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    HttpClientModule
  ]
})
export class MerchantsModule { }
