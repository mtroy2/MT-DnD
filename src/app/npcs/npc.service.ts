import { Injectable } from '@angular/core';
import { Npc } from './npc';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NpcService {
    private npcsUrl = '/api/npcs';

    constructor (private http: Http) {}

    // get("/api/npcs")
    getNpcs(): Promise<void | Npc[]> {
      return this.http.get(this.npcsUrl)
                 .toPromise()
                 .then(response => response.json() as Npc[])
                 .catch(this.handleError);
    }

    // post("/api/npcs")
    createNpc(newNpc: Npc): Promise<void | Npc> {
      return this.http.post(this.npcsUrl, newNpc)
                 .toPromise()
                 .then(response => response.json() as Npc)
                 .catch(this.handleError);
    }

    // get("/api/npcs/:id") endpoint not used by Angular app

    // delete("/api/npcs/:id")
    deleteNpc(delNpcId: String): Promise<void | String> {
      return this.http.delete(this.npcsUrl + '/' + delNpcId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/npcs/:id")
    updateNpc(putNpc: Npc): Promise<void | Npc> {
      var putUrl = this.npcsUrl + '/' + putNpc._id;
      return this.http.put(putUrl, putNpc)
                 .toPromise()
                 .then(response => response.json() as Npc)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
