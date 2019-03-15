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
import {ProfilesForm} from './profiles.form';

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
  profiles_sections = [
    {
        title: "Main Identity",
        description: "Your Main Identitry is the address you signed up for Runbox with, and is your main identity.",
        key: "main"
    },
  ]
  profiles = {
    main : [
        {
            email : "my@email.com",
            from : "From Joe",
            reply_to : "reply-to@mail.com",
            signature : "-----------------\nHugs",
            field1 : "field111",
            field2 : "field222",
            field3 : "field333"
        },
    ],
    aliases : [
        {
            email : "my2@email.com",
            from : "From2 Joe",
            reply_to : "re2ply-to@mail.com",
            signature : "2-----------------\nHugs",
            field1 : "field111",
            field2 : "field222",
            field3 : "field333"
        },
        {
            email : "my3@email.com",
            from : "From3 Joe",
            reply_to : "3reply-to@mail.com",
            signature : "3-----------------\nHugs",
            field1 : "field111",
            field2 : "field222",
            field3 : "field333"
        },
        {
            email : "4my@email.com",
            from : "4From Joe",
            reply_to : "4reply-to@mail.com",
            signature : "4-----------------\nHugs",
            field1 : "field111",
            field2 : "field222",
            field3 : "field333"
        },
        {
            email : "5my@email.com",
            from : "5From Joe",
            reply_to : "5reply-to@mail.com",
            signature : "5-----------------\nHugs",
            field1 : "field111",
            field2 : "field222",
            field3 : "field333"
        },
    ],
    external : [
        {
            email : "6my@email.com",
            from : "6From Joe",
            reply_to : "6reply-to@mail.com",
            signature : "-----------------\nHugs",
            field1 : "field111",
            field2 : "field222",
            field3 : "field333"
        },
        {
            email : "7my@email.com",
            from : "7From Joe",
            reply_to : "7reply-to@mail.com",
            signature : "-----------------\nHugs",
            field1 : "field111",
            field2 : "field222",
            field3 : "field333"
        },
        {
            email : "8my@email.com",
            from : "8From Joe",
            reply_to : "8reply-to@mail.com",
            signature : "8-----------------\nHugs",
            field1 : "field111",
            field2 : "field222",
            field3 : "field333"
        },
    ]
  };

  ngAfterViewInit() {
  }

  constructor(
    private http: Http,
    public snackBar: MatSnackBar,
  ) {
  }

  show_error (message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  };
}
