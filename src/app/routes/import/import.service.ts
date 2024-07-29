import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class ImportService {
	constructor() {}

	public importForm = new FormGroup({
		platform: new FormControl<string>('and'),
		historyUrl: new FormControl<string | undefined>(undefined, [
			Validators.required,
			Validators.pattern(
				/https:\/\/aki-gm-resources-oversea\.aki-game\.net\/aki\/gacha\/index\.html#\/record\?.*/
			),
		]),
	});

	public getInvalidUrlCSSClass() {
		const control = this.importForm.get('historyUrl');
		if (control?.pristine || control?.valid) {
			return undefined;
		}

		return 'ng-dirty ng-invalid';
	}
}
