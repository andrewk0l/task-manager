import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Board } from '../../../../models/board.model';
import { ContentHttpService } from './content-http.service';

export const conterResolver: ResolveFn<any> = (): Observable<Board[]> => {
  const contentHttpService = inject(ContentHttpService);

  return contentHttpService.fetchBoardData$();
};
