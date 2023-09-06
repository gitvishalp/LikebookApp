import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suggestfriend',
  templateUrl: './suggestfriend.component.html',
  styleUrls: ['./suggestfriend.component.css']
})
export class SuggestfriendComponent implements OnInit {
  users:any=[]
  friends:any=[]
  addResonse: any;
  removeResponse:any
  imageName: any;
  FriendId:String=''
  Message=false;
  Message2=false;
  constructor(private http:HttpClient, private router:Router, private route:ActivatedRoute){

  }
  mail= this.route.snapshot.queryParamMap.get("Email");
  token = this.route.snapshot.queryParamMap.get("token");
  ngOnInit(): void {
    if(this.token==null){
      this.router.navigate(['/loginsignup']);
    }
    const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
    this.http.get('http://localhost:8081/v1/friend/suggest',{headers:header})
      .subscribe((res: any)=>{
        this.users=res.Data
        console.log(res.Data)
        this.users.map((itm: any) => {
          itm.profile.imageData = 'data:image/jpeg;base64,' + itm.profile.imageData;
        })
      })
    this.http.get('http://localhost:8081/v1/friend/my-friends',{headers:header})
    .subscribe((res:any)=>{
    this.friends=res.Data
    this.friends.map((itm:any)=>{
      itm.friend.profile.imageData = 'data:image/jpeg;base64,' + itm.friend.profile.imageData
    })
    })
  }
addFriend(Id:any){
  this.FriendId = Id
  const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
  this.http.post(`http://localhost:8081/v1/friend/add-friend/${this.FriendId}`,null,{headers:header})
  .subscribe(res=>{
    this.addResonse=res
    this.Message=true
    console.log(this.addResonse)
  })
  this.router.navigate(['/suggest'],{queryParams:{Email:this.mail,token:this.token}}).then(()=>{
    window.location.reload()  
  })
}
removeFriend(Id:any){
  this.FriendId=Id
  const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
  this.http.delete(`http://localhost:8081/v1/friend/${this.FriendId}`,{headers:header})
  .subscribe(res=>{
    this.removeResponse=res
    this.Message2=true
    console.log(this.removeResponse)
  })
  this.router.navigate(['/suggest'],{queryParams:{Email:this.mail,token:this.token}}).then(()=>{
    window.location.reload()  
  })
}
  friend(){
    this.router.navigate(['/suggest'],{queryParams:{Email:this.mail,token:this.token}})
  }
  profile(){
    this.router.navigate(['/profile'],{queryParams:{Email:this.mail,token:this.token}})
  }
  dashboard(){
    this.router.navigate(['/dashboard'],{queryParams:{Email:this.mail, token:this.token}})
    }
    notification(){
      this.router.navigate(['/notification'],{queryParams:{Email:this.mail, token:this.token}})
    }
}
