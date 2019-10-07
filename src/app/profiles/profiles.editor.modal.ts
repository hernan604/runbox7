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
import {RMM} from '../rmm';
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
        .modal_menu {
            margin-right: 10px;
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
            </mat-card-title>
            <mat-card-subtitle style="color: #FFF;">
                <div *ngIf="is_update" style="color: #FFF;">{{data.profile.name}}</div>
            </mat-card-subtitle>
            <mat-divider [vertical]="true" style='border-color: transparent; flex: max-content;'></mat-divider>

            <button *ngIf="is_update && data.profile.type != 'main'" mat-icon-button [matMenuTriggerFor]="modal_menu" class='modal_menu'>
              <mat-icon color="warn">more_vert</mat-icon>
            </button>
            <mat-menu #modal_menu="matMenu" xPosition="before">
              <button mat-menu-item (click)="delete()">
                <mat-icon>delete</mat-icon>
                <span>Delete</span>
              </button>
            </mat-menu>

          </mat-card-header>
          <mat-card-content>
                <div mat-dialog-content>
                    <form>
                        <mat-form-field style="margin: 10px; width: 45%">
                            <input matInput placeholder="Identity name"
                                name="name"
                                [(ngModel)]="data.profile.name"
                                (ngModelChange)="onchange_field('name')"
                            >
                            <div *ngIf="field_errors && field_errors.name">
                                <mat-hint>
                                    ie. My main identity
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
                        <mat-divider></mat-divider>
                        <div *ngIf="data.profile.reference_type == 'preference'">
                            <h4>SMTP Details</h4>
                            <mat-form-field style="margin: 10px; width: 45%">
                                <input matInput placeholder="Address - smtp.runbox.com"
                                    name="smtp_address"
                                    [(ngModel)]="data.profile.smtp_address"
                                    (ngModelChange)="onchange_field('smtp_address')"
                                >
                                <div *ngIf="field_errors && field_errors.smtp_address">
                                    <mat-hint>
                                        ie. smtp.site.com
                                    </mat-hint>
                                    <mat-error *ngFor="let error of field_errors.smtp_address; let i = index;">
                                        {{error}}
                                    </mat-error>
                                </div>
                            </mat-form-field>
                            <mat-form-field style="margin: 10px; width: 45%">
                                <input matInput placeholder="Port 587 or 465"
                                    name="smtp_port"
                                    [(ngModel)]="data.profile.smtp_port"
                                    (ngModelChange)="onchange_field('smtp_port')"
                                >
                                <div *ngIf="field_errors && field_errors.smtp_port">
                                    <mat-hint>
                                        ie. 587 465
                                    </mat-hint>
                                    <mat-error *ngFor="let error of field_errors.smtp_port; let i = index;">
                                        {{error}}
                                    </mat-error>
                                </div>
                            </mat-form-field>
                            <mat-form-field style="margin: 10px; width: 45%">
                                <input matInput placeholder="Username"
                                    name="smtp_username"
                                    [(ngModel)]="data.profile.smtp_username"
                                    (ngModelChange)="onchange_field('smtp_username')"
                                >
                                <div *ngIf="field_errors && field_errors.smtp_username">
                                    <mat-hint>
                                        ie. your_username
                                    </mat-hint>
                                    <mat-error *ngFor="let error of field_errors.smtp_username; let i = index;">
                                        {{error}}
                                    </mat-error>
                                </div>
                            </mat-form-field>
                            <mat-form-field style="margin: 10px; width: 45%">
                                <input matInput placeholder="Password"
                                    name="smtp_password"
                                    [(ngModel)]="data.profile.smtp_password"
                                    (ngModelChange)="onchange_field('smtp_password')"
                                >
                                <div *ngIf="field_errors && field_errors.smtp_password">
                                    <mat-hint>
                                        ie. YourPasswor123
                                    </mat-hint>
                                    <mat-error *ngFor="let error of field_errors.smtp_password; let i = index;">
                                        {{error}}
                                    </mat-error>
                                </div>
                            </mat-form-field>
                        </div>
                    </form>
                </div>
          </mat-card-content>
          <mat-card-actions style="padding: 0px 10px">
            <button mat-raised-button (click)="save()" color="primary">SAVE</button>
            <button mat-raised-button (click)="close()" color="warn">CANCEL</button>
          </mat-card-actions>
          <mat-card-footer>
            <mat-progress-bar *ngIf="is_busy" mode="indeterminate"></mat-progress-bar>
            <div
                *ngIf="data.profile.reference_type == 'preference' && data.profile.reference.status === 1"
            >Email not validated. Check your email or <a href="javascript:void(0)" (click)="resend_validate_email()">re-send</a>.
            </div>
          </mat-card-footer>
        </mat-card>
    `
})

export class ProfilesEditorModal {
    @Input() value: any[];
    field_errors;
    allowed_domains = [];
    is_valid = false;
    aliases_unique = [];
    is_busy = false;
    is_delete =false;
    is_update = false;
    is_create = false;
    constructor(
        public rmm: RMM,
        private http: Http,
        public snackBar: MatSnackBar,
        public dialog_ref: MatDialogRef<ProfilesEditorModal>,
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
        this.is_busy = true;
        let data = this.data;
        let values = {
            name       : data.profile.name,
            email      : data.profile.email,
            from_name  : data.profile.from_name,
            reply_to   : data.profile.reply_to,
            signature  : data.profile.signature,
            smtp_address  : data.profile.smtp_address,
            smtp_port     : data.profile.smtp_port,
            smtp_username : data.profile.smtp_username,
            smtp_password : data.profile.smtp_password,
        }
        let req = this.rmm.profile.create(values, this.field_errors)
        req.subscribe(
          data => {
            let reply = data.json();
            if ( reply.status == 'success' ) {
                this.is_busy = false;
                this.rmm.profile.load()
                this.close();
                return;
            }
          },
        );
    }
    delete(){
        this.is_busy = true;
        let data = this.data;
        let req = this.rmm.profile.delete(data.profile.id)
        req.subscribe(data => {
            let reply = data.json()
            if ( reply.status == 'success' ) {
                this.is_busy = false;
                this.rmm.profile.load()
                this.close();
                return;
            }
        });
    }
    update(){
        this.is_busy = true;
        let data = this.data;
        let obj = {
            name       : data.profile.name,
            email      : data.profile.email,
            from_name  : data.profile.from_name,
            reply_to   : data.profile.reply_to,
            signature  : data.profile.signature,
            smtp_address  : data.profile.smtp_address,
            smtp_port     : data.profile.smtp_port,
            smtp_username : data.profile.smtp_username,
            smtp_password : data.profile.smtp_password,
        }
        let req = this.rmm.profile.update(this.data.profile.id, obj, this.field_errors)
        req.subscribe(
          data => {
            let reply = data.json();
            this.is_busy = false;
            if ( reply.status == 'success' ) {
                this.rmm.profile.load()
                this.close();
                return;
            }
          },
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

