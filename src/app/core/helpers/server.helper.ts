import moment from 'moment';

/**
 * Returns the server string based on the playerId.
 *
 * @param playerId - The playerId to determine the server string for.
 * @returns The server string corresponding to the playerId.
 */
export function getServerString(playerId: number): string {
	switch (playerId.toString()[0]) {
		case '5':
			return 'NA';
		case '6':
			return 'EU';
		case '7':
			return 'ASIA';
		case '8':
			return 'HMT';
		case '9':
			return 'SEA';
		default:
			return 'UNKNOWN';
	}
}

/**
 * Calculates the time offset for a given server.
 *
 * @param server - The server name.
 * @returns The time offset in hours.
 */
export function getServerOffset(server: string) {
	let offset = 0;

	switch (server) {
		case 'HMT':
		case 'ASIA':
		case 'SEA':
			offset = 8;
			break;
		case 'NA':
			offset = -5;
			break;
		case 'EU':
			offset = 1;
			break;
		default:
			break;
	}

	if (moment().isDST()) {
		offset++;
	}

	return offset;
}

/**
 * Converts a server date to a local date based on the server's timezone offset.
 *
 * @param date - The server date to convert.
 * @param server - The server's timezone offset as a string.
 * @returns The converted local date.
 */
export function convertServerToLocalDate(date: Date, server: string): Date {
	const offset = getServerOffset(server);
	const serverTime = moment(date).utcOffset(offset, true);

	return serverTime.toDate();
}
