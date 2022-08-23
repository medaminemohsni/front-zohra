import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { Quiz } from 'src/app/Courzelo_Quizz/Shared/entities/Quiz';
import { approvalService } from 'src/app/Courzelo_Quizz/Shared/services/approvalService ';
import { QuizService } from 'src/app/Courzelo_Quizz/Shared/services/quiz.service';
import { Formation } from '../../Shared/entities/Formation';
import { User } from '../../Shared/entities/User';
import { FormationService } from '../../Shared/services/formation.service';

@Component({
  selector: 'app-grades-trainee',
  templateUrl: './grades-trainee.component.html',
  styleUrls: ['./grades-trainee.component.css']
})
export class GradesTraineeComponent implements OnInit {
  users!:User[]

  quiz!:Quiz[];
  id:any
  formation:any;

  displayedColumns: string[] = [ 'name'];
  
 dataSource = new MatTableDataSource<User>(this.users);
 currentuser: User | any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 constructor(private formationService:FormationService,
  private appService:approvalService,
  private tokenService: TokenStorageService,

  private quizservice : QuizService) { }

  ngOnInit(): void {
    this.id =localStorage.getItem("idFormation1")
    this.currentuser = this.tokenService.getUser();

    this.formationService.getListUserParticipant(this.id).subscribe(res=>{
      this.users=res.filter(elem => elem.id == this.currentuser.id)
      console.log("users",this.users )
      this.dataSource.data=this.users as User[]
      
    })

    this.GetQuizByFormation();
  }
ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  GetQuizByFormation(){
    var i=0
    this.formationService.getFormationsById(this.id).subscribe((res:Formation)=>{
      let quiz=[] as Quiz[]
      
        res.idQuiz.map(e=>{
          this.quizservice.getquizbyid(e).subscribe(r=>{
            quiz.push(r)
            this.addColumn(r.title)
             i++
             if(i==res.idQuiz.length){
               this.quiz=quiz
              console.log(this.quiz)
              console.log(this.displayedColumns.slice(1))

             
             }
           })
          })
      })
      
  }

  addColumn(t:string) {
  
    this.displayedColumns.push(t);
  }

  public doFilter = (value: string) => {
   
    this.dataSource.filter = value.trim().toLocaleLowerCase();

  }
}
