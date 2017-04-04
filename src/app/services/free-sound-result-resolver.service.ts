/**
 * This code has been written by Denis Shavenzov
 * If you have any questions you can contact me by email shavenzov@gmail.com
 */

import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {FreeSoundService} from "./free-sound.service";
import {FreeSoundResolverResult} from "../constants";

@Injectable()
export class FreeSoundResultResolverService implements Resolve<FreeSoundResolverResult> {

  public constructor(
    private freeSoundService : FreeSoundService
  ){}

  public resolve( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ): FreeSoundResolverResult
  {
    let params : FreeSoundSearchParams = <FreeSoundSearchParams> route.params;

    return params.query ? { data : this.freeSoundService.search( params ) } : null;
  }

}
