import { Injectable } from "@angular/core";
import { Platform, ToastController } from "ionic-angular";
import { Network } from "@ionic-native/network";
import { AppMinimize } from "@ionic-native/app-minimize";
import { Toast } from "@ionic-native/toast";

@Injectable()
export class NativeService {
  constructor(
      private platform: Platform,
      private network: Network,
      private appMinimize: AppMinimize,
      private toast: Toast,
      private toastCtrl: ToastController,
  ) {
  }

  /**
   * 是否真机环境
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   */
  getNetworkType(): string {
    if (!this.isMobile()) {
      return 'wifi';
    }
    return this.network.type;
  }

  /**
   * 判断是否有网络
   */
  isConnecting(): boolean {
    return this.getNetworkType() != 'none';
  }

  /**
   * 是否android真机环境
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 调用最小化app插件
   */
  minimize(): void {
    this.appMinimize.minimize()
  }

    /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  showToast(message: string = '操作完成', duration: number = 2000): void {
    if (this.isMobile()) {
      this.toast.show(message, String(duration), 'center').subscribe();
    } else {
      this.toastCtrl.create({
        message: message,
        duration: duration,
        position: 'middle',
        showCloseButton: false
      }).present();
    }
  };
}