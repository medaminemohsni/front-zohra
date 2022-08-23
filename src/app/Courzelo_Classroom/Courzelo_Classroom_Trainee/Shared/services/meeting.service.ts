import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meeting } from 'src/app/Courzelo_Trainer/Classes/Meeting.model';
const API_URL = 'http://localhost:8088';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  constructor(protected httpClient: HttpClient) {}
  addMeeting(meeting: Meeting) {
    return this.httpClient.post(API_URL + '/api/meeting/', meeting);
  }

  getMeetingbyformation(idFormation:any) {
    return this.httpClient.get<Meeting[]>(API_URL + '/api/meeting/getMeetingsByFormation/'+idFormation);
  }
  getMeetingbyuser(idUser:any) {
    return this.httpClient.get<Meeting[]>(API_URL + '/api/meeting/getMeetingsByUser/'+idUser);
  }

}
