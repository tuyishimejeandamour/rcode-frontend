import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { AuthHeatherComponent } from './components/auth-heather/auth-heather.component';
import { CommonFooterComponent } from './components/common-footer/common-footer.component';
import { DashHeaderComponent } from './components/dash-header/dash-header.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, AuthHeatherComponent, CommonFooterComponent, DashHeaderComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, AuthHeatherComponent,CommonFooterComponent,DashHeaderComponent]
})
export class SharedModule {}
