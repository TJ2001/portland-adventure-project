import {bootstrap}    from 'angular2/platform/browser';
import {provide} from "angular2/core";
import {AppComponent} from './app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, AuthConfig, JwtHelper} from "angular2-jwt";
import {Auth} from "./auth.service";
import {CurrentQuestService} from "./current-quest.service";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    CurrentQuestService,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
        },
        deps: [Http]
    }),
    Auth,
    JwtHelper
]);
