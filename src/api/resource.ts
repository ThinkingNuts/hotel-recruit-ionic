import { Injectable, Inject } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs'
import { API_ROOT } from './config'
import { objectToSerialize } from '../utils'
 
@Injectable()
export class ResourceService {

  headers: Headers = new Headers()
  opts: RequestOptions = new RequestOptions()
  preTime: Date

  constructor(public http: Http, public storage: Storage) {
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
    return this.http.post(API_ROOT + 'api/HotelLogin', data, this.opts)
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

  // 酒店发布用工
  RecruitCreate(data: Object): Observable<any> {
    //this.opts.headers.append('Content-Type', 'application/x-www-form-urlencoded')
    //data = objectToSerialize(data);
    return this.http.post(API_ROOT + 'api/HotelWorkOrder', data, this.opts)
  }

  RecruitEdit(data: Object): Observable<any> {
    data = objectToSerialize(data);
    return this.http.post(API_ROOT + 'HotelOrder/Update', data, this.opts)
  }

  HotelOrders(GUID: string, preTime): Observable<any> {
    let transformUrl = `${API_ROOT}api/HotelWorkOrder?HotelGUID=${GUID}&PreTime=${preTime}&OrderType=1`.replace(/"/g,"");
    return this.http.get(transformUrl, this.opts)
  }

  DeleteOrder(item): Observable<any> {
    return this.http.post(API_ROOT + 'HotelOrder/Remove', [item])
  }

  PersonOrders(id): Observable<any> {
    return this.http.get(API_ROOT + 'api/HotelOrderPerson/' + id, this.opts)
  }
  
  // 酒店更新用户申请状态
  OrderUpdate(GUID: string, data: Object): Observable<any> {
    return this.http.put(API_ROOT + 'api/HotelWorkOrder/' + GUID, data, this.opts)
  }

  // 获取酒店用工列表
  HotelEmploy(GUID: string): Observable<any> {
    return this.http.get(`${API_ROOT}api/HotelEmploy/${GUID}`.replace(/"/g,""), this.opts)
  }

  HotelEmployUpdate(GUID: string, data: Object): Observable<any> {
    return this.http.put(`${API_ROOT}api/HotelEmploy/${GUID}`.replace(/"/g,""), data, this.opts)
  }
  
  // 修改密码
  UpdatePassword(id: string, data: Object): Observable<any> {
    return this.http.put(`${API_ROOT}api/HotelLogin/${id}`.replace(/"/g,""), data, this.opts)
  }

  // 获取酒店所有消息
  HotelMessage(GUID: string): Observable<any> {
    return this.http.get(`${API_ROOT}api/HotelMessage/${GUID}`.replace(/"/g,""), this.opts)
  }

  // 获取酒店评价
  GetEvaluates(GUID: string): Observable<any> {
    return this.http.get(`${API_ROOT}api/HotelEvaluate/${GUID}`.replace(/"/g,""), this.opts)
  }

  // 酒店用工上下线
  HotelOrderOnline(data, GUID: string): Observable<any> {
    this.headers.append('Content-Type', 'application/json')
    return this.http.put(`${API_ROOT}api/HotelOrderOnline/${GUID}`.replace(/"/g,""), data, this.opts)
  }

  // 工人的评价
  PersonEvaluate(GUID: string): Observable<any> {
    return this.http.get(`${API_ROOT}api/PersonEvaluate/${GUID}`.replace(/"/g,""), this.opts)
  }
}
