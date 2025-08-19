import { Task } from '../../../../../models/task.model';
import { Board } from '../../../../../models/board.model';
import { Column } from '../../../../../models/column.model';
import { LabelValue } from '../../../../../models/label-value.model';
import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StoreBoardService {
  private boards: WritableSignal<Board[] | null> = signal(null);

  constructor() {}

  // Sets initial boards to signal
  public setBoards(boards: Board[]): void {
    this.boards.set(this.formatInitialBoards(boards));
  }

  // Delete selected board by boardId
  public deleteBoard(boardId: string): void {
    this.boards.update((previous) =>
      this.formatInitialBoards(
        (previous || []).filter((board) => board.id !== boardId)
      )
    );
  }

  // Creates new board
  public createNewBoard(name: string, id: string, columns: Column[]): void {
    this.boards.update((previous) => [
      ...(previous || []).map((board) => ({ ...board, selected: false })),
      { name, id, columns, selected: true },
    ]);
  }

  // Update board title or column names
  public updateBoard(name: string, boardId: string, columns: Column[]): void {
    this.boards.update((previous) =>
      this.formatInitialBoards(
        (previous || []).map((board) => {
          if (board.id !== boardId) {
            return board;
          }

          return {
            ...board,
            name,
            columns: columns.map((column) => ({
              ...column,
              tasks: this.updateColumnTasksStatus(column),
            })),
          };
        })
      )
    );
  }

  // Set selected board
  public selectBoard(selectedIndex: number): void {
    this.boards.update((previous) =>
      (previous || []).map((board, index) => ({
        ...board,
        selected: index === selectedIndex,
      }))
    );
  }

  // Returns whole boards as signal
  public get getBoards(): WritableSignal<Board[] | null> {
    return this.boards;
  }

  // Returns selected user's board
  public get getSelectedBoard(): Signal<Board | null> {
    return computed(
      () => this.getBoards()?.find((board) => board.selected) || null
    );
  }

  // Returns available column names (usually it's TODO, DOING, DONE) from selected board
  public get getTaskStatus(): Signal<LabelValue[]> {
    return computed(() => {
      const selectedBoard = this.getSelectedBoard();

      if (!selectedBoard) {
        return [];
      }

      return selectedBoard.columns.map((column) => ({
        label: column.name,
        value: column.name,
      }));
    });
  }

  // Convert column titles to Column[]
  public createNewColumns(columns: string[]): Column[] {
    return columns.map((name) => ({ id: uuid.v4(), name, tasks: [] }));
  }

  // Updates task status in the column
  private updateColumnTasksStatus(column: Column): Task[] {
    return column.tasks.map((task) => ({ ...task, status: column.name }));
  }

  // Sets initially selected board by 0 index
  private formatInitialBoards(boards: Board[]): Board[] {
    const selectedBoardIndex = this.getIndexOfSelectedBoard(boards);

    return boards.map((board, index) => {
      const selected = index === selectedBoardIndex;
      const columns = this.setBoardDataValueIds(board);

      return { ...board, selected, id: uuid.v4(), columns };
    });
  }

  // Assign to selected board, columns/tasks/subtasks ids
  private setBoardDataValueIds(board: Board): Column[] {
    return this.assignIdToPassedArray(board.columns).map((column) => ({
      ...column,
      tasks: this.assignIdToPassedArray(column.tasks).map((task) => ({
        ...task,
        subtasks: this.assignIdToPassedArray(task.subtasks),
      })),
    }));
  }

  // Assign to object id, based on the key provided
  private assignIdToPassedArray<T>(data: Array<T>): Array<T> {
    return data.map((item) => ({ ...item, id: uuid.v4() }));
  }

  // Gets index of board which have selected property as true
  private getIndexOfSelectedBoard(boards: Board[]): number {
    const index = boards.findIndex((board) => board.selected);

    return index === -1 ? 0 : index;
  }
}
