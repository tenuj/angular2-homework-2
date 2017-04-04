/**
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 */

import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AudioService} from "../../services/audio.service";

type VisualLoadingChunk = {
  start : number;
  width : number;
}

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {

  @Input()
  public sound : SoundInstance;

  @ViewChild( 'panelContainer' )
  public panelContainer : ElementRef;

  @ViewChild( 'topPanel' )
  public topPanel : ElementRef;

  @ViewChild( 'bottomPanel' )
  public bottomPanel : ElementRef;

  public hovered : boolean = false;
  public waveFormViewMode : boolean = true;

  public position  : number;
  public active    : boolean;
  public playing   : boolean;
  public waiting   : boolean;
  public buffering : boolean;
  public msgs      : any[] = [];

  public loadingChunks : VisualLoadingChunk[];
  public cursorPos     : number;

  public constructor(
    private audioService : AudioService
  ){}

  public ngOnInit() : void
  {
    this.initState();
    this.audioService.subscribe( ( event ) => this.onPlayerEvent( event ) );
  }

  private onPlayerEvent( event : AudioServiceEvent ) : void
  {
    if ( this.audioService.isSoundCurrent( this.sound ) )
    {
      switch( event.relatedEvent.type )
      {
        case 'waiting'      : { this.onWaiting( event ); break; }
        case 'progress'     : { this.onProgress( event );  break; }
        case 'timeupdate'   : { this.onTimeUpdate( event ); break; }
        case 'ended'        : { this.onEnded( event );  break; }
        case 'error'        : { this.onError( event );  break; }
        case 'pause'        : { this.onPause( event );  break; }
        case 'play'         : { this.onPlay( event );  break; }
        case 'soundChanged' : { this.resetState(); break; }
      }
    }
  }

  private onPlay( event : AudioServiceEvent ) : void
  {
    this.playing = true;
    this.active = true;
  }

  private onWaiting( event : AudioServiceEvent ) : void
  {
    this.waiting = true;
  }

  private onProgress( event : AudioServiceEvent ) : void
  {
    if ( this.msgs.length > 0 )
    {
      return;
    }

    this.buffering = this.audioService.buffering;
    this.waiting   = false;

    if ( this.buffering )
    {
      this.loadingChunks = this.populateVisualLoading( event.player.buffered );
    }
  }

  private onTimeUpdate( event : AudioServiceEvent ) : void
  {
    if ( this.msgs.length > 0 )
    {
      return;
    }

    this.position  = event.player.currentTime;
    this.cursorPos = this.audioPositionToPosition( event.player.currentTime );
  }

  private onPause( event : AudioServiceEvent ) : void
  {
    this.playing = false;
  }

  private onEnded( event : AudioServiceEvent ) : void
  {
    this.playing  = false;
    this.waiting  = false;
    this.position = this.sound.duration;
  }

  private onError( event : AudioServiceEvent ) : void
  {
    this.msgs.push( {severity:'error', summary:'Error occured while trying to play sound', detail : '...'} );
    this.resetState();
  }

  private initState() : void
  {
    if ( this.audioService.isSoundCurrent( this.sound ) )
    {
      this.active = true;
      this.audioService.onReatach();
      return;
    }

    this.resetState();
  }

  private resetState() : void
  {
    this.position  = this.sound.duration;
    this.active    = false;
    this.playing   = false;
    this.waiting   = false;
    this.buffering = false;
    this.loadingChunks = [];
    this.cursorPos = 0;
  }

  public switchToWaveViewButtonClick() : void
  {
    this.waveFormViewMode = true;
  }

  public switchToSpectralViewButtonClick() : void
  {
    this.waveFormViewMode = false;
  }

  public onMouseOver() : void
  {
    this.hovered = true;
  }

  public onMouseOut() : void
  {
    this.hovered = false;
  }

  public onPlayClick() : void
  {
    this.audioService.play( this.sound );
  }

  public onPlayerClick( event : MouseEvent ) : void
  {
    if ( ( event.target == this.panelContainer.nativeElement ) || ( event.target == this.topPanel.nativeElement ) || ( event.target == this.bottomPanel.nativeElement ) )
    {
      if ( this.audioService.isSoundCurrent( this.sound ) )
      {
        if ( this.audioService.playing )
        {
          this.audioService.player.currentTime = this.positionToAudioPosition( event.offsetX );
          return;
        }
      }

      this.audioService.play( this.sound );
    }
  }

  public onPauseClick() : void
  {
    this.audioService.pause();
  }

  private audioPositionToPosition( position : number ) : number
  {
    let componentWidth : number = this.panelContainer.nativeElement.clientWidth;
    let duration       : number = this.audioService.player.duration;

    return Math.floor( ( position * componentWidth ) / duration );
  }

  private positionToAudioPosition( position : number ) : number
  {
    let componentWidth : number = this.panelContainer.nativeElement.clientWidth;
    let duration       : number = this.audioService.player.duration;

    return ( position * duration ) / componentWidth;
  }

  private populateVisualLoading( buffered : any ) : VisualLoadingChunk[]
  {
    let chunks : VisualLoadingChunk[] = [];

    if ( buffered.length > 0 )
    {
      for ( let i : number = 0; i < buffered.length; i ++ )
      {
        let start : number = this.audioPositionToPosition( buffered.start( i ) );
        let end   : number = this.audioPositionToPosition( buffered.end( i ) );
        let width : number = end - start;

        chunks.push( { start : start, width : width } );
      }
    }

    return chunks;
  }

}
