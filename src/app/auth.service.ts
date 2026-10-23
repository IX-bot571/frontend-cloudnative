import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'cloudnative',
    clientId: 'angular-app',
  });

  /** Redirige al login de Keycloak si no hay sesion (PKCE S256). */
  async init(): Promise<void> {
    await this.keycloak.init({ onLoad: 'login-required', pkceMethod: 'S256' });
  }

  /** Devuelve un JWT vigente (lo renueva si le quedan menos de 30 s). */
  async getToken(): Promise<string | undefined> {
    await this.keycloak.updateToken(30);
    return this.keycloak.token;
  }

  get username(): string {
    return (this.keycloak.tokenParsed?.['preferred_username'] as string) ?? '';
  }

  logout(): void {
    this.keycloak.logout({ redirectUri: window.location.origin });
  }
}
