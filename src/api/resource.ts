import { Injectable, Inject } from '@angular/core'
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import { Storage } from '@ionic/storage';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import * as querystring from 'querystring'
import { API_ROOT } from './config'
import { UserViewModel } from '../view-model/user-model'
 
@Injectable()
export class ResourceService {

  headers: Headers = new Headers()
  opts: RequestOptions = new RequestOptions()

  constructor(public http: Http, public storage: Storage) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded')
    //this.headers.append('Content-Type', 'application/json')
  }
  
  interceptor(): void {
    this.opts.headers = this.headers
    this.storage.get('AUTH_TOKEN').then(res => {
      if (res && !this.opts.headers.get('Authorization')) {
        this.opts.headers.append('Authorization', 'Bearer ' + res)
      }
    });
  }
  
  // 转为表单数据类型
  ObjectToSerialize(data): string {
    let form_data: any;
    for (let index in data) {
      form_data += `&${index}=${data[index]}`;
    }
    return form_data.substring(10);
  }

  //登录请求.
  Login(data: Object): Observable<any> {
    data = this.ObjectToSerialize(data);
    return this.http.post(API_ROOT + 'Hotel/login', data, this.opts)
  }

  WorkTypes(): Observable<any> {
    return this.http.post(API_ROOT + 'WorkType/WorkTypes', this.opts)
  }

  Schedules(): Observable<any> {
    return this.http.post(API_ROOT + 'Schedule/Schedules', this.opts)
  }

  RecruitCreate(data: Object): Observable<any> {
    data = this.ObjectToSerialize(data);
    return this.http.post(API_ROOT + 'HotelOrder/Create', data, this.opts)
  }

  RecruitEdit(data: Object): Observable<any> {
    data = this.ObjectToSerialize(data);
    return this.http.post(API_ROOT + 'HotelOrder/Update', data, this.opts)
  }

  HotelOrders(): Observable<any> {
    return this.http.post(API_ROOT + 'HotelOrder/List', this.interceptor())
  }

  DeleteOrder(item): Observable<any> {
    return this.http.post(API_ROOT + 'HotelOrder/Remove', [item], this.opts)
  }

  PersonOrders(id): Observable<any> {
    return this.http.post(API_ROOT + 'PersonOrder/Persons/' + id, this.opts)
  }

  OrderUpdate(data: Object): Observable<any> {
    data = this.ObjectToSerialize(data);
    return this.http.post(API_ROOT + 'PersonOrder/Update', data, this.opts)
  }

}
