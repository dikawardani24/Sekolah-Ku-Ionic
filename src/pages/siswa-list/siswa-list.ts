import { AlertHelper } from './../../util/component-helper';
import { DetailSiswaPage } from './../detail-siswa/detail-siswa';
import { Siswa } from './../../models/siswa';
import { SiswaDatasource } from './../../services/siswa_service';
import { SiswaFormPage } from './../siswa-form/siswa-form';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController } from 'ionic-angular';

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

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, 
    private toastCtrl: ToastController) {
  }

  private loadData() {
    var self = this
    var datasource = new SiswaDatasource()
    datasource.getAll({
      run(data: Array<Siswa>) {
        self.siswaList = data
      }
    })
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

  public showConfirmationDelete(siswa: Siswa) {
    var fullName = siswa.namaDepan + " " + siswa.namaBelakang
    var self = this
    const prompt = this.alertCtrl.create({
      title: 'Hapus Data Siswa',
      message: "Apakah anda yakin akan menghapus data siswa dengan nama : " + fullName,
      buttons: [
        {
          text: 'Batal',
          handler: data => {
            console.log('Batal clicked : ', data);
          }
        },
        {
          text: 'Hapus',
          handler: data => {
            console.log('Hapus clicked : ', data);
            self.delete(siswa)
          }
        }
      ]
    });
    prompt.present();
  }

  private delete(siswa: Siswa) {
    var self = this
    var dataSource = new SiswaDatasource()

    dataSource.delete(siswa, {
      run(isDeleted: Boolean) {
        if (isDeleted) {
          var index = self.siswaList.indexOf(siswa)
          self.siswaList.splice(index, 1)
        } else {
          AlertHelper.showBottomToast("Data siswa gagal dihapus", self.toastCtrl)
        }
      }
    })
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

  ionViewWillEnter() {
    console.log("ionViewWillEnter SiswaListPage")
    this.loadData()
  }
}
