// --------- BEGIN RUNBOX LICENSE ---------
// Copyright (C) 2016-2018 Runbox Solutions AS (runbox.com).
// 
// This file is part of Runbox 7.
// 
// Runbox 7 is free software: You can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the
// Free Software Foundation, either version 3 of the License, or (at your
// option) any later version.
// 
// Runbox 7 is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with Runbox 7. If not, see <https://www.gnu.org/licenses/>.
// ---------- END RUNBOX LICENSE ----------
import { 
  SecurityContext, 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  NgZone, 
  ViewChild, 
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  HttpModule, 
  JsonpModule, 
  XHRBackend, 
  RequestOptions, 
  BrowserXhr 
} from '@angular/http';
import {
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatChipsModule,
  MatDialog,
  MatPaginator,
  MatSnackBar,
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {ProfilesModal} from './profiles.modal';


@Component({
    selector: 'profiles-form',
    template: `
    <div>
        <ng-content select="[section-header]"></ng-content>
        <ng-content select="[section-description]"></ng-content>
        <form *ngFor="let item of values; let i = index;">
            <mat-form-field class="email" style="margin: 10px;">
                <input matInput placeholder="Email" [value]="item.email">
            </mat-form-field>
            <mat-form-field class="from" style="margin: 10px;">
                <input matInput placeholder="From Name" [value]="item.from">
            </mat-form-field>
            <mat-form-field class="reply_to" style="margin: 10px;">
                <input matInput placeholder="Reply-to" [value]="item.reply_to">
            </mat-form-field>
            <mat-form-field class="signature" style="margin: 10px;">
                <input matInput placeholder="Signature" [value]="item.signature">
            </mat-form-field>
            <button 
                (click)="edit(item)" 
                color='primary' 
                mat-raised-button 
                style="margin: 10px;"
            >
                EDIT
            </button>
            <button 
                (click)="delete(i, item)"
                *ngIf="!is_delete_disabled"
                color='primary' 
                mat-raised-button
                style="margin: 10px;"
            >
                Delete
            </button>
        </form>
        <ng-content select="[section-buttons]"></ng-content>
    </div>

        `
})
export class ProfilesForm {
    @Input() values: any[];
    @Input() is_delete_disabled: false;
    //@Output() save: EventEmitter<number> = new EventEmitter<number>();
    //onClick(anIndex) {
    //  alert("SAVE")
    //  this.delete.emit(anIndex);
    //  this.images.splice(anIndex, 1);
    //}
    constructor(public dialog: MatDialog) {}
    edit (item): void {
        console.log("CLICK", item)
        const dialog_ref = this.dialog.open(ProfilesModal, {
            width: '300px',
            data: item
        });
        dialog_ref.afterClosed().subscribe(result => {
            console.log('Dialog Close !', result)
            item = result;
        });
    }
    delete (i, item) {
        console.log("delete", i, item)
    }
}

