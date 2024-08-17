import { GachaMemoryTable } from '@core/model/gacha-history.table';

export const KURO_HISTORY_URL_REGEX: RegExp =
	/https:\/\/aki-gm-resources-oversea\.aki-game\.net\/aki\/gacha\/index\.html#\/record\?.*/;

/**
 * Calculate the pity and 50-50 details for a resource.
 *
 * WARNING: This function might return incorrect results if the pool is not sorted by Kuro API.
 *
 * @param resource Resource to calculate details for.
 * @param pool List of all resources in the pool.
 */
export function calculateResourceDetails(
	resource: GachaMemoryTable,
	pool: GachaMemoryTable[]
) {
	if (resource.qualityLevel < 4) return;

	if (pool.length === 1) return { pity: 1 };

	const index = pool.indexOf(resource);
	pool = pool.slice(index + 1);

	// WuWa resets 4* pity on 5* blessing
	const sameOrHigherRarity =
		pool.findIndex((x) => x.qualityLevel >= resource.qualityLevel) + 1;

	return { pity: sameOrHigherRarity || pool.length + 1 };
}
