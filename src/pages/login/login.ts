import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AppAuthService } from '../../app/services/app.auth.service';

@Component({
    templateUrl: 'login.html',
})
export class LoginPage {
    loading: Loading;
    registerCredentials = { login: '', password: '', 'versionProtocol': '', 'versionUrl': '' };

    constructor(private nav: NavController, private auth: AppAuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

    public login() {
        this.showLoading();
        this.auth.Login(this.registerCredentials.login, this.registerCredentials.password).subscribe(
            success => {
                console.log(success);
            },
            err => {
                console.log(err);
            }
        );
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    showError(text) {
        this.loading.dismiss();

        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }
}