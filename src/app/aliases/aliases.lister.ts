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
import {AliasesEditorModal} from '../aliases/aliases.editor.modal';

@Component({
    selector: 'aliases-lister',
    styles: [`
        .aliases-lister form > div {
            display: inline-block;
            position: relative;
            margin: 10px;
        }
        .aliases-lister form > div > div {
            overflow: scroll;
        }
    `],
    template: `
    <div class="aliases-lister">
        <ng-content select="[section-header]" style="margin-top: 20px;"></ng-content>
        <ng-content select="[section-description]"></ng-content>
        <ng-content select="[section-buttons]"></ng-content>
        <form *ngFor="let item of values; let i = index;">
            <mat-divider *ngIf="i > 0"></mat-divider>

            <mat-form-field class="alias" style="margin: 10px;">
                <input
                    matInput
                    placeholder="Alias"
                    readonly="true"
                    [value]="item.localpart + '@' + item.domain"
                >
            </mat-form-field>

            <mat-form-field class="forward_to" style="margin: 10px;">
                <input
                    matInput
                    placeholder="Deliver to Account"
                    readonly="true"
                    [value]="item.forward_to"
                >
            </mat-form-field>

            <button 
                (click)="edit(item)" 
                color='primary' 
                mat-raised-button 
                style="margin: 10px;"
            >
                Edit
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
    </div>

        `
})
export class AliasesLister {
  @Input() values: any[];
  @Input() is_delete_disabled: false;
  @Output() ev_reload = new EventEmitter<string>();
  private dialog_ref : any;
  constructor(public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}
  edit (item): void {
      item = JSON.parse(JSON.stringify(item))
      this.dialog_ref = this.dialog.open(AliasesEditorModal, {
          width: '600px',
          data: item
      });

      this.dialog_ref.afterClosed().subscribe(result => {
          item = result;
      });
      this.dialog_ref.componentInstance.is_update = true;
    //if ( this.dialog_ref.componentInstance.has_created || this.dialog_ref.componentInstance.has_updated ) {
    //    this.ev_reload.emit('updated or created');
    //}
  }
  delete (i, item) {
    this.dialog_ref = this.dialog.open(AliasesEditorModal, {
        width: '600px',
        data: item,
    });
    this.dialog_ref.componentInstance.is_delete = true;
    this.dialog_ref.afterClosed().subscribe(result => {
      //if ( this.dialog_ref.componentInstance.has_deleted ) {
      //    this.ev_reload.emit('deleted');
      //}
    });
  }
  show_error (message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  };
}

