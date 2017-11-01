import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ResourceService } from '../../../api/resource';
import { CandidateListPage } from '../candidate-list/candidate-list';

/**
 * Generated class for the FinishWorkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finish-work',
  templateUrl: 'finish-work.html',
})
export class FinishWorkPage {
  private person: any;
  private score: any = {
    star: 0,
    starMap: ["不满意", "还行", "一般", "满意", "很满意"]
  };
  private desc: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public rs: ResourceService,
  ) {
    this.person = navParams.get('item');
  }

  chooseStar(ev) {
    let star = parseInt(ev.target.dataset.index);
    this.score.star = star;
  }

  askFinishWork() {
    this.showConfirm(this.person);
  }

  showConfirm(item) {
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
            let data = {
              Evaluate: this.score.star,
              Comment: this.desc
            };
            this.rs.HotelEmployUpdate(item.GUID, data).subscribe((res) => {
              if (res.json().state) {
                this.person.Status = 0;
                this.navCtrl.push(CandidateListPage);
              }
            });
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
