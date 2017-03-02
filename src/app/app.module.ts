import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {InputTextModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {RatingModule} from 'primeng/primeng';
import { environment } from "../environments/environment";
import { FreeSoundService } from "./services/free-sound.service";
import { PlayerComponent } from './components/player/player.component';
import { SoundItemComponent } from './components/sound-item/sound-item.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { ValueDescriptionPipe } from './pipes/value-description.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { NumLoadedPipe } from './pipes/num-loaded.pipe';
import {ProtocolService} from "./services/protocol.service";

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SoundItemComponent,
    ProgressBarComponent,
    FileSizePipe,
    ValueDescriptionPipe,
    DurationPipe,
    NumLoadedPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    RatingModule
  ],
  providers: [
    FreeSoundService,
    ProtocolService,
    { provide : 'FSApiSettings', useValue : environment.freeSoundAPIEnvironment }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
