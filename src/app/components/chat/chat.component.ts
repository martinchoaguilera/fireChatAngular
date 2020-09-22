import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit{

  mensaje : string="";
  elemento: any;
  constructor( public services : ChatService ) { 
    
    this.services.cargarMensajes()
          .subscribe( ()=>{
            setTimeout(()=>{
              this.elemento.scrollTop = this.elemento.scrollHeight
            },20)
          } );
  }
  ngOnInit(){
    this.elemento = document.getElementById( 'app-mensajes' );
  }

  enviarMensaje(){
    console.log(this.mensaje);
    if( this.mensaje.length === 0 ){
      return;
    }

    this.services.agregarMensaje( this.mensaje )
                  .then(()=>this.mensaje="")
                  .catch((e)=> console.log({e}))
                  
  }


}
