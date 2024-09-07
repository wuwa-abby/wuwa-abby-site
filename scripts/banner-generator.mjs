// Usage: node banner-generator.mjs

import fs from 'fs';

const banners = fs
	.readdirSync('./public/raw/banners')
	.filter((file) => file.match(/.*\.json$/));

const seenBanners = new Set();

banners.forEach((banner) => {
	const bannerData = JSON.parse(
		fs.readFileSync(`./public/raw/banners/${banner}`, 'utf8')
	);
	const { key, startDate, endDate } = bannerData;

	if (seenBanners.has({ key, from: startDate, to: endDate })) {
		throw new Error(`Duplicate banner found: ${key}`);
	}

	seenBanners.add({ key, from: startDate, to: endDate });
});


const ignoreBannerInUIRegex = /-standard(?!-permanent)/;
const sortedBanners = Array.from(seenBanners)
	.slice(1)
	.map((banner) => {
		const now = new Date();

		return {
			...banner,
			showUI: !ignoreBannerInUIRegex.test(banner.key) && new Date(banner.from) < now && new Date(banner.to) > now,
		};
	})
	.sort((a, b) => {
		return new Date(b.to).getTime() - new Date(a.to).getTime();
	});

// delete the existing banners.json file
try {
	fs.unlinkSync('./public/raw/banners/banners.json');
} catch (err) { }

fs.writeFileSync(
	'./public/raw/banners/banners.json',
	JSON.stringify(sortedBanners, null, 2)
);

console.log('Banners generated successfully');
console.info('Total banners:', sortedBanners.length);

console.info('Please review the generated public/raw/banners/banners.json file');