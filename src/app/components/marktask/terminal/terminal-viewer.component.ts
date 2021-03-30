import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { DisplayOption, FunctionsUsingCSI, NgTerminal } from "ng-terminal";
import { Subject } from "rxjs";
import { Terminal } from "xterm";



@Component({
  selector: 'app-terminal-viewer',
  templateUrl: './terminal-viewer.component.html',
  styleUrls: ['./terminal-viewer.component.scss'],
})
export class TerminalViewerComponent implements OnInit,  AfterViewInit {
  title = 'NgTerminal Live Example';
  color = 'accent';

  public resizable: boolean;
  public fixed = false;

  disabled = false;
  rowsControl = new FormControl();
  colsControl = new FormControl();
  inputControl = new FormControl();

  displayOption: DisplayOption = {};
  displayOptionBounded: DisplayOption = {};//now it's not used
  underlying: Terminal;

  @ViewChild('term', {static: false}) child: NgTerminal;

  constructor() { }

  ngOnInit():void {
    this.rowsControl.setValue(10);
    this.colsControl.setValue(40);
  }

  ngAfterViewInit():void {
    this.underlying = this.child.underlying;
    this.underlying.setOption("fontSize", 20);
    this.invalidate();
    this.child.write('$ ');
    this.child.keyInput.subscribe((input) => {
      //do nothing because it will be replaced keyEventInput
    })

    this.child.keyEventInput.subscribe(e => {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      console.log('keyboard event:' +e.domEvent.keyCode + ', ' + e.key);

      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {

        this.child.write('\n' + FunctionsUsingCSI.cursorColumn(1) + '$ '); // \r\n
      } else if (ev.keyCode === 8) {
        // Do not delete the prompt
        if (this.child.underlying.buffer.active.cursorX > 2) {
          this.child.write('\b \b');
        }
      } else if (printable) {
        this.child.write(e.key);
      }
    })
    this.rowsControl.valueChanges.subscribe(() => { this.invalidate() });
    this.colsControl.valueChanges.subscribe(() => { this.invalidate() });
  }

  invalidate():void {
    if (this.resizable)
      this.displayOption.activateDraggableOnEdge = { minWidth: 100, minHeight: 100 };
    else
      this.displayOption.activateDraggableOnEdge = undefined;
    if (this.fixed)
      this.displayOption.fixedGrid = { rows: this.rowsControl.value, cols: this.colsControl.value };
    else
      this.displayOption.fixedGrid = undefined;
    this.child.setDisplayOption(this.displayOption);
  }

  resizableChange(event: MatSlideToggleChange):void {
    this.resizable = event.checked;
    if (this.resizable){
      this.child.setStyle({"border": "4px solid #85858a"});
      this.fixed = false;
    }
    this.invalidate();
  }

  fixedChange(event: MatSlideToggleChange):void {
    this.fixed = event.checked;
    if (this.fixed){
      this.child.setStyle({"border": "unset"});
      this.resizable = false;
    }
    this.invalidate();
  }

  writeSubject = new Subject<string>();
  write():void {
    this.writeSubject.next(eval(`${<string>this.inputControl.value}`));
  }

  keyInput: string;
  onKeyInput(event: string):void {
    this.keyInput = event;
  }

  get displayOptionForLiveUpdate():any {
    return JSON.parse(JSON.stringify(this.displayOption));
  }
}
