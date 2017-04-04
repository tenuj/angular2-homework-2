/**
 * This code has been written by Denis Shavenzov
 * If you have any questions you can contact me by email shavenzov@gmail.com
 */

import { Injectable, Inject } from '@angular/core';
import { Router, UrlTree, Params} from "@angular/router";
import {AudioService} from "./audio.service";


@Injectable()
export class FreeSoundUtilsService {

  public constructor(
    private router      : Router,

    @Inject( 'FSApiSettings' )
    private apiSettings : FreeSoundAPIEnvironment,
    private audioService: AudioService
  ) {
  }

  private calculateUrlTree( params : FreeSoundSearchParams ) : UrlTree
  {
    let commands : any[] = [ 'search' ];

    if ( params.query )
    {
      commands.push( params.query );

      if ( params.sort )
      {
        commands.push(  params.sort );

        if ( params.page )
        {
          commands.push(  params.page );

          if ( params.pageSize )
          {
            commands.push( params.pageSize );
          }
        }
      }
    }

    return this.router.createUrlTree( commands );
  }

  /**
   * Список параметров текущего роута объединенного с параметрами по умолчанию
   * @returns {any}
   */
  public mergeWithDefault( routeParams : Params ) : FreeSoundSearchParams
  {
    let defaultParams : FreeSoundSearchParams = this.apiSettings.defaultSearchParams; //Получаем параметры по умолчанию

    //Миксуем с параметрами текущего роута
    return Object.assign( defaultParams, routeParams );
  }

  /**
   * Осуществляет навигацию к указанному роуту используя FreeSoundSearchParams
   * @param params
   */
  public navigate( params : FreeSoundSearchParams ) : Promise<boolean>
  {
    window.scrollTo(0,0);
    this.audioService.pause();

    return this.router.navigateByUrl( this.calculateUrlTree( params ) );
  }

  /**
   * Возвращает массив доступных значений pageSize для UI
   * @returns {number[]}
   */
  public getRowsPerPageOptions() : number[]
  {
    let options : number[] = [];

    let minPageSize : number = this.apiSettings.defaultPageSize;
    let maxPageSize : number = this.apiSettings.maximumPageSize;
    let incPageSize : number = this.apiSettings.defaultPageSize;

    let numOptions : number = Math.floor( maxPageSize / incPageSize );

    for( let nextPageSize : number = minPageSize; nextPageSize <= maxPageSize; nextPageSize += incPageSize )
    {
      options.push( nextPageSize );
    }

    return options;
  }

  /**
   * Инициирует загрузку  файла
   * @param url - ресурс который необходимо загрузить
   */
  public doDownload( url : string ) : void
  {
    window.open( url, "_blank" );
  }

}
