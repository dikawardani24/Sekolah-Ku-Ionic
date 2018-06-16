import { ToastController } from 'ionic-angular';

export class AlertHelper {
    public static showToast(text: string, toastCtrl: ToastController) {
        var toast = toastCtrl.create({
            message: text,
            duration: 3000
          })
      
          toast.present()   
    }
}