import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material';

import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule
} from '@angular/material';

import { ProfilesComponent } from './profiles.component';
import { ProfilesForm } from './profiles.form';
import { ProfilesEditPreference } from './profiles.edit.preference';
import { ProfilesEditAliases } from './profiles.edit.aliases';

@NgModule({
    declarations: [
    ProfilesComponent,
    ProfilesForm,
    ProfilesEditPreference,
    ProfilesEditAliases,
    ],
    imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MenuModule,
    RouterModule
    ],
    entryComponents: [
    ],
    providers: [
    ],
    bootstrap: [ProfilesComponent]
})
export class ProfilesModule { }


