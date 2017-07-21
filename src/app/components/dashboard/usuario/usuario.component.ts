import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';

declare var $:any;

@Component({
  selector: 'app-usuario',
  templateUrl: 'usuario.component.html',
  providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {  }
    nuevoUsuario:FormGroup;
hideModal: boolean= false;
  ngOnInit() {
    let validaciones = [
      Validators.required, Validators.minLength(2)
    ]

    this.usuarioService.getUsuarios().subscribe();

    this.nuevoUsuario = new FormGroup({
      'nick': new FormControl('', validaciones),
      'contrasena': new FormControl('', validaciones)
    });

  }

  public agregarUsuario() {
    console.log(this.nuevoUsuario.value);
    this.usuarioService.agregarUsuario(this.nuevoUsuario.value)
    this.usuarioService.getUsuarios().subscribe();
    this.ngOnInit();
    $('#modalUsuario').modal('hide');
  }


  public eliminar(idUsuario:number) {
    console.log(idUsuario);
    this.usuarioService.eliminar(idUsuario);
    this.usuarioService.getUsuarios().subscribe();
    this.ngOnInit();
  }
}
