import { AbstractControl } from '@angular/forms';

export function getInvalidClass(control: AbstractControl): string | undefined {
	if (control?.pristine || control?.valid) {
		return undefined;
	}

	return 'ng-dirty ng-invalid';
}
