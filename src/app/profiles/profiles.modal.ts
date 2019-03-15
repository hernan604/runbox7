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
    selector: 'profiles-modal',
    template: `
        <h1 mat-dialog-title>Edit </h1>
        <div mat-dialog-content>
            <form>
                <mat-form-field style="margin: 10px;">
                    <input matInput placeholder="Email" [value]="data.email">
                </mat-form-field>
                <mat-form-field style="margin: 10px;">
                    <input matInput placeholder="From" [value]="data.from">
                </mat-form-field>
                <mat-form-field style="margin: 10px;">
                    <input matInput placeholder="Reply-to" [value]="data.reply_to">
                </mat-form-field>
                <mat-form-field style="margin: 10px;">
                    <input matInput placeholder="Signature" [value]="data.signature">
                </mat-form-field>
            </form>
        </div>
        <div mat-dialog-actions>
          <button mat-raised-button (click)="save()">Sav3</button>
          <button mat-raised-button (click)="close()">Close</button>
        </div>
    `
})

export class ProfilesModal {
    @Input() value: any[];
    constructor(
        public dialog_ref: MatDialogRef<ProfilesModal>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
    save() {
        console.log('SAVE', this.data);
        this.close();
    }
    close() {
        this.dialog_ref.close({});
    }
}

