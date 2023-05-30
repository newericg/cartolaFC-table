import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() buttonText: string = ''
  @Input() buttonColor: string = ''
  // @Input() onClickButton

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  onClickButton() {
    this.onClick.emit()
  }

}
