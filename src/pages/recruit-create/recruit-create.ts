import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Select } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResourceService } from '../../api/resource';
import { RecruitViewModel } from '../../view-model/recruit-model';
import { RecruitedListPage } from '../recruited-list/recruited-list';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-recruit-create',
  templateUrl: 'recruit-create.html',
})
export class RecruitCreatePage {

  private recruit: RecruitViewModel = new RecruitViewModel();
  public ToDate(date): string {
    let newdDate = new Date(+ new Date(date) + 8 * 3600 * 1000)
    let year = newdDate.getFullYear();
    let month = newdDate.getMonth() + 1;
    let day = newdDate.getDate();
    return year + "-" + month + "-" + day;
  }
  public data = {
    currentTime: this.ToDate(new Date()),
    tomorrowTime: this.ToDate(+ new Date() + 24 * 3600 * 1000),
    units: ['元/小时', '元/间'],
    unit: '元/间',
    nums: ['/间'],
    num: '/间',
    edit: false
  }
  private createForm: FormGroup

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public storage: Storage,
  ) {
    if (navParams.get('item')) {
      this.recruit = navParams.get('item');
      this.data.unit = this.recruit.Billing.replace(/[0-9]/ig, '');
      this.recruit.Billing = this.recruit.Billing.replace(/[^0-9]/ig, '');
      this.recruit.Start = this.ToDate(navParams.get('item').Start);
      this.data.edit = true;
    } else {
      this.recruit.Start = this.data.tomorrowTime;
      this.recruit.Max = 30;
      this.recruit.Min = 5;
    }
  }

  //@ViewChild('select') select: Select;

  ionViewCanLeave(): Boolean {
    //this.select.close();
    if (!this.recruit.Billing) {
      return true;
    }
    if (this.recruit.Billing.indexOf('/') === -1) {
      this.recruit.Billing = this.recruit.Billing + this.data.unit;
    }
  }

  create(): void {
    if (this.recruit.Billing) {
      this.recruit.Billing = this.recruit.Billing + this.data.unit;
    }
    this.storage.get('AUTH_INFO').then((res) => {
      this.recruit.HotelId = JSON.parse(res).Id;
      this.recruit.OrderType = 1;
      this.rs.RecruitCreate(this.recruit).subscribe((res) => {
        if (res.json().state) {
          this.alertMessage('发布成功');
          this.navCtrl.push(RecruitedListPage, {
            item: 'refresh'
          });
        } else {
          this.alertMessage(res.json().message);
          return;
        }
        this.recruit.Billing = this.recruit.Billing.replace(/[^0-9]/ig, '');
      });
    });
  }

  edit(): void {
    if (this.recruit.Billing) {
      this.recruit.Billing = this.recruit.Billing + this.data.unit;
    }
    this.storage.get('AUTH_INFO').then((res) => {
      const date = {
        HotelId: JSON.parse(res).Id,
        Num: this.recruit.Num,
        Start: this.recruit.Start,
        Billing: this.recruit.Billing,
        Mark: this.recruit.Mark,
        Min: this.recruit.Min,
        Max: this.recruit.Max,
        OrderType: this.recruit.OrderType
      } 
      this.rs.RecruitEdit(date).subscribe((res) => {
        if (res.json().state) {
          //this.recruit.Billing = this.recruit.Billing.replace(/[^0-9]/ig, '');
          this.alertMessage('修改成功');
          this.navCtrl.pop();
        } else {
          this.alertMessage('修改失败');
        }
      });
    });
  }

  alertMessage = (mes) => {
    let alert = this.alertCtrl.create({
      title: mes,
      buttons: ['确定']
    });
    alert.present();
  }
}
