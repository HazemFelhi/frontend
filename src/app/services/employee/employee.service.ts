import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee'; // Replace 'Employee' with the correct interface for your Employee model

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8087'; // Update the port number to match your backend

  constructor(private http: HttpClient) { }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/employees`, employee);
  }

  deleteEmployee(idEmploye: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/employees/${idEmploye}`);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`);
  }
  getEmployesByEntreprise(entrepriseId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees/entreprise/${entrepriseId}`);
  }
  getEmployeeByEmail(email: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/employees/email/${email}`);
  }
  getEmployeeById(idEmploye: string): Observable<Employee | null> {
    return this.http.get<Employee>(`${this.baseUrl}/employees/${idEmploye}`);
  }

 

}
