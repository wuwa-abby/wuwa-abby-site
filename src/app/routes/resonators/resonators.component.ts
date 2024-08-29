import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { ResourceHistoryDTO } from '@core/types/kuro-history.type';

@Component({
	selector: 'abby-resonators',
	standalone: true,
	imports: [ButtonModule],
	templateUrl: './resonators.component.html',
	styleUrl: './resonators.component.scss',
})
export class ResonatorsComponent {
	constructor() {}

	public resonators: DisplayResonator[] = [];
}

interface DisplayResonator extends ResourceHistoryDTO {}
