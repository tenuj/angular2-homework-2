/**
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FreeSoundService} from "../../services/free-sound.service";

@Component({
  selector: 'app-auth-error',
  templateUrl: './auth-error.component.html',
  styleUrls: ['./auth-error.component.less']
})
export class AuthErrorComponent implements OnInit {

  public error : string;

  public constructor(
    private route            : ActivatedRoute,
    private freeSoundService : FreeSoundService
  ) { }

  public ngOnInit() : void
  {
    this.route.queryParams.subscribe( ( params : any ) => { this.onParamsLoaded( params ) } );
  }

  private onParamsLoaded( params : any ) : void
  {
    if ( params.error )
    {
      this.error = params.error;
    }
  }

  private onTryAgainButtonClick() : void
  {
    this.freeSoundService.redirectToOAuthPage( this.route.snapshot.queryParams[ 'state' ] );
  }

}
