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
  AfterViewInit,
  ContentChild,
  ElementRef,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RMM } from '../rmm';

@Component({
    selector: 'app-runbox-section',
    styles: [`
    `],
    template: `
    <div class="app-runbox-section">
        <div style="background: #e1eeff; padding: 15px;"
            [ngStyle]="{'background': heading_sizes[size].background}"
            *ngIf="is_header_open"
            ><ng-content select="[runbox-section-header]"></ng-content>
	</div>
	<div [ngStyle]="{'margin': section_sizes[size].margin}">
            <ng-content select="[runbox-section-content]"></ng-content>
	</div>
    </div>
    `
})

export class RunboxSectionComponent {
  @Input() is_header_open = true;
  @Input() size = 'h1';
  private dialog_ref: any;
  public section_sizes = {
    h1: {
    },
    h2: {
        margin: '0 10px 50px 10px',
    },
    h3: {
        margin: '0 10px 50px 10px',
    },
    h4: {
        margin: '0 10px 50px 10px',
    },
    h5: {
        margin: '0 10px 50px 10px',
    },
    h6: {
        margin: '0 10px 50px 10px',
    },
  };
  public heading_sizes = {
    h1: {
        background: '#CAE1FF'
    },
    h2: {
        background: '#e1eeff'
    },
    h3: {
        background: '#9CC6FE'
    },
    h4: {
        background: '#7BB1FA'
    },
    h5: {
        background: '#549CFC'
    },
    h6: {
        background: '#207efe'
    },
  };
  constructor(public dialog: MatDialog,
    public rmm: RMM,
    public snackBar: MatSnackBar,
  ) {
  }

  show_error (message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

