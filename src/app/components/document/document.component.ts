import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { Document } from 'src/app/models/document.model';
import { DocumentService } from 'src/app/services/document.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {
  document: Document;
  otherInput;
  myInput;
  userId;
  private _docSub: Subscription;

  constructor(private documentService: DocumentService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.documentService.joinLobby(this.userId)
      this._docSub = this.documentService.currentDocument.subscribe(document => {
        this.document = document[this.userId].battle
        this.getUser();
        this.getOtherUser();
      });
    });
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  getUser(){
    this.myInput = this.document[this.documentService.getUser()]
  }
  getOtherUser(){
    for (const key in this.document) {
      if (this.document.hasOwnProperty(key) && key !== this.documentService.getUser()) {
        this.otherInput = this.document[key];
      }
    }
  }
  editDoc() {
    this.documentService.editDocument(this.document,this.userId);
  }
}