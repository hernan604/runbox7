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
import {MatSelectModule} from '@angular/material'; 
@Component({
    selector: 'profiles-edit-aliases',
    template: `
        <h1 mat-dialog-title>{{is_create ? 'Create Alias' : 'Edit Alias'}}</h1>
        <div mat-dialog-content>
            <form>
                <mat-form-field style="margin: 10px;">
                    <input matInput placeholder="Localpart" 
                        name="localpart"
                        [readonly]="!is_create"
                        [(ngModel)]="data.localpart"
                        (ngModelChange)="onchange_field('localpart')"
                    >
                    <div *ngIf="field_errors && field_errors.localpart">
                        <mat-hint>
                            ie. My main profile
                        </mat-hint>
                        <mat-error *ngFor="let error of field_errors.localpart; let i = index;">
                            {{error}}
                        </mat-error>
                    </div>
                </mat-form-field>
                @
                <mat-form-field style="margin: 10px;" *ngIf="is_create">
                    <mat-label>Domain</mat-label>
                    <mat-select
                        name="domain"
                        [disabled]="!is_create"
                        [(ngModel)]="data.domain"
                        (ngModelChange)="onchange_field('domain')"
                    >
                        <mat-option *ngFor="let domain of allowed_domains" [value]="domain">
                            {{domain}}
                        </mat-option>
                    </mat-select>
                    <div *ngIf="field_errors && field_errors.domain">
                        <mat-hint>
                            ie. jamesbond@runbox.com
                        </mat-hint>
                        <mat-error *ngFor="let error of field_errors.domain; let i = index;">
                            {{error}}
                        </mat-error>
                    </div>
                </mat-form-field>
                <mat-form-field style="margin: 10px;" *ngIf="!is_create">
                    <input matInput placeholder="Domain"
                        name="domain"
                        readonly
                        [(ngModel)]="data.domain"
                        (ngModelChange)="onchange_field('domain')"
                    >
                </mat-form-field>
                <mat-form-field style="margin: 10px;">
                    <input matInput placeholder="Deliver to account"
                        name="forward_to"
                        [(ngModel)]="data.forward_to"
                        (ngModelChange)="onchange_field('forward_to')"
                    >
                    <mat-hint>
                        ie. you@runbox.com
                    </mat-hint>
                    <div *ngIf="field_errors && field_errors.forward_to">
                        <mat-hint>
                            ie. James Bond
                        </mat-hint>
                        <mat-error *ngFor="let error of field_errors.forward_to; let i = index;">
                            {{error}}
                        </mat-error>
                    </div>
                </mat-form-field>
            </form>
        </div>
        <div mat-dialog-actions>
          <button mat-raised-button (click)="save()">Save</button>
          <button mat-raised-button (click)="close()">Close</button>
        </div>
        <mat-divider></mat-divider>
        <pre>{{data | json}}</pre>
    `
})

export class ProfilesEditAliases {
    @Input() value: any[];
    field_errors;
    is_create = false; //indicates if its create or update
    allowed_domains = [];
    constructor(
        private http: Http,
        public snackBar: MatSnackBar,
        public dialog_ref: MatDialogRef<ProfilesEditAliases>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if ( ! data || ! Object.keys(data).length ) { this.is_create = true }
        console.log('received data', data)
        this.load_allowed_domains();
    }
    load_allowed_domains() {
        let req = this.http.get('/rest/v1/alias/allowed_domains')
            .pipe(timeout(10000))
            ;
        req.subscribe(
          data => {
            const reply = data.json();
            console.log('allowed_domains', reply)
            this.allowed_domains = reply.result.allowed_domains;
            return;
          },
          error => {
            return this.show_error('Could not load profiles.', 'Dismiss');
          }


        );
    }
    save() {
        if ( this.is_create ) { this.create() }
        else { this.update() }
    }
    create(){
        let data = this.data;
        this.http.post('/rest/v1/alias/', {
            localpart : data.localpart,
            domain : data.domain,
            forward_to : data.forward_to,
        })
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
    update(){
        let data = this.data;
        this.http.put('/rest/v1/alias/'+data.id, {
            forward_to : this.data.forward_to,
        })
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
        if ( this.field_errors && this.field_errors[field] ) {
            this.field_errors[field] = [];
        }
    }
}

