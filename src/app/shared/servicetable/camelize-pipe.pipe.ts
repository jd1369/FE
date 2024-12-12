import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelize'
})
export class CamelizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    
    // Convert camelCase to a more human-readable format
    return value
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')  // Add space before uppercase letters
      .replace(/^./, (str) => str.toUpperCase());  // Capitalize first letter
  }
}
