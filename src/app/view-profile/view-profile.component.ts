import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit{
user:any={}
FriendId:any;
addResonse:any={}
constructor(private http:HttpClient,private router:Router, private route:ActivatedRoute){

}
 userId= this.route.snapshot.queryParamMap.get("UserId");
 mail = this.route.snapshot.queryParamMap.get("Email");
 token = this.route.snapshot.queryParamMap.get("token");
  ngOnInit(): void {
    this.http.get(`http://localhost:8081/v1/user/user/${this.userId}`)
      .subscribe((res: any)=>{
        this.user=res.Data
        console.log(this.user)
        this.user.profile.imageData = 'data:image/jpeg;base64,' + this.user.profile.imageData;
      })  
  }   

  addFriend(Id:any){
    this.FriendId = Id
    const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
    this.http.post(`http://localhost:8081/v1/friend/add-friend/${this.FriendId}`,null,{headers:header})
    .subscribe(res=>{
      this.addResonse=res
      console.log(this.addResonse)
    })
    this.router.navigate(['/suggest'],{queryParams:{Email:this.mail,token:this.token}}).then(()=>{
      window.location.reload()  
    })
  }
}
