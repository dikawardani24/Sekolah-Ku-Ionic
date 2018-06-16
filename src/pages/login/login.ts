import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SiswaFormPage } from '../siswa-form/siswa-form';
import { InputPage } from '../abstract-pages';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends InputPage {
  public username: string
  public password: string

  constructor(navCtrl: NavController, navParams: NavParams, toastCtrl: ToastController) {
    super(navCtrl, navParams, toastCtrl)
  }

  protected onInputValidated() {
    var username = this.username
    var password = this.password
    var granted: boolean = username == 'adminn' && password == 'adminn'

    if(granted) {
      this.showToast('Username : '+username+'\n'+'Password : '+password)
      this.navCtrl.setRoot(SiswaFormPage)
    } else {
      this.showToast('Username/Password Salah')
    }
  }

  protected validateAllInput(): boolean {
    return this.validateUsername() && this.validatePassword()
  }

  private validateUsername(): boolean {
    var username = this.username

    if(this.isEmpty(username)) {
      this.showToast('Username masih kosong')
      return false
    } 

    return true
  }

  private validatePassword(): boolean {
    var password = this.password

    if(this.isEmpty(password)) {
      this.showToast('Password masih kosong')
      return false
    }

    if(password.length < 6) {
      this.showToast("Password adalah 6 karakter atau lebih")
      return false
    }

    return true
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
