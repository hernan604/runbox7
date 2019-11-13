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
  MatGridListModule,
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
    <mat-card class="mat_card update create" style="padding: 0px">
        <mat-card-header class="mat_header" style="padding: 10px 0 10px 10px; background: #013b69">
            <div mat-card-avatar class="header-image">
            </div>
            <mat-card-title >
                <div *ngIf="is_create" style="color: #FFF;">Create profile</div>
                <div *ngIf="is_update" style="color: #FFF;">Edit profile</div>
                <div *ngIf="is_create_main" style="color: #FFF;">Create main profile</div>
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

                    <mat-grid-list cols="12" rowHeight="100px">
                        <mat-grid-tile
                            colspan="6"
                            rowspan="1"
                        >
                        <mat-form-field style="margin: 10px; width: 100%">
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
                        </mat-grid-tile>

                        <mat-grid-tile
                            colspan="6"
                            rowspan="1"
                            *ngIf="is_aliases_global_domain(data) && rmm.runbox_domain.data ; else other_content"
                            >
                            <mat-form-field style="margin: 10px; width: 100%"
                            >
                                <mat-label>Email</mat-label>
                                <mat-select
                                  [(ngModel)]="data.profile.preferred_runbox_domain"
                                  [(value)]="data.profile.preferred_runbox_domain"
                                  (ngModelChange)="onchange_field('preferred_runbox_domain')"
                                  name="preferred_runbox_domain"
                                  [ngModelOptions]="{standalone: true}"
                                >
                                  <mat-option *ngFor="let runbox_domain of rmm.runbox_domain.data" [value]="runbox_domain.name">
                                    {{localpart}}@{{runbox_domain.name}}
                                  </mat-option>
                                </mat-select>
                            </mat-form-field>
                        </mat-grid-tile>

                        <ng-template #other_content>
                            <mat-grid-tile
                                colspan="6"
                                rowspan="1"
                                >
                                <mat-form-field style="margin: 10px; width: 100%">
                                    <input matInput placeholder="Email"
                                        [ngStyle]="get_form_field_style()"
                                        name="email"
                                        [readonly]="!is_create && !is_create_main"
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
                            </mat-grid-tile>
                        </ng-template>

                        <mat-grid-tile
                            colspan="6"
                            rowspan="1"
                        >
                            <mat-form-field style="margin: 10px; width: 100%">
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
                        </mat-grid-tile>

                        <mat-grid-tile
                                colspan="6"
                                rowspan="1"
                                *ngIf="!is_different_reply_to; else field_reply_to"
                        >
                                <mat-checkbox name='is_different_reply_to'
                                    [(ngModel)]="is_different_reply_to">
                                    Use different Reply-to
                                </mat-checkbox>
                        </mat-grid-tile>

                        <ng-template #field_reply_to>
                            <mat-grid-tile
                                    colspan="6"
                                    rowspan="1"
                            >
                                <mat-form-field style="margin: 10px; width: 100%">
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
                            </mat-grid-tile>
                        </ng-template>

                        <mat-grid-tile
                            colspan="12"
                            rowspan="1"
                            >
                            <mat-form-field style="margin: 10px; width: 100%; height: 100%">
                                <textarea matInput placeholder="Signature"
                                    rows=4
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
                        </mat-grid-tile>
<!--
                        <mat-grid-tile
                            colspan="12"
                            rowspan="1"
                            *ngIf="data.profile.reference_type == 'preference'"
                            >
                            <div
                                style="text-align: left; width: 100%"
                            >
                                <mat-checkbox name='is_smtp_enabled' [(ngModel)]="data.profile.is_smtp_enabled">use smtp details</mat-checkbox>
                            </div>
                        </mat-grid-tile>
                        <mat-grid-tile
                            colspan="12"
                            rowspan="1"
                            *ngIf="data.profile.reference_type == 'preference' && data.profile.is_smtp_enabled"
                            >
                            <div
                                style="text-align: left; width: 100%"
                            >
                                <h4>SMTP Details</h4>
                            </div>
                        </mat-grid-tile>
                        <mat-grid-tile
                            colspan="6"
                            rowspan="1"
                            *ngIf="data.profile.reference_type == 'preference' && data.profile.is_smtp_enabled"
                            >
                            <mat-form-field style="margin: 10px; width: 100%">
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
                        </mat-grid-tile>
                        <mat-grid-tile
                            colspan="6"
                            rowspan="1"
                            *ngIf="data.profile.reference_type == 'preference' && data.profile.is_smtp_enabled"
                            >
                            <mat-form-field style="margin: 10px; width: 100%">
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
                        </mat-grid-tile>
                        <mat-grid-tile
                            colspan="6"
                            rowspan="1"
                            *ngIf="data.profile.reference_type == 'preference' && data.profile.is_smtp_enabled"
                            >
                            <mat-form-field style="margin: 10px; width: 100%">
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
                        </mat-grid-tile>
                        <mat-grid-tile
                            colspan="6"
                            rowspan="1"
                            *ngIf="data.profile.reference_type == 'preference' && data.profile.is_smtp_enabled"
                            >
                            <mat-form-field style="margin: 10px; width: 100%">
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
                        </mat-grid-tile>
