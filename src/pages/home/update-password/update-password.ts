import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordUpdateModel } from '../../../view-model/password-model';

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
    private platform: Platform,
  ) {
  }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      new_password_confirmation: ['', [Validators.required]],
    })
  }

  update() {
    console.log('ionViewDidLoad UpdatePasswordPage');
  }

}
