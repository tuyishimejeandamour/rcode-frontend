import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { AuthHeatherComponent } from './components/auth-heather/auth-heather.component';
import { CommonFooterComponent } from './components/common-footer/common-footer.component';
import { DashHeaderComponent } from './components/dash-header/dash-header.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';
import { MaterialModule } from 'app/material/material.module';
import { RouterModule } from '@angular/router';
import { TimeDisplayComponent } from './components/time-display/time-display.component';


@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, AuthHeatherComponent, CommonFooterComponent, DashHeaderComponent, MainNavComponent, FooterMenuComponent, TimeDisplayComponent],
  imports: [CommonModule, TranslateModule, FormsModule,MaterialModule , RouterModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, AuthHeatherComponent,CommonFooterComponent,DashHeaderComponent, MainNavComponent, FooterMenuComponent,TimeDisplayComponent]
})
export class SharedModule {}
