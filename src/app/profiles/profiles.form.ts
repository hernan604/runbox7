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
import {ProfilesEditPreference} from './profiles.edit.preference';
import {ProfilesEditMain} from './profiles.edit.main';
import {ProfilesEditAliases} from './profiles.edit.aliases';


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

            <mat-form-field class="from" style="margin: 10px;">
                <input
                    matInput
                    placeholder="Name"
                    readonly="true"
                    [value]="item.profile.name || ''"
                >
            </mat-form-field>

            <mat-form-field class="email" style="margin: 10px;">
                <input
                    matInput
                    placeholder="Email"
                    readonly="true"
                    [value]="item.profile.email"
                >
            </mat-form-field>

            <mat-form-field class="reply_to" style="margin: 10px;">
                <input
                    matInput 
                    placeholder="Reply-to"
                    readonly="true"
                    [value]="item.profile.reply_to || ''"
                >
            </mat-form-field>

            <div>
                <mat-label>Signature</mat-label>
                <div
                    [innerHTML]="item.profile.signature || ''"
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
  private dialog_ref : any;
  constructor(public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}
  edit (item): void {
      console.log("CLICK", item)
      if ( item.profile.type == 'aliases' ) {
          this.dialog_ref = this.dialog.open(ProfilesEditAliases, {
              width: '600px',
              data: item
          });
      } else if ( item.profile.type.match(/^preference$/) ) {
          this.dialog_ref = this.dialog.open(ProfilesEditPreference, {
              width: '600px',
              data: item
          });
      } else if ( item.profile.type.match(/^main$/) ) {
          this.dialog_ref = this.dialog.open(ProfilesEditMain, {
              width: '600px',
              data: item
          });
      } else {
          this.show_error('Reference type unknown', 'Dismiss');
      }

      this.dialog_ref.afterClosed().subscribe(result => {
          console.log('Dialog Close !', result)
          item = result;
      });
  }
  delete (i, item) {
      console.log("delete", i, item)
  }
  show_error (message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  };
}

