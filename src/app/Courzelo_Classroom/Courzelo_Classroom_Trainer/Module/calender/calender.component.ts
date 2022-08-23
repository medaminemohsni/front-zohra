
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs';
import { FormationService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/formation.service';
import { MeetingService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/meeting.service';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { Meeting } from 'src/app/Courzelo_Trainer/Classes/Meeting.model';



const colors: any = {
  red: { 
    primary: "#ad2121", 
    secondary: "#FAE3E3" 
  },
  blue: { 
    primary: "#1e90ff", 
    secondary: "#D1E8FF" 
  },
  yellow: { 
    primary: "#e3bc08", 
    secondary: "#FDF1BA" 
  }
};

@Component({
  selector: 'app-calender',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: './calender.component.html',


    })
export class CalenderComponent implements OnInit {

  
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
       
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;
  currentuser:any;
  constructor(private tokenStorageService: TokenStorageService,private modal: NgbModal,private formationService:FormationService,private meetService:MeetingService) {}
  ngOnInit(){

    this.currentuser = this.tokenStorageService.getUser();
    this.GetMeets();

  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    
  }

 

  addEvent(id:any,title:any,start:any,end:any): void {
    
      this.events.push(
      {
        id:id,
        title: title,
        start: startOfDay(start),
        end: endOfDay(end),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        }
      })
      
    
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  GetMeets(){
    var meets=[] as any[]
    this.meetService.getMeetingbyuser(this.currentuser.id).subscribe(meet=>{
      for(var j=0;j<meet.length;j++){
          meets.push(meet[j])   
          this.addEvent(meet[j].link,meet[j].link,new Date(meet[j].date),new Date(meet[j].date))
          this.refresh.next();
      }
    

    }) 
    

             
              
    
  }

  OpenMeet(link:any){
    window.open( link, "_blank");
  }


  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
    this.OpenMeet(event.id)
  }

}