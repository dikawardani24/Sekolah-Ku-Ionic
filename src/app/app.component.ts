import { DatabaseHelper, RunOnPromise } from './../services/database_helper';
import { LoginPage } from './../pages/login/login';
import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, alertCtrl: AlertController) {
    platform.ready().then(() => {
      const runOnPromise: RunOnPromise<Boolean> = {
        run(created: boolean) {
          if (!created) {
            const prompt = alertCtrl.create({
              title: "Upps...",
              message: "Tidak Dapat Membuat Database"
            })

            prompt.present();
          }

          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar.styleBlackTranslucent();

          console.log("Closing the splash")
          splashScreen.hide();
        }
      }

      new DatabaseHelper().createTables(runOnPromise)
    });
  }
}

