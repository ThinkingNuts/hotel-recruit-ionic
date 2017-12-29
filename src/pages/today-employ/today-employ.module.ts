import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodayEmployPage } from './today-employ';

@NgModule({
  declarations: [
    TodayEmployPage,
  ],
  imports: [
    IonicPageModule.forChild(TodayEmployPage),
  ],
})
export class TodayEmployPageModule {}
