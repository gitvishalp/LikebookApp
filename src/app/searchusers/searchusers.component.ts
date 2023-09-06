import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchusers',
  templateUrl: './searchusers.component.html',
  styleUrls: ['./searchusers.component.css']
})
export class SearchusersComponent implements OnInit {

  users:any=[]
  Message:any;

constructor(private http:HttpClient,private router:Router, private route:ActivatedRoute){ 
}
name= this.route.snapshot.queryParamMap.get("Name");
ngOnInit(): void {
  this.http.get(`http://localhost:8081/v1/user/${this.name}`)
  .subscribe((res: any)=>{
    this.users=res.Data
    if(this.users==null){
      this.Message='No Users found from your search: ' + this.name
    }
    console.log(res.Data)
    this.users.map((itm: any) => {
      if(itm.profile.imageData ==null){
        return;
      }
      itm.profile.imageData = 'data:image/jpeg;base64,' + itm.profile.imageData;
    })
  })
}
}
