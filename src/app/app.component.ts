import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, OnInit } from '@angular/core';
import {  SwPush, SwUpdate } from '@angular/service-worker';
import { interval, Subscription,pipe } from 'rxjs';
import { LogUpdateServiceService } from './log-update-service.service';
import { PushService } from './push.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  emps=[];
  constructor(private hc:HttpClient,
    private updates:SwUpdate,
    private appRef:ApplicationRef,
    private swpush:SwPush,
    private ps:PushService){
  
    
   // this.checkUpdate();
    
  }

  ngOnInit(){
    this.updateClient();
 //   this.pushSubscriptions();
    this.hc.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe(
      res=>this.emps=res
    )
  }

  updateClient(){
   if(this.updates.isEnabled){
    this.updates.available.subscribe((event)=>{
      console.log('current ',event.current,' available ',event.available)
      if(confirm('update available...plz confirm')){
         window.location.reload()
      }
    })
   }
  

  //  this.updates.activated.subscribe((event)=>{
  //    console.log(' current ',event.previous,' previous ',event.previous)
  //  })
  }

  checkUpdate(){
    this.appRef.isStable.subscribe((isStable)=>{
      if(isStable){
        const timeInterval=interval(20000);

        timeInterval.subscribe(()=>{
          this.updates.checkForUpdate().then(()=> console.log("checked"));
          console.log('update checked')
        })
      }
    })
  }

  // pushSubscriptions(){
  //   console.log("helloo")
  //   if(this.swpush.isEnabled){
  //     this.swpush.requestSubscription({
  //       serverPublicKey:"BH5b9AJBp31_-ADygSCFuEEy0gWaRB8gLOtv0OX3azwLS4qkBian-UCXnpwlMdmTW2e5vlY9boFfggPum9gwBS0"
  //     }).then(sub=>{
  //      console.log("sub is ",JSON.stringify(sub))
  //       this.hc.post('/subscribe',sub).subscribe()
        
  //     })
  //     .catch(err=>console.log("err is ",err))
  //   }
   
    
  // }



  sendSub(){
    if(this.swpush.isEnabled){
      this.swpush.requestSubscription({
        serverPublicKey:'BH5b9AJBp31_-ADygSCFuEEy0gWaRB8gLOtv0OX3azwLS4qkBian-UCXnpwlMdmTW2e5vlY9boFfggPum9gwBS0'
      })
    
   .then(sub=>{
      this.ps.postSUbscription(sub).subscribe()
   })
  }
  
  }}
