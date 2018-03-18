import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
