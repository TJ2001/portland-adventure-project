import {bootstrap}    from 'angular2/platform/browser';
import {provide} from "angular2/core";
import {AppComponent} from './app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, AuthConfig, JwtHelper} from "angular2-jwt";
import {Auth} from "./auth.service";
import {CurrentQuestService} from "./current-quest.service";
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES,ANGULAR2_GOOGLE_MAPS_PROVIDERS, LazyMapsAPILoaderConfig} from 'angular2-google-maps/core';

bootstrap(AppComponent, [
    ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    CurrentQuestService,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
        },
        deps: [Http]
    }),
    provide(LazyMapsAPILoaderConfig, {useFactory: () => {
    let config = new LazyMapsAPILoaderConfig();
    config.apiKey = 'AIzaSyAO_tz42tA_D6kG-K3vtGAl4Q_H0s2aYvk';
    return config;
  }}),
    Auth,
    JwtHelper
]);
