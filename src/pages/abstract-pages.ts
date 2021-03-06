import { AlertHelper } from './../util/component-helper';
import { NavController, NavParams, ToastController } from "ionic-angular";
import { StringHelper } from "../util/string-helper";

export abstract class InputPage {
    constructor(protected navCtrl: NavController, protected navParams: NavParams, 
        private toastCtrl: ToastController) {
        
    }

    protected abstract validateAllInput(): boolean;
    protected abstract onInputValidated()

    public confirmAction() {
        var valid = this.validateAllInput()

        console.log("Is All Input Valid ? ", valid)
        if(valid) {
            this.onInputValidated()
        }
    }

    protected isEmpty(text: string): boolean {
        return StringHelper.isEmpty(text)
    }

    protected showBottomToast(text: string) {
        AlertHelper.showBottomToast(text, this.toastCtrl)
    }

    protected showUpToast(text: string) {
        AlertHelper.showUpToast(text, this.toastCtrl)
    }

    protected showMiddleToast(text: string) {
        AlertHelper.showMiddleToast(text, this.toastCtrl)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Page');
    }
}