import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ResourceService } from '../../api/resource';
import { Storage } from '@ionic/storage';
import { API_ROOT } from '../../api/config';


@IonicPage()
@Component({
  selector: 'page-today-emploies',
  templateUrl: 'today-emploies.html',
})
export class TodayEmploiesPage {
  public hotelEmploies
  public API_ROOT = API_ROOT
  public isShow = []
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    public storage: Storage,
    private app: App,
  ) {
    this.storage.get('AUTH_GUID').then(res => {
      if (res) {
        this.rs.HotelTodayGrab(res).subscribe((res) => {
          if (! res.json()) {
            this.hotelEmploies = [];
          } else {
            this.hotelEmploies = res.json()[0].Orders;
          }
          for (var index in this.hotelEmploies) {
            this.isShow.push(0);
          }
          this.isShow[0] = 1;
        });
      }
    });
  }

  itemTapped(item) {
    console.log(item);
    this.navCtrl.push("RoomCheckPage", {
      id: item.POrderId
    });
  }

  removeItem(i, j, item) {
    this.navCtrl.push("RoomCheckPage", {
      item: item,
      show: true
    });
  }

  show(i) {
    for (let index in this.isShow) {
      this.isShow[index] = 0;
    }
    this.isShow[i] = 1;
  }

  notShow(i) {
    this.isShow[i] = 0;
  }
}
