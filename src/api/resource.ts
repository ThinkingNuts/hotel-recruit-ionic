import { Injectable, Inject } from '@angular/core'
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import { Page, Storage, LocalStorage } from 'ionic-angular'
import { Subject, BehaviorSubject, Observable } from 'rxjs'
import * as querystring from 'querystring'
import { API_ROOT } from './config'

@Injectable()
export class ResourceService {

  headers: Headers = new Headers()

  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json')
  }

  interceptor(): RequestOptions {
    const opts:RequestOptions = new RequestOptions()
    opts.headers = this.headers
    const token = window.localStorage.getItem('token')
    if (token && !opts.headers.get('Authorization')) {
      opts.headers.append('Authorization',
        'Bearer ' + token.replace(/(^\")|(\"$)/g, ''))
    }
    return opts
  }

  //登录请求.
  Login(data: Object): Observable<any> {
    return this.http.post(API_ROOT + 'login', JSON.stringify(data), this.interceptor())
  }
}