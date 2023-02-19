import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  vetor: Curso[] = [];

  curso = new Curso();

  constructor(private curso_servico: CursoService) {}

  ngOnInit(): void {
    this.selecionar();
  }

  selecionar() {
    this.curso_servico.obterCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
      }
    );
  }

  cadastrar() {
    this.curso_servico.cadastrarCurso(this.curso).subscribe(
      (res: Curso[]) => {

        // Adicionando dados ao vetor
        this.vetor = res;

        // Limpar os atributos
        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;

        // Atualizar a listagem
        this.selecionar();
      }
    );
  }

  alterar() {
    this.curso_servico.atualizarCurso(this.curso).subscribe(
      (res) => {
        // Atualizar vetor
        this.vetor = res;

        // Limpar os valores do objeto
        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;

        // Atualiza a listagem
        this.selecionar();
      }
    );
  }

  remover() {
    this.curso_servico.removerCurso(this.curso).subscribe(
      (res: Curso[]) => {
        this.vetor = res;

        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;

        // Atualiza a listagem
        this.selecionar();
      }
    );
  }

  selecionarCurso(c: Curso) {
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }
} 
