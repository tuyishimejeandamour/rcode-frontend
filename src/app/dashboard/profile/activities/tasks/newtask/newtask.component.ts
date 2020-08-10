import { Component, OnInit } from '@angular/core';
import { JerwisService } from 'app/Service/jerwis.service';
import { DatePipe } from '@angular/common';
import { CommonfunctionService } from 'app/Service/commonfunction.service';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.scss']
})
export class NewtaskComponent implements OnInit {
  filename = "upload file";
  iconname = "cloud_upload";
  public Form ={
    instructor_id: null,
    taskname:null,
    classname:null,
    lesson:null,
    short_desc:null,
    long_desc:null,
    starting_date:null,
    ending_date:null,
  }
  public showTextEditor = false;
  constructor(
    private jerwis: JerwisService,
    public datepipe: DatePipe,
    private eventemitterService: CommonfunctionService
  ) { }


  ngOnInit(): void {

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
  csvInputChange(fileInputEvent: any):void {
    this.filename= fileInputEvent.target.files[0].name;
  }
  gettaskFunction():void{
    this.eventemitterService.onsubmittask();
  }
  onsubmit(): void{
    this.Form.instructor_id = "1";
    this.Form.starting_date = this.datepipe.transform(this.Form.starting_date, 'yyyy-MM-dd hh:mm:ss')
    this.Form.ending_date = this.datepipe.transform(this.Form.starting_date, 'yyyy-MM-dd hh:mm:ss')

    this.jerwis.settaskactivity(this.Form).subscribe(
      ()=>this.gettaskFunction(),
      error=>console.log(error)
    )

  }
}
