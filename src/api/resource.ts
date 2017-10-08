import { Injectable, Inject } from '@angular/core'
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import { Storage } from '@ionic/storage';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import * as querystring from 'querystring'
import { API_ROOT } from './config'
import { UserViewModel } from '../view-model/user-model'
import { objectToSerialize } from '../utils'
 
@Injectable()
export class ResourceService {

  headers: Headers = new Headers()
  opts: RequestOptions = new RequestOptions()
  GUID: string
  preTime: Date

  constructor(public http: Http, public storage: Storage) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded')
    //this.headers.append('Content-Type', 'application/json')
    this.interceptor();
  }

  interceptor() {
    this.opts.headers = this.headers
    this.storage.get('AUTH_TOKEN').then(res => {
      if (res && !this.opts.headers.get('Authorization')) {
        this.opts.headers.append('Authorization', `Bearer ${res}`)
      }
    });
  }

  //登录请求.
  Login(data: Object): Observable<any> {
    data = objectToSerialize(data);
    return this.http.post(API_ROOT + 'Hotel/login', data, this.opts)
  }

  WorkTypes(): Observable<any> {
    return this.http.post(API_ROOT + 'WorkType/WorkTypes', this.opts)
  }

  Schedules(): Observable<any> {
    return this.http.post(API_ROOT + 'Schedule/Schedules', this.opts)
  }

  Department(): Observable<any> {
    return this.http.post(API_ROOT + 'Department/Departments', this.opts)
  }

  RecruitCreate(data: Object): Observable<any> {
    data = objectToSerialize(data);
    return this.http.post(API_ROOT + 'HotelOrder/Create', data, this.opts)
  }

  RecruitEdit(data: Object): Observable<any> {
    data = objectToSerialize(data);
    return this.http.post(API_ROOT + 'HotelOrder/Update', data, this.opts)
  }

  HotelOrders(GUID, preTime): Observable<any> {
    let transformUrl = `${API_ROOT}HotelOrder/OrderDetail/${GUID}?preTime=${preTime}`.replace(/"/g,"");
    return this.http.post(transformUrl, this.opts)
  }

  DeleteOrder(item): Observable<any> {
    //this.headers.append('Content-Type', 'application/json')
    return this.http.post(API_ROOT + 'HotelOrder/Remove', [item])
  }

  PersonOrders(id): Observable<any> {
    return this.http.post(API_ROOT + 'PersonOrder/Persons/' + id, this.opts)
  }

  OrderUpdate(data: Object): Observable<any> {
    data = objectToSerialize(data);
    return this.http.post(API_ROOT + 'PersonOrder/Update', data, this.opts)
  }
}
