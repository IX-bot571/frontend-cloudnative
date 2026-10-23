import { Component, inject, signal } from '@angular/core';
import { Pedido, PedidoService } from './pedido.service';

@Component({
  selector: 'app-pedido-lista',
  template: `
    <h2>Pedidos</h2>
    <button (click)="cargar()">Actualizar</button>
    @if (error()) { <p class="error">{{ error() }}</p> }
    <table>
      <thead><tr><th>Id</th><th>Cliente</th><th>Producto</th><th>Cantidad</th><th>Creado</th></tr></thead>
      <tbody>
        @for (p of pedidos(); track p.id) {
          <tr>
            <td>{{ p.id }}</td><td>{{ p.cliente }}</td><td>{{ p.producto }}</td>
            <td>{{ p.cantidad }}</td><td>{{ p.creadoEn }}</td>
          </tr>
        } @empty {
          <tr><td colspan="5">Sin pedidos</td></tr>
        }
      </tbody>
    </table>
  `,
})
export class PedidoLista {
  private readonly service = inject(PedidoService);

  readonly pedidos = signal<Pedido[]>([]);
  readonly error = signal('');

  constructor() {
    this.cargar();
  }

  cargar(): void {
    this.error.set('');
    this.service.listar().subscribe({
      next: (p) => this.pedidos.set(p),
      error: () => this.error.set('No se pudo cargar el listado'),
    });
  }
}
