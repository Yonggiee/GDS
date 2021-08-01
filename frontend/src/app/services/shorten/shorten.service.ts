import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl, httpOptions } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class ShortenService {

  constructor(private http: HttpClient)  { }

  postShortenUrl(url: string): Observable<any> {
    const params = new HttpParams().set('url', url);
    return this.http.post(baseurl + '/shorten?url=' + url, httpOptions);
  }

  getDecodedUrl(url: string): Observable<any> {
    const params = new HttpParams().set('url', url);
    return this.http.get(baseurl + '/shorten?url=' + url, httpOptions);
  }
}
