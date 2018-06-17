import { DetailSiswaPage } from './../pages/detail-siswa/detail-siswa';
import { SiswaListPage } from './../pages/siswa-list/siswa-list';
import { SiswaFormPage } from './../pages/siswa-form/siswa-form';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite'

import { MyApp } from './app.component';

@NgModule({
  declarations: [
  
    MyApp,
    LoginPage, 
    SiswaListPage,
    SiswaFormPage, 
    DetailSiswaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage, 
    SiswaListPage, 
    SiswaFormPage, 
    DetailSiswaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
