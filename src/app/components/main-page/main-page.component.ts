/**
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 */

import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Response} from "@angular/http";
import {ActivatedRoute, Params} from "@angular/router";
import {FreeSoundResolverData, FreeSoundResolverResult} from "../../constants";
import {FreeSoundUtilsService} from "../../services/free-sound-utils.service";

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {

  public msgs               : any[] = [];
  public searchResult       : SearchResult = null;
  public sounds             : SoundInstance[];
  public pending            : boolean = false;
  public rowsPerPageOptions : number[];
  public pFirst             : number = 1;
  public searchParams       : FreeSoundSearchParams;

  public constructor(
    private route            : ActivatedRoute,
    private freeSoundUtils   : FreeSoundUtilsService,
    private cdr              : ChangeDetectorRef
  ){}

  public ngOnInit(): void
  {
    this.rowsPerPageOptions = this.freeSoundUtils.getRowsPerPageOptions();

    this.route.params.subscribe( ( params : Params ) => { this.applySearchParams( params ) }  );
    this.route.data.subscribe( ( data : FreeSoundResolverData )  => { this.startLoading( data.loadingInfo ) } );
  }

  private applySearchParams( params : Params ) : void
  {
    this.searchParams = this.freeSoundUtils.mergeWithDefault( params );
  }

  private startLoading( resolverResult : FreeSoundResolverResult ) : void
  {
    if ( ! resolverResult )
    {
      return;
    }

    this.searchResult = null;
    this.pending      = true;

    resolverResult.data.subscribe( ( result : SearchResult ) => { this.onLoaded( result ) },
                                   ( error  : Response )     => { this.onError( error ) } );
  }

  private onLoaded( result : SearchResult ) : void
  {
    this.searchResult = result;
    this.sounds  = result.results;
    this.pFirst  = Math.min( this.searchParams.page * this.searchParams.pageSize, result.count ) - 1;
    this.pending = false;
  }

  private onError( error : Response ) : void
  {
    this.pending = false;
    this.showErrorMessage( error.json().detail );
  }

  private showErrorMessage( message : string ) : void
  {
    this.msgs = [ {severity:'error', summary:'Error', detail: message} ];
  }

  private onQueryChanged( params : FreeSoundSearchParams ) : void
  {
    params.page = 1;

    this.freeSoundUtils.navigate( params );
  }

  private onSortChanged( params : FreeSoundSearchParams ) : void
  {
    params.page = 1;

    this.freeSoundUtils.navigate( params );
  }

  private onTagClick( tag : string ) : void
  {
    this.searchParams.query = tag;
    this.searchParams.page  = 1;

    this.freeSoundUtils.navigate( this.searchParams );
    this.cdr.detectChanges();
  }

  private paginate( event : PaginatorEvent ) : void
  {
    this.searchParams.page     = event.page + 1;
    this.searchParams.pageSize = event.rows;

    this.freeSoundUtils.navigate( this.searchParams );
  }


}
