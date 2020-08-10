import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';

const routes: Routes = [{ path: 'editor', component: EditorComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
