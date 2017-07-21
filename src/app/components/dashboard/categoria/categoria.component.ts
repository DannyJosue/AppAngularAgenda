import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: 'categoria.component.html',
  providers: [CategoriaService]
})
export class CategoriaComponent implements OnInit {
  constructor(private categoriaService: CategoriaService) {  }
    formularioCategoria:FormGroup;
    formularioUpdate:FormGroup;

  ngOnInit() {
    let validaciones = [
      Validators.required, Validators.minLength(2)
    ]

    this.categoriaService.getCategorias().subscribe();

    this.formularioCategoria = new FormGroup({
      'nombreCategoria': new FormControl('', validaciones),
    });
  }

  public agregarCategoria() {
    console.log(this.formularioCategoria.value);
    this.categoriaService.agregarCategoria(this.formularioCategoria.value)
    this.categoriaService.getCategorias().subscribe();
    this.ngOnInit();
  }

  public eliminar(idCategoria:number) {
    console.log(idCategoria);
    this.categoriaService.eliminar(idCategoria);
    this.categoriaService.getCategorias().subscribe();
    this.ngOnInit();
  }
}
