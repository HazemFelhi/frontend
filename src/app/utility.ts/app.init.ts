import { APP_INITIALIZER } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Injector } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';

export function initializeKeycloak(
  keycloak: KeycloakService,
  injector: Injector,
  router: Router
): () => Promise<boolean> {
  return () =>
    keycloak
      .init({
        config: {
          url: 'http://localhost:8084',
          realm: 'infrastructure',
          clientId: 'angular-client',

        },
        initOptions: {
          onLoad: 'check-sso',
          checkLoginIframeInterval: 25,
        },
        loadUserProfileAtStartUp: true,
      })
      .then(() => {
        return keycloak.loadUserProfile().then((data) => {
          const isAdmin = keycloak.getUserRoles().includes('admin');
          console.log(data);
          const userId = <string>data.id;
          sessionStorage.setItem("userId", userId);
          /*  const hasRedirectedToNewRoute = sessionStorage.getItem('hasRedirectedToNewRoute');
    
              if (!isAdmin || !hasRedirectedToNewRoute) {
                // Set the flag in session storage
                sessionStorage.setItem('hasRedirectedToNewRoute', 'true');
                router.navigateByUrl('/entreprise/new');
              }
    */
          return true;
        });
      })
      .catch((error) => {
        console.error('Keycloak initialization error:', error);
        return false;
      });
}

/* /*import { KeycloakService } from 'keycloak-angular';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';

export function initializeKeycloak(keycloak: KeycloakService, injector: Injector, router: Router): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8084',
        realm: 'infrastructure',
        clientId: 'angular-client',


        
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframeInterval: 25,

      },
      loadUserProfileAtStartUp: true,
    });
} 


import { APP_INITIALIZER } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Injector } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';

export function initializeKeycloak(keycloak: KeycloakService, injector: Injector, router: Router): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8084',
        realm: 'infrastructure',
        clientId: 'angular-client',
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframeInterval: 25,
      },
      loadUserProfileAtStartUp: true,
      
    })
    .then(() => {
      return keycloak.loadUserProfile().then(() => {
        const isAdmin = keycloak.getUserRoles().includes('admin');

        if (isAdmin) {
          router.events
            .pipe(
              filter((event) => event instanceof NavigationEnd),
              take(1)
            )
            .subscribe(() => {
              router.navigateByUrl('/entreprise/new');
            });
        }

        return true;
      });
    })
    .catch((error) => {
      console.error('Keycloak initialization error:', error);
      return false;
    });


}

export const keycloakInitializer = (
  keycloak: KeycloakService,
  injector: Injector,
  router: Router
) => {
  return initializeKeycloak(keycloak, injector, router);
}; */