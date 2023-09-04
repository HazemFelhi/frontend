import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from './document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'http://localhost:9191'; // URL du backend Java

  constructor(private http: HttpClient) { }

  getDocumentById(id_document: String): Observable<Document> {
    return this.http.get<Document>(`${this.baseUrl}/documents/${id_document}`);
  }

  /*uploadDocument(document: Document, entrepriseId: number): Observable<any> {
    // Append the entrepriseId as a query parameter to the API URL
    const url = `${this.baseUrl}/documents/addDocument?entrepriseId=${entrepriseId}`;
    return this.http.post(url, document);
  } */

  uploadDocument(file: File, entrepriseId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fichier', file, file.name);

    const url = `${this.baseUrl}/documents/addDocument?entrepriseId=${entrepriseId}`;

    return this.http.post(url, formData, {
      responseType: 'text', 
      headers: new HttpHeaders({ 'enctype': 'multipart/form-data' }) 
    });
  }


  
  updateDocument(id_document: String, document: Document): Observable<Document> {
    return this.http.put<Document>(`${this.baseUrl}/documents/${id_document}`, document);
  }

  deleteDocument(id_document: String): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/documents/delete/${id_document}` ,{observe:'response'});
  }


  getDocumentsByEnterprise(entrepriseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/documents/doc/${entrepriseId}`);
  }
  getAllDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.baseUrl}/documents`);
  }



  changeDocumentStatus(id_document: string,  document_status: string): Observable<any> {
    const url = `${this.baseUrl}/documents/changeDocumentStatus/${id_document}`;

 
    return this.http.put(url, {},  { params: { document_status : document_status } ,observe:'response'} 
    ) 
  }





  
}
