// File: service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from './service'; // Assurez-vous d'importer le modèle correct

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = 'http://localhost:8089/services'; // URL du backend Java

  constructor(private http: HttpClient) { }

  createService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.baseUrl, service);
  }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.baseUrl);
  }

  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.baseUrl}/${id}`);
  }

  updateService(id: number, service: Service): Observable<Service> {
    return this.http.put<Service>(`${this.baseUrl}/${id}`, service);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getServicesByCategorie(nomCategorie: string): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/categorie/${nomCategorie}`);
  }
}
