import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { PanelModule } from 'primeng/panel';

@Component({
	selector: 'abby-import-steps-android',
	standalone: true,
	imports: [NgOptimizedImage, PanelModule],
	templateUrl: './import-steps-android.component.html',
	styleUrl: './import-steps-android.component.scss',
})
export class ImportStepsAndroidComponent {
	constructor() {}
}
