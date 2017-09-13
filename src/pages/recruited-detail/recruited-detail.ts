import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '../../api/resource';

@IonicPage()
@Component({
  selector: 'page-recruited-detail',
  templateUrl: 'recruited-detail.html',
})
export class RecruitedDetailPage {
  HotelOrder: Object

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
  ) {
    this.HotelOrder = navParams.get('item');
    // this.rs.GetArticle(this.navParams.get('id')).subscribe((res) => {
    //   this.item = res.json().data;
    // });
  }

}
