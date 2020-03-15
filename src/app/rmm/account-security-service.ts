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
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { RMM } from '../rmm';

export class AccountSecurityService {
    public profiles: any;
    user_password: string;
    is_busy = false;
    service: any;
    results: any;
    services_translation: any = {
        web : {
            name : "Web",
            description : "Runbox Webmail. The web interface is essential and can not be disabled."
        },
        'dovecot-imap' : {
            name : "IMAP",
            description : "IMAP service for email programs/apps."
        },
        'dovecot-pop' : {
            name : "POP",
            description : "POP service, used instead of IMAP if you only want to download email from Inbox."
        },
        kmpop3d : {
            name : "POP (kmpop3d)",
            description : "kmpop3d is the legacy POP server, and is currently being phased out."
        },
        submission : {
            name : "SMTP",
            description : "SMTP lets you send email with an email program."
        },
        ftp : {
            name : "FTP",
            description : "FTP can be used to transfer files to/from the server."
        },
        webdav : {
            name : "WebDAV",
            description : "WebDAV is used to log in to CalDAV (calendar) and CardDAV (contacts)."
        },
    };

    constructor(
        public app: RMM,
    ) {
    }

    update(data): Observable<any> {
        this.is_busy = true;
        data = data || {
//                                                  services:[{
//                                                      is_enabled : !item.is_enabled,
//                                                      service : item.shortname,
//                                                      id : item.id,
//                                                  }],
//                                                  password : field_password.value,
        };
        const req = this.app.ua.http.put('/ajax/ajax_mfa_service', data).pipe(timeout(60000), share());
        req.subscribe(
          reply => {
            this.is_busy = false;
            if ( reply['status'] === 'error' ) {
                this.app.show_error( reply['error'].join( '' ), 'Dismiss' );
                return;
            }
            this.profiles = reply['result'];
            return;
          },
          error => {
            this.is_busy = false;
            return this.app.show_error('Could not load profiles.', 'Dismiss');
          }
        );
        return req;
    }

    create(data): Observable<any> {
        this.is_busy = true;
        data = data || {
//                                                  services:[{
//                                                      is_enabled : !item.is_enabled,
//                                                      service : item.shortname,
//                                                  }],
//                                                  password : field_password.value,
        };
        const req = this.app.ua.http.post('/ajax/ajax_mfa_service', data).pipe(timeout(60000), share());
        req.subscribe(
          reply => {
            this.is_busy = false;
            if ( reply['status'] === 'error' ) {
                this.app.show_error( reply['error'].join( '' ), 'Dismiss' );
                return;
            }
            this.profiles = reply['result'];
            return;
          },
          error => {
            this.is_busy = false;
            return this.app.show_error('Could not load profiles.', 'Dismiss');
          }
        );
        return req;
    }

    list(): Observable<any> {
        this.is_busy = true;
        const data = {
        };
        const req = this.app.ua.http.get('/ajax/ajax_mfa_service', data).pipe(timeout(60000), share());
        req.subscribe(
          reply => {
            this.is_busy = false;
            if ( reply['status'] === 'error' ) {
                this.app.show_error( reply['error'].join( '' ), 'Dismiss' );
                return;
            }
            this.results = reply['services'];
            this.results.forEach( (result) => {
                result.is_enabled = result.is_enabled ? true : false;
            } );
            return;
          },
          error => {
            this.is_busy = false;
            return this.app.show_error('Could not load profiles.', 'Dismiss');
          }
        );
        return req;
    }

    list_services_generic_rules(data): Observable<any> {
        this.is_busy = true;
        data = data || {
        };
        const req = this.app.ua.http.get('/ajax/ajax_mfa_service_list', data).pipe(timeout(60000), share());
        req.subscribe(
          reply => {
            this.is_busy = false;
            if ( reply['status'] === 'error' ) {
                this.app.show_error( reply['error'].join( '' ), 'Dismiss' );
                return;
            }
            this.profiles = reply['result'];
            return;
          },
          error => {
            this.is_busy = false;
            return this.app.show_error('Could not load profiles.', 'Dismiss');
          }
        );
        return req;
    }

}
