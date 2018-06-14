import { Siswa } from './../../model/siswa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SiswaFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-siswa-form',
  templateUrl: 'siswa-form.html',
})
export class SiswaFormPage {
  public siswa: Siswa

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(this.siswa == undefined) {
      this.siswa = new Siswa()
    }
  }

  public simpan() {
    var siswa = new Siswa()    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SiswaFormPage');
  }

}
