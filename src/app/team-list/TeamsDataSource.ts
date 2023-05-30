import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, catchError, finalize, of } from "rxjs";
import { UserService } from "../services/user-service";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../shared/dialog/dialog.component";

export class TeamsDataSource implements DataSource<any> {

	public teamsSubject = new BehaviorSubject<Array<any>>([]);
	public loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();

	constructor(
		private service: UserService,
		public dialog: MatDialog,
	) { }

	connect(collectionViewer: CollectionViewer): Observable<any[]> {
		return this.teamsSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.teamsSubject.complete();
		this.loadingSubject.complete();
	}

	loadTeams(name: any) {
		this.loadingSubject.next(true);
		this.service.getTeam(name).subscribe((teams: any) => {
			if (teams.length === 1 && teams[0] && teams[0].time_id) {
				let id = teams[0].time_id
				this.service.getTeamStatus(id)
					.subscribe((team: any) => {
						let currentValue = this.teamsSubject.value
						let updatedValue = [...currentValue, team]
						this.teamsSubject.next(updatedValue)
					})
			} if (teams.length > 1) {
				let dialogRef = this.dialog.open(DialogComponent, {
					height: '50vh',
					width: '50vw',
					data: {
						title: 'Selecione um time da lista',
						data: teams,
						list: true,
						team: []
					}
				});
				dialogRef.afterClosed().subscribe(result => {
					if (result.team.time_id) {
						this.service.getTeamStatus(result.team.time_id).subscribe({
							next: (team: any) => {
								let currentValue = this.teamsSubject.value
								let updatedValue = [...currentValue, team]
								this.teamsSubject.next(updatedValue)
							},
						})
					}
				});
			} if (teams.length === 0) {
				let dialogRef = this.dialog.open(DialogComponent, {
					height: '15vh',
					width: '25vw',
					data: {
						title: 'ERRO',
						text: 'Time não encontrado'
					}
				});
			}
		}
		);
		this.loadingSubject.next(false)
	}

	loadTeamById(id: any) {
		this.service.getTeamStatus(id)
			.subscribe((team: any) => {
				let currentValue = this.teamsSubject.value
				let updatedValue = [...currentValue, team]
				this.teamsSubject.next(updatedValue)
			})
	}

	removeTeam(index: any) {
		let newArr: any
		newArr = this.teamsSubject.value
		if (index > -1 && index < newArr.length) {
			newArr.splice(index, 1);
		}
		return this.teamsSubject.next(newArr)
	}

	clearTable() {
		this.teamsSubject.next([])
	}
}