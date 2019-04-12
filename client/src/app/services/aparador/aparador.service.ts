import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Aparador } from '../../models/aparador.model';

import swal from 'sweetalert';

@Injectable()
export class AparadorService {

  totalAparadores: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarAparadores() {

    let url = URL_SERVICIOS + '/aparador';

    return this.http.get( url )
              .map( (resp: any) => {

                this.totalAparadores = resp.total;
                return resp.aparadores;
              });

  }

  cargarAparador( id: string ) {

    let url = URL_SERVICIOS + '/aparador/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.aparador );

  }

  buscarAparadores( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/aparadores/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.aparadores );

  }

  borrarAparador( id: string ) {

    let url = URL_SERVICIOS + '/aparador/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'Aparador Borrado', 'Aparador borrado correctamente', 'success' );
                return resp;
              });

  }

  guardarAparador( aparador: Aparador ) {

    let url = URL_SERVICIOS + '/aparador';

    if ( aparador._id ) {
      // actualizando
      url += '/' + aparador._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, aparador )
                .map( (resp: any) => {
                  swal('Aparador Actualizado', aparador.nombre, 'success');
                  return resp.aparador;

                });

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, aparador )
              .map( (resp: any) => {
                swal('Aparador Creado', aparador.nombre, 'success');
                return resp.aparador;
              });
    }




  }

}
