import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatMessageDTO } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/chat-message-dto';
import { User } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/User';
import { ChatService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/chat.service';
import { WebSocketService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/web-socket.service';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user:User;
  paramurl:any;
  date!: Date;
  messages:any;
  
  data:any;
  constructor(public webSocketService: WebSocketService,public service :ChatService ,
              private Activated:ActivatedRoute,
              private tokenService:TokenStorageService) {

  }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();




  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendMessage() {
    this.date=new Date();
    
    //this.service.getUserByID(Math.floor(Math.random()*this.users.length)).subscribe((res:User)=> this.user = res);
let user = this.tokenService.getUser();
      const chatMessageDto = new ChatMessageDTO(
        user,
        this.date,
        this.messages
        );
    this.service.addNewChat(chatMessageDto).subscribe();
      this.webSocketService.sendMessage(chatMessageDto);
      this.messages = '';

  }

}
