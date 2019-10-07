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
import { timeout, share } from 'rxjs/operators';
import { Http, URLSearchParams, ResponseContentType, Headers } from '@angular/http';
import { HttpModule, JsonpModule, XHRBackend, RequestOptions, BrowserXhr } from '@angular/http';
import { RMM } from '../rmm';

export class Profile {
    public profiles:any;
    is_busy = false;
    constructor(
        private app: RMM,
    ) {
    }
    load() {
        this.is_busy = true;
        let req = this.app.ua.http.get('/rest/v1/profiles', {}).pipe(timeout(60000), share())
        req.subscribe(
          data => {
            this.is_busy = false;
            let reply = data.json();
            if ( reply.status == 'error' ) {
                this.app.show_error( reply.error.join( '' ), 'Dismiss' )
                return
            }
            this.profiles = reply.result;
            return;
          },
          error => {
            this.is_busy = false;
            return this.app.show_error('Could not load profiles.', 'Dismiss');
          }
        )
        return req
    }
    create(values, field_errors) {
        let req = this.app.ua.http.post('/rest/v1/profile/', values).pipe(timeout(60000), share())
        req.subscribe(
          data => {
            let reply = data.json();
            if ( reply.status == 'error' ) {
                this.app.handle_field_errors(reply, field_errors)
                return
            }
          },
          error => {
            return this.app.show_error('Could not load profiles.', 'Dismiss');
          }
        );
        return req;
    }
    delete(id){
        let req = this.app.ua.http.delete('/rest/v1/profile/'+id).pipe(timeout(60000), share())
        req.subscribe(data => {
            let reply = data.json()
            if ( reply.status == 'error' ) {
                this.app.show_error( reply.error.join( '' ), 'Dismiss' )
                return;
            }
        });
        return req;
    }
    update(id, values, field_errors) {
        let req = this.app.ua.http.put('/rest/v1/profile/'+id, values).pipe(timeout(60000), share())
        req.subscribe(
          data => {
            let reply = data.json();
            if ( reply.status == 'error' ) {
                this.app.handle_field_errors(reply, field_errors)
                return;
            }
          },
          error => {
            return this.app.show_error('Could not load profiles.', 'Dismiss');
          }
        );
        return req;
    }
    resend(id, values, field_errors) {
        let req = this.app.ua.http.put('/rest/v1/profile/'+id+'/resend_validation_email').pipe(timeout(60000), share())
        req.subscribe(
          data => {
            let reply = data.json();
            if ( reply.status == 'error' ) {
                this.app.handle_field_errors(reply, field_errors)
                return;
            }
          },
          error => {
            return this.app.show_error('Could resend validation email.', 'Dismiss');
          }
        );
        return req;
    }
}
