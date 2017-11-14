import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvaluateListPage } from './evaluate-list';

@NgModule({
  declarations: [
    EvaluateListPage,
  ],
  imports: [
    IonicPageModule.forChild(EvaluateListPage),
  ],
})
export class EvaluateListPageModule {}
