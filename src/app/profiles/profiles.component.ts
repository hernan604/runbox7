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
import { SecurityContext, Component, Input, Output, EventEmitter, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, URLSearchParams, ResponseContentType, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ProgressService } from '../http/progress.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, XHRBackend, RequestOptions, BrowserXhr } from '@angular/http';
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
import {AliasesForm} from './aliases.form';
import {ProfilesForm} from './profiles.form';
import {ProfilesEditAliases} from './profiles.edit.aliases';

@Component({
  moduleId: 'angular2/app/profiles/',
  selector: 'profiles',
  templateUrl: 'profiles.component.html'
})

export class ProfilesComponent implements AfterViewInit {
  panelOpenState = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() onClose: EventEmitter<string> = new EventEmitter();
  domain;
  profiles = {};
  aliases = [];
  dialog_ref : any;

  ngAfterViewInit() {
  }

  constructor(
    private http: Http,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.load_profiles();
    this.load_aliases();
  }

  load_aliases () {
    this.http.get('/rest/v1/aliases', {
    })
    .pipe(timeout(60000))
    .subscribe(
      data => {
        const reply = data.json();
        if ( reply.status == 'error' ) {
          this.show_error( reply.error.join( '' ), 'Dismiss' )
        }
        console.log('aliases', reply)
        this.aliases = reply.result.aliases;
        return;
      },
      error => {
        return this.show_error('Could not load aliases.', 'Dismiss');
      }
    );
  }


  load_profiles () {
    this.http.get('/rest/v1/profiles', {
    })
    .pipe(timeout(60000))
    .subscribe(
      data => {
        const reply = data.json();
        if ( reply.status == 'error' ) {
          this.show_error( reply.error.join( '' ), 'Dismiss' )
        }
        console.log('profiles', reply)
        this.profiles = reply.result;
        return;
      },
      error => {
        return this.show_error('Could not load profiles.', 'Dismiss');
      }
    );
  }

  show_error (message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  };

  add_alias (): void {
      let item = {

      };
      this.dialog_ref = this.dialog.open(ProfilesEditAliases, {
          width: '600px',
          data: item
      });

      this.dialog_ref.afterClosed().subscribe(result => {
          this.load_aliases();
          console.log('Dialog Close !', result)
          item = result;
      });
  }
}
