// clients.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';

@NgModule({
  declarations: [ClientsComponent],
  exports: [ClientsComponent], // Export it so other modules can use it
  imports: [CommonModule]
})
export class ClientsModule {}
