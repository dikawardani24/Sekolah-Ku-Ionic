import { DetailSiswaPage } from './../detail-siswa/detail-siswa';
import { Siswa } from './../../models/siswa';
import { SiswaDatasource, RunOnPromise } from './../../services/siswa_service';
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
  public siswaList: Array<Siswa> = []

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  private loadData() {
    var datasource = new SiswaDatasource()
    var self = this
    var runOnPromise: RunOnPromise<Array<Siswa>> = {
      run(data: Array<Siswa>) {

        self.siswaList = data
        console.log("ON LIST DATA ", self.siswaList.length)
        self.siswaList.forEach(siswa => {
          console.log(JSON.stringify(siswa))
        })
      }
    }

    datasource.getAll(runOnPromise)
  }

  public startAddSiswaPage() {
    this.navCtrl.push(SiswaFormPage, {
      action: "add_new"
    })
  }

  public startUpdatePageOf(siswa: Siswa) {
    this.navCtrl.push(SiswaFormPage, {
      "siswa": siswa,
      "action": "update"
    })
  }

  public deleteData(siswa: Siswa) {
    
  }

  public viewDetailSiswa(siswa: Siswa) {
    this.navCtrl.push(DetailSiswaPage, {
      "siswa": siswa
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SiswaListPage');
    this.loadData()
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter SiswaListPage")
    this.loadData()
  }
}
