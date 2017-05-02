import { Injectable }     from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppCredentialService } from "./app.credential.service";
import md5 from 'md5';
import * as _ from "lodash";
//import { Subject } from 'rxjs/Subject';
//import { AppSnakeBarService } from "./app.snakebar.service";

@Injectable()
export class AppAuthService {
    //private subject = new Subject<any>();
    public token: string;
    private headers: any;
    private options: RequestOptionsArgs;
    constructor(private http: Http, private _credentialService: AppCredentialService) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.options = { headers: this.headers };
    }

    Login(username: string, password: string, versionUrl: string) : Observable<boolean>{
        let options = new RequestOptions(this.options);
        let body = 'token=' + encodeURIComponent(md5(versionUrl)) + '&username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&imei=thinkpad&';
        //console.log(tokenNotExpired());
        return this.http.post(this._credentialService.versionProtocol + '://' + versionUrl + '/mobilep/device/login',body,options)
            // ...and calling .json() on the response to return data
            .map((res:Response) => {
               // let token = res.json() && res.json().token;
                if(this.isJson(res['_body'])){
                    let responseData = res.json();
                    if(_.isObject(responseData)){
                        if(_.has(responseData, 'status')){
                            if(responseData['status'] == 1){
                                if(_.has(responseData, 'token') && responseData['token'] != '') {
                                    let token = "."+btoa(JSON.stringify(responseData['token']))+".";
                                    this.token = responseData['token'];
                                    localStorage.setItem('token', token);
                                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token}));
                                    //this.SnBar.showSuccess(responseData['message'], 'close');
                                    return true;
                                }
                            }else{
                              // this.SnBar.showError(responseData['message'], 'close');
                               this.Logout();
                               return false;
                            }
                        }
                    }
                    responseData = null;
                }
               // this.SnBar.showError('Uncaught Error', 'close');
                this.Logout();
                return false;
            })
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    Logout(message?: string): void {
        // clear token remove user from local storage to log user out
        if(message) {
           // this.SnBar.showError(message, 'close');
        }
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }

    parseUrl(url: string) : string[]{
        let urlArr = [];
        if(url){
            let match = url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
            console.log(match);
        }
        return urlArr;
    }

    isJson(str: any): boolean {
        try
        {
            JSON.parse(str);
            return true;
        }
        catch(e)
        {
            console.log(e);
            return false;
        }
    }
}
