import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Http } from "@angular/http";
//import './rxjs-operators';

@Component({
    selector: 'my-home',
    templateUrl: 'components/home/home.component.html',
    styleUrls: ['components/home/home.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    name: string = "Home";
    users: {};
    
    newName: string = '';
    cityToSearch: string = '';
    errorMessage: string;
    bars: any[] = [];
    isLoading: boolean = false;    

    constructor(private http: Http) {
        console.log("GETTING USERS!");
        
        http.get("/api/user")
            .map(data => data.json())
            .subscribe((data) => this.users = data);
    }
    
    /**
    * Get the names OnInit
    */
    ngOnInit() {
        let previousSearch = Cookie.get('previousSearch');
        console.log('Checking for cookie: ', previousSearch);
    
        if(previousSearch) {
            this.cityToSearch = previousSearch;
            this.getBars(previousSearch);
        } else {
            this.getUserLocation();  
        }
    }    
    
    rsvp(index: any) {
        //console.log("Will RSVP: " , this.bars[index]);
      
        this.http.get('/api/user/authenticated')
            .map(data => data.json())
            .subscribe(
                resp => {
                    //console.log('Authentication response: ', resp);
                    
                    if(!(resp as any).authenticated) {
                      window.location.href = '/auth/twitter';  
                      return false;
                    } else {
                      //console.log('Still rsvping....');
                    
                      let clickedBar = this.bars[index];
                      //console.log('RSVPing for Bar: ', clickedBar);
                    
                      let barId = clickedBar.id;
                      let currentRsvps = 0 + clickedBar.totalRSVPs;
                      currentRsvps++;
                    
                      this.http.get('/api/rsvps/' + barId)
                        .map((res: Response) => res.json())
                        .subscribe(
                            resp => {
                              this.bars[index].totalRSVPs = currentRsvps;
                              this.bars[index].userIsGoing = 1;
                            }
                        );                    
                      
                      return true;
                    }
                }
            );      
    }
    
    cancelRsvp(index: any) {
        let clickedBar = this.bars[index];
        ///console.log('Cancelling RSVP for Bar: ', clickedBar);
        
        let barId = clickedBar.id;
        let currentRsvps = 0 + clickedBar.totalRSVPs;
        currentRsvps--;
        
        this.http.get('/api/rsvps/cancel/' + barId)
            .map((res: Response) => res.json())
            .subscribe(
                resp => {
                    this.bars[index].totalRSVPs = currentRsvps;
                    this.bars[index].userIsGoing = 0; 
                }
            );         
    }
    
    getUserLocation() {
        navigator.geolocation.getCurrentPosition(this.successCallback.bind(this));
    } 
    
    successCallback(position: any) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        let request = new XMLHttpRequest();
        const method = 'GET';
        const url = '//maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
        const async = true;
        
        let address = '';
    
        request.open(method, url, async);
        request.onreadystatechange = () => {
          if(request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.responseText);
            address = data.results[1].formatted_address;
            this.cityToSearch = address;
            this.isLoading = true;
            this.getBars(address); 
          }
        };
        
        request.send();    
    }    
    
    getBars(city: string) {
        // Call getBarsByCity from businessService. Pass in the city to search
        Cookie.set('previousSearch', city);
        
        //console.log("Getting bars for city: ", city);
        
        this.http.get('/api/yelp-search/' + city)
            .map((res: Response) => res.json())
            .subscribe(
                resp => {
                    this.isLoading = false;
                    this.bars = resp;
                }
            );        
    }
  
    search() {
        // Call getBars and add parameter for city
        this.getBars(this.cityToSearch);
    }    
}