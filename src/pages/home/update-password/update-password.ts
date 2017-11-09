import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordUpdateModel } from '../../../view-model/password-model';
import { ResourceService } from '../../../api/resource';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UpdatePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-password',
  templateUrl: 'update-password.html',
})
export class UpdatePasswordPage {
  private updateForm: FormGroup
  private user: PasswordUpdateModel = new PasswordUpdateModel()

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public rs: ResourceService,
    private platform: Platform,
    public storage: Storage,
    public alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPasswordConfirmation: ['', [Validators.required]],
    })
  }

  update() {
    this.storage.get('AUTH_GUID').then(res => {
      if (res) {
        console.log(JSON.parse(res));
        delete this.user.newPasswordConfirmation;
        this.rs.UpdatePassword(res, this.user).subscribe((res) => {
          if (res.json().state) {
            
          } else {
            this.showAlert(res.json().message);
          }
        });
      }
    });
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: '修改失败！',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
