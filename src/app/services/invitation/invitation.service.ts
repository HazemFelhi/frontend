import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invitation } from './invitation';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private baseUrl = 'http://localhost:8085'; // URL of your backend on port 8085

  constructor(private http: HttpClient) { }

  getInvitationById(id_invitation: number): Observable<Invitation> {
    return this.http.get<Invitation>(`${this.baseUrl}/invitations/${id_invitation}`);
  }

  createInvitation(invitation: Invitation): Observable<Invitation> {
    return this.http.post<Invitation>(`${this.baseUrl}/invitations`, invitation);
  }

  getAllInvitations(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(`${this.baseUrl}/invitations`);
  }

  rejectInvitation(id_invitation: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/invitations/${id_invitation}/reject`);
  }

  acceptInvitation(id_invitation: number): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/invitations/${id_invitation}/accept`,
      {}
    );
  }

  getInvitationsByEntreprise(entrepriseId: number): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(`${this.baseUrl}/invitations/inv/${entrepriseId}`);
  }

}
