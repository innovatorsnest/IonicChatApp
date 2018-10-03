import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController, ToastController } from 'ionic-angular';
import {Socket} from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';


/**
 * Generated class for the ChatRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {

  message = '';
  messages = [];
  nickname = '';
  chatLeave :Boolean = false;


  constructor(public navCtrl: NavController
    , public navParams: NavParams,
     public viewCtrl: ViewController,
     public socket: Socket,
     public toastCtrl: ToastController
    ) {

      this.nickname = this.navParams.get('nickname');


      // get users
      this.getUsers().subscribe((getUsers) => {
        console.log('gettting userds');
        let user = getUsers['user'];
        if(getUsers['event'] === 'left')
        {
          this.showToast('User left'+ user);
        }
        else
        {
          this.showToast('User joined'+ user);
        }


      })


      // get Messages and show toast

      this.getMessage().subscribe((getMessage)=>{
        this.messages.push(getMessage);
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatRoomPage');
    console.log('lets get started ChatRoomPage');
    this.viewCtrl.showBackButton(false);
  }





  getMessage() {

    let observable = new Observable((observer)=>{
      this.socket.on('message', function(data){
        observer.next(data);
      })
    })

    return observable;

  }

  sendMessage() {

     this.socket.emit('add-message', {text: this.message});
     this.message = '';
  }


  getUsers(){
    let observable = new Observable((observer) =>{
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      })
    })

    return observable;
  }

  showToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    })

    toast.present();


  }


  leaveRoom(){
    this.socket.disconnect();
    this.navCtrl.setRoot(HomePage);
  }


}
