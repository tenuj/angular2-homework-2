/**
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 */

import {Injectable, ElementRef, RendererFactory2, Renderer2, ViewEncapsulation, EventEmitter } from '@angular/core';

@Injectable()
export class AudioService extends EventEmitter<AudioServiceEvent> {

  private _player  : ElementRef;
  private renderer : Renderer2;

  /**
   * Проигрывается ли в данный момент звук
   */
  private _playing : boolean;

  public get playing() : boolean
  {
    return this._playing;
  }

  private _currentSound : SoundInstance = null;

  /**
   * Описание текущего проигрываемого звука
   * @returns {SoundInstance}
   */
  public get currentSound() : SoundInstance
  {
    return this._currentSound;
  }

  /**
   * Определяет идет ли буферизация звука в данный момент или нет
   * @returns {boolean}
   */
  public get buffering() : boolean
  {
    if ( this.player.buffered.length > 0 )
    {
      return this.player.buffered.end( this.player.buffered.length - 1 ) != this.player.duration;
    }

    return false;
  }

  public get currentTime() : number
  {
    return this._playing ? this.player.currentTime : this.pausedCurrentTime;
  }

  public set currentTime( value : number )
  {
    if ( this.currentTime != value )
    {
      this.player.currentTime = value;
      this.emit( { sound : this._currentSound, relatedEvent : { type : 'timeupdate' }, player : this.player } );
    }
  }

  public constructor(
    private rendererFactory : RendererFactory2
  )
  {
    super();
  }

  public onReatach() : void
  {
    setTimeout( () => { this.reatachTick() }, 100 );
  }

  private reatachTick() : void
  {
    if ( this.playing )
    {
      this.emit( { sound : this._currentSound, relatedEvent : { type : 'play' }, player : this.player } );
    }

    this.emit( { sound : this._currentSound, relatedEvent : { type : 'progress' }, player : this.player } );
    this.emit( { sound : this._currentSound, relatedEvent : { type : 'timeupdate' }, player : this.player } );
  }

  public get player() : any
  {
    return this._player.nativeElement;
  }

  public setPlayer( player : ElementRef ) : void
  {
    this._player  = player;
    this.renderer = this.rendererFactory.createRenderer( this.player, { id : 'sound_player', encapsulation : ViewEncapsulation.None, styles : [], data : {} } );

    this.renderer.listen( this.player, 'progress',   ( event ) => this.onPlayerEvent( event ) );
    this.renderer.listen( this.player, 'waiting',    ( event ) => this.onPlayerEvent( event ) );
    this.renderer.listen( this.player, 'timeupdate', ( event ) => this.onPlayerEvent( event ) );
    this.renderer.listen( this.player, 'ended',      ( event ) => this.onPlayerEvent( event ) );
    this.renderer.listen( this.player, 'error',      ( event ) => this.onPlayerEvent( event ) );
    this.renderer.listen( this.player, 'pause',      ( event ) => this.onPlayerEvent( event ) );
    this.renderer.listen( this.player, 'play',       ( event ) => this.onPlayerEvent( event ) );
  }

  private onPlayerEvent( event : Event ) : void
  {
    if ( ( event.type == 'ended'  ) || ( event.type == 'error' ) || ( event.type == 'pause' ) )
    {
      this._playing = false;
      this.stopTimer();
    }

    if ( event.type == 'play' )
    {
      this.startTimer();
    }

    //Firefox doesn't send last progress event so we send progress event if player emit timeupdate event
    if ( event.type == 'timeupdate' )
    {
      this.emit( { sound : this._currentSound, relatedEvent : { type : 'progress' }, player : this.player } );
    }

    this.emit( { sound : this._currentSound, relatedEvent : event, player : this.player } );

    if ( event.type == 'error' )
    {
      this._currentSound = null;
    }
  }

  private pausedCurrentTime : number = -1;

  public play( sound : SoundInstance ) : void
  {
    let soundChanged : boolean = ! this._currentSound || ( sound.id != this._currentSound.id );

    if ( soundChanged )
    {
      this.emit( { sound : this._currentSound, relatedEvent : { type : 'soundChanged' }, player : this.player } );

      this.pausedCurrentTime = -1;
      this._currentSound = sound;
      this.renderer.setAttribute( this.player, 'src', sound.previews[ 'preview-hq-mp3' ] );
    }


    if ( this.pausedCurrentTime != -1 )
    {
        this.player.currentTime = this.pausedCurrentTime;
    }

    this._playing = true;
    this.player.play();
  }

  public pause() : void
  {
    this.player.pause();
    this.pausedCurrentTime = this.player.currentTime;
  }

  /**
   * Проверяет текущий sound текущий или нет
   * @param sound
   * @returns {boolean}
   */
  public isSoundCurrent( sound : SoundInstance ) : boolean
  {
    return this._currentSound && ( this._currentSound.id == sound.id );
  }

  private timer : any;

  private startTimer() : void
  {
    if ( ! this.timer )
    {
      this.timer = setInterval( () => this.timerTick(), 100 );
    }
  }

  private stopTimer() : void
  {
    if ( this.timer )
    {
      clearInterval( this.timer );
      this.timer = null;
    }
  }

  private timerTick() : void
  {
    this.emit( { sound : this._currentSound, relatedEvent : { type : 'timeupdate' }, player : this.player } );
  }

}
