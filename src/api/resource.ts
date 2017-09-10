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
    this.headers.append('Content-Type', 'application/json')
  }

  interceptor(): RequestOptions {
    const opts: RequestOptions = new RequestOptions()
    opts.headers = this.headers
    this.storage.get('ACCESS_TOKEN').then(res => {
      if (res && !opts.headers.get('Authorization')) {
        opts.headers.append('Authorization',
          'Bearer ' + res)
      }
    });
    return opts;
  }

  //登录请求.
  Login(data: Object): Observable<any> {
    return this.http.post(API_ROOT + 'user/login', JSON.stringify(data), this.interceptor())
  }

  GetArticles(): Observable<any> {
    return this.http.get(API_ROOT + 'articles')
  }

  GetArticle(id): Observable<any> {
    return this.http.get(API_ROOT + 'articles/' + id)
  }

}
