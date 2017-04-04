/**
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 */

import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/debounceTime";
import 'rxjs/add/observable/fromEvent';

import {sortFields} from '../../constants';

@Component({
  selector: 'search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.less']
})
export class SearchPanelComponent implements OnInit {

  /**
   * Задержка в мс перед searchParamsChanged
   * @type {number}
   */
  @Input()
  public delayTime : number = 500;

  /**
   * Минимальная длина текста запроса
   * @type {number}
   */
  @Input()
  public minQueryLength : number = 3;

  @Input()
  public searchResult : SearchResult;

  @Input()
  public pending : boolean = false;

  @Input()
  public searchParams: FreeSoundSearchParams;

  @Output()
  public queryChanged : EventEmitter<FreeSoundSearchParams> = new EventEmitter<FreeSoundSearchParams>();

  @Output()
  public sortChanged : EventEmitter<FreeSoundSearchParams> = new EventEmitter<FreeSoundSearchParams>();

  @ViewChild( 'searchInput' )
  public searchInput : ElementRef;

  public sortFields : SortButtonParam[] = sortFields.slice();

  public ngOnInit(): void
  {
    Observable.fromEvent( this.searchInput.nativeElement, 'input' )
              .debounceTime( this.delayTime )
              .map( ( event : KeyboardEvent ) => ( event.target as HTMLInputElement ).value.trim() )
              .filter( ( query : string ) => { return query && ( query.length >= this.minQueryLength ) } )
              .subscribe( ( query : string ) => { this.onFilterNext( query ) } );

  }

  private onFilterNext( query : string ) : void
  {
    if ( this.searchParams )
    {
      this.searchParams.query = query;
      this.queryChanged.emit( this.searchParams );
    }
  }

  private onSortChanged( sort : FreeSoundSort ) : void
  {
    if ( this.searchParams )
    {
      this.searchParams.sort = sort;
      this.sortChanged.emit( this.searchParams );
    }
  }

}
