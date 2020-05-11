import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  postsArray: any
  jsonURL: string;
  userId: number;

  constructor(private http : HttpService) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    
    this.userId = 1;                //this value will be replaced later 
    this.http.postsGet(this.userId).subscribe(res=>{
      if(res)
      {
        console.log("resss",res)
        this.postsArray = res['data']
      }
    })
  
  }

  


  resolve(data)
  { 
    let body = {
      current_company: data.current_company,
      current_designation: data.current_designation,
      delete: data.delete,
      help_for: data.help_for,
      help_id: data.help_id,
      help_info: data.help_info,
      industry: data.industry,
      jobs_user_exp: data.jobs_user_exp,
      jobs_user_name: data.jobs_user_name,
      linked_in_profile_link: data.linked_in_profile_link,
      locality: data.locality,
      phone_no: data.phone_no,
      resolve: true,
      spam: data.spam,
      user_id: data.user_id
        }

       
    
    console.log("data",data)  
    if(!data.resolve)
    {
       this.http.resolvePut(body).subscribe(res=>{
         console.log("responsee",res)
       })
    }  
    else
    {
      console.log("This matter is already resolved")
    }
  }

  delete(data)
  {
    console.log("data",data)
    let body = {
      "resolve" : "",
      "delete"  : true,
      "help_id" : "",
      "user_id" : ""
      }

      let options= {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }

      // this.http.put(this.jsonURL,body,options).subscribe(res=>{
      //   console.log("after put",res)
      // })
  }



}