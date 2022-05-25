import {Component, Input} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MultiAutoCompleter} from "../../utils/utils";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-multi-auto-completer',
  templateUrl: './multi-auto-completer.component.html',
  styleUrls: ['./multi-auto-completer.component.css']
})
export class MultiAutoCompleterComponent<T>  {

    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    @Input('title') title: string = 'Chips';
    @Input('completer') completer!: MultiAutoCompleter<T>;
    public formControl: FormControl = new FormControl();

    ngOnInit(): void {
        this.completer.setInput(this.formControl);
    }

    get input() {
        return this.formControl.value;
    }
}
