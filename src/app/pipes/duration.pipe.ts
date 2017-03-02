import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  public transform( value : number ) : string
  {
    if ( ! value )
    {
      return 'N/A';
    }

    let seconds : number = value;
    let hourseconds : number = Math.floor(seconds / 3600);
    seconds -= hourseconds*3600;
    let minuteseconds : number = Math.floor(seconds / 60);
    seconds -= minuteseconds*60;
    let milliseconds : number = Math.round( ( seconds - Math.floor( seconds ) ) * 1000 );

    seconds = Math.floor( seconds );

    if (hourseconds   < 10) {hourseconds   = "0"+hourseconds;}
    if (minuteseconds < 10) {minuteseconds = "0"+minuteseconds;}
    if (seconds < 10) {seconds = "0"+seconds;}
    if ( milliseconds < 10 ) { milliseconds = "00" + milliseconds };
    if ( milliseconds < 100 ) { milliseconds = "0" + milliseconds };

    return minuteseconds + ':' + seconds + ':' + milliseconds;
  }

}
