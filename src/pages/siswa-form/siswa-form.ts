import { SiswaListPage } from './../siswa-list/siswa-list';
import { PersonValidatorsHelper } from './../../util/validator-helper';
import { SiswaDatasource } from './../../services/siswa_service';
import { Siswa } from './../../models/siswa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { StringHelper } from '../../util/string-helper';
import { InputPage } from '../abstract-pages';

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
export class SiswaFormPage extends InputPage {
  public title: string
  public id: number
  public namaDepan: string
  public namaBelakang: string
  public noHp: string
  public email: string
  public tglLahir: string
  public alamat: string
  public gender: string = "Pria"
  public jenjang: string = "TK"

  public loveMembaca: boolean
  public loveMenggambar: boolean
  public loveMenulis: boolean

  public action: string = 'add_new'

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    super(navCtrl, navParams, toastCtrl)
  }

  protected onInputValidated() {
    switch (this.action) {
      case 'add_new':
        this.saveNewData()
        break
      case 'update':
        this.updateData()
        break
      default:
        this.showToast("NO ACTION")
        break
    }
  }

  public confirmAction() {
    if (this.action == undefined) {
      this.showToast("Gagal memproses permintaan anda")
      return
    }

    super.confirmAction()
  }

  private updateData() {
    var siswa = this.navParams.get("siswa")
    this.initData(siswa)

    try {
      var datasource = new SiswaDatasource()
      datasource.update(siswa)

      this.showToast("Data berhasil diperbaharui")
      this.navCtrl.setRoot(SiswaListPage)
    } catch (error) {
      this.showToast("Data gagal diperbaharui")
      console.log(error)
    }
  }

  private saveNewData() {
    var siswa = new Siswa()
    this.initData(siswa)

    try {
      var datasource = new SiswaDatasource()
      datasource.save(siswa)

      this.showToast("Data berhasil disimpan !!! " + siswa.hobi)
      this.navCtrl.setRoot(SiswaListPage)
    } catch (error) {
      this.showToast("Data gagal disimpan")
      console.log(error)
    }
  }

  private initData(siswa: Siswa) {
    siswa.namaDepan = this.namaDepan
    siswa.namaBelakang = this.namaBelakang
    siswa.noHp = this.noHp
    siswa.email = this.email
    siswa.tglLahir = this.tglLahir
    siswa.gender = this.gender
    siswa.hobi = this.getSelectedHobies()
    siswa.alamat = this.alamat
    siswa.jenjang = this.jenjang
  }

  private getSelectedHobies(): string {
    var hobies = new Array<string>()

    if (this.loveMembaca) hobies.push("Membaca")

    if (this.loveMenggambar) hobies.push("Menggambar")

    if (this.loveMenulis) hobies.push("Menulis")

    return StringHelper.join(", ", hobies)
  }

  protected validateAllInput(): boolean {
    return this.validateNamaDepan() &&
      this.validateNamaBelakang() &&
      this.validateNoHP() &&
      this.validateTglLahir() &&
      this.validateEmail() &&
      this.validateAlamat()
  }

  private validateNamaDepan(): boolean {
    var namaDepan = this.namaDepan

    if (this.isEmpty(namaDepan)) {
      this.showToast("Nama depan masih kosong")
      return false
    }

    var namaValid = PersonValidatorsHelper.isNameValid(namaDepan)
    if (!namaValid) {
      this.showToast("Nama depan tidak boleh terdiri dari karakter special dan juga angka")
      return false
    }

    return true
  }

  private validateNamaBelakang(): boolean {
    var namaBelakang = this.namaBelakang

    if (this.isEmpty(namaBelakang)) {
      this.showToast("Nama belakang masih kosong")
      return false
    }

    var namaValid = PersonValidatorsHelper.isNameValid(namaBelakang)
    if (!namaValid) {
      this.showToast("Nama belakang tidak boleh terdiri dari karakter specialdan juga angka")
      return false
    }

    return true
  }

  private validateNoHP(): boolean {
    var noHp = this.noHp

    if (this.isEmpty(noHp)) {
      this.showToast("No. HP masih kosong")
      return false
    }

    var isOnlyNumber = PersonValidatorsHelper.isOnlyContainNumber(noHp)
    if (!isOnlyNumber) {
      this.showToast("No. Hp hanya boleh angka")
      return false
    }

    if (noHp.length < 12) {
      this.showToast("No. HP tidak valid")
      return false
    }

    return true
  }

  private validateEmail(): boolean {
    var email = this.email;
    if (this.isEmpty(email)) {
      this.showToast("Email masih kosong")
      return false
    }

    var valid = PersonValidatorsHelper.isEmailValid(email)
    if (!valid) {
      this.showToast("Format email tidak valid")
      return false
    }

    return true
  }

  private validateTglLahir(): boolean {
    var tglLahir = this.tglLahir
    if (this.isEmpty(tglLahir)) {
      this.showToast("Tanggal lahir masih kosong")
      return false
    }

    return true
  }

  private validateAlamat(): boolean {
    var alamat = this.alamat
    if (this.isEmpty(alamat)) {
      this.showToast("Alamat masih kosong")
      return false
    }

    return true
  }

  private viewOldDataSiswa() {
    var siswa:Siswa = this.navParams.get("siswa")
    this.namaDepan = siswa.namaDepan
    this.namaBelakang = siswa.namaBelakang
    this.noHp = siswa.noHp
    this.email = siswa.email
    this.tglLahir = siswa.tglLahir
    this.alamat = siswa.alamat
    this.gender = siswa.gender
    this.jenjang = siswa.jenjang

    var hobi = siswa.hobi
    if (hobi.indexOf("Membaca") >= 0) this.loveMembaca = true
    if (hobi.indexOf("Menulis") >= 0) this.loveMenulis = true
    if (hobi.indexOf("Menggambar") >= 0) this.loveMenggambar = true
  }

  ionViewDidLoad() {
    super.ionViewDidLoad()

    this.action = this.navParams.get("action")
    if (this.action == "add_new") this.title = "Tambah Data Siswa"
    else if (this.action == "update") {
      this.title = "Update Data Siswa"
      this.viewOldDataSiswa()
    }
    else this.title = "Sekolah Ku"
  }
}

