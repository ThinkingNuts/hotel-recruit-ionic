import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RecruitedPage } from '../pages/recruited/recruited';
import { RecruitCreatePage } from '../pages/recruit-create/recruit-create';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { RecruitedListPage } from '../pages/recruited-list/recruited-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers';
import { ResourceService } from '../api/resource';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

export function provideStorage() {
  return new Storage({});
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecruitedPage,
    RecruitCreatePage,
    LoginPage,
    TabsPage,
    RecruitedListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RecruitedPage,
    RecruitCreatePage,
    LoginPage,
    TabsPage,
    RecruitedListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    ResourceService,
    { provide: Storage, useFactory: provideStorage },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
