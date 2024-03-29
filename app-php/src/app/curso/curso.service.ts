import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Curso } from './curso';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  url = "http://localhost/api/php/";

  vetor: Curso[] = [];

  constructor(private http: HttpClient) { }

  obterCursos(): Observable<Curso[]> {
    return this.http.get(this.url+"listar").pipe(
      map((res: any) => {
        this.vetor = res['cursos'];
        return this.vetor;
      })
    );
  }

  cadastrarCurso(c: Curso): Observable<Curso[]> {
    return this.http.post(this.url+"cadastrar", {cursos:c}).pipe(
      map((res: any) => {
        this.vetor.push(res['cursos']);
        return this.vetor;
      })
    );
  }

  removerCurso(c: Curso): Observable<Curso[]> {
    //const params = c.idCurso !== undefined ? new HttpParams().set("idCurso", c.idCurso.toString()) : new HttpParams();
 
    const params = new HttpParams().set("idCurso", c.idCurso?.toString() || "");

    return this.http.delete(this.url+"excluir", {params: params}).pipe(
      map((res) => {
        const filtro = this.vetor.filter((curso) => {
          //return curso['idCurso'] !== undefined && +curso['idCurso'] !== +(c.idCurso || 0);
           
          //professor
         //return +curso['idCurso'] !== +c.idCurso;
         return curso['idCurso'] !== +(c.idCurso || 0);

        });
          return this.vetor = filtro;
      }));
  } 

  atualizarCurso(c: Curso): Observable<Curso[]> {
    // Executa a alteração via URL
    return this.http.put(this.url+"alterar", {cursos: c}).pipe(

      // Percorrer o vetor para saber qual é o id do curso alterado
      map((res) => {
        const cursoAlterado = this.vetor.find((item) => {
          return item['idCurso'] === +['idCurso'];
        });

        // Altero o valor do vetor local
        if(cursoAlterado) {
          cursoAlterado['nomeCurso'] = c['nomeCurso'];
          cursoAlterado['valorCurso'] = c['valorCurso'];
        }

        return this.vetor;
      }));
  }

}