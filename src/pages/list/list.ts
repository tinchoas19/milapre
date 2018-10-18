import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'front',
    tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1
  };

  // picture options
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }

  constructor(private cameraPreview: CameraPreview, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
    setTimeout(() => {
      this.presentLoadingDefault();
    }, 6000);
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Estamos validando...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.push(HomePage);
    }, 5000);
  }


  takePhoto() {
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {

      this.navCtrl.push(HomePage, imageData);

    }, (err) => {

    });
  }
}
