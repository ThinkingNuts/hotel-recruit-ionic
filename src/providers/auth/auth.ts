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
    this.storage.get('AUTH_TOKEN').then(res => {
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
      console.log(res.json());
      if (res.json().state) {
        this.storage.set('AUTH_TOKEN', JSON.stringify(res.json().token));
      }
    });
  }
}