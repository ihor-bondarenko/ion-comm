import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AppAuthService } from '../../app/services/app.auth.service';

@Component({
    templateUrl: 'login.html',
})
export class LoginPage {
    loading: Loading;
    registerCredentials = { email: '', password: '' };

    constructor(private nav: NavController, private auth: AppAuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

    public createAccount() {
        this.nav.push('RegisterPage');
    }

    public login() {
        this.showLoading()

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