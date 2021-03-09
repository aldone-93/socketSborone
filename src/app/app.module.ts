import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { DocumentComponent } from './components/document/document.component';
import { LobbyPageComponent } from './components/lobby-page/lobby-page.component';

const config: SocketIoConfig = { url: 'https://socketaldone.herokuapp.com:4444', options: {} };

const appRoutes = [
  { path: 'battle/:id', component: DocumentComponent},
  { path: '', component: LobbyPageComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent,
    LobbyPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
