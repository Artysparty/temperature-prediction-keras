import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  constructor(private http: HttpClient) { }

  upload(file: File): Observable<{message: string}> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.http.post<any>('http://localhost:5000/predict', formData);
  }
}