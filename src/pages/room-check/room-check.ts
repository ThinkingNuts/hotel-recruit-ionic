import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ResourceService } from '../../api/resource';

/**
 * Generated class for the RoomCheckPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-check',
  templateUrl: 'room-check.html',
})
export class RoomCheckPage {
  public Rooms: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    public toastCtrl: ToastController,
  ) {
    this.rs.GetGrabOrder(navParams.get('id')).subscribe((res) => {
      this.Rooms = res.json();
      console.log(this.Rooms);
    });
  }

  change(index) {
    if (this.Rooms[index].RommStatus === 1) {
      this.Rooms[index].RommStatus = 2;
    } else if (this.Rooms[index].RommStatus === 2) {
      this.Rooms[index].RommStatus = 1;
    }
  }

  submit() {
    let rooms = this.Rooms.map((item) => {
      if (item.RommStatus !== 0) {
        return {
          Id: item.Id,
          RommStatus: item.RommStatus
        }
      }
    }).filter((item) => {
      if (item) {
        return true;
      }
      return false;
    });
    this.rs.UpdateGrabOrder(this.navParams.get('id'), rooms).subscribe((res) => {
      if (res.json().state) {
        this.presentToast('提交成功');
      } else {
        this.presentToast(res.json().message);
      }
    });
  }

  presentToast = (mes) => {
    let toast = this.toastCtrl.create({
      message: mes,
      duration: 2500,
      position: 'bottom'
    });
  
    toast.present();
  }
}
