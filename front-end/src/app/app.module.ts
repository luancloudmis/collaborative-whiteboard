import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToolboxComponent } from '../libs/components/toolbox/toolbox.component';
import { WhiteboardComponent } from 'src/libs/components/whiteboard/whiteboard.component';
import { NavigationComponent } from '../libs/components/navigation/navigation.component';
import { ToolCustomComponent } from 'src/libs/components/tool-o/tool-custom.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    WhiteboardComponent,
    ToolboxComponent,
    ToolCustomComponent,
    NavigationComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
