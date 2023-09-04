import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private baseUrl = 'http://localhost:8087'; 

  constructor(private http: HttpClient) { }

  searchUsersByEmail(email: string, exact: boolean): Observable<any[]> {
    const url = `${this.baseUrl}/search/user?email=${email}&exact=${exact}`;
    return this.http.get<any[]>(url);
  }
}

export interface UserRepresentation {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  attributes: JSON
}
