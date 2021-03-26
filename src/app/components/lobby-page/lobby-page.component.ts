import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import { Subscription } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.scss']
})
export class LobbyPageComponent implements OnInit {

  lobbySub: Subscription;
  lobbyArray;
  userName = "";
  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {

    this.documentService.getDocument('');

    this.lobbySub = this.documentService.currentLobby.subscribe(document => {
      this.lobbyArray = document
    });

  }
  updateUsername(event) {
    if(event.key === 'Enter') {
        this.userName = event.currentTarget.value;   
        document.getElementById('door').classList.add('opened');   
    }
  }
  createNewLobby(){
    this.documentService.createLobby();
  }
}
