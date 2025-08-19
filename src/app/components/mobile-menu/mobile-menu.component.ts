import { NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Board } from '../../../models/board.model';
import { enterAnimationDuration } from './../../utils/util';
import { BoardModalComponent } from '../board-modal/board-modal.component';
import { StoreBoardService } from '../content/services/store/store-board.service';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
} from '@angular/core';
import { ThemeToggleComponent } from '../ui/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [NgClass, ThemeToggleComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent implements OnInit {
  @Input() sidebarMode!: boolean;

  public readonly dialog = inject(MatDialog);
  private readonly storeBoardService = inject(StoreBoardService);

  public boards!: WritableSignal<Board[] | null>;

  public ngOnInit(): void {
    this.boards = this.storeBoardService.getBoards;
  }

  public onSelectBoard(index: number): void {
    this.closeDialog();
    this.storeBoardService.selectBoard(index);
  }

  public onCreateNewBoard(): void {
    this.dialog.open(BoardModalComponent, {
      data: { board: null },
      enterAnimationDuration,
    });
  }

  private closeDialog(): void {
    this.dialog.closeAll();
  }
}
