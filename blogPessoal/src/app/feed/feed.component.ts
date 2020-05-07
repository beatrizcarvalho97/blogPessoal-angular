import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../service/postagem.service';
import { Postagem } from '../model/Postagem';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  key = 'data'
  reverse = true

  listaPostagens: Postagem []

  postagem: Postagem = new Postagem

  alerta:boolean = false

  constructor(private postagemService: PostagemService) { }

  ngOnInit() {
    this.findallPostagens()
  
    let item: string = localStorage.getItem('delOk')
    if (item == "true"){
      this.alerta = true
      localStorage.clear()

      setTimeout(()=>{
        location.assign('/feed')
      }, 3000)
      
    }

  window.scroll(0,0)

  }
 
  findallPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }

  publicar(){
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      location.assign('/feed')
    })
  }
}
