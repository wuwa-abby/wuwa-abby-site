import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Observable } from 'rxjs';

import { ConveneBanner } from '@core/types/convene-banner.type';

import { ConveneService } from './convene.service';

export const conveneResolver: ResolveFn<
	Promise<Observable<ConveneBanner>[]>
> = (_route, _state) => {
	return inject(ConveneService).getBannersAuto();
};
