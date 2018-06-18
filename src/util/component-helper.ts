import { ToastController, AlertController } from 'ionic-angular';

export class AlertHelper {
    public static showBottomToast(text: string, toastCtrl: ToastController) {
        this.showToast('bottom', text, toastCtrl)
    }

    public static showUpToast(text: string, toastCtrl: ToastController) {
        this.showToast('top', text, toastCtrl)
    }

    public static showMiddleToast(text: string, toastCtrl: ToastController) {
        this.showToast('middle', text, toastCtrl)
    }

    public static showToast(location: string, text: string, toastCtrl: ToastController) {
        var toast = toastCtrl.create({
            message: text,
            duration: 3000,
            position: location
        })

        toast.present()
    }

    public static showMessageDialog(title: string, message: string, alertCtrl: AlertController) {
        const prompt = alertCtrl.create({
            title: title,
            message: message
        })

        prompt.present();
    }

}