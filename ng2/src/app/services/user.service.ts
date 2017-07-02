import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Rx';

@Injectable()
export class UserService {

  public user: Subject<IUser> = new Subject();
  private _user: IUser;

  constructor (private http: Http) {
  }

  public login (htlid: string, password: string): Promise<IUser> {
    // return Promise.reject(new Error('not implemented yet'));
    return new Promise( (resolve, reject) => {
       const headers = new Headers({ 'Content-Type': 'application/json' });
       const options = new RequestOptions({ headers: headers });
       this.http.post('http://localhost:8080/login', { htlid: htlid, password: password}, options).toPromise()
        .then( response => {
          this._user = (response.json() as IUser);
          this.user.next(this._user);
          resolve(response.json() as IUser);
        })
      .catch( error => {
        console.log(error);
        let errMsg = '?';
        if (error instanceof Response) {
          const status = (error as Response).status;
          errMsg = status === 0 ? 'cannot connect server' : 'HTTP-Status ' + status;
        } else {
          errMsg = '?';
        }
        reject(new Error('login() fails (' + errMsg + ')'));
      });
    });

  }

}


export interface IUser {
  htlid: string;
  surname: string;
  firstname: string;
}