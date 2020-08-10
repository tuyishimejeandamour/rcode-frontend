import { Component, OnInit } from '@angular/core';
import { CommonfunctionService } from 'app/Service/commonfunction.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private eventemitterService: CommonfunctionService) { }

  ngOnInit(): void {
  }
  firstComponentFunction(value: string):void{
    this.eventemitterService.onFirstComponentButtonClick(value);
  }

}
