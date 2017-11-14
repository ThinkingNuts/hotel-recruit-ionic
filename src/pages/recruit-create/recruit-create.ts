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
    return new Date(+ new Date(date) + 8 * 3600 * 1000).toISOString()
  }
  public data = {
    currentTime: this.ToDate(new Date()),
    workTypes: '',
    schedules: '',
    departments: '',
    units: ['元/小时', '元/间'],
    unit: '元/小时',
    nums: ['/人'],
    num: '/人',
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
    this.recruit.Mark = '';
    this.rs.WorkTypes().subscribe((res) => {
      this.data.workTypes = res.json();
    });
    this.rs.Schedules().subscribe((res) => {
      this.data.schedules = res.json();
    });
    this.rs.Department().subscribe((res) => {
      this.data.departments = res.json();
    });
    if (navParams.get('item')) {
      this.recruit = navParams.get('item');
      this.data.unit = this.recruit.Billing.replace(/[0-9]/ig, '');
      this.recruit.Billing = this.recruit.Billing.replace(/[^0-9]/ig, '');
      this.recruit.Start = this.ToDate(navParams.get('item').Start);
      this.recruit.End = this.ToDate(navParams.get('item').End);
      this.data.edit = true
    }
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      DepartID: ['', [Validators.required]],
      WorkTypeId: ['', [Validators.required]],
      ScheduleId: ['', [Validators.required]],
      num: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      Start: ['', [Validators.required]],
      End: ['', [Validators.required]],
      Mark: ['', [Validators.required]],
      Billing: ['', [Validators.required]],
      Num: ['', [Validators.required]],
    });
  }

  @ViewChild('select') select: Select;

  ionViewCanLeave(): Boolean {
    this.select.close();
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
      this.rs.RecruitCreate(this.recruit).subscribe((res) => {
        if (res.json().state) {
          this.alertMessage('发布成功');
          this.navCtrl.pop();
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
      this.recruit.HotelId = JSON.parse(res).Id;
      console.log(this.recruit);
      this.rs.RecruitEdit(this.recruit).subscribe((res) => {
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
