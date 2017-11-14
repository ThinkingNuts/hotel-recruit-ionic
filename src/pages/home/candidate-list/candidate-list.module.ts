import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidateListPage } from './candidate-list';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    CandidateListPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidateListPage),
    MomentModule
  ],
})
export class CandidateListPageModule {}
