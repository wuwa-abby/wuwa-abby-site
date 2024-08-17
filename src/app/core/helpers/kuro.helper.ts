import { GachaMemoryTable } from '@core/model/gacha-history.table';
import { ConveneBanner } from '@core/types/convene-banner.type';

export const KURO_HISTORY_URL_REGEX: RegExp =
	/https:\/\/aki-gm-resources-oversea\.aki-game\.net\/aki\/gacha\/index\.html#\/record\?.*/;

/**
 * Calculate the pity and 50-50 details for a resource.
 *
 * WARNING: This function might return incorrect results if the pool is not sorted by Kuro API.
 *
 * @param resource Resource to calculate details for.
 * @param poolResources List of all resources in the pool.
 */
export function calculateResourceDetails(
	resource: GachaMemoryTable,
	poolResources: GachaMemoryTable[],
	pool: ConveneBanner
) {
	if (resource.qualityLevel < 4) return;

	if (poolResources.length === 1) return { pity: 1, wonFiftyFifty: true };

	const index = poolResources.indexOf(resource);
	poolResources = poolResources.slice(index + 1);

	// WuWa resets 4* pity on 5* blessing
	const sameOrHigherRarity =
		poolResources.findIndex((x) => x.qualityLevel >= resource.qualityLevel) + 1;

	return {
		pity: sameOrHigherRarity || poolResources.length + 1,
		wonFiftyFifty:
			resource.qualityLevel === 4
				? pool.featuredResources.fourStar.includes(resource.name)
				: pool.featuredResources.fiveStar.includes(resource.name),
	};
}
