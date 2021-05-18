import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';
import { ShopComponent } from '../../shop/shop.component';
import { HomeComponent } from '../../home/home.component';
import { ProductComponent } from '../../product/product.component';
import { UserComponent } from '../../user/user.component';
import { CartComponent } from '../../cart/cart.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailbillComponent } from '../../detailbill/detailbill.component';

@NgModule({
  declarations: [
    DefaultComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    HomeComponent,
    ProductComponent,
    UserComponent,
    CartComponent,
    DetailbillComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class DefaultModule { }
