import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactoService } from '../../../services/contacto.service';

declare var $:any;

@Component({
  selector: 'app-contacto',
  templateUrl: 'contacto.component.html',
  providers: [ContactoService]
})
export class ContactoComponent implements OnInit {
  constructor(private contactoService: ContactoService) {  }
  url:string;
    formularioContacto:FormGroup;
    formularioUpdate:FormGroup;
    hideModal: boolean= false;

 ngOnInit() {
    let validaciones = [
      Validators.required, Validators.minLength(2)
    ]

    this.contactoService.getContactos().subscribe();

    this.formularioContacto = new FormGroup({
      'idUsuario': new FormControl('', validaciones),
      'nombre': new FormControl('', validaciones),
      'apellido': new FormControl('', validaciones),
      'telefono': new FormControl('', validaciones),
      'direccion': new FormControl('', validaciones),
      'idCategoria': new FormControl('', validaciones),
    });
  }

  public actualizarPage() {
    this.contactoService.getContactos().subscribe();
    this.ngOnInit();
  }
  
  public agregarContacto() {
    console.log(this.formularioContacto.value);
    this.contactoService.agregarContacto(this.formularioContacto.value)
    this.actualizarPage();
    $('#modalContacto').modal('hide');
  }

  public editarContacto() {
    console.log(this.formularioUpdate.value);
      this.contactoService.editarContacto(this.formularioUpdate, this.url)
      .subscribe(res => {
        console.log(res);
      });
      this.actualizarPage();
  }

  public eliminar(idContacto:number) {
  this.contactoService.eliminarContacto(idContacto)
    .subscribe(res => {
      if(res.estado) {
        console.log(idContacto);
        this.actualizarPage();
      }
    })    
  } 
   
  
}
