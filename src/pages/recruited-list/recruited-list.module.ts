import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecruitedListPage } from './recruited-list';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    RecruitedListPage
  ],
  imports: [
    IonicPageModule.forChild(RecruitedListPage),
    MomentModule
  ],
})
export class RecruitedListPageModule {}
