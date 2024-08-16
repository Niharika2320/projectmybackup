
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public serverName=environment.apiUrl;
  constructor(private http: HttpClient, private authService:AuthService) {

   }
 
  getOrderStatus(cargoId:any):Observable<any> {
   
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName+`/api/customer/cargo-status?cargoId=`+cargoId,{headers:headers});
  }
  updateCargoStatus(newStatus:any,cargoId:any):Observable<any> {
  
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.put<any>(this.serverName+'/api/driver/update-cargo-status?cargoId='+cargoId+'&newStatus='+newStatus,{},{headers:headers});
  }
  assignDriver(driverid: any, cargoId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.post<any>(
      `${this.serverName}/api/business/assign-cargo?cargoId=${cargoId}&driverId=${driverid}`,
      {}, // Body
      { headers: headers }
    );
  }
  

  getAssignOrders(driverId:any):Observable<any> {
   
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName+`/api/driver/cargo?driverId=`+driverId,{headers:headers});
  }
  getCargo():Observable<any> {
   
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName+`/api/business/cargo`,{headers:headers});
  }

  getDrivers():Observable<any> {
   
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName+`/api/business/drivers`,{headers:headers});
  }
  addCargo(details:any):Observable<any> {
  
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.post(this.serverName+'/api/business/cargo',details,{headers:headers});
  }
  Login(details:any):Observable<any> {
    
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.serverName+'/api/login',details,{headers:headers});
  }
  registerUser(details:any):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.serverName+'/api/register',details,{headers:headers});
  }
 
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.serverName}/api/register/json`, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
  
}
