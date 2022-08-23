import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessageDTO } from '../entities/chat-message-dto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiurl: string = "http://localhost:8088";
  

  constructor(private http:HttpClient) { }

  listechat() {
    return this.http.get<ChatMessageDTO[]>(this.apiurl + "/chat")
  }

  addNewChat(chat :ChatMessageDTO): Observable<ChatMessageDTO>{
    return this.http.post<ChatMessageDTO>(
      this.apiurl + "/chat", chat) ;
  }
}
