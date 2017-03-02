import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueDescription'
})
export class ValueDescriptionPipe implements PipeTransform {

  public transform( description : ValueDescription ) : string
  {
    return description.formater ? description.formater.transform( description.value ) : description.value;
  }

}
