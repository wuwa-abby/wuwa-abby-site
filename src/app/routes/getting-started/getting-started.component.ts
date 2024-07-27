import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';

@Component({
	selector: 'abby-getting-started',
	standalone: true,
	imports: [RouterModule, ButtonModule, SkeletonModule, TooltipModule],
	templateUrl: './getting-started.component.html',
	styleUrl: './getting-started.component.scss',
})
export class GettingStartedComponent {
	public scrollTo(elemId: string) {
		const elem = document.getElementById(elemId);
		if (elem) {
			elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}
}
