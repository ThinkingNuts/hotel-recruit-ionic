import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
    private alertCtrl: AlertController,
  ) {
    this.getHotelOrders()
  }

  getHotelOrders() {
    this.rs.HotelOrders().subscribe((res) => {
      this.HotelOrders = res.json();
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
    this.showConfirm(index, item);
  }

  doRefresh(refresher) {
    this.rs.HotelOrders().subscribe((res) => {
      this.HotelOrders = res.json();
      refresher.complete();
    });
  }

  showConfirm(index, item) {
    let confirm = this.alertCtrl.create({
      title: '确定删除?',
      buttons: [
        {
          text: '否',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '是',
          handler: () => {
            this.HotelOrders.splice(index, 1);
            this.rs.DeleteOrder(item).subscribe((res) => {
              console.log(res.json());
            });
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  
}
