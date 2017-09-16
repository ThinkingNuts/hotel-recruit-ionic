import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidateDetailPage } from './candidate-detail';

@NgModule({
  declarations: [
    CandidateDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidateDetailPage),
  ],
})
export class CandidateDetailPageModule {}
