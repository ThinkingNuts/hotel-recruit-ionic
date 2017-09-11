import { Injectable } from '@angular/core';
import { ResourceService } from '../../api/resource';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {
  
  constructor(
    public rs: ResourceService,
    public storage: Storage
  ) {
  }

  auth_check() {
    this.storage.get('AUTH_USER_ID').then(res => {
      console.log(res);
      if (res !== null) {
        return false;
      } else {
        return true;
      }
    })
  }

  login(data: Object) {
    this.rs.Login(data).subscribe((res) => {
      if (res.json().status) {
        this.storage.set('AUTH_ACCESS_TOKEN', JSON.stringify(res.json().data.jwt_token.access_token));
        this.storage.set('AUTH_USER_ID', JSON.stringify(res.json().data.id));
        this.storage.set('AUTH_USER', JSON.stringify(res.json().data));
      }
    });
  }
}