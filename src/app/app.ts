import { RouterOutlet } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { UtilitiesUiService } from './services/utilities-ui.service';
import { LocalStorage } from './enums/local-storage.enum';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { StoreBoardService } from './components/content/services/store/store-board.service';
import {
  Component,
  HostListener,
  OnInit,
  WritableSignal,
  effect,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgClass,
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SideMenuComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  @HostListener('window:resize', ['$event'])
  public onResize(event: Event): void {
    this.setIfSideMenuIsVisible((event.target as Window).innerWidth);
  }

  private readonly UtilitiesUiService = inject(UtilitiesUiService);
  private readonly storeBoardService = inject(StoreBoardService);

  public showSideMenu!: WritableSignal<boolean>;
  public expandSidebar!: WritableSignal<boolean>;

  constructor() {
    effect(() => {
      const boards = this.storeBoardService.getBoards();

      if (boards === null) {
        return;
      }

      localStorage.setItem(
        LocalStorage.FRONTEND_MENTOR_KANBAN,
        JSON.stringify(boards)
      );
    });
  }

  public ngOnInit(): void {
    this.setInitiallySelectedTheme();

    this.showSideMenu = this.UtilitiesUiService.watchShowSidebar;
    this.expandSidebar = this.UtilitiesUiService.watchToggleExpandSidebar;
  }

  public onToggleSidebar(): void {
    this.UtilitiesUiService.toggleExpandSidebar();
  }

  private setInitiallySelectedTheme(): void {
    this.UtilitiesUiService.setDocumentAttributeTheme(
      JSON.stringify(this.UtilitiesUiService.getInitiallySelectedTheme)
    );
  }

  private setIfSideMenuIsVisible(innerWidth: number): void {
    this.UtilitiesUiService.emitShowSidebar(innerWidth);
  }
}
