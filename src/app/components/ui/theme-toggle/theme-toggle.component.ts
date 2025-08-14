import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilitiesUiService } from '../../../services/utilities-ui.service';
import { LocalStorage } from '../../../enums/local-storage.enum';

@Component({
  selector: 'app-theme-toggle',
  imports: [FormsModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent implements OnInit {
  public checkboxState = false;

  private readonly utilUiService = inject(UtilitiesUiService);

  constructor() {}

  public ngOnInit(): void {
    this.checkboxState = this.utilUiService.getInitiallySelectedTheme;
  }

  public onChange(checked: boolean): void {
    const stringChecked = JSON.stringify(checked);

    this.utilUiService.setDocumentAttributeTheme(stringChecked);
    localStorage.setItem(LocalStorage.FRONTEND_MENTOR_THEME, stringChecked);
  }
}
