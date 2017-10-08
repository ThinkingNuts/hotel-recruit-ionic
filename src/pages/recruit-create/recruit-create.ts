import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ResourceService } from '../../api/resource';
import { RecruitViewModel } from '../../view-model/recruit-model';
import { RecruitedListPage } from '../recruited-list/recruited-list';

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
  //private DepartID: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
  ) {
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

  // ngOnInit() {
  //   this.createForm = this.formBuilder.group({
  //     DepartID: ['', [Validators.required]],
  //   })
  //   this.DepartID = this.createForm.controls['DepartID'];
  // }

  create(): void {
    if (this.recruit.Billing) {
      this.recruit.Billing = this.recruit.Billing + this.data.unit;
    }
    this.recruit.HotelId = 2;
    this.rs.RecruitCreate(this.recruit).subscribe((res) => {
      if (res.json().state) {
        this.toastSuccess();
        // this.navCtrl.push(RecruitedListPage);
      } else {
        this.toastError();
      }
    });
  }

  edit(): void {
    this.recruit.HotelId = 2;
    this.recruit.Billing = this.recruit.Billing + this.data.unit;
    this.rs.RecruitEdit(this.recruit).subscribe((res) => {
      if (res.json().state) {
        this.navCtrl.pop();
      }
    });
  }

  toastSuccess = () => {
    let toast = this.toastCtrl.create({
      message: '发布成功',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }

  toastError = () => {
    let toast = this.toastCtrl.create({
      message: '表单验证失败',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }

}
