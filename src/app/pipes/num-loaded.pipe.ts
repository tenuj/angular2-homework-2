/**
 *
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 *
 *
 * */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numLoaded'
})
export class NumLoadedPipe implements PipeTransform {

  public transform( result : SearchResult ) : string
  {
    let str : string = '';

    if ( result )
    {
      let count : number = result.count;

      if ( count == 0 )
      {
        return 'Nothing found';
      }

      str = 'Found ' + count.toString() + ' sound';

      if ( count > 1 )
      {
        str += 's';
      }
    }

    return str;
  }

}
