import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { ResourceService } from '../../../api/resource';
import { Storage } from '@ionic/storage';
import { EmployDetailPage } from '../employ-detail/employ-detail';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    public storage: Storage,
    public alertCtrl: AlertController,
    private app: App,
  ) {
    this.storage.get('AUTH_GUID').then(res => {
      if (res) {
        this.rs.HotelEmploy(res).subscribe((res) => {
          this.hotelEmploies = res.json();
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
    this.showConfirm(i, j, item);
  }

  showConfirm(i, j, item) {
    let confirm = this.alertCtrl.create({
      title: '确定终止?',
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
            this.rs.HotelEmployUpdate(item.GUID).subscribe((res) => {
              //this.hotelEmploies[i].Employs.splice(j, 1);
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
