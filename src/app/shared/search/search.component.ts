import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SearchData} from "../interfaces/interfaces";
import {CategoryResponse} from "../../books/interfaces/interfaces";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent {

    public categoryControl = new FormControl();
    public categories: CategoryResponse[] = [];

    constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<SearchComponent>, @Inject(MAT_DIALOG_DATA) public data: SearchData) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
