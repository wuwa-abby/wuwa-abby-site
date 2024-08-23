export function getPityClass(quality: number, pity?: number): string {
	if (quality === 5) {
		if (!pity) {
			return 'no-pity';
		}
		if (pity >= 70) {
			return 'hard-pity';
		}
		if (pity >= 50) {
			return 'soft-pity';
		}
		return 'no-pity';
	}

	if (!pity) {
		return 'no-pity';
	}
	if (pity >= 7) {
		return 'hard-pity';
	}
	if (pity >= 5) {
		return 'soft-pity';
	}
	return 'no-pity';
}
