import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { ErrorOr } from '@core/types/error-or.type';
import { DisplayResonator } from '@routes/resonators/resonators.component';
import { ResonatorsService } from '@routes/resonators/resonators.service';

export const resonatorDetailResolver: ResolveFn<ErrorOr<DisplayResonator>> = (
	route,
	_state
) => {
	return inject(ResonatorsService).getResonator(
		`${route.params['resonatorName']}-${route.params['id']}`
	);
};
