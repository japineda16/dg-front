import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  getQuery(url: string, headers?: any, ): Observable<any> {
    return this.http.get(environment.endpoint + url, headers);
  }

  postQuery(url: string, body: JSON, headers: any): Observable<any> {
    return this.http.post(environment.endpoint + url, body, headers);
  }

  putQuery(url: string, body: JSON, headers: any): Observable<any> {
    return this.http.put(environment.endpoint + url, body, headers);
  }

  deleteQuery(url: string): Observable<any> {
    return this.http.delete(environment.endpoint + url);
  }
}
