import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecruitedDetailPage } from '../recruited-detail/recruited-detail';
import { RecruitCreatePage } from '../recruit-create/recruit-create';
import { ResourceService } from '../../api/resource';

@IonicPage()
@Component({
  selector: 'page-recruited-list',
  templateUrl: 'recruited-list.html',
})
export class RecruitedListPage {
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
    this.navCtrl.push(RecruitedDetailPage, {
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
