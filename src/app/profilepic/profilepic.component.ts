import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-profilepic',
  templateUrl: './profilepic.component.html',
  styleUrls: ['./profilepic.component.css']
})
export class ProfilepicComponent {
  selectedFile:any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  response:any={};
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute){

  }
  token= this.route.snapshot.queryParamMap.get("token");
  mail= this.route.snapshot.queryParamMap.get("Email");
  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('productImage',this.selectedFile);
    console.log(uploadImageData)
    const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
    //Make a call to the Spring Boot Application to save the image
    this.http.post('http://localhost:8081/v1/user/upload-pic', uploadImageData, { headers:header,observe: 'response' })
      .subscribe((res) => {
        this.response=res
        if (res.status === 200) {
          this.response.Message = 'Image uploaded successfully';
          this.router.navigate(['/dashboard'],{queryParams:{Email:this.mail, token:this.token}})
        }
      }
      );
        this.response.Message = 'file size should be less than 60kb'
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
