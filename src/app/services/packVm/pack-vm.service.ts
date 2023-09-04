import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PackVm } from './PackVm';

@Injectable({
  providedIn: 'root'
})
export class PackVmService {

  private baseUrl = 'http://localhost:8082'; // URL du backend Java

  constructor(private http: HttpClient) { }

  getPackVmById(id: number): Observable<PackVm> {
    return this.http.get<PackVm>(`${this.baseUrl}/packVms/${id}`);
  }

  createPackVm(packVm: PackVm): Observable<PackVm> {
    return this.http.post<PackVm>(`${this.baseUrl}/packVms`, packVm);
  }

  updatePackVm(id: number, packVm: PackVm): Observable<PackVm> {
    return this.http.put<PackVm>(`${this.baseUrl}/packVms/${id}`, packVm);
  }

  deletePackVm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/packVms/${id}`);
  }

  getAllPackVms(): Observable<PackVm[]> {
    return this.http.get<PackVm[]>(`${this.baseUrl}/packVms`);
  }

  publishPackVm(vm: PackVm): Observable<PackVm> {
    return this.http.post<PackVm>(`${this.baseUrl}/packVms/publish`, vm);
  }

}
