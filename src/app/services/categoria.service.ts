import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoriaService {
  uriCategoria = "http://localhost:3000/";
  categorias: Array<any>;

  constructor(
    private http:Http,
    private router:Router,
    private usuarioService:UsuarioService
  ) {  }

  public setCurrentUser(usuario:any) {
    localStorage.setItem('currentUser', usuario);
  }

  public getCategorias(): any {
    let uri = this.uriCategoria + 'api/v1/categoria/';
    let token = localStorage.getItem('token');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({'headers': headers});
    headers.append('Authorization', token);

    return this.http.get(uri, options)
      .map(res => {
        console.log("Response: " + JSON.stringify(res.json()));
        this.categorias = res.json();
      });
  }

  public agregarCategoria(categoria:any) {
    let uri = this.uriCategoria + 'api/v1/categoria/';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.usuarioService.getToken()
    });

    let data = JSON.stringify(categoria);

    this.http.post(uri, data, {headers})
    .subscribe( res => {
      console.log(res.json());
      this.getCategorias();
    });
  }


  public eliminar(idCategoria:any){
    let uri = "http://localhost:3000/api/v1/categoria/";
    let uri2 = uri + idCategoria;
    let token = localStorage.getItem('token');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({'headers': headers});
    headers.append('Authorization', token);
    this.http.delete(uri2, options).subscribe(res => {

    }, error =>{
      console.log(error.text());
    } )
  }

}
