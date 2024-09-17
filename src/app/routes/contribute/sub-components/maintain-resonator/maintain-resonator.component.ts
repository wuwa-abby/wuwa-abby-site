import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';

import { ErrorOr } from '@core/types/error-or.type';
import { ItemDetail } from '@core/types/item-detail.type';

@Component({
	selector: 'abby-maintain-resonator',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		NgOptimizedImage,
		ReactiveFormsModule,

		BreadcrumbModule,
		ButtonModule,
		InputTextModule,
		InputMaskModule,
	],
	templateUrl: './maintain-resonator.component.html',
	styleUrl: './maintain-resonator.component.scss',
})
export class MaintainResonatorComponent implements OnInit {
	constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
		this.createBreadcrumbs();
		this.createForm();
	}

	public breadcrumbs: MenuItem[] = [];
	public resonatorDetail!: ErrorOr<ItemDetail>;
	public updateForm!: FormGroup;

	public ngOnInit(): void {
		this.resonatorDetail = this.activatedRoute.snapshot.data['resonator'];
		console.debug('MaintainResonatorComponent.ngOnInit', this.resonatorDetail);
		if (this.resonatorDetail.value)
			this.updateForm.patchValue(this.resonatorDetail.value);
	}

	private createBreadcrumbs() {
		this.breadcrumbs = [
			{ label: 'Contribute', routerLink: '/contribute' },
			{ label: 'Items', routerLink: '/contribute/existing' },
			{ label: 'Update Resonator' },
		];
	}

	private createForm() {
		this.updateForm = this.fb.nonNullable.group({
			name: this.fb.nonNullable.control<string | undefined>({
				value: undefined,
				disabled: true,
			}),
			nickname: this.fb.nonNullable.control<string | undefined>(undefined),
			birthday: this.fb.nonNullable.control<Date | undefined>(undefined),
			sex: this.fb.nonNullable.control<string | undefined>(undefined),
			bio: this.fb.nonNullable.control<string | undefined>(undefined),
			rarity: this.fb.nonNullable.control<number | undefined>(undefined),
			weaponOfChoice: this.fb.nonNullable.control<string | undefined>(
				undefined
			),
			voiceActors: this.fb.nonNullable.group({
				CN: this.fb.nonNullable.control<string | undefined>(undefined),
				JP: this.fb.nonNullable.control<string | undefined>(undefined),
				EN: this.fb.nonNullable.control<string | undefined>(undefined),
				KO: this.fb.nonNullable.control<string | undefined>(undefined),
			}),
		});
	}
}
