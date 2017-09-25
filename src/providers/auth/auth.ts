import { Injectable } from '@angular/core';
import { ResourceService } from '../../api/resource';
import { Storage } from '@ionic/storage';

//@Injectable()
export class AuthProvider {
  constructor( public storage: Storage ) {}

  async auth_check() {
    await this.storage.get('AUTH_TOKEN').then(res => {
      if (res !== null) {
        return false;
      } else {
        return true;
      }
    })
  }

  // login(data: Object) {
  //   this.rs.Login(data).subscribe((res) => {
  //     if (res.json().state) {
  //       this.storage.set('AUTH_TOKEN', JSON.stringify(res.json().token));
  //       this.storage.set('AUTH_INFO', JSON.stringify(res.json().data));
  //       this.nav.push(TabsPage);
  //     } else {
  //       console.log('登录失败！');
  //     }
  //   });
  // }
}