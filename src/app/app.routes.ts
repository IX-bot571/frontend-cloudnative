import { Routes } from '@angular/router';
import { PedidoCrear } from './pedido-crear';
import { PedidoLista } from './pedido-lista';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pedidos' },
  { path: 'pedidos', component: PedidoLista },
  { path: 'pedidos/nuevo', component: PedidoCrear },
];
