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
  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {

    this.documentService.getDocument('');

    this.lobbySub = this.documentService.currentLobby.subscribe(document => {
      this.lobbyArray = document
    });

  }
  createNewLobby(){
    this.documentService.createLobby();
  }
}
