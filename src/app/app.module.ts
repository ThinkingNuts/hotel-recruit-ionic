import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { RecruitedDetailPage } from '../pages/recruited-detail/recruited-detail';
import { RecruitCreatePage } from '../pages/recruit-create/recruit-create';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { RecruitedListPage } from '../pages/recruited-list/recruited-list';
import { CandidateDetailPage } from '../pages/candidate-detail/candidate-detail';
import { AboutPage } from '../pages/home/about/about';
import { SettingsPage } from '../pages/home/settings/settings';
import { MinePage } from '../pages/home/mine/mine';
import { CandidateListPage } from '../pages/home/candidate-list/candidate-list';
import { EmployDetailPage } from '../pages/home/employ-detail/employ-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ResourceService } from '../api/resource';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

export function provideStorage() {
  return new Storage({});
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecruitedDetailPage,
    RecruitCreatePage,
    LoginPage,
    TabsPage,
    WelcomePage,
    RecruitedListPage,
    CandidateDetailPage,
    AboutPage,
    SettingsPage,
    MinePage,
    CandidateListPage,
    EmployDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RecruitedDetailPage,
    RecruitCreatePage,
    LoginPage,
    TabsPage,
    WelcomePage,
    RecruitedListPage,
    CandidateDetailPage,
    AboutPage,
    SettingsPage,
    MinePage,
    CandidateListPage,
    EmployDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ResourceService,
    { provide: Storage, useFactory: provideStorage },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
