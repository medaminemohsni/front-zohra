import { User } from "./User";

export class ChatMessageDTO {
   
	
	userId:User;
	
	
	message:string;
	
	sendDate:Date = new Date();

    constructor(sender: User,date:Date, messages: string){
	
        this.userId = sender;
        this.sendDate = date;
        this.message = messages;
        
      }
}
