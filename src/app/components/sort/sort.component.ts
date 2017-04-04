/**
 *
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 *
 *
 * */

import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.less']
})
export class SortComponent implements OnInit{

  @Input()
  public sortFields : SortButtonParam[];

  @Input()
  public selectedField : FreeSoundSort;

  @Output()
  public sortChanged : EventEmitter<FreeSoundSort> = new EventEmitter<FreeSoundSort>();

  private prevSortField     : SortButtonParam;
  private prevSelectedField : FreeSoundSort;

  private calculatePrevSortField() : void
  {
    this.prevSelectedField = this.selectedField;

    for( let sortField of this.sortFields )
    {
      if ( ( sortField.ascSort == this.selectedField ) || ( sortField.descSort == this.selectedField ) )
      {
        this.prevSortField = sortField;
        return;
      }
    }
  }

  public ngOnInit() : void
  {
    this.calculatePrevSortField();
  }

  public sortButtonClick( sortField : SortButtonParam, selectedField : FreeSoundSort ) : void
  {
    //Изменился параметр сортировки
    if ( sortField.descSort && ( this.prevSortField != sortField ) )
    {
      //Определяем порядок сортировки для нового параметра
      selectedField = ( this.prevSortField.descSort == this.prevSelectedField ) ? sortField.descSort : sortField.ascSort;
    }

    if ( this.selectedField != selectedField )
    {
      this.selectedField = selectedField;

      this.sortChanged.emit( selectedField );

      if ( sortField.descSort )
      {
        this.prevSortField     = sortField;
        this.prevSelectedField = selectedField;
      }
    }
  }

}
