import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ToastController } from 'ionic-angular';
import { RecruitedDetailPage } from '../recruited-detail/recruited-detail';
import { RecruitCreatePage } from '../recruit-create/recruit-create';
import { ResourceService } from '../../api/resource';
import { Storage } from '@ionic/storage';
import { handleTime } from '../../utils';

@IonicPage()
@Component({
  selector: 'page-recruited-list',
  templateUrl: 'recruited-list.html',
})
export class RecruitedListPage {
  HotelOrders: any
  HotelOrders_copy: any
  preTime: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    public alertCtrl: AlertController,
    public app: App,
    public storage: Storage,
    public toastCtrl: ToastController
  ) {
    this.getHotelOrders(null)
  }

  getHotelOrders(refresher) {
    let current_time = handleTime("yyyy-MM-dd hh:mm:ss")
    this.storage.get('PRE_TIME').then(res => {
      if (res) {
        this.preTime = res;
      } else {
        this.preTime = current_time;
      }
      this.storage.get('AUTH_GUID').then(res => {
        if (res) {
          this.storage.set('PRE_TIME', current_time);
          this.rs.HotelOrders(res, this.preTime).subscribe((res) => {
            this.HotelOrders = res.json();
            this.HotelOrders_copy = this.HotelOrders;
            if (refresher) {
              refresher.complete();
            }
          });
        }
      });
    });
  }

  itemTapped(item) {
    this.navCtrl.push(RecruitedDetailPage, {
      item: item
    });
  }

  edit(index, item) {
    this.navCtrl.push(RecruitCreatePage, {
      item: item
    });
  }

  modifyItem(data, item) {
    this.rs.HotelOrderOnline(data, item.GUID).subscribe((res) => {
      if (res.json().state) {
        if (data) {
          this.getHotelOrders(null)
          this.presentToast('上线成功');
        } else {
          this.getHotelOrders(null)
          this.presentToast('下线成功');
        }
      } else {
        this.presentToast(res.json().message);
      }
    });
  }

  removeItem(index, item) {
    this.showConfirm(index, item);
  }

  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.HotelOrders = this.HotelOrders_copy.filter(function (item) {
        return item.DepartMentName.includes(val);
      });
    }
  }

  doRefresh(refresher) {
    this.getHotelOrders(refresher)
  }

  add() {
    this.navCtrl.push('RecruitCreatePage');
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

  presentToast = (mes) => {
    let toast = this.toastCtrl.create({
      message: mes,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.present();
  }
}
