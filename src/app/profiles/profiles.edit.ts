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
    selector: 'profiles-edit',
    styles: [`
        .mat_header {
            padding: 10px 0 10px 10px
        }
        .mat_card.update .mat_header,
        .mat_card.create .mat_header {
            background-color: #013b69;
         }
        .header-image {
           border-radius: 50%;
           flex-shrink: 0;
           background-image:url(/_img/avatar.svg);
           background-size: cover;
        }
    `],
    template: `
        <mat-card class="mat_card {{css_class()}}" style="padding: 0px">
          <mat-card-header class="mat_header">
            <div mat-card-avatar class="header-image">
            </div>
            <mat-card-title >
                <div *ngIf="is_create" style="color: #FFF;">Create profile</div>
                <div *ngIf="is_update" style="color: #FFF;">Edit profile</div>
                <div *ngIf="is_delete" style="color: #000;">Delete profile <strong>{{data.profile.name}}</strong> ?</div>
            </mat-card-title>
            <mat-card-subtitle style="color: #FFF;">
                <div *ngIf="is_update" style="color: #FFF;">{{data.profile.name}}</div>
                <div *ngIf="is_delete" style="color: #000;">{{data.profile.name}}</div>
            </mat-card-subtitle>
            <span flex></span>
          </mat-card-header>
          <mat-card-content>
                <div mat-dialog-content>
                    <form>
                        <mat-form-field style="margin: 10px; width: 45%">
                            <input matInput placeholder="Name" 
                                name="name"
                                [(ngModel)]="data.profile.name"
                                (ngModelChange)="onchange_field('name')"
                            >
                            <div *ngIf="field_errors && field_errors.name">
                                <mat-hint>
                                    ie. My main profile
                                </mat-hint>
                                <mat-error *ngFor="let error of field_errors.name; let i = index;">
                                    {{error}}
                                </mat-error>
                            </div>
                        </mat-form-field>
                        <mat-form-field style="margin: 10px; width: 45%;">
                            <input matInput placeholder="Email" 
                                name="email"
                                [readonly]="!is_create"
                                [(ngModel)]="data.profile.email"
                                (ngModelChange)="onchange_field('email')"
                            >
                            <div *ngIf="field_errors && field_errors.email">
                                <mat-hint>
                                    ie. jamesbond@runbox.com
                                </mat-hint>
                                <mat-error *ngFor="let error of field_errors.email; let i = index;">
                                    {{error}}
                                </mat-error>
                            </div>
                        </mat-form-field>
                        <mat-form-field style="margin: 10px; width: 45%;">
                            <input matInput placeholder="From"
                                name="from"
                                [(ngModel)]="data.profile.from_name"
                                (ngModelChange)="onchange_field('from_name')"
                            >
                            <div *ngIf="field_errors && field_errors.from_name">
                                <mat-hint>
                                    ie. James Bond
                                </mat-hint>
                                <mat-error *ngFor="let error of field_errors.from_name; let i = index;">
                                    {{error}}
                                </mat-error>
                            </div>
                        </mat-form-field>
                        <mat-form-field style="margin: 10px; width: 45%;">
                            <input matInput placeholder="Reply-to"
                                name="reply_to"
                                [(ngModel)]="data.profile.reply_to"
                                (ngModelChange)="onchange_field('reply_to')"
                            >
                            <div *ngIf="field_errors && field_errors.reply_to">
                                <mat-hint>ie. jamesbond-noreply@runbox.com</mat-hint>
                                <mat-error *ngFor="let error of field_errors.reply_to; let i = index;">
                                    {{error}}
                                </mat-error>
                            </div>
                        </mat-form-field>
                        <mat-divider></mat-divider>
                        <mat-form-field style="margin: 10px; width: 96%;">
                            <textarea matInput placeholder="Signature"
                                name="signature"
                                [(ngModel)]="data.profile.signature"
                                (ngModelChange)="onchange_field('signature')"
                            ></textarea>
                            <div *ngIf="field_errors && field_errors.signature">
                                <mat-hint>
                                    ie. 
                                    <br>Mr. James Bond
                                    <br>=-=-=
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
          </mat-card-content>
          <mat-card-actions style="padding: 0px 10px">
            <button mat-raised-button (click)="save()" color="primary"  *ngIf="!is_delete">SAVE</button>
            <button mat-raised-button (click)="delete()" color="" *ngIf="is_delete">DELETE</button>
            <button mat-raised-button (click)="close()" color="warn">CANCEL</button>
          </mat-card-actions>
          <mat-card-footer>
          </mat-card-footer>
        </mat-card>
    `
})

export class ProfilesEdit {
    @Input() value: any[];
    field_errors;
    allowed_domains = [];
    is_valid = false;
    aliases_unique = [];
    is_delete =false;
    is_update = false;
    is_create = false;
    has_deleted = false;
    has_updated = false;
    has_created = false;
    constructor(
        private http: Http,
        public snackBar: MatSnackBar,
        public dialog_ref: MatDialogRef<ProfilesEdit>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if ( ! data || ! Object.keys(data).length ) {
            data = { profile : { } };
        }
        this.data = data;
    }
    css_class() {
        let css = '';
        if ( this.is_delete ) { return 'delete' }
        else if ( this.is_create ) { return 'create' }
        else if ( this.is_update ) { return 'update' }
    }
    save() {
        if ( this.is_create ) { this.create() }
        else { this.update() }
    }
    create(){
        let data = this.data;
        let req = this.http.post('/rest/v1/profile/', {
            name       : data.profile.name,
            email      : data.profile.email,
            from_name  : data.profile.from_name,
            reply_to   : data.profile.reply_to,
            signature  : data.profile.signature,
        })
        req.pipe(timeout(60000))
        req.subscribe(
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
            this.has_created = true;
            this.close();
            return;
          },
          error => {
            return this.show_error('Could not load profiles.', 'Dismiss');
          }
        );
    }
    delete(){
        let data = this.data;
        let req = this.http.delete('/rest/v1/profile/'+data.profile.id);
        req.pipe(timeout(10000))
        req.subscribe(data => {
            let reply = data.json()
            if ( reply.status == 'error' ) {
                if ( reply.field_errors ) {
                    this.field_errors = reply.field_errors;
                }
                if ( reply.errors ) {
                    this.show_error( reply.errors.join( '' ), 'Dismiss' )
                }
                return;
            }
            this.has_deleted = true;
            this.close();
            return;
        });
    }
    update(){
        let data = this.data;
        let obj = {
            name       : data.profile.name,
            email      : data.profile.email,
            from_name  : data.profile.from_name,
            reply_to   : data.profile.reply_to,
            signature  : data.profile.signature,
        }
        let req = this.http.put('/rest/v1/profile/'+this.data.profile.id, obj)
        req.pipe(timeout(60000))
        req.subscribe(
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
            this.has_updated = true;
            this.close();
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

