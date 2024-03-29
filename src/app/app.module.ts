import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './components/home/home.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/auth/login/login.module';
import { RegisterModule } from './components/auth/register/register.module';
import { ProfileModule } from './components/profile/profile.module';
import {
  JerwisService,
  TokenService,
  AuthService,
  BeforeLoginService,
  AfterLoginService,
  UploadfileService,
  HttpexplorerService} from './core/services';
import { ResetPasswordModule } from './components/auth/reset-password/reset-password.module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NewPasswordModule } from './components/auth/new-password/new-password.module';
import { MaterialModule } from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonfunctionService } from './Service/commonfunction.service';
import { MarktaskModule } from './components/marktask/marktask.module';
import { QuickhelpService } from './Service/quickhelp.service';
import { StudentTaskService } from './Service/student-task.service';



// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    AppRoutingModule,
    ProfileModule,
    ResetPasswordModule,
    SnotifyModule,
    NewPasswordModule,
    MaterialModule,
    BrowserAnimationsModule,
    MarktaskModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    JerwisService,
    TokenService,
    AuthService,
    BeforeLoginService,
    AfterLoginService,
    CommonfunctionService,
    QuickhelpService,
    StudentTaskService,
    UploadfileService,
    HttpexplorerService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
