export interface ConveneBanner {
	/**
	 * Unique identifier for the banner. (internal)
	 */
	key: string;
	/**
	 * Unique identifier for the banner. (kuro games API)
	 */
	kuroBannerId: string;
	/**
	 * Name of the banner.
	 */
	name: string;
	/**
	 * List of featured resources in the banner.
	 */
	featuredResources: {
		fiveStar: string[];
		fourStar: string[];
	};
	/**
	 * Start date of the banner.
	 */
	startDate: Date;
	/**
	 * End date of the banner.
	 */
	endDate: Date;
	/**
	 * Type of the banner.
	 */
	type: string;
}

export interface ConveneBannerSimple {
	/**
	 * Unique identifier for the banner. (internal)
	 */
	key: string;
	/**
	 * Unique identifier for the banner. (kuro games API)
	 */
	kuroBannerId: string;
	/**
	 * Start date of the banner.
	 */
	start: Date;
	/**
	 * End date of the banner.
	 */
	end: Date;
	/**
	 * Show the banner in the UI.
	 * @default true
	 */
	showUI: boolean;
}
