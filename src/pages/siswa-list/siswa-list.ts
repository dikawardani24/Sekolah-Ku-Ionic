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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public startAddSiswaPage() {
    this.navCtrl.push(SiswaFormPage, {
      action: "add_new"
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SiswaListPage');
  }

}
