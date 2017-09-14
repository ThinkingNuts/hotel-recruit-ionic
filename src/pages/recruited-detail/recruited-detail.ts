import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '../../api/resource';

@IonicPage()
@Component({
  selector: 'page-recruited-detail',
  templateUrl: 'recruited-detail.html',
})
export class RecruitedDetailPage {
  item: Object

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
  ) {
    this.item = navParams.get('item');
    console.log(this.item);
  }

}
