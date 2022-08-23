import { Injectable } from '@angular/core';
import { ChatMessageDTO } from '../entities/chat-message-dto';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!: WebSocket;

  chatMessages:  ChatMessageDTO[] = [];


  constructor(private chatS: ChatService) {
    this.chatS.listechat().subscribe(x=> {
      x.forEach(y => this.chatMessages.push(y))
    });
  }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws:localhost:8088/data');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      /*this.chaja3ni.listechat()*/
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDTO){
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
