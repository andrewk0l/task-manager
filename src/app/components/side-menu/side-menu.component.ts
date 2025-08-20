import { UtilitiesUiService } from '../../services/utilities-ui.service';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeToggleComponent } from '../ui/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [MobileMenuComponent, ThemeToggleComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  private readonly utilitiesUiService = inject(UtilitiesUiService);

  public onToggleSidebar(): void {
    this.utilitiesUiService.toggleExpandSidebar();
  }
}
