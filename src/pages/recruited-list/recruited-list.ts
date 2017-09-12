import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '../../api/resource';

/**
 * Generated class for the RecruitedListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recruited-list',
  templateUrl: 'recruited-list.html',
})
export class RecruitedListPage {
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
