/**
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 */

import {Routes} from "@angular/router";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {mainPageMatcher} from "./route.matcher";
import {FreeSoundResultResolverService} from "./services/free-sound-result-resolver.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {AuthComponent} from "./components/auth/auth.component";
import {AuthErrorComponent} from "./components/auth-error/auth-error.component";

export const routes : Routes = [
  {
    path      : 'auth',
    component : AuthComponent,
  },
  {
    path : 'auth-error',
    component : AuthErrorComponent
  },
  {
    path     : 'search',
    canActivate : [ AuthGuardService ],
    children : [
      {
       matcher     : mainPageMatcher,
       component   : MainPageComponent,
       resolve     : { loadingInfo : FreeSoundResultResolverService }
      }
    ]
  },
  {
    path       : '',
    redirectTo : 'search',
    pathMatch  : 'full'
  },
  {
    path      : '**',
    component : NotFoundComponent
  }
]
