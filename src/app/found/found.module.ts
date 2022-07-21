import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControlName, Validators } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoundPageRoutingModule } from './found-routing.module';

import { FoundPage } from './found.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FoundPageRoutingModule
  ],
  declarations: [FoundPage, FormGroup, FormControlName, Validators]
})
export class FoundPageModule {}
