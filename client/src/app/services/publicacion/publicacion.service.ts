import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Publicacion } from '../../models/publicacion.model';

import swal from 'sweetalert';

@Injectable()
export class PublicacionService {

  totalPublicaciones: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPublicaciones() {

    let url = URL_SERVICIOS + '/publicacion';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalPublicaciones = resp.total;
                return resp.publicaciones;
              });

  }

  obtenerPublicacion( id: string ) {

    let url = URL_SERVICIOS + '/publicacion/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.publicacion );

  }

  borrarPublicacion( id: string ) {

    let url = URL_SERVICIOS + '/publicacion/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('Publicacion Borrado', 'Eliminado correctamente', 'success') );

  }

  crearPublicacion( nombre: string ) {

    let url = URL_SERVICIOS + '/publicacion';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) => resp.publicacion );

  }

  buscarPublicacion( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/publicaciones/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.publicaciones );

  }

  actualizarPublicacion( publicacion: Publicacion ) {

    let url = URL_SERVICIOS + '/publicacion/' + publicacion._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, publicacion )
              .map( (resp: any) => {

                swal('Publicacion Actualiado', publicacion.nombre, 'success');
                return resp.publicacion;
              });

  }

}
