import { Component, Input, Output, EventEmitter } from '@angular/core';
import {UpperCasePipe} from "@angular/common";
import {FileSizePipe} from "../../pipes/file-size.pipe";
import {DurationPipe} from "../../pipes/duration.pipe";
import {ValueDescription} from "../../pipes/value-description.pipe";

@Component({
  selector: 'sound-item',
  templateUrl: './sound-item.component.html',
  styleUrls: ['./sound-item.component.less']
})
export class SoundItemComponent {

  @Input()
  public set sound( value : SoundInstance )
  {
    this._sound = value;
    this.createAudioDescription();
  }

  public get sound() : SoundInstance
  {
    return this._sound;
  }

  @Output()
  public onTagClick = new EventEmitter<string>();

  private _sound : SoundInstance;

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
}
