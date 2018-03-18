import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NpcDetailsComponent } from './npcs/npc-details/npc-details.component';
import { NpcListComponent } from './npcs/npc-list/npc-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NpcDetailsComponent,
    NpcListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
