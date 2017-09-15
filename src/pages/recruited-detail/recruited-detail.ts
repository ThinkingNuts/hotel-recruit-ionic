import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '../../api/resource';

@IonicPage()
@Component({
  selector: 'page-recruited-detail',
  templateUrl: 'recruited-detail.html',
})
export class RecruitedDetailPage {
  RecruitedDetail: Object
  items: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
  ) {
    this.RecruitedDetail = navParams.get('item');
    this.items = [
      {PersonName: 'zhangmin', TimeStr: '2017-09-15 12:00:00', StatusStr: '待审核'}
    ]
  }

}
