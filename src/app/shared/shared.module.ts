import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SingleAutoCompleterComponent} from './components/single-auto-completer/single-auto-completer.component';
import {VarDirective} from './utils/directives.directive';
import {ImagePipe} from './utils/image.pipe';
import {MultiAutoCompleterComponent} from './components/multi-auto-completer/multi-auto-completer.component';
import {MaterialModule} from "../material/material.module";

@NgModule({
  declarations: [
    SingleAutoCompleterComponent,
    VarDirective,
    ImagePipe,
    MultiAutoCompleterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    VarDirective,
    ImagePipe,
    MultiAutoCompleterComponent,
    SingleAutoCompleterComponent
  ]
})
export class SharedModule {
}
