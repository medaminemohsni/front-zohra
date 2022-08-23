import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import { FormationService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/formation.service';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { User } from 'src/app/Courzelo_Core/Modules/Entity/user';
import { Inscriptionapp } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Inscriptionapp';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FormationTeacher } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/formationTeacher';
import { FormationStudentsStats } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/formationStudentsStats';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  currentuser: User | any;
dataStat:Inscriptionapp[]= [];
courseList:FormationTeacher[]= [];
courseId:number=null;
dataFormationStudentsStat:FormationStudentsStats[]= [];

  constructor(private formationService:FormationService,  
      private tokenService:TokenStorageService,
    ) { }

  ngOnInit(): void {
    this.currentuser = this.tokenService.getUser();
    this.getListCoursesByInsctructorId( this.currentuser.id)
 

this.createChart1()


}

createChart1()
{
  var chart = am4core.create("chartdiv", am4charts.XYChart);
  this.formationService.getStats(this.currentuser.id).subscribe(res => {this.dataStat = res}, error => {} ,() => {
    chart.data = this.dataStat

// Create axes

var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "nameFormation";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;

categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
if (target.dataItem && target.dataItem.index ) {
  return dy + 25;
}
return dy;
});

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "nbrEtudiants";
series.dataFields.categoryX = "nameFormation";
series.name = "nbrEtudiants";
series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
series.columns.template.fillOpacity = .8;

var columnTemplate = series.columns.template;
columnTemplate.strokeWidth = 2;
columnTemplate.strokeOpacity = 1;
}
    )
}



getListCoursesByInsctructorId(id:number)
{
  this.formationService.getFormationsByIdInstructor(id).subscribe(
    res =>  {this.courseList= res } , error => {console.error(error)},()=>  {

    } 
  ) 
}
createCharts2(courseId:number)
{
console.log('courseId' , courseId)
this.formationService.getStatsFormationStudents(courseId).subscribe(
res  =>  {this.dataFormationStudentsStat= res; console.log('res' , res ) } , error => {console.error(error)},()=>  {

  /* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

 // Create chart instance
let chart = am4core.create("chartdiv2", am4charts.XYChart);

// Add data
chart.data =this.dataFormationStudentsStat;

// Create axes
let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "studentName";
categoryAxis.numberFormatter.numberFormat = "#";
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.cellStartLocation = 0.1;
categoryAxis.renderer.cellEndLocation = 0.9;

let  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
valueAxis.renderer.opposite = true;

// Create series
function createSeries(field, name) {
  let series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueX = field;
  series.dataFields.categoryY = "studentName";
  series.name = name;
  series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
  series.columns.template.height = am4core.percent(100);
  series.sequencedInterpolation = true;

  let valueLabel = series.bullets.push(new am4charts.LabelBullet());
  valueLabel.label.text = "{valueX}";
  valueLabel.label.horizontalCenter = "left";
  valueLabel.label.dx = 10;
  valueLabel.label.hideOversized = false;
  valueLabel.label.truncate = false;

  let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
  categoryLabel.label.text = "{name}";
  categoryLabel.label.horizontalCenter = "right";
  categoryLabel.label.dx = -10;
  categoryLabel.label.fill = am4core.color("#fff");
  categoryLabel.label.hideOversized = false;
  categoryLabel.label.truncate = false;
}

createSeries("nbrComments", "nbrComments");
createSeries("nbrPosts", "nbrPosts");

} 
)
}
}