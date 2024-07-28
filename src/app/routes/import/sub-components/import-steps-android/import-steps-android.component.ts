import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { FieldsetModule } from 'primeng/fieldset';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
@Component({
	selector: 'abby-import-steps-android',
	standalone: true,
	imports: [
		FieldsetModule,
		NgOptimizedImage,
		IconFieldModule,
		InputIconModule,
		InputTextModule,
		PanelModule,
	],
	templateUrl: './import-steps-android.component.html',
	styleUrl: './import-steps-android.component.scss',
})
export class ImportStepsAndroidComponent {}
