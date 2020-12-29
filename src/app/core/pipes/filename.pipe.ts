import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extension'
})
export class FilenamePipe implements PipeTransform {

  transform(value: string): string {
    const name = value.split('/').pop();

    return name.split('.').pop();
  }

}
