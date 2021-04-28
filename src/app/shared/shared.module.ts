import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
import { ProfilepictureComponent } from './components/profilepicture/profilepicture.component';
import { IssuesComponent } from './components/issues/issues.component';
import { QuillModule } from 'ngx-quill';
import { DiscussComponent } from './components/discuss/discuss.component';
import { AssessimentComponent } from './components/assessiment/assessiment.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { AngularSplitModule } from 'angular-split';
import { CoreModule } from 'app/core/core.module';
export const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};


@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, AuthHeatherComponent, CommonFooterComponent, DashHeaderComponent, MainNavComponent, FooterMenuComponent, TimeDisplayComponent, ProfilepictureComponent,IssuesComponent, DiscussComponent,AssessimentComponent],
  imports: [CommonModule, TranslateModule, FormsModule,MaterialModule , AngularSplitModule, RouterModule,QuillModule.forRoot(),OwlDateTimeModule,
    OwlNativeDateTimeModule, CoreModule ],
  exports: [TranslateModule, WebviewDirective, FormsModule, AuthHeatherComponent,CommonFooterComponent,DashHeaderComponent, MainNavComponent, FooterMenuComponent,TimeDisplayComponent,ProfilepictureComponent,IssuesComponent, DiscussComponent,AssessimentComponent],
  providers: [
    DatePipe,
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS}
  ]
})
export class SharedModule {}
