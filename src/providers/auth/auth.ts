import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ResourceService } from '../../api/resource'
import { AppState} from '../../store/reducers';

export class AuthProvider {
  constructor(public rs: ResourceService, public store: Store<AppState>,) {
  }

  login(data: Object):void {
    this.rs.Login(data).subscribe((res: Response) => {
      this.store.dispatch(res.data);
    });
  }
}