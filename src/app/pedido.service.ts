import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface PedidoRequest {
  cliente: string;
  producto: string;
  cantidad: number;
}

export interface Pedido extends PedidoRequest {
  id: number;
  creadoEn: string;
}

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:8081/api/pedidos';

  crear(p: PedidoRequest): Observable<{ pedidoId: number }> {
    return this.http.post<{ pedidoId: number }>(this.url, p);
  }

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.url);
  }
}
