/**
 *
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 *
 *
 * */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  public transform( bytes : number ) : string
  {
    if ( ! bytes )
    {
      return 'N/A';
    }

    if (bytes === 0) {
      return '0 Byte'
    }
    let k = 1024
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
    let i: number = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

}
