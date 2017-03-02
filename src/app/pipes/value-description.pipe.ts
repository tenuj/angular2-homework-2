import { Pipe, PipeTransform } from '@angular/core';

export type ValueDescription = {
  type      : string;
  value     : string | number;
  formater? : PipeTransform;
}

@Pipe({
  name: 'valueDescription'
})
export class ValueDescriptionPipe implements PipeTransform {

  public transform( description : ValueDescription ) : string
  {
    return description.formater ? description.formater.transform( description.value ) : description.value;
  }

}
