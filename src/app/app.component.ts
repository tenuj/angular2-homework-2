import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {FreeSoundService} from "./services/free-sound.service";
import {Response} from "@angular/http";

import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  @ViewChild( 'searchInput' )
  public searchInput : ElementRef;

  public msgs : any[] = [];
  public loadingInfo : LoadingInfo = null;
  public pending     : boolean = false;
  public sounds      : SoundInstance[];

  private inputEvents : Subject<KeyboardEvent> = new Subject<KeyboardEvent>();

  public constructor(
    private freeSoundService : FreeSoundService
  ){

  }

  public onInput( $event : KeyboardEvent )
  {
    this.inputEvents.next( $event );
  }

  public ngOnInit(): void
  {
    this.initInputObserver();
  }

  private initInputObserver() : void
  {
    this.pending = false;

    this.inputEvents.debounceTime( 500 ).map( ( event : KeyboardEvent ) => ( event.target as HTMLInputElement ).value.trim() )
                                        .filter( ( text : string ) => { return text && ( text.length > 2 ) } )
                                        .switchMap( ( text : string ) => { return this.startLoading( text ) } )
                                        .subscribe( ( loadingInfo : LoadingInfo ) => { this.onNextResourceLoaded( loadingInfo ) },
                                                    ( error : Response ) => { this.onError( error ) }/*,
                                                    () => { console.log( 'complete' ); }*/ );
  }

  private startLoading( text : string ) : Observable<LoadingInfo>
  {
    this.pending = true;
    this.loadingInfo = null;
    return this.freeSoundService.search( text )
  }

  private onNextResourceLoaded( loadingInfo : LoadingInfo ) : void
  {
    console.log( 'loadingInfo' );
    console.log( loadingInfo );

    this.pending = ( loadingInfo.loaded != loadingInfo.total );
    this.loadingInfo = loadingInfo;

    if ( ! this.pending )
    {
      this.sounds = loadingInfo.result.results;
    }
  }

  private onError( error : Response ) : void
  {
    console.log( 'error' );
    this.showErrorMessage( error.json().detail );
    this.initInputObserver(); //Если произошла ошибка необходимо заново создать Observable
  }

  private showErrorMessage( message : string ) : void
  {
    this.msgs = [ {severity:'error', summary:'Error', detail: message} ];
  }

  private onTagClick( tag : String ) : void
  {
    this.searchInput.nativeElement.value = tag;

    let keyboardEvent : KeyboardEvent = new KeyboardEvent( 'input', {bubbles: true} );

    this.searchInput.nativeElement.dispatchEvent( keyboardEvent );

    window.scrollTo(0,0);
  }


}
