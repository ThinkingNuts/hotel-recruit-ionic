import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidateCommentPage } from './candidate-comment';

@NgModule({
  declarations: [
    CandidateCommentPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidateCommentPage),
  ],
})
export class CandidateCommentPageModule {}
