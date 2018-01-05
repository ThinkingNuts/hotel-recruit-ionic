import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodayEmploiesPage } from './today-emploies';

@NgModule({
  declarations: [
    TodayEmploiesPage,
  ],
  imports: [
    IonicPageModule.forChild(TodayEmploiesPage),
  ],
})
export class CandidateListPageModule {}
