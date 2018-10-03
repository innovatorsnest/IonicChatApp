import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatRoomPage } from '../pages/chat-room/chat-room';

// socket io configurations
import {SocketIoModule , SocketIoConfig} from 'ng-socket-io';

const socketConfig : SocketIoConfig =  {url: 'http://ec2-13-233-114-226.ap-south-1.compute.amazonaws.com/' , options: {}}
// pass the port of the server running the nodejs code

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatRoomPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(socketConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChatRoomPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
