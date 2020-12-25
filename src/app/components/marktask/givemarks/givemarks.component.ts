import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-givemarks',
  templateUrl: './givemarks.component.html',
  styleUrls: ['./givemarks.component.scss']
})
export class GivemarksComponent implements OnInit {

  constructor(
    private dialogRef:MatDialogRef<GivemarksComponent>
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
