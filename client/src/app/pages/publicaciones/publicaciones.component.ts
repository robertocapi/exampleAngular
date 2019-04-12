import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../../models/publicacion.model';
import { PublicacionService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Aparador } from '../../models/aparador.model';
import { AparadorService } from '../../services/service.index';


declare var swal: any;

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styles: []
})
export class PublicacionesComponent implements OnInit {
  aparadores: Aparador[] = [];

  publicaciones: Publicacion[] = [];

  constructor(
    public _aparadorService: AparadorService,
    public _publicacionService: PublicacionService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarPublicaciones();
    this.cargarAparadores3();

    this._modalUploadService.notificacion
          .subscribe( () => this.cargarPublicaciones() );
  }

  buscarPublicacion( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarPublicaciones();
      return;
    }

    this._publicacionService.buscarPublicacion( termino )
            .subscribe( publicaciones => this.publicaciones = publicaciones );

  }

  cargarPublicaciones() {
    this._publicacionService.cargarPublicaciones()
            .subscribe( publicaciones => this.publicaciones = publicaciones );
  }


  guardarPublicacion( publicacion: Publicacion) {

    this._publicacionService.actualizarPublicacion( publicacion )
            .subscribe();

  }

  borrarPublicacion( publicacion: Publicacion ) {

    this._publicacionService.borrarPublicacion( publicacion._id )
            .subscribe( () =>  this.cargarPublicaciones() );

  }

  crearPublicacion() {

    swal({
      title: 'Crear publicacion',
      text: 'Ingrese el nombre del publicacion',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string ) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._publicacionService.crearPublicacion( valor )
              .subscribe( () => this.cargarPublicaciones() );

    });

  }

  actualizarImagen( publicacion: Publicacion ) {

    this._modalUploadService.mostrarModal( 'publicaciones', publicacion._id );

  }

  cargarAparadores3() {
    this._aparadorService.cargarAparadores()
          .subscribe( aparadores => this.aparadores = aparadores );
  }

}
