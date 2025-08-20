import { Column } from '../../../../models/column.model';

export interface BoardForm {
  name: string;
  columns: Column[];
}
