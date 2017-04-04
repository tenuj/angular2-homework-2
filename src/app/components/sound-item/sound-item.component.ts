/**
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 */

import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {UpperCasePipe} from "@angular/common";
import {FileSizePipe} from "../../pipes/file-size.pipe";
import {DurationPipe} from "../../pipes/duration.pipe";
import {ValueDescription} from "../../pipes/value-description.pipe";
import {MenuItem} from "primeng/components/common/api";
import {FreeSoundUtilsService} from "../../services/free-sound-utils.service";

@Component({
  selector: 'sound-item',
  templateUrl: './sound-item.component.html',
  styleUrls: ['./sound-item.component.less']
})
export class SoundItemComponent implements OnInit {

  @Input()
  public set sound( value : SoundInstance )
  {
    this._sound = value;
    this.createAudioDescription();
  }

  @Output()
  public onTagClick = new EventEmitter<string>();

  public get sound() : SoundInstance
  {
    return this._sound;
  }

  public downloadItems : MenuItem[];

  private _sound : SoundInstance;

  public constructor(
    private freeSoundUtilsService : FreeSoundUtilsService
  ){}

  public ngOnInit() : void
  {
    this.createDownloadItems();
  }

  private createDownloadItems() : void
  {
    this.downloadItems = [];

    if ( this.sound.previews[ 'preview-hq-mp3' ] )
    {
      this.downloadItems.push( { label : 'High quality MP3', command : () => this.freeSoundUtilsService.doDownload( this.sound.previews[ 'preview-hq-mp3' ] ) } );
    }

    if ( this.sound.previews[ 'preview-lq-mp3' ] )
    {
      this.downloadItems.push( { label : 'Low quality MP3', command : () => this.freeSoundUtilsService.doDownload( this.sound.previews[ 'preview-lq-mp3' ] ) } );
    }

    if ( this.sound.previews[ 'preview-hq-ogg' ] )
    {
      this.downloadItems.push( { label : 'High quality OGG', command : () => this.freeSoundUtilsService.doDownload( this.sound.previews[ 'preview-hq-ogg' ] ) } );
    }

    if ( this.sound.previews[ 'preview-lq-ogg' ] )
    {
      this.downloadItems.push( { label : 'Low quality OGG', command : () => this.freeSoundUtilsService.doDownload( this.sound.previews[ 'preview-lq-ogg' ] ) } );
    }

    this.downloadItems.push( { label : 'Original quality', command : () => this.downloadButtonClick() } );
  }

  public audioDescription : ValueDescription[];

  private createAudioDescription() : void
  {
    this.audioDescription = [
      { type : "Type", value : this.sound.type, formater : new UpperCasePipe() },
      { type : "Duration", value : this.sound.duration, formater : new DurationPipe() },
      { type : "Filesize", value : this.sound.filesize, formater : new FileSizePipe() },
      { type : "Samplerate", value : this.sound.samplerate ? this.sound.samplerate.toString() : 'N/A' },
      { type : "Bitdepth", value : this.sound.bitdepth ? this.sound.bitdepth.toString() : 'N/A' },
      { type : "Channels", value : this.sound.channels ? this.sound.channels.toString() : 'N/A' }
    ];
  }

  private tagClick( tag : string ) : void
  {
    this.onTagClick.emit( tag );
  }

  private downloadButtonClick() : void
  {
    this.freeSoundUtilsService.doDownload( this.sound.download );
  }
}
