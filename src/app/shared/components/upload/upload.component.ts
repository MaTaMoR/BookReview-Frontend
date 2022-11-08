import {Component} from '@angular/core';
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ImageService} from "../../services/image.service";
import {MatDialogRef} from "@angular/material/dialog";

export enum UploadStatus {
  NOT_SELECTED = "not-selected",
  UPLOADING = "uploading",
  FAILED = "failed",
  SUCCESS = "success"
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  status: UploadStatus = UploadStatus.NOT_SELECTED;
  fileName = '';

  constructor(private imageService: ImageService, private dialogRef: MatDialogRef<UploadComponent>) {}

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {
      this.status = UploadStatus.UPLOADING;
      this.fileName = file.name;

      const formData = new FormData();
      formData.append("image", file);

      this.imageService.uploadImage(formData).pipe(
        catchError(
          (error: HttpErrorResponse): Observable<any> => {
            this.status = UploadStatus.FAILED;

            return throwError(() => new Error("Upload failed"))
          },
        ),
      ).subscribe(event => {
        if (event.type == HttpEventType.Response) {
          this.status = UploadStatus.SUCCESS;

          setTimeout(() => {
            this.dialogRef.close(event.body);
          }, 500);
        }
      })
    }
  }

  getStatus(): string {
    switch (this.status) {
      case UploadStatus.FAILED: {
        return "¡Ha ocurrido un error!";
      }
      case UploadStatus.NOT_SELECTED: {
        return "¡Selecciona un imagen! (5MB max)";
      }
      case UploadStatus.SUCCESS: {
        return "¡Imagen subida correctamente!";
      }
      case UploadStatus.UPLOADING: {
        return "Subiendo la imagen...";
      }
    }
  };
}
