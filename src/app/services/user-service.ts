import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }


  //CHAMADAS 
  // https://api.cartola.globo.com/time/id/44902233

  getTeam(team: string) {
    return this.http.get('https://api.cartola.globo.com/busca?q=' + team)
  }

  getTeamStatus(id: number) {
    return this.http.get('https://api.cartola.globo.com/time/id/' + id)
  }

  getMercadoStatus() {
    return this.http.get('https://api.cartola.globo.com/mercado/status')
  }

}