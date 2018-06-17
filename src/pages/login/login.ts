import { SiswaListPage } from './../siswa-list/siswa-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

    console.log("Username : ", username)
    console.log("Password : ", password)
    console.log("Is Granted ? ", granted)
    if(granted) {
      this.navCtrl.setRoot(SiswaListPage)
    } else {
      this.showBottomToast('Username/Password Salah')
    }
  }

  protected validateAllInput(): boolean {
    return this.validateUsername() && this.validatePassword()
  }

  private validateUsername(): boolean {
    var username = this.username

    if(this.isEmpty(username)) {
      this.showBottomToast('Username masih kosong')
      return false
    } 

    return true
  }

  private validatePassword(): boolean {
    var password = this.password

    if(this.isEmpty(password)) {
      this.showBottomToast('Password masih kosong')
      return false
    }

    if(password.length < 6) {
      this.showBottomToast("Password adalah 6 karakter atau lebih")
      return false
    }

    return true
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
