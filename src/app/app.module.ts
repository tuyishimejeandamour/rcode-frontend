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

import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';

import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { RegisterModule } from './components/register/register.module';
import { JerwisService } from './Service/jerwis.service';
import { TokenService } from './Service/token.service';
import { ProfileModule } from './dashboard/profile/profile.module';
import { AuthService } from './Service/auth.service';
import { BeforeLoginService } from './Service/before-login.service';
import { AfterLoginService } from './Service/after-login.service';
import { ResetPasswordModule } from './components/reset-password/reset-password.module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NewPasswordModule } from './components/new-password/new-password.module';
import { MaterialModule } from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonfunctionService } from './Service/commonfunction.service';
import { EditorModule } from './editor/editor.module';
import { MarktaskModule } from './marktask/marktask.module';
import { FileservicesService } from './Service/fileservices.service';


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
    DetailModule,
    LoginModule,
    RegisterModule,
    AppRoutingModule,
    ProfileModule,
    ResetPasswordModule,
    SnotifyModule,
    NewPasswordModule,
    MaterialModule,
    BrowserAnimationsModule,
    EditorModule,
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
    JerwisService,TokenService,AuthService,BeforeLoginService,AfterLoginService,CommonfunctionService, FileservicesService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
