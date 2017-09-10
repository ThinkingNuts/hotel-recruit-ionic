import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecruitedListPage } from './recruited-list';

@NgModule({
  declarations: [
    RecruitedListPage,
  ],
  imports: [
    IonicPageModule.forChild(RecruitedListPage),
  ],
})
export class RecruitedListPageModule {}
