import { SiswaDatasource } from './../../model/siswa_service';
import { Siswa } from './../../model/siswa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

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
  public id: number
  public namaDepan: string
  public namaBelakang: string
  public noHp: string
  public email: string
  public tglLahir: string
  public alamat: string

  public action: string = 'add_new'

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    
  }

  public simpan() {
    if(!this.validateAllInput()) return
 
    if(this.action == undefined) {
      this.showToast("Gagal memproses permintaan anda")
      return
    }   

    switch(this.action) {
      case 'add_new' : this.saveNewData()
      case 'update' : 
    }
  }

  private updateData() {
    var siswa = new Siswa()
    this.initData(siswa)

    var datasource = new SiswaDatasource()
    datasource.update(siswa)

    this.showToast("Update data berhasil")
  }

  private saveNewData() {
    var siswa = new Siswa()
    this.initData(siswa)
    
    var datasource = new SiswaDatasource()
    datasource.simpan(siswa)
    
    this.showToast(this.namaDepan)
  }

  private initData(siswa: Siswa) {
    siswa.namaDepan = this.namaDepan
    siswa.namaBelakang = this.namaBelakang
    siswa.noHp = this.noHp
    siswa.email = this.email
    siswa.tglLahir = this.tglLahir
    siswa.gender = "Pria"
    siswa.hobi = "Membaca"
    siswa.alamat = this.alamat
  }

  private validateAllInput(): boolean {
    return this.validateNamaDepan() && 
      this.validateNamaBelakang() &&
      this.validateNoHP() && 
      this.validateEmail() &&
      this.validateAlamat()
  }

  private validateNamaDepan(): boolean {
    var namaDepan = this.namaDepan

    if(this.isEmpty(namaDepan)) {
      this.showToast("Nama depan masih kosong")
      return false
    } 

    if(!this.isNameValid(namaDepan)) {
      this.showToast("Nama depan tidak boleh terdiri dari karakter special dan juga angka")
      return false
    }

    return true
  }

  private validateNamaBelakang(): boolean {
    var namaBelakang = this.namaBelakang

    if(this.isEmpty(namaBelakang)) {
      this.showToast("Nama belakang masih kosong")
      return false
    } 

    if(!this.isNameValid(namaBelakang)) {
      this.showToast("Nama belakang tidak boleh terdiri dari karakter specialdan juga angka")
      return false
    }

    return true
  }

  private validateNoHP(): boolean {
    var noHp = this.noHp

    if(this.isEmpty(noHp)) {
      this.showToast("No. HP masih kosong")
      return false
    }

    
    if(!this.isOnlyContainNumber(noHp)) {
      this.showToast("No. Hp hanya boleh angka")
      return false
    }

    if(noHp.length < 12) {
      this.showToast("No. HP tidak valid")
      return false
    }

    return true
  }

  private validateEmail(): boolean {
    var email = this.email;
    if(this.isEmpty(email)) {
      this.showToast("Email masih kosong")
      return false
    }

    var valid = false
    for(var i=0; i<email.length; i++) {
      var char =  email.substr(i, 1)

      if(char == '@') {
        valid = true
        break
      }
    }

    if(!valid) {
      this.showToast("Format email tidak valid")
      return false
    }

    return true
  }

  private validateTglLahir(): boolean {
    var tglLahir = this.tglLahir
    if(this.isEmpty(tglLahir)) {
      this.showToast("Tanggal lahir masih kosong")
      return false
    }

    return true
  }

  private validateAlamat(): boolean {
    var alamat = this.alamat
    if(this.isEmpty(alamat)) {
      this.showToast("Alamat masih kosong")
      return false
    }

    return true
  }

  private isOnlyContainNumber(text: string) {
    const forbiddenChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+=|\/[]?><`~\'\'""'
    return !this.isContainForbiddenChar(text, forbiddenChars)
  }

  private isNameValid(name: string) {
    const forbiddenChars = '!@#$%^&*()_+=|\/[]?><`~\'\'""1234567890'

    return !this.isContainForbiddenChar(name, forbiddenChars)
  }

  /**
   * This function is to check wheter the given text is contain one character from 
   * forbidden collection of character
   * @param text to check
   * @param forbiddenChars the forbidden chars collection to be matched 
   */
  private isContainForbiddenChar(text: string, forbiddenChars: string): boolean {

    if(text == undefined) return true

    for(var i=0; i<text.length; i++) {
      for(var j=0; j<forbiddenChars.length; j++) {
        var char = text.substr(i, 1)

        if (char == forbiddenChars[j]) {
          return true
        }
      }
    }

    return false
  }

  private isEmpty(text: string): boolean {
    return text == undefined || text.length <= 0
  }

  private showToast(text) {
    var toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    })

    toast.present()
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SiswaFormPage');
  }
}
