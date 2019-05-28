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
  MatExpansionModule,
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
import {ProfilesEditorModal} from './profiles.editor.modal';
import {AliasesEditorModal} from '../aliases/aliases.editor.modal';


@Component({
    selector: 'profiles-lister',
    styles: [`
        .profile-form {
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .profile-form form > div {
            display: inline-block;
            position: relative;
            margin: 10px;
        }
        .profile-form form > div > div {
            overflow: scroll;
        }
        .profile-form-item {
            cursor: pointer;
        }
        .profile-form-item:hover {
            background-color: #eee;
        }
        .profile-form-item:active {
            background-color: #CCC;
        }
        .header-image {
            border-radius: 50%;
            flex-shrink: 0;
            background-image:url(/_img/avatar.svg);
            background-size: cover;
        }
        .mat_header {
            align-items: center
        }
    `],
    template: `
    <div class="profile-lister">
        <ng-content select="[section-header]" style="margin-top: 20px;"></ng-content>
        <ng-content select="[section-description]"></ng-content>
        <ng-content select="[section-buttons]"></ng-content>
        <div *ngFor="let item of values; let i = index;" class='profile-form-item' (click)="edit(item)">
            <mat-divider *ngIf="i > 0"></mat-divider>
              <div>
                <mat-card class="mat_card" style="">
                  <mat-card-header class="mat_header" >
                      <div mat-card-avatar class="header-image" >
                      </div>
                      <mat-card-title>
                        {{item.profile.email}} {{item.profile.name?'('+item.profile.name+')':''}}
                      </mat-card-title>
                      <mat-card-subtitle>
                        <div>From name: <strong>{{item.profile.from_name}}</strong></div>
                        <div>Reply to: <strong>{{item.profile.reply_to}}</strong></div>
                        <div *ngIf="item.profile.signature">
                        Signature:
                            <div [innerHTML]="item.profile.signature"></div>
                        </div>
                        <div
                            *ngIf="!item.profile.signature"
                        >No signature found</div>
                      </mat-card-subtitle>
                  </mat-card-header>
                </mat-card>
              </div>
            <mat-divider [vertical]="true"></mat-divider>
        </div>
    </div>

        `
})
export class ProfilesLister {
  @Input() values: any[];
  @Output() ev_reload = new EventEmitter<string>();
  private dialog_ref : any;
  constructor(public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}
  edit (item): void {
      item = JSON.parse(JSON.stringify(item))
      this.dialog_ref = this.dialog.open(ProfilesEditorModal, {
          width: '600px',
          data: item
      });

      this.dialog_ref.componentInstance.is_update = true;
      this.dialog_ref.afterClosed().subscribe(result => {
          console.log('Dialog Close !', result)
          this.ev_reload.emit('updated');
          item = result;
      });
  }
  delete (i, item) {
      console.log("delete", i, item)
      this.dialog_ref = this.dialog.open(ProfilesEditorModal, {
          width: '600px',
          data: item,
      });
      this.dialog_ref.componentInstance.is_delete = true;
      this.dialog_ref.afterClosed().subscribe(result => {
          if ( this.dialog_ref.componentInstance.has_deleted ) {
              this.ev_reload.emit('deleted');
          }
      });
  }
  show_error (message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  };
}

