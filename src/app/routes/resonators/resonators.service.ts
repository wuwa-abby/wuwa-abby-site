import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { DisplayResonator } from './resonators.component';

@Injectable({
	providedIn: 'root',
})
export class ResonatorsService {
	constructor(private http: HttpClient) {}

	public getResonators(): Observable<DisplayResonator[]> {
		return this.http.get<DisplayResonator[]>('raw/resonators/list.json');
	}
}
