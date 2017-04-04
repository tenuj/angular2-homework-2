/**
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 */

import {UrlSegment, UrlSegmentGroup, Route} from "@angular/router";
import {UrlMatchResult} from "@angular/router/src/config";
import {FreeSoundSortTypes} from "./constants";
import {environment} from "../environments/environment";

/**
 * :query/:sort/:page/:pageSize
 * @param segments
 * @param segmentGroup
 * @param route
 * @returns UrlMatchResult
 */
export function mainPageMatcher( segments : UrlSegment[], segmentGroup : UrlSegmentGroup, route : Route ) : UrlMatchResult
{
  //Max count of params is 4
  if ( segments.length > 4 )
  {
    return null;
  }

  let consumed  : UrlSegment[]                       = ( segments.length == 0 ) ? [ new UrlSegment( "", null ) ] : segments;
  let posParams : { [ name : string ] : UrlSegment } = {};

  //Query param
  if ( segments.length > 0 )
  {
    posParams[ 'query' ] = segments[ 0 ];
  }

  //Checking sort param
  if ( segments.length > 1 )
  {
    if ( FreeSoundSortTypes.indexOf( segments[ 1 ].path ) == -1 )
    {
      return null;
    }

    posParams[ 'sort' ] = segments[ 1 ];
  }

  //Checking page param
  if ( segments.length > 2 )
  {
    //page должен быть целым положительным числом
    if ( ! new RegExp('^\\d+$').test( segments[ 2 ].path ) )
    {
      return null;
    }

    posParams[ 'page' ] = segments[ 2 ];
  }

  //Checking pageSize param
  if ( segments.length > 3 )
  {
    let pageSize : number  = parseInt( segments[ 3 ].path );
    let valid    : boolean = ! isNaN( pageSize ) &&
                               ( pageSize >= environment.freeSoundAPIEnvironment.defaultPageSize ) &&
                               ( pageSize <= environment.freeSoundAPIEnvironment.maximumPageSize );

    if ( ! valid )
    {
      return null;
    }

    posParams[ 'pageSize' ] = segments[ 3 ];
  }

  return { consumed : consumed, posParams : posParams };
}
