import { HttpHeaders } from '@angular/common/http';

export const baseurl = 'http://localhost:5000';
export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
