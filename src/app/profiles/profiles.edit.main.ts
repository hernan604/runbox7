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
import { timeout } from 'rxjs/operators';
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
  Http,
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
                        (ngModelChange)="onchange_field('name')"
                    >
                    <div *ngIf="field_errors.name">
                        <mat-hint>
                            ie. My main profile
                        </mat-hint>
                        <mat-error *ngFor="let error of field_errors.name; let i = index;">
                            {{error}}
                        </mat-error>
                    </div>
                </mat-form-field>
                <mat-form-field style="margin: 10px;">
                    <input matInput placeholder="Email" 
                        name="email"
                        readonly
                        [(ngModel)]="data.profile.email"
                        (ngModelChange)="onchange_field('email')"
                    >
                    <div *ngIf="field_errors.email">
                        <mat-hint>
                            ie. jamesbond@runbox.com
                        </mat-hint>
                        <mat-error *ngFor="let error of field_errors.email; let i = index;">
                            {{error}}
                        </mat-error>
                    </div>
                </mat-form-field>
                <mat-form-field style="margin: 10px;">
                    <input matInput placeholder="From"
                        name="from"
                        [(ngModel)]="data.profile.from_name"
                        (ngModelChange)="onchange_field('from_name')"
                    >
                    <div *ngIf="field_errors.from_name">
                        <mat-hint>
                            ie. James Bond
                        </mat-hint>
                        <mat-error *ngFor="let error of field_errors.from_name; let i = index;">
                            {{error}}
                        </mat-error>
                    </div>
                </mat-form-field>
                <mat-form-field style="margin: 10px;">
                    <input matInput placeholder="Reply-to"
                        name="reply_to"
                        [(ngModel)]="data.profile.reply_to"
                        (ngModelChange)="onchange_field('reply_to')"
                    >
                    <div *ngIf="field_errors.reply_to">
                        <mat-hint>ie. jamesbond-noreply@runbox.com</mat-hint>
                        <mat-error *ngFor="let error of field_errors.reply_to; let i = index;">
                            {{error}}
                        </mat-error>
                    </div>
                </mat-form-field>
                <mat-form-field style="margin: 10px;">
                    <input matInput placeholder="Signature"
                        name="signature"
                        [(ngModel)]="data.profile.signature"
                        (ngModelChange)="onchange_field('signature')"
                    >
                    <div *ngIf="field_errors.signature">
                        <mat-hint>
                            ie. 
                            <br>Mr. James Bond
                            <br>--------------
                            <br>
                            <br>"My name is Bond, James Bond"
                        </mat-hint>
                        <mat-error *ngFor="let error of field_errors.signature; let i = index;">
                            {{error}}
                        </mat-error>
                    </div>
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
    field_errors = {};
    constructor(
        private http: Http,
        public snackBar: MatSnackBar,
        public dialog_ref: MatDialogRef<ProfilesEditMain>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        console.log('received data', data)
    }
    save(data) {
        console.log('SAVE', this.data);
        this.http.put('/rest/v1/profile/'+this.data.profile.id, this.data.profile)
        .pipe(timeout(60000))
        .subscribe(
          data => {
            const reply = data.json();
            if ( reply.status == 'error' ) {
                if ( reply.field_errors ) {
                    this.field_errors = reply.field_errors;
                }
                if ( reply.errors ) {
                    this.show_error( reply.errors.join( '' ), 'Dismiss' )
                }
                return;
            }
            this.close();
            console.log('profiles', reply)
            return;
          },
          error => {
            return this.show_error('Could not load profiles.', 'Dismiss');
          }
        );
    }
    close() {
        this.dialog_ref.close({});
    }
    show_error (message, action) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    };
    onchange_field ( field ) {
        if ( this.field_errors[field] ) {
            this.field_errors[field] = [];
        }
    }
}

