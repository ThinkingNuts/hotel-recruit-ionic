import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController  } from 'ionic-angular';
import { ResourceService } from '../../../api/resource';
import { FinishWorkPage } from '../finish-work/finish-work';
import { API_ROOT } from '../../../api/config'

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
  public API_ROOT = API_ROOT
  private score: any = {
    star: 0,
    starMap: ["不满意", "还行", "一般", "满意", "很满意"]
  };
  private desc: string;
  private message: string;
  private show: Boolean = false;
  private hasEvaluate: Boolean = false;
  private Sex: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    public alertCtrl: AlertController,
    private app: App,
  ) {
    this.employ = navParams.get('item');
    this.hasEvaluate = (this.employ.Comment || this.employ.Evaluate);
    this.score.star = this.employ.Evaluate;
    this.desc = this.employ.Comment;
    //this.Sex = this.employ.Person.Sex == '男' ? '他' : '她';
  }

  removeItem(message) {
    if (message == '终止') {
      this.showConfirm();
    } else {
      this.evaluate();
    }
  }

  showEvaluate() {
    this.show = true;
  }

  chooseStar(ev) {
    let star = parseInt(ev.target.dataset.index);
    this.score.star = star;
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
            this.evaluate();
          }
        }
      ]
    });
    confirm.present();
  }

  evaluate() {
    let data = {
      Evaluate: this.score.star,
      Comment: this.desc
    };
    this.rs.HotelEmployUpdate(this.employ.GUID, data).subscribe((res) => {
      if (res.json().state) {
        this.employ.Status = 0;
      }
    });
  }
}
