import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'aparador':
        url += '/aparadores/' + img;
      break;

      case 'publicacion':
         url += '/publicaciones/' + img;
      break;

      default:
        console.log('tipo de imagen no existe, usuario, aparadores, publicaciones');
        url += '/usurios/xxx';
    }

    return url;
  }

}
