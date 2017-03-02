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
    let hours : number = Math.floor(seconds / 3600);
    seconds -= hours*3600;
    let minutes : number = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    let milliseconds : number = Math.round( ( seconds - Math.floor( seconds ) ) * 1000 );

    seconds = Math.floor( seconds );

    let hoursStr        : string = hours.toString();
    let minutesStr      : string = minutes.toString();
    let secondsStr      : string = seconds.toString();
    let millisecondsStr : string = milliseconds.toString();

    if (hours   < 10) {hoursStr  = "0"+hoursStr;}
    if (minutes < 10) {minutesStr = "0"+minutesStr;}
    if (seconds < 10) {secondsStr = "0"+secondsStr;}
    if ( milliseconds < 10 ) { millisecondsStr = "00" + millisecondsStr };
    if ( milliseconds < 100 ) { millisecondsStr = "0" + millisecondsStr };

    return minutesStr + ':' + secondsStr + ':' + millisecondsStr;
  }

}
