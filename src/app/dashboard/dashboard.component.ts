import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoading=false;
  selectedFile:any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any={};
  imageName: any;
  response:any={};
  postResponse:any=[]
  visible:boolean = false;
  likeResponse:any={}
  myResponse:any={}
  comResponse:any={}
  commentsResponse:any=[]
  commentBox=false;
  constructor(private route:ActivatedRoute, private http:HttpClient, private router:Router){
  
   }
   mail= this.route.snapshot.queryParamMap.get("Email");
   token = this.route.snapshot.queryParamMap.get("token");
   ngOnInit(): void {
       if(this.token==null){
        this.router.navigate(['/loginsignup'])
       }
       const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);

       this.http.get('http://localhost:8081/v1/user/download-Pic',{headers:header})
       .subscribe(res=>{
         this.retrieveResonse=res
         if(this.retrieveResonse.Status!==200){
           this.retrievedImage=false
           return;
         }
         this.base64Data = this.retrieveResonse.Data;
         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
       })
       this.http.get('http://localhost:8081/v1/user/user-details',{headers:header})
       .subscribe(res=>{
         this.response=res
       })
       //Make a call to the Spring Boot Application to save the image
       this.http.get('http://localhost:8081/v1/post', { headers:header})
         .subscribe((res:any) => {
          this.postResponse=res.Data
          console.log(this.postResponse)
          if(this.postResponse==null){
            return;
          }
          this.postResponse.map((itm: any) => {
            if(itm.picture ==null){
              return;
            }
            itm.user.profile.imageData = 'data:image/jpeg;base64,' + itm.user.profile.imageData;
            itm.picture = 'data:image/jpeg;base64,' + itm.picture;
          })
         }
         );
   }
   public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  onPost(Request:{caption:any}){
    const uploadImageData = new FormData();
    uploadImageData.append('caption',Request.caption)
    uploadImageData.append('file',this.selectedFile);
    const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
    //Make a call to the Spring Boot Application to save the image
    this.http.post('http://localhost:8081/v1/post', uploadImageData, { headers:header,observe: 'response' })
      .subscribe((res) => {
        this.response=res
        console.log(this.response)
      }
      );
      this.router.navigate(['/dashboard'],{queryParams:{Email:this.mail, token:this.token}}).then(()=>{
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
  like(postId:String){
    const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
    //Make a call to the Spring Boot Application to save the image
    this.http.put(`http://localhost:8081/v1/post/like/${postId}`,null, { headers:header,observe: 'response' })
      .subscribe((res) => {
        this.likeResponse=res
        console.log(this.likeResponse)
      }
      );
      this.router.navigate(['/dashboard'],{queryParams:{Email:this.mail, token:this.token}}).then(()=>{
        window.location.reload()
      })
  }
  onComment(postId:String){
      this.commentBox = !this.commentBox
      const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
    this.http.get(`http://localhost:8081/v1/post/comments/${postId}`, {headers:header})
    .subscribe((res:any)=>{
     this.commentsResponse=res.Data
     console.log(this.commentsResponse)
    })
  }
  comment(formData:{PostId:String,Comment:String},postId:String){
     formData.PostId = postId;
     const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
     this.http.put(`http://localhost:8081/v1/post/comment`,formData, { headers:header,observe: 'response' })
     .subscribe((res)=>{
      this.comResponse=res
      console.log(this.comResponse)
     })
  }
  share(){
    console.log("Shared")
  }
}
