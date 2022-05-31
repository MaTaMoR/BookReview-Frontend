import {Pipe, PipeTransform} from '@angular/core';
import {environment} from "../../../environments/environment";

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  private baseUrl: string = environment.baseUrl + "/image/get/";

  transform(value: string, ...args: unknown[]): string {
    return this.baseUrl + value;
  }
}
