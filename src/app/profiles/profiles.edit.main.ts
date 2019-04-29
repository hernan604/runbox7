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
  Inject,
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
  MatDialogRef,
  MatPaginator,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field'; 
@Component({
    selector: 'profiles-edit-main',
    template: `
        <h1 mat-dialog-title>Edit Profile Main</h1>
        <div mat-dialog-content>
            <form>
                <mat-form-field style="margin: 10px;">
                    <input matInput placeholder="Name" 
                        name="name"
                        [(ngModel)]="data.profile.name"
                    >
                </mat-form-field>
                <mat-form-field style="margin: 10px;">

                    <input matInput placeholder="Email" 
                        name="email"
                        readonly
                        [(ngModel)]="data.profile.email"
                    >
                </mat-form-field>
                <mat-form-field style="margin: 10px;">
                    <input matInput placeholder="From"
                        name="from"
                        [(ngModel)]="data.profile.from_name"
                    >
                </mat-form-field>
                <mat-form-field style="margin: 10px;">
                    <input matInput placeholder="Reply-to"
                        name="reply_to"
                        [(ngModel)]="data.profile.reply_to"
                    >
                </mat-form-field>
                <mat-form-field style="margin: 10px;">
                    <input matInput placeholder="Signature"
                        name="signature"
                        [(ngModel)]="data.profile.signature"
                    >
                </mat-form-field>
            </form>
        </div>
        <div mat-dialog-actions>
          <button mat-raised-button (click)="save(data)">Save</button>
          <button mat-raised-button (click)="close()">Close</button>
        </div>
        <mat-divider></mat-divider>
        <pre>{{data | json}}</pre>
    `
})

export class ProfilesEditMain {
    @Input() value: any[];
    constructor(
        public dialog_ref: MatDialogRef<ProfilesEditMain>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        console.log('received data', data)
    }
    save(data) {
        console.log('SAVE', this.data);
        this.close();
    }
    close() {
        this.dialog_ref.close({});
    }
}

