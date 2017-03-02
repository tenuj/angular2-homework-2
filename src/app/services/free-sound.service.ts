import {FreeSoundAPIEnvironment} from "../common/types";
import {Injectable, Inject} from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class FreeSoundService {

  public constructor(
    private http : Http,
    /**
     * Инжект настроек API
     */
    @Inject( 'FSApiSettings' )
    private apiSettings : FreeSoundAPIEnvironment //На этапе Dependency Injection, типы описанные в types/index.d.ts не доступны :( поэтому описание типа FreeSoundAPIEnvironment вынесено отдельно

  ){}

  /**
   * Этот Subject существует во время выполнения задачи
   */
  private subject : Subject<LoadingInfo>;

  /**
   * Текущая информация о ходе загрузки
   */
  private loadingInfo : LoadingInfo;

  /**
   * Текущий результат поиска ( расщиренная информация о каждом SoundInstance обновляется по мере загрузки данных )
   */
  private searchResult  : SearchResult;

  /**
   * Строка последнего запроса для предотвращения одинаковых запросов
   */
  private searchStr     : string;

  /**
   * Идет процесс поиска
   * @returns {boolean}
   */
  public get pending() : boolean
  {
    return this.subject != null;
  }

  /**
   * Запускает процесс поиска
   * @param searchStr строка запроса
   * @returns {Observable<LoadingInfo>} Observable информация о ходе загрузки
   */
  public search( searchStr : string ) : Observable<LoadingInfo>
  {
    if ( this.pending )
    {
      if ( searchStr === this.searchStr )
      {
        return this.subject;
      }

      this.subject.unsubscribe();
      this.clear();
    }

    this.searchStr = searchStr;

    this.subject = new Subject();

    //Наблюдаем за окончанием процеса поиска,что-бы освободить ресурсы
    this.subject.subscribe( null, ( error ) => {}, () => { this.clear() } ) ;

    this.http.get( this.makeSearchStringURL( searchStr ), this.requestOptionsArgs ).switchMap( ( response ) => { return this.onResultLoaded( response ) } ).map( ( soundInstance ) => { return this.onSoundInstanceLoaded( soundInstance ) } ).subscribe( this.subject );

    return this.subject;
  }

  /**
   * После загрузки результата, запрашиваем расширенную информацию о каждом SoundInstance
   * @param response
   * @returns {any}
   */
  private onResultLoaded( response : Response ) : Observable<SoundInstance>
  {
    this.searchResult = response.json();

    /*
     Инициализируем информацию о ходе загрузки
     */
    this.loadingInfo = {
      loaded : 0,
      total  : this.searchResult.results.length,
      result : this.searchResult
    };


    this.subject.next( this.loadingInfo );

    /*
    Формируем массив Observable для каждого SoundInstance
     */
    let multi : ( Observable<SoundInstance> | number )[] = [];

    for ( let result of this.searchResult.results )
    {
      //delay( 50 ) Перед каждым выполнением запроса будет задержка 50 ms, что-бы не забанили
      multi.push( this.http.get( this.makeGetSoundStringURL( result.id ), this.requestOptionsArgs ).delay( 50 ).map( response => response.json() ).catch( response => Observable.of( result ) ) );
    }

    /*
    Маленький хак :(
    Observable.merge не работает с масивом Observable[], а ждет список
     */
    multi.push( 4 ); //Ограничиваем максимальное количество запросов выполняемых за один раз, что-бы не забанили

    return Observable.merge.apply( this, multi );
  }

  /**
   * Выполняется при загрузке очередного SoundInstance
   * @param soundInstance
   * @returns {LoadingInfo}
   */
  private onSoundInstanceLoaded( soundInstance : SoundInstance ) : LoadingInfo
  {
    console.log( 'on sound instance loaded' );

    /*
    Заменяем SoundInstance на SoundInstance c расширенной информацией
     */
    let index : number = this.searchResult.results.map( value => value.id ).indexOf( soundInstance.id );

    this.searchResult.results[ index ] = soundInstance;

    //Обновляем информацию о ходе загрузки
    this.loadingInfo.loaded ++;

    return this.loadingInfo;
  }

  /**
   * Очистка параметров после загрузки
   */
  private clear() : void
  {
    this.subject = null;
    this.searchResult = null;
    this.loadingInfo = null;
    this.searchStr = null;
  }

  /**
   * Формирует api url поиска
   * @param searchString
   * @returns {string}
   */
  private makeSearchStringURL( searchString : string ) : string
  {
    return `${this.apiSettings.baseURL}search/text/?query=${searchString}`;
  }

  /**
   * Формирует api url запроса расширенной информации о SoundInstance
   * @param soundId
   * @returns {string}
   */
  private makeGetSoundStringURL( soundId : string ) : string
  {
    return `${this.apiSettings.baseURL}sounds/${soundId}/`;
  }

  /*
  Формирование headers запроса где указываются параметры аутентификации
   */

  private _requestOptionsArgs : RequestOptionsArgs;

  private get requestOptionsArgs() : RequestOptionsArgs
  {
    if ( ! this._requestOptionsArgs )
    {
      this._requestOptionsArgs = { headers : new Headers( { 'Authorization' : `Token ${this.apiSettings.key}` } ) };
    }

    return this._requestOptionsArgs;
  }

}
