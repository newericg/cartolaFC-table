import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UserService } from '../services/user-service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { TeamsDataSource } from './TeamsDataSource';


@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnChanges, OnInit {
  constructor(
    private service: UserService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef

  ) { }

  @Input() teamInput: string = ''

  @Output() clearTableData = new EventEmitter();

  error: boolean = false

  dataSource!: TeamsDataSource;


  displayedColumns: string[] = ['Emblema', 'Nome', 'Patrimonio',
    'Pontuação Rodada Atual', 'Pontuação Total', 'Média', 'Remover'];

  getTeam(name: string) {
    this.error = false
    this.dataSource.loadTeams(name)
  }

  removeTeam(index: number) {
    this.dataSource.removeTeam(index)
  }


  clearTable() {
    this.clearTableData.emit()
    this.dataSource.clearTable()
    localStorage.clear()
  }

  saveTable() {
    this.dataSource.teamsSubject.value.map((el, index) => {
      console.log(el)
      localStorage.setItem('team' + index, el.time.time_id)
    })
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '20vh',
      width: '30vw',
      data: {
        text: 'Salvo com sucesso',
        icon: true,
        iconSrc: 'https://cdn.lordicon.com/egiwmiit.json',
        iconColor: 'primary:#16c72e'
      }
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['teamInput'].currentValue) {
      this.getTeam(changes['teamInput'].currentValue)
    }
  }

  ngOnInit() {
    this.dataSource = new TeamsDataSource(this.service, this.dialog)
    console.log(localStorage)
      for (var i = 0; i < localStorage.length; i++){
        this.dataSource.loadTeamById(localStorage.getItem('team' + i)!.toString())
      }
  }

}
