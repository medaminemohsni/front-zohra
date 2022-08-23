import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Formation } from '../entities/Formation';
import { User } from '../../Shared/entities/User';
import { Inscription } from '../../Shared/entities/Inscription';
import { Inscriptionapp } from '../entities/Inscriptionapp';
import { FormationTeacher } from '../entities/formationTeacher';
import { FormationStudentsStats } from '../entities/formationStudentsStats';
const optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'mon-entete-personnalise':'maValeur'
  })};
const API_URL = 'http://localhost:8088';
const API_URL_USER = 'http://localhost:8087';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(protected httpClient: HttpClient) {  }

  getAllFormations() {

    return this.httpClient.get<Formation[]>(API_URL+"/api/Formations");
  }
  getFormationsById(id:any) {

    return this.httpClient.get<Formation>(API_URL+"/api/Formations/"+id);

  }
  getFormationsByTest(test:Boolean,id:any) {

    return this.httpClient.get<Formation[]>(API_URL+"/api/Formations/coursA/"+test+"/user/"+id);

  }
  addFormations(id:any,formation:FormData) {

    return this.httpClient.post(API_URL+"/api/Formations/"+id,formation);

  }
  UpdateFormations(id:any,formation:Formation) {

    return this.httpClient.put(API_URL+"/api/Formations/"+id,formation);

  }
  getFormationsByIdStudent(id:any) {

    return this.httpClient.get<Formation[]>(API_URL+"/api/Formations/student/"+id);

  }
  getFormationsByIdCreator(id:any) {

    return this.httpClient.get<Formation[]>(API_URL+"/api/Formations/creator/"+id);

  }
  deleteFormationsById(id:any) {

    return this.httpClient.delete(API_URL+"/api/Formations/"+id);

  }
  getUserById(id:any) {

    return this.httpClient.get<User>(API_URL_USER+"/api/auth/getUser/"+id);
  }
  getListUserParticipant(id:any) {

    return this.httpClient.get<User[]>(API_URL+"/api/Inscriptions/"+id);
  }
  Inscription(idEtudiant:any,idFormation:any,inscription:Inscription) {

    return this.httpClient.post(API_URL+"/api/Inscriptions/"+idEtudiant+"/Formation/"+idFormation,inscription);
  }

  addquizz(id:any,idquiz:any) {

    return this.httpClient.put(API_URL+"/api/Formations/Quiz/"+id+"/"+idquiz,null);

}
getallformation(idEtudiant:any) {

  return this.httpClient.get<Formation[]>(API_URL+"/api/Inscriptions/getAllFormationsByUser/"+idEtudiant);
}

checkFormationByStudent(idFormation:any,idEtudiant:any) {

  return this.httpClient.get<boolean>(API_URL+"/api/Inscriptions/checkFormationByUser/"+idFormation+"/"+idEtudiant);
}

getStats(id:any)
{
  return this.httpClient.get<Inscriptionapp[]>(API_URL+"/api/Formations/getStatUser/"+id);

}

getFormationsByIdInstructor(id:any) {

  return this.httpClient.get<FormationTeacher[]>(API_URL+"/api/Formations/getFormationByInstructorId/"+id);

}

getStatsFormationStudents(idFormation:any)
{
  return this.httpClient.get<FormationStudentsStats[]>(API_URL+"/api/Formations/getStatsFormationStudents/"+idFormation);

}

}
