import {Component, Inject, Input, NgZone} from '@angular/core';
import {
  AutorAutoCompleter,
  CategoryAutoCompleter,
  EditorialAutoCompleter,
  FormGroupHandler,
  MultiAutoCompleter,
  SingleAutoCompleter
} from "../../../../shared/utils/utils";
import {FormBuilder, Validators} from "@angular/forms";
import {Autor, Book, BookType, Category, Editorial} from "../../../../shared/data/interfaces/interfaces";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditData} from "../../../interfaces/interfaces";
import {UploadComponent} from "../../upload/upload.component";
import {CategoryService} from "../../../../shared/data/services/category.service";
import {AutorService} from "../../../../shared/data/services/autor.service";
import {EditorialService} from "../../../../shared/data/services/editorial.service";
import {BooksService} from "../../../../shared/data/services/books.service";
import {AdminService} from "../../../services/admin.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent {

  readonly bookTypes: BookType[] = Object.values(BookType);

  @Input('book') book!: Book;

  formHandler: FormGroupHandler;

  categoryCompleter: MultiAutoCompleter<Category>;
  autorCompleter: SingleAutoCompleter<Autor>;
  editorialCompleter: SingleAutoCompleter<Editorial>;

  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private dialogRef: MatDialogRef<BookEditComponent>, private ngZone: NgZone, @Inject(MAT_DIALOG_DATA) public data: EditData<Book>,
              private bookService: BooksService, private categoryService: CategoryService, private autorService: AutorService, private editorialService: EditorialService, private adminService: AdminService) {

    this.book = data?.content || { };

    this.formHandler = new FormGroupHandler(formBuilder.group({
      title: [this.book.title, [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      description: [this.book.description, [Validators.required, Validators.maxLength(5000)]],
      bookType: [this.book.bookType, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      publishedDate: [this.book.publishedDate, [Validators.required]],
      totalPages: [this.book.totalPages, [Validators.required, Validators.min(1)]]
    }));

    this.categoryCompleter = new CategoryAutoCompleter(categoryService, this.book?.categories);
    this.autorCompleter = new AutorAutoCompleter(autorService, true, this.book?.autor);
    this.editorialCompleter = new EditorialAutoCompleter(editorialService, true, this.book?.editorial);
  }

  openUpload(): void {
    this.dialog.open(UploadComponent, {
      autoFocus: true,
      panelClass: 'trend-dialog'
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.book.image = result;
      }
    });
  }

  isValid() {
    return this.formHandler.formGroup.valid && !(
      this.editorialCompleter.isEmpty() || this.autorCompleter.isEmpty() || this.categoryCompleter.isEmpty()
    );
  }

  isNew() {
    return !this.book.id;
  }

  delete(): void {
    if (this.book.id) {
      this.adminService.deleteBook(this.book.id).subscribe((response) => {
        if (response) {
          this.dialogRef.close(true);
        } else {
          Swal.fire('Error', '¡No puedes borrar un libro que tiene review!', 'error');
        }
      })
    }
  }

  send(): void {
    if (this.isValid() && !this.loading) {
      this.loading = true;

      const title = this.formHandler.getValue('title');
      const description = this.formHandler.getValue('description');
      const bookType = <BookType> this.formHandler.getValue('bookType');
      const publishedDate = new Date(this.formHandler.getValue('publishedDate'));
      const totalPages = Number(this.formHandler.getValue('totalPages'));
      const categories: Category[] = this.categoryCompleter.selectedValues;
      const autor: Autor = <Autor> this.autorCompleter.selectedValue;
      const editorial: Editorial = <Editorial> this.editorialCompleter.selectedValue

      const newBook: Book = {
        id: this.book?.id,
        image: this.book?.image,
        likes: this.book?.likes || [],
        title,
        description,
        bookType,
        publishedDate,
        totalPages,
        categories,
        autor,
        editorial,
      };

      console.log(newBook);

      this.adminService.updateOrCreateBook(newBook).subscribe((resp) => {
        this.loading = false;
        this.dialogRef.close(resp);
      });
    }
  }
}
