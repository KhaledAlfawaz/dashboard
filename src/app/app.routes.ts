import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Products } from './components/products/products';
import { Orders } from './components/orders/orders';
import { Team } from './components/team/team';
import { AddMember } from './components/add-member/add-member';
export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'products',  component: Products },
  { path: 'orders',  component: Orders },
  { path: 'team',  component: Team },
  { path: 'team/add',  component: AddMember },

];
