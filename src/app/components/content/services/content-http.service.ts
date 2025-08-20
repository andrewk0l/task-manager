import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Board } from '../../../../models/board.model';
import { LocalStorage } from '../../../enums/local-storage.enum';
import { DataResponse } from '../../../../models/data-response.model';

@Injectable({
  providedIn: 'root',
})
export class ContentHttpService {
  private readonly assetsUrl: string = 'assets/data.json';

  private readonly http = inject(HttpClient);

  public fetchBoardData$(): Observable<Board[]> {
    const storedBoards = this.getStoredBoards();

    if (storedBoards) {
      return JSON.parse(storedBoards);
    }

    return this.http
      .get<DataResponse>(this.assetsUrl)
      .pipe(map((response) => response.boards));
  }

  private getStoredBoards(): string | null {
    return localStorage.getItem(LocalStorage.FRONTEND_MENTOR_KANBAN);
  }
}
