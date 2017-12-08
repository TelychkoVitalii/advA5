import { Injectable } from '@angular/core';
import { RequestOptions, Headers, URLSearchParams, Http } from '@angular/http';
import { apiRoot } from './config/apiConfig';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()

export class AppService {
  results: Object[];
  loading: boolean;

  constructor(private http: Http) {
    this.results = [];
    this.loading = false;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return tokenNotExpired(null, token);
  }

  search(term: string) {
    return new Promise((resolve, reject) => {
      const apiUrl = `${apiRoot.searchUrl}?term=${term}&media=music&limit=20`;
      this.http.get(apiUrl)
        .toPromise()
        .then(
          res => {
            this.results = res.json().results;
            resolve();
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  getItems() {
    console.log('GET');
    const url = `${apiRoot.url}/get`;
    const search = new URLSearchParams();
    search.set('foo', 'moo');
    search.set('limit', '25');
    this.http.get(url, {search}).subscribe(res => console.log(res.json));
  }

  postItems() {
    console.log('POST');
    const url = `${apiRoot.url}/post`;
    this.http.post(url, {moo: 'foo', goo: 'loo'}).subscribe(res => console.log(res.json));
  }

  putItems() {
    console.log('PUT');
    const url = `${apiRoot.url}/put`;
    const search = new URLSearchParams();
    search.set('foo', 'moo');
    search.set('limit', '25');
    this.http.put(url, {moo: 'foo', goo: 'loo'}, search).subscribe(res => console.log(res.json()));
  }

  deleteItems() {
    console.log('DELETE');
    const url = `${apiRoot.url}/delete`;
    const search = new URLSearchParams();
    search.set('foo', 'moo');
    search.set('limit', '25');
    this.http.delete(url, {search}).subscribe(res => console.log(res.json()));
  }

  getAsPromise() {
    console.log('GET AS PROMISE');
    const url = `${apiRoot.url}/get`;
    this.http.get(url)
      .toPromise()
      .then(res => console.log(res.json()));
  }

  promiseError() {
    console.log('GET AS PROMISE ERROR');
    const url = `${apiRoot.url}/post`;
    this.http.get(url)
      .toPromise()
      .then(
        res => console.log(res.json()),
        msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
      );
  }

  obsError() {
    console.log('GET AS OBSERVABLE ERROR');
    const url = `${apiRoot.url}/post`;
    this.http.get(url).subscribe(
      res => console.log(res.json()),
      msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
    );
  }

  withHeaders() {
    console.log('GET WITH HEADERS');
    const headers = new Headers();
    headers.append('Authorization', btoa('username:password'));
    const opts = new RequestOptions();
    opts.headers = headers;
    const url = `${apiRoot.url}/get`;
    this.http.get(url, opts).subscribe(
      res => console.log(res.json()),
      msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
    );
  }
}
