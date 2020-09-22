import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  chats: Observable<any[]>;
  constructor(firestore: AngularFirestore,
              public service : ChatService) {
    this.chats = firestore.collection('chats').valueChanges().pipe(
      map( value => {
        // console.log(value);
        
        return value;
      } )
    )
    // console.log(this.chats);
    
  }

  salir(){
    this.service.logout();
  }
}