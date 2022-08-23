import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Formation } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Formation';
import { FormationService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/formation.service';
import { MeetingService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/meeting.service';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { Meeting } from 'src/app/Courzelo_Trainer/Classes/Meeting.model';
import Swal from 'sweetalert2';
declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-classroommeet',
  templateUrl: './classroommeet.component.html',
  styleUrls: ['./classroommeet.component.css'],
})
export class ClassroommeetComponent implements OnInit, AfterViewInit {
  filteredOptionsFormations: Formation[] = [];

  formations!: Formation[];
  link:FormControl;
  dateCont: Date;
  meeting: Meeting;
  dateContTime: string;
  domain: string = 'meet.jit.si';
  room: any;
  options: any;
  api: any;
  user: any;
  url: any;
  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;
  formationControl: FormControl;
  test!: boolean;
  constructor(
    private router: Router,
    private tokenService: TokenStorageService,
    private formationService: FormationService,
    private meetingService: MeetingService
  ) {}

  ngOnInit(): void {
    this.formationControl = new FormControl('');
    this.link = new FormControl('');
    this.meeting = new Meeting();
    console.log('meeting is here');
    this.test = false;
    this.formationService
      .getFormationsByTest(true, this.tokenService.getUser().id)
      .subscribe(
        (data) => {
          this.formations = data;
          this.filteredOptionsFormations = data;
          console.log(this.formations);
        },

        (error) => {
          console.log('error');
        }
      );
    this.formationControl.valueChanges.subscribe((val) => {
      //Check if val is selected or the user is typing
      if (!val?.idFormation) {
        this.filterObjFormation(val);
      }
    });
  }
  private filterObjFormation(formation: string) {
    const filterValue = formation.toLowerCase();
    this.filteredOptionsFormations = this.formations.filter(
      (option) =>
        option.coursename &&
        option.coursename.toLowerCase().includes(filterValue)
    );
  }
  displayFnFormation(formation: Formation): string {
    return formation && formation.coursename ? formation.coursename : '';
  }
  ngAfterViewInit(): void {
    this.options = {
      roomName: this.room,
      width: 900,
      height: 500,
      configOverwrite: { prejoinPageEnabled: false, defaultLanguage: 'en' },
      interfaceConfigOverwrite: {
        // overwrite interface properties
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.tokenService.getUser().displayName,
      },
    };

  }
    /*this.api = new JitsiMeetExternalAPI(this.domain, this.options);
    console.log(this.api);

    this.api.getLivestreamUrl().then((livestreamData: any) => {
      console.log(livestreamData);
    });
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus,
    });
  }

  handleClose = () => {
    console.log('handleClose');
  };

  handleParticipantLeft = async (participant: any) => {
    console.log('handleParticipantLeft', participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  };

  handleParticipantJoined = async (participant: any) => {
    console.log('handleParticipantJoined', participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
  };

  handleVideoConferenceJoined = async (participant: any) => {
    console.log('handleVideoConferenceJoined', participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
  };

  handleVideoConferenceLeft = () => {
    console.log('handleVideoConferenceLeft');
    this.router.navigate(['/thank-you']);
  };

  handleMuteStatus = (audio: any) => {
    console.log('handleMuteStatus', audio); // { muted: true }
  };

  handleVideoStatus = (video: any) => {
    console.log('handleVideoStatus', video); // { muted: true }
  };

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  }

  // custom events
  executeCommand(command: string) {
    this.api.executeCommand(command);
    if (command == 'hangup') {
      this.router.navigate(['/']);
      return;
    }

    if (command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if (command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }
  isSelectedValues() {
    if (!this.formationControl.value.idFormation) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to choose a course!',
      });
      return false;
    }
    if (this.dateCont != null) {
      let dT = moment(this.dateContTime, 'hh:mm').toDate();
      //this.dateCont = new Date(this.dateCont._d);
      console.log(this.dateCont);
      this.dateCont.setHours(dT.getHours());
      this.dateCont.setMinutes(dT.getMinutes());
      console.log('this.dateCont : ', this.dateCont);
      this.meeting.date = new Date(this.dateCont);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to choose a date for the meeting!',
      });
      return false;
    }
    return true;
  }
  
  */
  addMeeting() {
    console.log("date" , this.dateCont)
    console.log("time" , this.dateContTime)
    console.log("hour" , this.dateContTime.substring(0,2))
    console.log("min" , this.dateContTime.substring(3))

this.dateCont.setHours(+this.dateContTime.substring(0,2))
this.dateCont.setMinutes(+this.dateContTime.substring(3))
this.dateCont.setSeconds(0)
this.dateCont.setMilliseconds(0)
    console.log("new date" , this.dateCont)
      this.meeting.idFormation = this.formationControl.value.idFormation;
      this.meeting.idInstructor = +this.tokenService.getUser().id;
      this.meeting.link="https://meet.jit.si/"+this.link.value
      this.meeting.date = this.dateCont
      console.log(this.meeting);
      this.meetingService.addMeeting(this.meeting).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

