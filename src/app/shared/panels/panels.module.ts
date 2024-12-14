import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelsComponent } from './panels.component';


@NgModule({
  declarations: [PanelsComponent],
  imports: [
    CommonModule
  ],
  exports:[PanelsComponent]
})
export class PanelsModule { }
