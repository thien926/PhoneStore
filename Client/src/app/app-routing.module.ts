import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './View/cart/cart.component';
import { HomeComponent } from './View/home/home.component';
import { LoginComponent } from './View/login/login.component';
import { LoginAdminComponent } from './View/Manager/login-admin/login-admin.component';
import { ProductComponent } from './View/product/product.component';
import { RegisterComponent } from './View/register/register.component';
import { ShopComponent } from './View/shop/shop.component';
import { UserComponent } from './View/user/user.component';
import { DefaultComponent } from './View/_shared/default/default.component';
import { ManagerComponent } from './View/_shared/manager/manager.component';

const routes: Routes = [
  { path: '', component: DefaultComponent, 
    children: [
      { path : '', component : ShopComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'home', component: HomeComponent },
      { path: 'product', component: ProductComponent },
      { path: 'user', component: UserComponent },
      { path: 'cart', component: CartComponent },
    ]
  },
  { path: 'manager', component: ManagerComponent, 
    children: [
      { path : '', component : LoginAdminComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
