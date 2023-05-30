import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TeamListComponent } from '../team-list/team-list.component';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private service: UserService,
  ){}

  @ViewChild(TeamListComponent) teamList!:TeamListComponent;

  teamName: string = ''
  loading: boolean = false
  rodadaAtual: string = ''

  updateTable(eventData: { value: string }) {
    this.teamName = eventData.value
  }

  clearTable() {
    this.teamList.clearTable()
  }

  ngOnInit() {
    this.getRodadaAtual()
  }

  getRodadaAtual() {
    this.loading = true
    this.service.getMercadoStatus().subscribe((res: any) => {
      this.rodadaAtual = res.rodada_atual
      this.loading = false
    })
  }


}
