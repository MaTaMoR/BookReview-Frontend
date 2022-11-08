import {Component, Inject, Input, NgZone} from '@angular/core';
import {Book, Review} from "../../../../shared/data/interfaces/interfaces";
import {BookAutoCompleter, FormGroupHandler, SingleAutoCompleter} from "../../../../shared/utils/utils";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditData} from "../../../interfaces/interfaces";
import {BooksService} from "../../../../shared/data/services/books.service";
import {UploadComponent} from "../../../../shared/components/upload/upload.component";
import {ReviewsService} from "../../../../shared/data/services/reviews.service";
import {AdminService} from "../../../services/admin.service";
import Swal from "sweetalert2";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.css']
})
export class ReviewEditComponent {

  @Input('book') review!: Review;

  formHandler: FormGroupHandler;

  bookCompleter: SingleAutoCompleter<Book>;

  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private dialogRef: MatDialogRef<ReviewEditComponent>, private ngZone: NgZone, @Inject(MAT_DIALOG_DATA) public data: EditData<Review>,
              private bookService: BooksService, private reviewService: ReviewsService, private adminService: AdminService, private authService: AuthService) {

    this.review = data?.content || { };

    this.formHandler = new FormGroupHandler(formBuilder.group({
      review: [this.review.review, [Validators.required, Validators.maxLength(5000)]],
      score: [this.review.score, [Validators.required, Validators.min(1), Validators.max(5)]],
      reviewDate: [this.review.reviewDate, [Validators.required]]
    }));

    this.bookCompleter = new BookAutoCompleter(bookService, true, this.review?.book);
  }

  openUpload(): void {
    this.dialog.open(UploadComponent, {
      autoFocus: true,
      panelClass: 'trend-dialog'
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.review.image = result;
      }
    });
  }

  isValid() {
    return this.formHandler.formGroup.valid && !this.bookCompleter.isEmpty();
  }

  isNew() {
    return !this.review.id;
  }

  delete(): void {
    if (this.review.id) {
      this.adminService.deleteReview(this.review.id).subscribe((response) => {
        if (response) {
          this.dialogRef.close(true);
        } else {
          Swal.fire('¡No se ha podido borrar la review!', '', 'error');
        }
      })
    }
  }

  send(): void {
    if (!this.isValid()) {
      Swal.fire('¡La información contiene errores!', '', 'error');
    } else if (this.loading) {
      Swal.fire('¡Espera a que acabe de cargar!', '', 'error');
    } else {
      this.loading = true;

      const book: Book = <Book> this.bookCompleter.selectedValue;
      const review: string = this.formHandler.getValue('review');
      const reviewDate: Date = new Date(this.formHandler.getValue('reviewDate'));
      const score: number = Number(this.formHandler.getValue('score'));

      const newReview: Review = {
        id: this.review?.id,
        image: this.review?.image,
        autor: this.review?.autor || this.authService.currentUser,
        likes: this.review?.likes || [],
        book,
        review,
        reviewDate,
        score
      };

      this.adminService.updateOrCreateReview(newReview).subscribe((resp) => {
        if (newReview.id) {
          Swal.fire('¡Review actualizada!', '', 'success');
        } else {
          Swal.fire('¡Review creada!', '', 'success');
        }

        this.loading = false;
        this.dialogRef.close(resp);
      });
    }
  }
}
