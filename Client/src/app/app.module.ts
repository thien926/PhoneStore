import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './View/login/login.component';
import { RegisterComponent } from './View/register/register.component';

// Thiện
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopComponent } from './View/shop/shop.component';
import { HomeComponent } from './View/home/home.component';
import { ProductComponent } from './View/product/product.component';
import { UserComponent } from './View/user/user.component';
import { CartComponent } from './View/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    HomeComponent,
    ProductComponent,
    UserComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
