import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cdialog',
  templateUrl: './cdialog.component.html',
  styleUrls: ['./cdialog.component.scss']
})
export class CdialogComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code = '/**\n* enter your starting code if any\n*/';
  constructor(
    public dialogRef: MatDialogRef<CdialogComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
