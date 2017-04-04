/**
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 */

import {Component,OnInit} from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {Response} from "@angular/http";
import {FreeSoundService} from "../../services/free-sound.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {

  public constructor(
    private route            : ActivatedRoute,
    private router           : Router,
    private freeSoundService : FreeSoundService
  ) { }

  public ngOnInit() : void
  {
    this.route.queryParams.subscribe( ( params : AuthParams ) => { this.onParamsLoaded( params ) } );
  }

  private onParamsLoaded( params : AuthParams ) : void
  {
    if ( params.code )
    {
      this.freeSoundService.auth( params.code ).subscribe( ( token : AuthToken ) => { this.onAuth( token, params ) },
                                                           ( error : Response ) => { this.onError( error, params ) }
                                                         );

      return;
    }

    if ( params.error )
    {
      this.navigateToError( params.error, this.getReturnState( params ) );
      return;
    }

    this.navigateToError( 'unknown error', this.getReturnState( params ) );
  }

  private getReturnState( params : AuthParams ) : string
  {
    return params.state ? params.state : '';
  }

  private onAuth( token : AuthToken, params : AuthParams ) : void
  {
    this.router.navigate( [ this.getReturnState( params ) ] );
  }

  private onError( error : Response, params : AuthParams ) : void
  {
    this.navigateToError( error.json().error, this.getReturnState( params ) );
  }

  private navigateToError( error : string, returnState : string ) : void
  {
    let queryParams : any = { error : error, state : returnState };

    this.router.navigate( [ 'auth-error' ], { queryParams : queryParams } );
  }

}
