/**
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 */

import {Injectable, Inject} from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers, URLSearchParams } from '@angular/http';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class FreeSoundService {

  private static readonly fields : string[] = [
    'id', 'name', 'tags', 'description', 'created', 'license', 'type', 'channels', 'filesize', 'bitrate', 'bitdepth', 'duration', 'samplerate', 'username', 'download', 'previews', 'images', 'num_downloads', 'avg_rating', 'num_ratings', 'rate'
  ];

  /**
   * Authorization data
   */
  private authToken : AuthToken;

  public constructor(
    private http      : Http,
    /**
     * Инжект настроек API
     */
    @Inject( 'FSApiSettings' )
    private apiSettings : FreeSoundAPIEnvironment

  ){}

  /**
   * Redirects to authorization page
   */
  public redirectToOAuthPage( returnState? : string ) : void
  {
    document.location.href = this.getOAUTHURL( returnState );
  }

  /**
   * Running the authorization
   * @param code
   */
  public auth( code : string ) : Observable<AuthToken>
  {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let params  = new URLSearchParams();
        params.set( 'client_id', this.apiSettings.clientId );
        params.set( 'client_secret', this.apiSettings.key );
        params.set( 'grant_type', 'authorization_code' );
        params.set( 'code', code );

    return this.http.post( this.authURL, params.toString(), { headers : headers } ).map( ( response : Response ) => { return this.onAuth( response ) } );
  }

  private onAuth( response : Response ) : AuthToken
  {
    this.authToken = response.json();
    this.authToken.expires_in = new Date().getTime() + this.authToken.expires_in - 5000;

    return this.authToken;
  }

  /**
   * Checking is the user authorized/token expired or not
   * @returns {boolean}
   */
  public get isAuth() : boolean
  {
    return this.authToken && ( this.authToken.expires_in > new Date().getTime() );
  }

  /**
   * Running search
   * @param searchParams
   * @returns {Observable<SearchResult>} Observable loading info
   */
  public search( searchParams : FreeSoundSearchParams ) : Observable<SearchResult>
  {
    return this.http.get( this.makeSearchStringURL( searchParams ), this.requestOptionsArgs ).map( ( response : Response ) => { return response.json() } );
  }

  /**
   * Creates api url for search
   * @param searchString
   * @returns {string}
   */
  private makeSearchStringURL( searchParams : FreeSoundSearchParams ) : string
  {
    let params  = new URLSearchParams();
        params.set( 'query', searchParams.query );
        params.set( 'fields', FreeSoundService.fields.join() );

    if ( searchParams.page )
    {
      params.set( 'page', searchParams.page.toString() );
    }

    if ( searchParams.pageSize )
    {
      params.set( 'page_size', searchParams.pageSize.toString() );
    }

    if ( searchParams.sort )
    {
      params.set( 'sort', searchParams.sort );
    }

    return this.apiSettings.baseURL + 'search/text/?' + params.toString();
  }

  /*
  Creates request header with authorization params
   */
  public get requestOptionsArgs() : RequestOptionsArgs
  {
    return { headers : new Headers( { 'Authorization' : `Bearer ${this.authToken.access_token}` } ) };
  }

  private getOAUTHURL( returnState : string ) : string
  {
    let url : string = `${this.apiSettings.baseURL}oauth2/authorize/?client_id=${this.apiSettings.clientId}&response_type=code`;

    if ( returnState )
    {
      url += `&state=${returnState}`;
    }

    return url;
  }

  private get authURL() : string
  {
    return `${this.apiSettings.baseURL}oauth2/access_token/`;
  }

}
