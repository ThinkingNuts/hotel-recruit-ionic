import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecruitedListPage } from '../recruited-list/recruited-list';
import { RecruitCreatePage } from '../recruit-create/recruit-create';
import { ResourceService } from '../../api/resource';

/**
 * Generated class for the RecruitedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recruited',
  templateUrl: 'recruited.html',
})
export class RecruitedPage {
  HotelOrders: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
  ) {
    this.rs.HotelOrders().subscribe((res) => {
      this.HotelOrders = res.json();
      console.log(this.HotelOrders);
    });
  }

  itemTapped(item) {
    this.navCtrl.push(RecruitedListPage, {
      item: item
    });
  }

  modifyItem(index, item) {
    this.navCtrl.push(RecruitCreatePage, {
      item: item
    });
  }

  removeItem(index, item) {
    this.HotelOrders.splice(index, 1);
    this.rs.DeleteOrder(item).subscribe((res) => {
      console.log(res.json());
    });
  }
}
