import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {

  @Input()
  public sound : SoundInstance;

  constructor() { }

  ngOnInit() {
  }

}
