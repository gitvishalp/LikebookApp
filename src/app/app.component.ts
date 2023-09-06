import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchusersComponent } from './searchusers/searchusers.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LikebookApp';
  show=false;
  constructor(private router:Router){
  }
  ngOnInit(): void {
      this.show=true;
  }
  hide(){
    this.show=false;
    this.router.navigate(['/loginsignup']);
  }
  onSearchUser(requesbody:{Name:String}){
    this.router.navigate(['/search'],{queryParams:{Name:requesbody.Name}}).then(()=>{
      window.location.reload()  
    })
  }
}
