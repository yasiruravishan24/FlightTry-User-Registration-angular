import { Apiuser } from 'src/app/components/signup/apiuser';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin' : 'http://localhost:4200',
    'Access-Control-Allow-Credentials': 'true'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiuserService {

  private apiUrl = 'http://127.0.0.1:8081/v1/api-users';

  private!: String;



  constructor(private http:HttpClient) { }


  searchEmail(email: String) {
    const url = `${this.apiUrl}/email?email=${email}`;
    return this.http.get<any>(url);
  }

  searchHost(host: String) {
    const url = `${this.apiUrl}/host?host=${host}`;
    return this.http.get<any>(url);
  }

  createApiUser(apiuser : Apiuser) : Observable<Apiuser> {
    return this.http.post<Apiuser>(this.apiUrl, apiuser, HttpOptions);
  }
}
