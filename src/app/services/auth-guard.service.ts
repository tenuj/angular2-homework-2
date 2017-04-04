/**
 * This code has been written by Denis Shavenzov
 * If you have any questions you can contact me by email shavenzov@gmail.com
 */

import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {FreeSoundService} from "./free-sound.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  public constructor(
    private freeSoundService : FreeSoundService
  )
  { }

  public canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) : boolean
  {
    if ( this.freeSoundService.isAuth )
    {
      return true;
    }

    this.freeSoundService.redirectToOAuthPage( state.url );

    return false;
  }

}
