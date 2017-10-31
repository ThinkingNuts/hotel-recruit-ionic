import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployDetailPage } from './employ-detail';

@NgModule({
  declarations: [
    EmployDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployDetailPage),
  ],
})
export class EmployDetailPageModule {}
