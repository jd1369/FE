import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapToDynamicValue'
})
export class MapToDynamicValuePipe implements PipeTransform {
  transform(fields: any, columnName: string): any {
    // Check if fields exists and the columnName is a valid key
    if (fields && fields[columnName]) {
      return fields[columnName]; // Return the value of the column (e.g., "new" or "old")
    }
    return ''; // Return an empty string if not found
  }
}
