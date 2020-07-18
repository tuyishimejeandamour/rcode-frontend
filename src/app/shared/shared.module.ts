import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { AuthHeatherComponent } from './components/auth-heather/auth-heather.component';
import { CommonFooterComponent } from './components/common-footer/common-footer.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, AuthHeatherComponent, CommonFooterComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, AuthHeatherComponent,CommonFooterComponent]
})
export class SharedModule {}
