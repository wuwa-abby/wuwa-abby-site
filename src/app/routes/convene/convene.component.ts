import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
	selector: 'abby-convene',
	standalone: true,
	imports: [CommonModule, ButtonModule, FieldsetModule],
	templateUrl: './convene.component.html',
	styleUrl: './convene.component.scss',
})
export class ConveneComponent {}
