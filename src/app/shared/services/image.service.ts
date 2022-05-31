import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl: string = environment.baseUrl + "/image";

  constructor(private http: HttpClient) { }

  uploadImage(imageData: FormData) {
    return this.http.post(`${this.baseUrl}/upload`, imageData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
