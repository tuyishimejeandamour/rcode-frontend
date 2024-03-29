import { Component, OnInit } from '@angular/core';
import { HttpactivitiesService, JerwisService} from 'app/core/services';
import { DatePipe } from '@angular/common';
import { CommonfunctionService } from 'app/Service/commonfunction.service';
import { Groups } from '../../students/students.component';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.scss']
})
export class NewtaskComponent implements OnInit {
  filename = "upload file";
  iconname = "cloud_upload";
  groups:Groups[] = [];
  public Form ={
    user_id: null,
    taskname:null,
    group_id:null,
    lesson:null,
    short:null,
    long:null,
    givenat:null,
    endat:null,
  }
  public showTextEditor = false;
  firstcontent={
    title:null,
    content:null,

  }
  constructor(
    private Httpact: HttpactivitiesService,
    private user:JerwisService,
    public datepipe: DatePipe,
    private eventemitterService: CommonfunctionService
  ) { }


  ngOnInit(): void {
    this.getgroups();
  }
  step = 0;

  setStep(index: number):void {
    this.step = index;
  }

  nextStep():void {
    this.step++;
  }
  changeappeareanceofeditor(value: boolean): void{
    this.showTextEditor = value;
  }

  prevStep():void {
    this.step--;
  }
  csvInputChange(fileInputEvent:any ):void {
    this.filename= fileInputEvent.target.files[0].name;
  }
  gettaskFunction():void{
    this.eventemitterService.onsubmittask();
  }
  onsubmit(): void{
    this.Form.user_id = this.user.getUser().id;
    this.Form.givenat = this.datepipe.transform(this.Form.givenat, 'yyyy-MM-dd hh:mm:ss')
    this.Form.endat = this.datepipe.transform(this.Form.endat, 'yyyy-MM-dd hh:mm:ss')
    console.log( this.Form.group_id);
    this.Httpact.settaskactivity(this.Form).subscribe(
      ()=>this.gettaskFunction(),
      error=>console.log(error)
    )

  }
  getgroups():void{
    this.Httpact.getgroups(this.user.getUser().id).subscribe(
      data => this.handlethergroups(data),
      error => console.error(error)
    )
  }
  handlethergroups(data:Groups[]):void{
    this.groups = data;
  }
  viewhelp(id:number):void{
    if(id==1){
      this.firstcontent={
        title:'task name',
        content:'write briefly what name of you task'
      }
    }else if(id==2){
      this.firstcontent={
        title:'select class or classes',
        content:'select classname or many class or select all option to give to all class'
      }
    }else if(id==3){
      this.firstcontent={
        title:'select lesson',
        content:'select lesson if you give many lesson for futher classification of task'
      }
    }
  }
}
