import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskname'
})
export class TasknamePipe implements PipeTransform {

  transform(value: string): string {
    return  value.split('/').pop();
  }

}
