import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Aparador } from '../../models/aparador.model';
import { AparadorService } from '../../services/service.index';
import { Router } from '@angular/router';
import { when } from 'q';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  aparadores: Aparador[] = [];
 
  

  constructor(
    public _usuarioService: UsuarioService,
    public _aparadorService: AparadorService,
    public router: Router
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cargarAparadores2();
  
  
  }

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino ]);
  }

  cargarAparadores2() {
    this._aparadorService.cargarAparadores()
          .subscribe(aparadores => this.aparadores = aparadores );
  }


}
