import { Component, Input } from '@angular/core';
import { Npc } from '../npc';
import { NpcService } from '../npc.service';

@Component({
  selector: 'npc-details',
  templateUrl: './npc-details.component.html',
  styleUrls: ['./npc-details.component.css']
})

export class NpcDetailsComponent {
  @Input()
  npc: Npc;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private npcService: NpcService) {}

  createNpc(npc: Npc) {
    this.npcService.createNpc(npc).then((newNpc: Npc) => {
      this.createHandler(newNpc);
    });
  }

  updateNpc(npc: Npc): void {
    this.npcService.updateNpc(npc).then((updatedNpc: Npc) => {
      this.updateHandler(updatedNpc);
    });
  }

  deleteNpc(npcId: String): void {
    this.npcService.deleteNpc(npcId).then((deletedNpcId: String) => {
      this.deleteHandler(deletedNpcId);
    });
  }
}
