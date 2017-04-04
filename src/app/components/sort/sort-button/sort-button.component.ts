/**
 *
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 *
 */

import {Input, Output, Component, EventEmitter} from '@angular/core';

@Component({
  selector: 'sort-button',
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.less']
})
export class SortButtonComponent {

 @Input()
 public sortField : SortButtonParam;

 @Input()
 public selected : FreeSoundSort;

 @Output()
 public onClick  : EventEmitter<FreeSoundSort> = new EventEmitter<FreeSoundSort>();

 public get isSelectedInSortField() : boolean
 {
   return ( this.selected == this.sortField.descSort ) || ( this.selected == this.sortField.ascSort );
 }

 private clickHandler() : void
 {
   if ( this.isSelectedInSortField && this.sortField.descSort )
   {
     this.selected = ( this.selected == this.sortField.descSort ) ? this.sortField.ascSort : this.sortField.descSort;
     this.onClick.emit( this.selected );
     return;
   }

   this.onClick.emit( this.sortField.ascSort );
 }

}
