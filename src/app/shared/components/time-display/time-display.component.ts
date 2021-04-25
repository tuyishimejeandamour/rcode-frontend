
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-display',
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeDisplayComponent implements OnInit {
  @Input() time: any;

  constructor() { }

  ngOnInit(): void {

  }

}
