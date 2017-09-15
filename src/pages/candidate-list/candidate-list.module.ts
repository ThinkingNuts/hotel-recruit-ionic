import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidateListPage } from './candidate-list';

@NgModule({
  declarations: [
    CandidateListPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidateListPage),
  ],
})
export class CandidateListPageModule {}
