import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.less']
})
export class ProgressBarComponent {

  @Input()
  public loadingInfo : LoadingInfo = null;

  @Input()
  public visible : boolean = false;

  constructor() { }

}
