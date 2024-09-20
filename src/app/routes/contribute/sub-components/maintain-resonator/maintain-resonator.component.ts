import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';

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
		InputTextareaModule,
		SelectButtonModule,
	],
	templateUrl: './maintain-resonator.component.html',
	styleUrl: './maintain-resonator.component.scss',
	host: { ngSkipHydration: 'true' },
})
export class MaintainResonatorComponent implements OnInit {
	constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
		this.createBreadcrumbs();
		this.createForm();
		this.createOptions();
	}

	public breadcrumbs: MenuItem[] = [];
	public resonatorDetail!: ErrorOr<ItemDetail>;
	public updateForm!: FormGroup;
	public genderOptions!: { label: string; value: string }[];
	public rarityOptions!: { label: string; value: number }[];
	public filterWeaponTypes!: { label: string; value: string }[];

	public ngOnInit(): void {
		this.resonatorDetail = this.activatedRoute.snapshot.data['resonator'];
		console.debug('MaintainResonatorComponent.ngOnInit', this.resonatorDetail);
		this.fillForm(this.resonatorDetail.value);
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

	private createOptions() {
		this.genderOptions = [
			{ label: 'Male', value: 'Male' },
			{ label: 'Female', value: 'Female' },
			// { label: 'Unknown', value: 'Unknown' },
		];

		this.rarityOptions = [
			{ label: '★★★', value: 3 },
			{ label: '★★★★', value: 4 },
			{ label: '★★★★★', value: 5 },
		];

		this.filterWeaponTypes = [
			{
				label: 'Broadblade',
				value: 'Broadblade',
			},
			{
				label: 'Sword',
				value: 'Sword',
			},
			{
				label: 'Pistols',
				value: 'Pistols',
			},
			{
				label: 'Gauntlets',
				value: 'Gauntlets',
			},
			{
				label: 'Rectifier',
				value: 'Rectifier',
			},
		];
	}

	private fillForm(data?: ItemDetail) {
		if (!data) return;

		this.updateForm.patchValue(data);

		this.updateForm.patchValue({
			voiceActors: data.voice_actors,
		});

		data.combo_teaching?.forEach((teaching, index) => {
			this.updateForm.addControl(
				`combo-${index}`,
				this.fb.nonNullable.group({
					title: this.fb.nonNullable.control<string | undefined>(
						teaching.title
					),
					description: this.fb.nonNullable.control<string | undefined>(
						teaching.description
					),
				})
			);
		});
	}
}
