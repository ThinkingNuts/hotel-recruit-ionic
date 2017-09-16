import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ResourceService } from '../../api/resource';
import { OrderModel } from '../../view-model/order-model';

@IonicPage()
@Component({
  selector: 'page-recruited-detail',
  templateUrl: 'recruited-detail.html',
})
export class RecruitedDetailPage {
  public orderData: OrderModel = new OrderModel()

  public RecruitedDetail: any
  public Candidates: any = new Object()

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rs: ResourceService,
    private toastCtrl: ToastController
  ) {
    this.RecruitedDetail = navParams.get('item');
    this.rs.PersonOrders(this.RecruitedDetail.Id).subscribe((res) => {
      console.log(res.json());
      this.Candidates = res.json();
    });
  }

  editStatus(item: any, index: number, state: number) {
    console.log(item);
    this.orderData.GUID = item.GUID
    this.orderData.OrderId = this.RecruitedDetail.Id
    this.orderData.Mark = this.RecruitedDetail.Mark
    this.orderData.PersonId = item.Person.Id
    if (state === 1) {
      this.orderData.Status = 2
      this.rs.OrderUpdate(this.orderData).subscribe((res) => {
        this.Candidates.Persons[index].StatusStr = '通过'
        this.Candidates.Persons[index].Status = 2
        this.presentToast();
      });
    } else {
      this.orderData.Status = 3
      this.rs.OrderUpdate(this.orderData).subscribe((res) => {
        this.Candidates.Persons[index].StatusStr = '未通过'
        this.Candidates.Persons[index].Status = 3
        this.presentToast();
      });
    }
  }

  presentToast = () => {
    let toast = this.toastCtrl.create({
      message: '修改申请状态成功',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
