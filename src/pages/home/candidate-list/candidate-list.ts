import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ResourceService } from '../../../api/resource';
import { Storage } from '@ionic/storage';
import { EmployDetailPage } from '../employ-detail/employ-detail';
import { FinishWorkPage } from '../finish-work/finish-work';
import { API_ROOT } from '../../../api/config';

/**
 * Generated class for the CandidataListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidate-list',
  templateUrl: 'candidate-list.html',
})
export class CandidateListPage {
  public hotelEmploies
  public API_ROOT = API_ROOT
  
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
          console.log(this.hotelEmploies);
        });
      }
    });
  }

  itemTapped(item) {
    this.app.getRootNav().push(EmployDetailPage, {
      item: item
    });
  }

  removeItem(i, j, item) {
    this.app.getRootNav().push(FinishWorkPage, {
      item: item
    });
  }
}
