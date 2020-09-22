import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public user: any = {};

  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) { 
      this.auth.authState.subscribe( usuario => {
      if( !usuario ){
        return;
      }

      this.user.nombre = usuario.displayName;
      this.user.uid    = usuario.uid;
      console.log(this.user);
      
    } )
  }

  cargarMensajes(){

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref=> ref.orderBy('fecha','desc')
                                                                          .limit(5) );

    return  this.itemsCollection.valueChanges().pipe(
      map( mensajes => {
        this.chats = [];

        for(let mensaje of mensajes ){
          this.chats.unshift( mensaje )
        }
        return this.chats;
      })
    )
  }

  agregarMensaje( texto :string ){
      let mensaje :Mensaje = {
          nombre  : this.user.nombre,
          mensaje : texto,
          fecha   : new Date().getTime(),
          uid     : this.user.uid
      }

      return this.itemsCollection.add( mensaje );
  }
  
  login( providers: string ) {

    if( providers === 'google' ){
      this.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(resp => console.log( resp['user'] ))
    }else{
      this.auth.signInWithPopup(new auth.TwitterAuthProvider())
      .then(resp => console.log( resp['user'] ))
    }
  }

  logout() {
    this.user = {};
    this.auth.signOut();
  }
}
