import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { Publicacion } from '../../models/publicacion.model';
import { PublicacionService } from '../../services/service.index';
import { Aparador } from '../../models/aparador.model';
import { AparadorService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  publicaciones: Publicacion[] = [];
  usuario: Usuario;
  publicacion: Publicacion = new Publicacion('');
  aparadores: Aparador[] = [];

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService,
    public _publicacionService: PublicacionService,
    public _aparadorService: AparadorService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
    this._publicacionService.cargarPublicaciones()
    .subscribe( publicaciones => this.publicaciones = publicaciones );

    this._aparadorService.cargarAparadores()
    .subscribe( aparadores => this.aparadores = aparadores );

    

  }

  guardar( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
                .subscribe();

  }

  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {

    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );

  }

}
