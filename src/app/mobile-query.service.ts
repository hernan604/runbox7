// --------- BEGIN RUNBOX LICENSE ---------
// Copyright (C) 2016-2019 Runbox Solutions AS (runbox.com).
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

import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';

export enum ScreenSize {
    Phone,
    Tablet,
    Desktop,
}

@Injectable()
export class MobileQueryService {
    screenSize: ScreenSize;
    screenSizeChanged = new Subject<ScreenSize>();

    // old API, meaning "is it not a desktop"
    // use screenSize instead
    matches: boolean;
    changed = new Subject<boolean>();

    constructor(
        breakpointObserver: BreakpointObserver,
    ) {
        breakpointObserver.observe([
            // I'm not sure if passing raw selectors is even the allowed API here,
            // but the docs do say `string`, so eh
            '(max-width: 480px)',
            '(max-width: 1024px)',
        ]).subscribe(_ => {
            if (window.innerWidth <= 480) {
                this.screenSize = ScreenSize.Phone;
            } else if (window.innerWidth <= 1024) {
                this.screenSize = ScreenSize.Tablet;
            } else {
                this.screenSize = ScreenSize.Desktop;
            }
            this.screenSizeChanged.next(this.screenSize);

            // old API compatibility
            const matches = this.screenSize !== ScreenSize.Desktop;
            if (matches !== this.matches) {
                this.matches = matches;
                this.changed.next(matches);
            }
        });
    }
}
