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

  constructor(public http: Http, public storage: Storage) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded')
    //this.headers.append('Content-Type', 'application/json')
  }
  
  interceptor(): RequestOptions {
    const opts: RequestOptions = new RequestOptions()
    opts.headers = this.headers
    this.storage.get('AUTH_TOKEN').then(res => {
      if (res && !opts.headers.get('Authorization')) {
        opts.headers.append('Authorization',
          'Bearer ' + res)
      }
    });
    return opts;
  }
  
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
    return this.http.post(API_ROOT + 'Hotel/login', data, this.interceptor())
  }

  WorkTypes(): Observable<any> {
    return this.http.post(API_ROOT + 'WorkType/WorkTypes', this.interceptor())
  }

  Schedules(): Observable<any> {
    return this.http.post(API_ROOT + 'Schedule/Schedules', this.interceptor())
  }

  RecruitCreate(data: Object): Observable<any> {
    data = this.ObjectToSerialize(data);
    return this.http.post(API_ROOT + 'HotelOrder/Create', data, this.interceptor())
  }

  RecruitEdit(data: Object): Observable<any> {
    data = this.ObjectToSerialize(data);
    return this.http.post(API_ROOT + 'HotelOrder/Update', data, this.interceptor())
  }

  HotelOrders(): Observable<any> {
    return this.http.post(API_ROOT + 'HotelOrder/List', this.interceptor())
  }

  DeleteOrder(item): Observable<any> {
    return this.http.post(API_ROOT + 'HotelOrder/Remove', [item], this.interceptor())
  }

  PersonOrders(id): Observable<any> {
    return this.http.post(API_ROOT + 'PersonOrder/Persons/' + id, this.interceptor())
  }

  OrderUpdate(data: Object): Observable<any> {
    data = this.ObjectToSerialize(data);
    return this.http.post(API_ROOT + 'PersonOrder/Update', data, this.interceptor())
  }

}
