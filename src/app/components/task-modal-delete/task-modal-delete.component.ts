import { Task } from '../../../models/task.model';
import { Board } from '../../../models/board.model';
import { ButtonColor } from '../../enums/button-color.enum';
import { ButtonComponent } from '../ui/button/button.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StoreTaskService } from '../content/services/store/store-task.service';
import { StoreBoardService } from '../content/services/store/store-board.service';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-task-modal-delete',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './task-modal-delete.component.html',
  styleUrl: './task-modal-delete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskModalDeleteComponent implements OnInit {
  private readonly dialogRef = inject(MatDialog);
  private readonly storeTaskService = inject(StoreTaskService);
  private readonly storeBoardService = inject(StoreBoardService);

  public selectedBoard!: Board;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedTask: Task }) {}

  public ngOnInit(): void {
    this.selectedBoard = this.storeBoardService.getSelectedBoard() as Board;
  }

  public onCloseModal(): void {
    this.dialogRef.closeAll();
  }

  public onDeleteTask(): void {
    this.storeTaskService.deleteTask(
      this.data.selectedTask.id,
      this.selectedBoard.id
    );
    this.onCloseModal();
  }

  public get getButtonColor(): typeof ButtonColor {
    return ButtonColor;
  }
}
