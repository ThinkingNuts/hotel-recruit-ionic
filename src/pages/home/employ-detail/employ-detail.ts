import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ResourceService } from '../../../api/resource';

/**
 * Generated class for the EmployDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employ-detail',
  templateUrl: 'employ-detail.html',
})
export class EmployDetailPage {
  public employ: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public rs: ResourceService,
  ) {
    this.employ = navParams.get('item');
    console.log(this.employ);
  }

  removeItem() {
    this.showConfirm();
  }

  showConfirm() {
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
            this.rs.HotelEmployUpdate(this.employ.GUID).subscribe((res) => {
              console.log(res.json());
              if (res.json().state) {
                this.navCtrl.pop();
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
