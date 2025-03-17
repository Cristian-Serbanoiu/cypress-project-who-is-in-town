import { testData } from './TestData';

const baseUrlApi = 'https://rest.bandsintown.com';

// INTERFACE FOR THE VENUE FIXTURE ▼-------------------------------------▼
export interface Venue {
	name: string;
	street_address: string;
	latitude: string;
	longitude: string;
	city: string;
	region: string;
	country: string;
	postal_code: string;
	location: string;
}

// INTERFACE FOR THE OFFER FIXTURE ▼-------------------------------------▼
export interface Offer {
	type: string;
	url: string;
	status: string;
}

// INTERFACE FOR THE EVENT FIXTURE ▼-------------------------------------▼
export interface Event {
	id: string;
	artist_id: string;
	url: string;
	on_sale_datetime: string;
	datetime: string;
	starts_at: string;
	ends_at: string;
	title: string;
	description: string;
	venue: Venue;
	offers: Offer[];
	lineup: string[];
	bandsintown_plus: boolean;
	datetime_display_rule: string;
	festival_datetime_display_rule: string;
	festival_start_date: string;
	festival_end_date: string;
	sold_out: boolean;
	free: boolean;
}

let eventsFixture: Event[];

// INTERFACE FOR THE ARTIST FIXTURE ▼-------------------------------------▼
export interface Artist {
	id: string;
	name: string;
	url: string;
	image_url: string;
	thumb_url: string;
	facebook_page_url: string;
	mbid: string;
	tracker_count: number;
	upcoming_event_count: number;
	support_url: string;
	show_multi_ticket: boolean;
	options: {
		display_listen_unit: boolean;
	};
	links: {
		type: string;
		url: string;
	}[];
	artist_optin_show_phone_number: boolean;
}

let artistFixture: Artist;

// FUNCTION TO LOAD THE FIXTURES ▼-------------------------------------▼
function loadFixtures(): Promise<void> {
	return new Promise((resolve) => {
		cy.fixture('artist.json').then((data) => {
			artistFixture = data;
		});
		cy.fixture('events.json').then((data) => {
			eventsFixture = data;
			resolve();
		});
	});
}

// SETUP API MOCKS ▼-------------------------------------▼
function setupApiMocks() {
	// MOCK "ARTIST" ENDPOINT ▼--------------▼
  cy.intercept('GET', `${baseUrlApi}/artists/*`, (req) => {
			const artistName = decodeURIComponent(req.url.split('/artists/')[1].split('?')[0]);

			if (artistName === artistFixture.name) {
				req.reply({ statusCode: 200, body: artistFixture });
			} else if (artistName === testData.noUpcomingEventsSearchResultsTitle) {
				const noEventsArtist = {
					...artistFixture,
					name: testData.noUpcomingEventsSearchResultsTitle,
					upcoming_event_count: 0,
				};
				req.reply({ statusCode: 200, body: noEventsArtist });
			} else {
				req.reply({ statusCode: 404, body: { error: testData.artistNotFound } });
			}
		})
		.as('getArtist');

	// MOCK "ARTIST EVENTS" ENDPOINT ▼--------------▼
  cy.intercept('GET', `${baseUrlApi}/artists/*/events*`, (req) => {
			const artistName = decodeURIComponent(req.url.split('/artists/')[1].split('/events')[0]);

			if (artistName === artistFixture.name) {
				req.reply({ statusCode: 200, body: eventsFixture });
			} else {
				req.reply({ statusCode: 200, body: [] });
			}
		})
		.as('getArtistEvents');
}

// VERIFY "ARTIST" API RESPONSE ▼-------------------------------------▼
function verifyArtistApiResponse(artistName: string, expectedCount: number) {
	cy.wait('@getArtist', { timeout: 10000 }).should((interception) => {
		const urlArtistName = decodeURIComponent(interception.request.url.split('/artists/')[1].split('?')[0]);
		expect(urlArtistName, `Expected artist name in URL to be "${artistName}" but got "${urlArtistName}"`).to.equal(artistName);
		expect(interception.response?.statusCode, `${testData.expectedStatusCode200} ${interception.response?.statusCode}`).to.equal(200);
		expect(interception.response?.body.name, `Expected artist name in response to be "${artistName}" but got "${interception.response?.body.name}"`).to.equal(artistName);
		expect(interception.response?.body.upcoming_event_count, `Expected ${expectedCount} upcoming events but got ${interception.response?.body.upcoming_event_count}`).to.equal(expectedCount);
	});
}

// VERIFY "EVENTS" API RESPONSE ▼-------------------------------------▼
function verifyEventsApiResponse(expectedLength: number, firstVenueName?: string) {
	cy.wait('@getArtistEvents', { timeout: 10000 }).should((interception) => {
		expect(interception.response?.statusCode, `${testData.expectedStatusCode200} ${interception.response?.statusCode}`).to.equal(200);

		expect(interception.response?.body, `Expected ${expectedLength} events but got ${interception.response?.body.length}`).to.have.length(expectedLength);

		if (firstVenueName && expectedLength > 0) {
			expect(interception.response?.body[0].venue.name, `Expected first venue name to be "${firstVenueName}" but got "${interception.response?.body[0].venue.name}"`).to.equal(firstVenueName);
		}
	});
}

export default {
	setupApiMocks,
	verifyArtistApiResponse,
	verifyEventsApiResponse,
	loadFixtures,
	get artistFixture() {
		return artistFixture;
	},
	get eventsFixture() {
		return eventsFixture;
	},
};
