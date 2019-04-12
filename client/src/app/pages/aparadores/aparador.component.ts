import { Component, OnInit } from '@angular/core';
import { Aparador } from '../../models/aparador.model';
import { AparadorService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Publicacion } from '../../models/publicacion.model';
import { PublicacionService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-aparador',
  templateUrl: './aparador.component.html',
  styles: []
})
export class AparadorComponent implements OnInit {

  publicaciones: Publicacion[] = [];
  aparador: Aparador = new Aparador('', '', '', '');
  publicacion: Publicacion = new Publicacion('');

  constructor(
    public _aparadorService: AparadorService,
    public _publicacionService: PublicacionService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarAparador( id );
      }

    });

  }

  ngOnInit() {

    this._publicacionService.cargarPublicaciones()
          .subscribe( publicaciones => this.publicaciones = publicaciones );

    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.aparador.img = resp.aparador.img;
          });

  }

  cargarAparador( id: string ) {
    this._aparadorService.cargarAparador( id )
          .subscribe( aparador => {

            console.log( aparador );
            this.aparador = aparador;
            //this.aparador.publicacion = aparador.publicacion._id;
           // this.cambioPublicacion( this.aparador.publicacion );
          });
  }



  guardarAparador( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._aparadorService.guardarAparador( this.aparador )
            .subscribe( aparador => {

              this.aparador._id = aparador._id;

              this.router.navigate(['/aparador', aparador._id ]);

            });

  }

  cambioPublicacion( id: string ) {

    this._publicacionService.obtenerPublicacion( id )
          .subscribe( publicacion => this.publicacion = publicacion );

  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'aparadores', this.aparador._id );

  }


}
