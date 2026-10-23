import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PedidoService } from './pedido.service';

@Component({
  selector: 'app-pedido-crear',
  imports: [FormsModule],
  template: `
    <h2>Crear pedido</h2>
    <form (ngSubmit)="enviar()">
      <label>Cliente <input name="cliente" [(ngModel)]="cliente" required /></label>
      <label>Producto <input name="producto" [(ngModel)]="producto" required /></label>
      <label>Cantidad <input name="cantidad" type="number" min="1" [(ngModel)]="cantidad" required /></label>
      <button type="submit" [disabled]="enviando()">Enviar</button>
    </form>
    @if (mensaje()) { <p class="ok">{{ mensaje() }}</p> }
    @if (error()) { <p class="error">{{ error() }}</p> }
  `,
})
export class PedidoCrear {
  private readonly service = inject(PedidoService);

  cliente = '';
  producto = '';
  cantidad = 1;

  readonly enviando = signal(false);
  readonly mensaje = signal('');
  readonly error = signal('');

  enviar(): void {
    this.enviando.set(true);
    this.mensaje.set('');
    this.error.set('');
    this.service
      .crear({ cliente: this.cliente, producto: this.producto, cantidad: this.cantidad })
      .subscribe({
        next: (r) => {
          this.mensaje.set(`Pedido ${r.pedidoId} creado. La notificacion se envia en segundo plano.`);
          this.enviando.set(false);
        },
        error: (e) => {
          this.error.set(e.status === 400 ? 'Datos invalidos' : 'No se pudo crear el pedido');
          this.enviando.set(false);
        },
      });
  }
}
