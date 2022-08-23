import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/file';
import { Formation } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Formation';
import { FormationService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/formation.service';
import { User } from 'src/app/Courzelo_Core/Modules/Entity/user';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/file-upload.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-modal-courses-trainer',
  templateUrl: './modal-courses-trainer.component.html',
  styleUrls: ['./modal-courses-trainer.component.css']
})
export class ModalCoursesTrainerComponent implements OnInit {
  currentuser: User | any;
  Form!: FormGroup;
 
 formation!:Formation[]
 selectedFiles?: FileList;
 currentFileUpload?: FileUpload;
 percentage = 0;
 formationModel = new Formation()
  constructor(private tokenService:TokenStorageService,
    public router: Router, 
    private route: ActivatedRoute, 
    private diag: MatDialog, 
     public dialogRef: MatDialogRef<ModalCoursesTrainerComponent>,
     private formationService:FormationService,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private formationb: FormBuilder,
     private uploadService: FileUploadService,
     private storage: AngularFireStorage

     ) 
  { }

  ngOnInit(): void {
    this.currentuser = this.tokenService.getUser();
  this.Form = this.formationb.group({
     
      coursename : ['', Validators.required],
      date: ['', Validators.required],
      difficultylevel  : ['', Validators.required ],
      category  : ['', Validators.required ],
      coursesummary: ['', Validators.required ],
      instructorname: ['', Validators.required ],
     // instructorname: [{value:this.currentuser.displayName,disabled:true}],
       descriptioncourse: ['', Validators.required ],
      descriptiontrainer: ['', Validators.required ],
      price: ['', Validators.required ],
    })

  
  }


  coursenameFormControl = new FormControl('', [Validators.required, ]);
  coursesummaryFormControl = new FormControl('', [Validators.required, ]);
    instructornameFormControl = new FormControl('', [Validators.required, ]);
    priceFormControl = new FormControl('', [Validators.required, ]);
  

  Addformation(){
    this.Form.get('requirement')?.setValue((this.Form.get('requirement')?.value).split(','));

    const uploadImageData = new FormData();
    console.log('this.Form.value;',this.Form.value )
    this.formationModel=  this.Form.value;
    if(this.selectedFiles==null){
        
      // uploadImageData.append('imageFile',this.file );
       this.formationModel.typefile = null;
       
       }
       else {
         const filePath = `${this.uploadService.basePath}/${this.currentFileUpload?.file.name}`;
       const storageRef = this.storage.ref(filePath);
          storageRef.getDownloadURL().subscribe(d => {this.formationModel.typefile = d;
           const formation=this.formationModel;
       uploadImageData.append('formation',JSON.stringify(formation));
       console.log('uploadImageData',uploadImageData)
       this.formationService.addFormations(this.currentuser.id,uploadImageData)
       .subscribe(
         res => 
         
       { 
         
 
         window.location.reload()
 
 
 
       
 
      
       
     
       },
       err=>
       { console.log(err);
         
       })
       
         });
         
       }
    

  
  
        
  }


  closeDialog() {
    this.dialogRef.close(false);
   
  }

  
  Reset() {
    this.Form.reset(); 
}

public hasError = (controlName: string, errorName: string) =>{
  this.Form.markAllAsTouched();
  return this.Form.controls[controlName].hasError(errorName);
}

Difficultylevel = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  Difficulty = [
  ];


  Categorylevel = new FormControl('', Validators.required);
  selectFormControl1 = new FormControl('', Validators.required);
  Category = [  
  ];

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      //this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        console.log('currentFileUpload', this.currentFileUpload )
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          (percentage:any) => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
}


