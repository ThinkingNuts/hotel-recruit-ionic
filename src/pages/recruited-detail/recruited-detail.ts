import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { ResourceService } from '../../api/resource';
import { OrderModel } from '../../view-model/order-model';
import { CandidateDetailPage } from '../candidate-detail/candidate-detail';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-recruited-detail',
  templateUrl: 'recruited-detail.html',
})
export class RecruitedDetailPage {
  public orderData: OrderModel = new OrderModel()

  public RecruitedDetail: any
  public Candidates: any = new Object()
  pet: string = "用工详情";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    private toastCtrl: ToastController,
    private app: App,
    public storage: Storage,
  ) {
    this.RecruitedDetail = navParams.get('item');
    this.storage.get('AUTH_INFO').then((res) => {
      this.RecruitedDetail.address = JSON.parse(res).MailingAddress
      console.log(this.RecruitedDetail);
    });
    this.rs.PersonOrders(this.RecruitedDetail.Id).subscribe((res) => {
      this.Candidates = res.json();
    });
  }

  // editStatus(item: any, index: number, state: number) {
  //   this.orderData.GUID = item.GUID
  //   this.orderData.OrderId = this.RecruitedDetail.Id
  //   this.orderData.Mark = this.RecruitedDetail.Mark
  //   this.orderData.PersonId = item.Person.Id
  //   if (state === 1) {
  //     this.orderData.Status = 2
  //     this.rs.OrderUpdate(this.orderData).subscribe((res) => {
  //       this.Candidates.Persons[index].StatusStr = '通过'
  //       this.Candidates.Persons[index].Status = 2
  //       this.presentToast();
  //     });
  //   } else {
  //     this.orderData.Status = 3
  //     this.rs.OrderUpdate(this.orderData).subscribe((res) => {
  //       this.Candidates.Persons[index].StatusStr = '未通过'
  //       this.Candidates.Persons[index].Status = 3
  //       this.presentToast();
  //     });
  //   }
  // }

  itemTapped(item) {
    this.app.getRootNav().push(CandidateDetailPage, {
      item: item,
      recruitedDetail: this.RecruitedDetail
    });
  }

  // presentToast = () => {
  //   let toast = this.toastCtrl.create({
  //     message: '修改申请状态成功',
  //     duration: 3000,
  //     position: 'top'
  //   });
  
  //   toast.present();
  // }
}
