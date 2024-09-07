import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { ErrorOr } from '@core/types/error-or.type';
import { DisplayResonator } from '@routes/resonators/resonators.component';

@Component({
	selector: 'abby-resonator-detail',
	standalone: true,
	imports: [CommonModule, NgOptimizedImage, RouterModule, ButtonModule],
	templateUrl: './resonator-detail.component.html',
	styleUrl: './resonator-detail.component.scss',
})
export class ResonatorDetailComponent implements OnInit {
	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		private activatedRoute: ActivatedRoute
	) {}

	private _resonator?: ErrorOr<DisplayResonator>;

	public get resonator(): DisplayResonator | undefined {
		return this._resonator?.value;
	}

	public get resonatorError(): string | undefined {
		return this._resonator?.message;
	}

	public get resonatorStatus(): number | undefined {
		return this._resonator?.status;
	}

	ngOnInit(): void {
		this._resonator = this.activatedRoute.snapshot.data['resonator'];
	}
}
