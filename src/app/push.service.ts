import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private hc:HttpClient) { }

  postSUbscription(sub:PushSubscription){
    return this.hc.post('/subs',sub).pipe()
  }
}
