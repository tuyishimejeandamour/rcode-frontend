import { AfterContentInit, Component, ContentChildren, EventEmitter, HostListener, Input, OnInit, Output, QueryList } from '@angular/core';
import { MonacoEditorLoaderService } from '@materia-ui/ngx-monaco-editor';
import { FilenamePipe } from 'app/core/pipes/filename.pipe';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-code-review',
  template: `
  <div class="codereview_container">
  <div class="classes">
  <div class="wrapper">
  <app-code-accordion>
  <app-code-panel *ngFor="let accordion of accordions" [title]="accordion">

  </app-code-panel>
  </app-code-accordion>
  </div>
  </div>
  <div class="functions">
  <div class="wrapper">
  <app-code-accordion>
  <app-code-panel *ngFor="let accordion of accordions" [title]="accordion">

  </app-code-panel>
  </app-code-accordion>
</div>
</div>
  <div class="valiables">
  <div class="wrapper">
  <app-code-accordion>
  <app-code-panel *ngFor="let accordion of accordions" [title]="accordion">
  </app-code-panel>
  </app-code-accordion>
</div>
</div>
</div>
<!-- <app-code-accordion>
  <app-code-panel title="zama">
    Content 1
  </app-code-panel>
  <app-code-panel title="rakesh">
    Content 2
  </app-code-panel>
  <app-code-panel title="mo">
    Content 3
  </app-code-panel>
</app-code-accordion>

<br>

<app-code-accordion>
  <app-code-panel title="zama">
    Content 1
  </app-code-panel>
  <app-code-panel title="rakesh" *ngIf="false">
    Content 2
  </app-code-panel>
  <app-code-panel title="mo">
    Content 3
  </app-code-panel>
</app-code-accordion>
<br>
<app-code-accordion>
  <app-code-panel *ngFor="let accordion of accordions" [title]="accordion.title">
    <div [innerHTML]="accordion.content"></div>
  </app-code-panel>
</app-code-accordion> -->
  `,
  styles:[
    `
  .codereview_container{
   display: flex;
   width: 100%;
   height: 100%;
   background: rgba(255, 255, 255, 0);
   justify-content: space-around;
  }
  .classes,
   .functions,
   .valiables{
     margin-top: 10px;
     width: 30%;
     min-height:auto;
     box-shadow: 1px 4px 12px rgb(28, 28, 29);
    background: rgb(37, 37, 38);
   }
   .wrapper{
       width: 100%;
    }

    `
  ]
})
export class CodeReviewComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

  }
  accordions = [{
    title: 'Zama',
    content: '<strong>Zama Content</strong>'
  }, {
    title: 'Rakesh',
    content: 'Rakesh Content'
  }]
}

@Component({
  selector: 'app-code-panel',
  templateUrl: './code-review.component.html',
  styleUrls: ['./code-review.component.scss']
})
export class PanelContent implements OnInit {

  @Input('title') title: any;
  @Output() onToggle = new EventEmitter();
  show = false;
  fileTypes: {
    css: 'css',
    js: 'json',
    json:'json',
    md: 'markdown',
    mjs: 'javascript',
    ts: 'typescript',
    csv:'csv'
  }
  constructor(
    private monacoLoaderService: MonacoEditorLoaderService,
    private extension: FilenamePipe
  ) { }

  ngOnInit():void {
    // this.monacoLoaderService.isMonacoLoaded$.pipe(
    //   filter(isLoaded => isLoaded),
    //   take(1),
    // ).subscribe(() => {
    //   monaco.editor.setModelLanguage(
    //     monaco.editor.getModels()[index - 1],
    //     this.fileTypes[this.extension.transform(data.path)]
    //   );

    // });
  }

  toggle() {
    this.show = !this.show;
    this.onToggle.next({
      show: this.show,
    })
  }

}
@Component({
  selector: 'app-code-accordion',
  template: `
  <ng-content></ng-content>
  `,
  styleUrls: ['./code-review.component.scss']
})
export class AccordionContent implements OnInit, AfterContentInit {

  @ContentChildren(PanelContent) panels: QueryList<PanelContent>;

  constructor() { }

  ngOnInit() {
  }

  onToggleSubscriber(p) {
    return data => {
      this.panels.forEach(panel => {
        if (data.show && panel !== p) {
          panel.show = false;
        }
      })
    }
  }

  ngAfterContentInit() {
    this.panels.forEach((panel, i) => {
      panel.onToggle.subscribe(this.onToggleSubscriber(panel))
      panel.show = i < 1;
    })
  }

  ngAfterContent

}
