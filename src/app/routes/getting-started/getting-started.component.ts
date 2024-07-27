import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
	selector: 'abby-getting-started',
	standalone: true,
	imports: [RouterModule, ButtonModule, SkeletonModule],
	templateUrl: './getting-started.component.html',
	styleUrl: './getting-started.component.scss',
})
export class GettingStartedComponent {
	public scrollToMore() {
		const elem = document.getElementById('track');
		if (elem) {
			elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}
}
