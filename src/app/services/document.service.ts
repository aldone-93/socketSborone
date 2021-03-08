import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Document } from 'src/app/models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  currentDocument = this.socket.fromEvent<Document>('document');

  currentLobby = this.socket.fromEvent<any>('lobby');

  constructor(private socket: Socket) {
    socket.on('document', res => {
      console.log('document' + res);
    });
    socket.on('lobby', res => {
      console.log('lobby: ' + res);
    });
   }

  getDocument(id: string) {
    this.socket.emit('getDoc');
  }
  createLobby() {
    this.socket.emit('createLobby',Math.floor((1 + Math.random()) * 0x10000))
  }
  joinLobby(lobbyId){
    this.socket.emit('joinLobby',lobbyId);
  }

  editDocument(document: Document, userId) {
    this.socket.emit('editDoc', {document,userId});
  }

  getUser(){
    return this.socket.ioSocket.id;
  }
}