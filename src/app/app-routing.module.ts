import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { OrdersComponent } from './orders/orders.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'orders', component: OrdersComponent},
  { path: 'feedback', component: FeedbackComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'purchase', component: PurchaseComponent},
  { path: 'admin/products', component: AdminProductsComponent},
  { path: 'admin/orders', component: AdminOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
