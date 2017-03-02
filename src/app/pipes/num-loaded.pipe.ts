import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numLoaded'
})
export class NumLoadedPipe implements PipeTransform {

  public transform( loadingInfo : LoadingInfo ) : string
  {
    let str : string = '';

    if ( loadingInfo && loadingInfo.result )
    {
      let count : number = loadingInfo.result.count;

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
