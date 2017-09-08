import { Injectable } from '@angular/core';
import { ResourceService } from '../../api/resource';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage'; 

@Injectable()
export class AuthProvider {
  
  constructor(
    public rs: ResourceService,
    public storage: Storage
  ) {
  }

  auth_check() {
    return this.storage.get('AUTH_USER_ID') !== null;
  }

  login(data: Object) {
    this.rs.Login(data).subscribe((res: Response) => {
      console.log(res.json().status);
      this.storage.set('AUTH_ACCESS_TOKEN', JSON.stringify(res.json()));
      this.storage.set('AUTH_USER', JSON.stringify(res.json()));
    });
  }
}