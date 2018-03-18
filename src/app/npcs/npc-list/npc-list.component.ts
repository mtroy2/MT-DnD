import { Component, OnInit } from '@angular/core';
import { Npc } from '../npc';
import { NpcService } from '../npc.service';
import { NpcDetailsComponent } from '../npc-details/npc-details.component';

@Component({
  selector: 'npc-list',
  templateUrl: './npc-list.component.html',
  styleUrls: ['./npc-list.component.css'],
  providers: [NpcService]
})

export class NpcListComponent implements OnInit {

  npcs: Npc[]
  selectedNpc: Npc

  constructor(private npcService: NpcService) { }

  ngOnInit() {
     this.npcService
      .getNpcs()
      .then((npcs: Npc[]) => {
        this.npcs = npcs.map((npc) => {
          if (!npc.name) {
            npc.name = "UNDEFINED";
          }
          return npc;
        });
      });
  }

  private getIndexOfNpc = (npcId: String) => {
    return this.npcs.findIndex((npc) => {
      return npc._id === npcId;
    });
  }

  selectNpc(npc: Npc) {
    this.selectedNpc = npc
  }

  createNewNpc() {
    var npc: Npc = {
      name: '',
      age: 0,

    };

    // By default, a newly-created npc will have the selected state.
    this.selectNpc(npc);
  }

  deleteNpc = (npcId: String) => {
    var idx = this.getIndexOfNpc(npcId);
    if (idx !== -1) {
      this.npcs.splice(idx, 1);
      this.selectNpc(null);
    }
    return this.npcs;
  }

  addNpc = (npc: Npc) => {
    this.npcs.push(npc);
    this.selectNpc(npc);
    return this.npcs;
  }

  updateNpc = (npc: Npc) => {
    var idx = this.getIndexOfNpc(npc._id);
    if (idx !== -1) {
      this.npcs[idx] = npc;
      this.selectNpc(npc);
    }
    return this.npcs;
  }
}
