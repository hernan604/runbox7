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
    styles: [`
        .profile-form form > div {
            display: inline-block;
            position: relative;
            margin: 10px;
        }
        .profile-form form > div > div {
            overflow: scroll;
        }
    `],
    template: `
    <div class="profile-form">
        <ng-content select="[section-header]" style="margin-top: 20px;"></ng-content>
        <ng-content select="[section-description]"></ng-content>
        <form *ngFor="let item of values; let i = index;">

            <mat-divider *ngIf="i > 0"></mat-divider>

            <mat-form-field class="email" style="margin: 10px;">

                <input
                    *ngIf="item.profile && item.profile.reference_type == 'aliases' && item.reference.virtual_domain && item.reference.localpart && item.reference.virtual_domain.name"
                    matInput
                    placeholder="Email"
                    [value]="item.reference.localpart + '@' + item.reference.virtual_domain.name"
                >

                <input
                    *ngIf="item.profile && item.profile.reference_type == 'aliases' && ! item.reference.virtual_domain && item.reference.localpart"
                    matInput
                    placeholder="Email"
                    [value]="item.reference.localpart + '@runbox.*'"
                >

                <input
                    *ngIf="item.profile && item.profile.reference_type == 'preference' && item.reference.virtual_domain && item.reference.email && item.reference.virtual_domain.name"
                    matInput
                    placeholder="Email"
                    [value]="item.reference.email + '@' + item.reference.virtual_domain.name"
                >

                <input
                    *ngIf="item.profile && item.profile.reference_type == 'preference' && ! item.reference.virtual_domain && item.reference.email"
                    matInput
                    placeholder="Email"
                    [value]="item.reference.email"
                >

            </mat-form-field>

            <mat-form-field class="from" style="margin: 10px;">
                <input
                    matInput
                    placeholder="From Name"
                    [value]="( item && item.reference && item.profile.name ) || ''"
                >
            </mat-form-field>

            <mat-form-field class="reply_to" style="margin: 10px;">
                <input
                    matInput 
                    placeholder="Reply-to"
                    [value]="( item && item.reference && item.reference.reply_to ) || ''"
                >
            </mat-form-field>

            <div>
                <mat-label>Signature</mat-label>
                <div
                    [innerHTML]="( item && item.reference && item.reference.signature ) || ''"
                    style="width: 180px;"
                ></div>
            </div>

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

