import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { AboutPage } from './about/about';
import { SettingsPage } from './settings/settings';

@NgModule({
  declarations: [
    HomePage,
    AboutPage,
    SettingsPage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  entryComponents: [
    AboutPage,
    SettingsPage,
    HomePage
  ]
})
export class HomePageModule {}
