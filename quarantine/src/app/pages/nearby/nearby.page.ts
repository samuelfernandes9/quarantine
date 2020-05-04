import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { HttpClient} from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.page.html',
  styleUrls: ['./nearby.page.scss'],
})
export class NearbyPage implements OnInit {
  tabPart = "medical";
  public location;
  public lat;
  public long;
  public currentCity;
  public currentUserCity;
  public medicalstorelist = [];
  public grocerystorelist = [];
  public searchTerm:string = ""; 
  public shopDetails ;
  locationData: any;
  public backupjsondata:any;
  dummyMessageObject: any
  messagesArray: any;
  constructor(private router : Router,private dataService : DataService,private http : HttpService,private navCtrl: NavController,private storage: Storage,private geolocation: Geolocation,private nativeGeocoder: NativeGeocoder,public httpClient: HttpClient) { }

  ionViewWillEnter()
  {
   this.currentCity = "kalyan"
   this.storage.set("currentCity",this.currentCity);
   this.storage.get('currentCity').then(toc=>{
   this.currentUserCity = toc;
   console.log("currentUserCity", this.currentUserCity)
   })
   this.getGeoLoc();

   this.dummyMessageObject =[{
    type:"reply",
    messege_id:"",
    Shopid:11,
    Userid:666,
    Message:"",
    Attachment:"",
    timestamp:"",
    reply:[
    {
    type: "reply",
    messege_id:"",
    Shopid: 666,
    Userid:"",
    Message: "This is shopkeepers first message",
    Attachment:"",
    timestamp: '2015-03-28T12:00:00Z',
    },
    {
    type:"reply/message",
    messege_id:"",
    Shopid:"",
    Userid:111,
    Message:"This is users first message",
    Attachment:"",
    timestamp:'2015-03-27T12:00:00Z'
    },
    {
      type:"reply/message",
      messege_id:"",
      Shopid:"111",
      Userid: "",
      Message:"This is the shopkeepers second message!",
      Attachment:"",
      timestamp:new Date('2015-03-26T12:00:00Z')
      },
      {
        type:"reply/message",
        messege_id:"",
        Shopid:"",
        Userid:111,
        Message:"This is users second message",
        Attachment:"",
        timestamp:new Date('2015-03-25T12:00:00Z')
        }],
    }]
    
   
  }
  ngOnInit() {
    this.getShopDetails();
  
  }

  getGeoLoc() {
    // debugger;
        this.geolocation.getCurrentPosition().then((resp) => {
          // let loc = {}
          // this.location['latitude'] = resp.coords.latitude;
          // this.location['longitude'] = resp.coords.longitude;
          // console.log(this.location)

          this.lat = resp.coords.latitude;
          this.long = resp.coords.longitude;
          console.log("watchhhh",this.lat,this.long);

          this.getReverseGeoCode(this.lat,this.long);        
        }).catch((error) => {
          console.log('Error getting location', error);
        });
      }

 getReverseGeoCode(lat,long)
{
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
};

this.nativeGeocoder.reverseGeocode(lat, long, options)
  .then((result: NativeGeocoderResult[]) => {

    this.locationData = {
      lat : result[0].latitude,
      long :result[0].longitude,
      country : result[0].countryName,
      // city : result[0].locality,
      city : "kalyan",
      postCode : result[0].postalCode
    }
    
    this.storage.set('locationData',this.locationData)

  })
  .catch((error: any) => console.log(error));
}

getShopDetails(){

  this.httpClient.get("https://us-central1-quarantine-275312.cloudfunctions.net/Shopkeeper?shop_locality="+"kalyan", {
  }).subscribe(data => {

    console.log("SHOPDETAILS",data)

    this.shopDetails = data;

    this.backupjsondata = this.shopDetails['data']

    console.log("backupjsondata",this.backupjsondata)

    console.log("shopDetails", this.shopDetails)

    this.medicalstorelist = this.shopDetails['data'].filter(stat =>  stat.shop_type.includes('medical') )

    console.log("medicalstorelist", this.medicalstorelist)

    this.grocerystorelist = this.shopDetails['data'].filter(stat => stat.shop_type.includes('grocery'))

    console.log("grocerystorelist",this.grocerystorelist)
  
    },error=>{
    });

}




  onchat(data){
console.log("data",data)
console.log("dummy",this.dummyMessageObject[0]['reply'])
if(this.dummyMessageObject[0]['reply'].length > 0)
{
  this.messagesArray = this.dummyMessageObject[0]['reply']
  this.dataService.setData(1,this.messagesArray);
  this.router.navigateByUrl('/chat/1')
}
else
{

}




// this.http.getMessages().subscribe(res=>{
//   console.log("res",res)
// })
// this.navCtrl.navigateForward(["/chat"])


  }


  filterJSONData()
  {   
    console.log(this.searchTerm,this.backupjsondata)

    if(this.searchTerm && this.searchTerm.trim()!='')
    {
      this.medicalstorelist = this.backupjsondata.filter(item =>   {

        return ( String(item['shop_name']).toLowerCase().startsWith(this.searchTerm.toLowerCase()) )
       })
      console.log("New shopDetails",this.medicalstorelist)
    }
   
    
  }
}
