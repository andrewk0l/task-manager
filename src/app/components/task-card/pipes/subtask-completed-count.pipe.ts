import { Pipe, PipeTransform } from '@angular/core';
import { Subtask } from '../../../../models/subtask.model';

@Pipe({
  name: 'subtaskCompletedCount',
  standalone: true,
})
export class SubtaskCompletedCountPipe implements PipeTransform {
  public transform(subtasks: Subtask[]): number {
    return subtasks.filter((subtask) => subtask.isCompleted).length;
  }
}
