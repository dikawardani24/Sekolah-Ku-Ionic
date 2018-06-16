import { SQLite } from '@ionic-native/sqlite';
import { SiswaDatasource } from './../../services/siswa_service';
import { SiswaFormPage } from './../siswa-form/siswa-form';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SiswaListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-siswa-list',
  templateUrl: 'siswa-list.html',
})
export class SiswaListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite) {
  }

  public startAddSiswaPage() {
    this.navCtrl.push(SiswaFormPage, {
      action: "add_new"
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SiswaListPage');

    try {
      var datasource = new SiswaDatasource(this.sqlite)
      var siswaList = datasource.getAll()

      siswaList.forEach(siswa => {
        console.log(siswa.namaDepan)
      });
    } catch (error) {
      console.log(error)
    }
  }

}