-->
                    </mat-grid-list>
                </form>
           </div>
       </mat-card-content>
       <mat-card-actions style="padding: 0px 25px">
           <button mat-raised-button (click)="save()" color="primary">SAVE</button>
           <button mat-raised-button (click)="close()" color="warn">CANCEL</button>
       </mat-card-actions>
       <mat-card-footer style="padding: 0px 25px">
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
    is_create_main = false;
    type;
    is_visible_smtp_detail = false;
    is_different_reply_to = false;
    localpart;
    constructor(
        public rmm: RMM,
        private http: Http,
        public snackBar: MatSnackBar,
        public dialog_ref: MatDialogRef<ProfilesEditorModal>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if ( data && data.type ) {
            this.type = data.type;
            delete data.type;
        }
        if ( data.profile && data.profile.email ) {
            this.set_localpart(data);
        }
        if ( ! data || ! Object.keys(data).length || !data.profile ) {
            data = { profile : { } };
            let self = this;
            data.profile.name = ['first_name','last_name'].map((attr) => {
                console.log('attr', attr, self.rmm.me.data[attr]);
                return self.rmm.me.data[attr]
            }).join(' ')
        }
        this.data = data;
        this.check_reply_to(this.data);
    }
    check_reply_to(data) {
        if (data && data.profile.email && data.profile.reply_to && 
            data.profile.reply_to !== data.profile.email) {
            this.is_different_reply_to=true;
            return;
        }
        this.is_different_reply_to=false;
    }
    set_localpart(data) {
        if (data.profile.email.match(/@/g)) {
            this.localpart = data.profile.email.replace(/@.+/g, '');
            var regex = /(.+)@(.+)/g;
            var match = regex.exec(data.profile.email);
            data.profile.preferred_runbox_domain = match[2];
        } else {
            this.localpart = data.profile.email;
            data.profile.preferred_runbox_domain = this.localpart;
        }
    }
    save() {
        if ( this.is_create || this.is_create_main ) { this.create() }
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
            type          : this.type,
            is_smtp_enabled : ( data.profile.is_smtp_enabled ? 1 : 0 ),
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
            is_smtp_enabled : ( data.profile.is_smtp_enabled ? 1 : 0 ),
        }
        let req = this.rmm.profile.update(this.data.profile.id, values, this.field_errors)
        req.subscribe(
          data => {
            let reply = data.json();
            this.is_busy = false;
            if ( reply.status == 'success' ) {
                this.rmm.profile.load()
                this.close();
                return;
            } else {
                console.log('ERROR:', reply)
                if ( reply.field_errors ) {
                    this.field_errors = reply.field_errors;
                }
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
        if ( field === 'preferred_runbox_domain' ) {
            const data = this.data;
            const selected_domain = data.profile.preferred_runbox_domain;
            ['email'].forEach((attr)=>{
                var email = data.profile[attr]; 
                if ( email && email.match(/@/g) ) {
                    var is_replaced = false;
                    this.rmm.runbox_domain.data
                        .map((item)=>{return item.name}) // runbox domains array
                        .forEach((runbox_domain)=>{
                            if ( is_replaced ) { return }
                            var rgx = '@' + runbox_domain + '$';
                            var re  = new RegExp(rgx,"g");
                            if ( email.match(re) ) {
                                email = data.profile[attr].replace(re, '@'+selected_domain)
                                this.data.profile[attr] = email;
                                is_replaced = true
                            }
                        })
                } else {
                    this.data.profile[attr] = [data.profile[attr], selected_domain].join('@');
                }
            });
        }
    }
    get_form_field_style() {
        const styles = {};
        if ( this.is_update ) {
            styles['background'] = '#dedede';
        }
        return styles;
    }
    toggle_SMTP_details (action,item) {
        if ( action == 'show' ) {
            this.is_visible_smtp_detail = true;
        } else {
            this.is_visible_smtp_detail = false;
        }
    }
    is_aliases_global_domain (data) {
        return ( data.profile.reference_type == 'aliases' && ! data.profile.email.match(/@/g) )
            || ( data.profile.reference_type == 'aliases' && data.profile.email && this.global_domains().filter((d)=>{
                var rgx = d.name;
                var re = new RegExp(rgx,"g");
                if ( data.profile.email.match(re) ) {
                    return true
                }
                return false;
            }).length )
    }
    global_domains () {
        console.log('this.rmm.runbox_domain.data',this.rmm.runbox_domain)
        if ( ! this.rmm.runbox_domain.data ) {
            return [{name:'runbox.com'},{name:'runbox.no'}];
        } else {
            return this.rmm.runbox_domain.data;
        }
    }
}

