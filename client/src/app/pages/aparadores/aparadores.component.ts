import { Component, OnInit } from '@angular/core';
import { Aparador } from '../../models/aparador.model';
import { AparadorService } from '../../services/service.index';

@Component({
  selector: 'app-aparadores',
  templateUrl: './aparadores.component.html',
  styles: []
})
export class AparadoresComponent implements OnInit {

  aparadores: Aparador[] = [];

  constructor(
    public _aparadorService: AparadorService
  ) { }

  ngOnInit() {
    this.cargarAparadores();
  }

  cargarAparadores() {
    this._aparadorService.cargarAparadores()
          .subscribe( aparadores => this.aparadores = aparadores );
  }

  buscarAparador( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarAparadores();
      return;
    }

    this._aparadorService.buscarAparadores( termino )
            .subscribe( aparadores =>  this.aparadores = aparadores );
  }

  borrarAparador( aparador: Aparador ) {

    this._aparadorService.borrarAparador( aparador._id )
            .subscribe( () =>  this.cargarAparadores() );

  }

}
