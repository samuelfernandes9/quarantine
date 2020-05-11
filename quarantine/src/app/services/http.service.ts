import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  options =
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
  donationData: any;

  constructor(private http: HttpClient) { }

  getDonations()
  {
    return this.http.get('https://us-central1-quarantine-275006.cloudfunctions.net/function-1')
  }

  sendMessage(body) 
  {
    let options =
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    return this.http.post('https://us-central1-quarantine-13853.cloudfunctions.net/messages',body,options)
  }

  helpPost(body)
  {
    return this.http.post('https://us-central1-quarantine-276114.cloudfunctions.net/helpapi',body,this.options)
  }

  postsGet(uID)
  {
    return this.http.get('https://us-central1-quarantine-276114.cloudfunctions.net/helpapi?user_id='+uID)
  }

  resolvePut(body)
  {
    return this.http.put('https://us-central1-quarantine-276114.cloudfunctions.net/helpapi',body,this.options)
  }
}
