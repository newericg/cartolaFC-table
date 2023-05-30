import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() inputText: string = ''
  @Input() teamInput: string = ''

  @Output() updateTeam = new EventEmitter();

  ngOnInit(): void {
    
  }

  public form = new FormGroup({
    name: new FormControl('', Validators.minLength(3)),
  });

  addTeam() {
    this.teamInput = this.form.value.name!
    this.updateTeam.emit({
      value: this.teamInput
    })
    this.form.reset()
  }


}
