import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SiswaFormPage } from '../siswa-form/siswa-form';


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
export class LoginPage {
  public username: string
  public password: string

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    
  }

  public login() {
    if (!this.validateAllInput()) return
    
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

  private validateAllInput(): boolean {
    return this.validateUsername() && this.validatePassword()
  }

  private validateUsername(): boolean {
    var username = this.username

    if(username == undefined || username.length == 0) {
      this.showToast('Username masih kosong')
      return false
    } 

    return true
  }

  private validatePassword(): boolean {
    var password = this.password

    if(password == undefined || password.length == 0) {
      this.showToast('Password masih kosong')
      return false
    }

    if(password.length < 6) {
      this.showToast("Password adalah 6 karakter atau lebih")
      return false
    }

    return true
  }

  private showToast(text) {
    var toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    })

    toast.present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
