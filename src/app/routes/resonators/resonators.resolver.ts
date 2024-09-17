import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { ResonatorsService } from './resonators.service';
import { DisplayResonator } from './resonators.component';

export const resonatorsResolver: ResolveFn<DisplayResonator[]> = (
	_route,
	_state
) => {
	return inject(ResonatorsService).getResonators();
};
