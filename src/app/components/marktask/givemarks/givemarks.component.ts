import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-givemarks',
  templateUrl: './givemarks.component.html',
  styleUrls: ['./givemarks.component.scss']
})
export class GivemarksComponent implements OnInit {
  marks={
    user_id:null,
    marks:null,
    task_id:null
  }
  text:string;
  constructor(
    private dialogRef:MatDialogRef<GivemarksComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{task:any,students:any}
  ) { }
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent):void {
    if (event.key==="c") {
      this.closedialog()
    }
  }
  ngOnInit(): void {
  }

  closedialog():void{
    this.dialogRef.close();
  }
}
