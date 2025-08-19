import { Pipe, PipeTransform } from '@angular/core';
import { UtilitiesUiService } from '../../../services/utilities-ui.service';

@Pipe({
  name: 'columnImgColor',
  standalone: true,
})
export class ColumnImgColorPipe implements PipeTransform {
  public transform(index: number): string {
    return UtilitiesUiService.getColorByIndex(index);
  }
}
