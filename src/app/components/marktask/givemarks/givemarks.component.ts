import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TreeData } from 'app/core/services/fileexplorer/httpexplorer.service';

@Component({
  selector: 'app-givemarks',
  templateUrl: './givemarks.component.html',
  styleUrls: ['./givemarks.component.scss']
})
export class GivemarksComponent implements OnInit {
  text:string;
  constructor(
    private dialogRef:MatDialogRef<GivemarksComponent>,
    @Inject(MAT_DIALOG_DATA) public data:TreeData
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
