import { MatDialog } from '@angular/material/dialog';
import { Board } from '../../../models/board.model';
import { enterAnimationDuration } from '../../utils/util';
import { BoardModalComponent } from '../board-modal/board-modal.component';
import { StoreBoardService } from '../content/services/store/store-board.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-add-column',
  standalone: true,
  imports: [],
  templateUrl: './add-column.component.html',
  styleUrl: './add-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddColumnComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly storeBoardService = inject(StoreBoardService);

  public selectedBoard: Signal<Board | null> = signal(null);

  public ngOnInit(): void {
    this.selectedBoard = this.storeBoardService.getSelectedBoard;
  }

  public onEditBoard(): void {
    this.dialog.open(BoardModalComponent, {
      data: { board: this.selectedBoard() },
      enterAnimationDuration,
    });
  }
}
