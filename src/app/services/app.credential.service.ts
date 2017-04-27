import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppCredentialService {
    public versionUrl: string = '';
    public token: string = '';
    public authToken: string = '';
    public versionProtocol: string = 'http';
    public protocolList: any[] = [
        {'protocol': 'http'},
        {'protocol':'https'}
    ];

    constructor() {}

}