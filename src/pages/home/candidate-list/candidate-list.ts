import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ResourceService } from '../../../api/resource';
import { Storage } from '@ionic/storage';
import { EmployDetailPage } from '../employ-detail/employ-detail';
import { FinishWorkPage } from '../finish-work/finish-work';
import { API_ROOT } from '../../../api/config';


@IonicPage()
@Component({
  selector: 'page-candidate-list',
  templateUrl: 'candidate-list.html',
})
export class CandidateListPage {
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
        this.rs.HotelEmploy(res).subscribe((res) => {
          this.hotelEmploies = res.json();
          for (var index in this.hotelEmploies) {
            this.isShow.push(0);
          }
          this.isShow[0] = 1;
        });
      }
    });
  }

  itemTapped(item) {
    this.navCtrl.push(EmployDetailPage, {
      item: item
    });
  }

  removeItem(i, j, item) {
    this.navCtrl.push(EmployDetailPage, {
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
