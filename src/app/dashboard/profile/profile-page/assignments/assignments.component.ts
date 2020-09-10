import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogAssignComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        display: 'block',
      })),
      state('closed', style({
        display: 'none',
      })),
      transition('open <=> closed', [
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),

    ]),
  ],
})
export class AssignmentsComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code = 'function x() {\nconsole.log("Hello world!");\n}';
  constructor(private dialog:MatDialog) { }
  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }
  ngOnInit(): void {
  }
  openanswerboard():void{
    const dialog = this.dialog.open(DialogAssignComponent,{
      width:"80%",
      height:"80%"
    });
    dialog.afterClosed().subscribe(()=>{
      if(confirm("send or not")){
        console.log("confirmed");
      }
    })
  }

}
