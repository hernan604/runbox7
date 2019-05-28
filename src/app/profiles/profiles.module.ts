import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material';

import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatTableModule
} from '@angular/material';

import { ProfilesComponent } from './profiles.component';
import { ProfilesLister } from './profiles.lister';
import { AliasesLister } from './aliases.lister';
import { ProfilesEditorModal } from './profiles.editor.modal';
import { AliasesEdit } from '../aliases/edit';

@NgModule({
    declarations: [
    AliasesLister,
    ProfilesComponent,
    ProfilesLister,
    ProfilesEditorModal,
    AliasesEdit,
    ],
    imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
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


