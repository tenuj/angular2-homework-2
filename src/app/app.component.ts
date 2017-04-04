/**
 * This code has been written by Denis Shavenzov
 * If you have any questions you can contact me by email shavenzov@gmail.com
 */

import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {AudioService} from './services/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  @ViewChild( 'player' )
  public player : ElementRef;

  public constructor(
    private audioService : AudioService
  ){}

  public ngOnInit() : void
  {
    this.audioService.setPlayer( this.player );
  }

}
