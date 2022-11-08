import {Component, Input, OnInit} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {SingleAutoCompleter} from "../../utils/utils";

@Component({
  selector: 'app-single-auto-completer',
  templateUrl: './single-auto-completer.component.html',
  styleUrls: ['./single-auto-completer.component.css']
})
export class SingleAutoCompleterComponent<T> implements OnInit {

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @Input('title') title: string = 'Chips';
  @Input('completer') completer!: SingleAutoCompleter<T>;

  public formControl: FormControl = new FormControl();

  get input() {
    return this.formControl.value;
  }

  ngOnInit(): void {
    this.completer.setInput(this.formControl);
    if (this.completer.selectedValue) {
      this.formControl.setValue(this.completer.toString(this.completer.selectedValue));
    }
  }
}
