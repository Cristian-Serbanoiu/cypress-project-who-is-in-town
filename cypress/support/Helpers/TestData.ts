interface TestData {
	// HOMEPAGE ▼-------------------------------------▼
	homepageTitle: string;
	homepageFindConcertsTitle: string;
	homepageSearchBoxPlaceholder: string;
	homepageSelectedEventTitle: string;
	homepageSelectedEventDescription: string;
	homepageFavoriteEventsTitle: string;

	// ARTIST CARD ▼-------------------------------------▼
	artistCardName: string;
	artistCardImage: string;
	artistCardUpcomingEvents: string;

	// UPCOMING EVENTS SEARCH RESULTS ▼-------------------------------------▼
	searchResultDate1: string;
	upcomingEventsEventName1: string;
	upcomingEventsEventDate1: string;
	searchResultDate2: string;
	upcomingEventsEventName2: string;
	upcomingEventsEventDate2: string;

	// NO UPCOMING EVENTS SEARCH RESULTS ▼-------------------------------------▼
	noUpcomingEventsSearchResultsTitle: string;
	noUpcomingEventsSearchResultsImage: string;
	noUpcomingEventsSearchResultsDescription: string;

	// SELECTED EVENTS CONTAINER ▼-------------------------------------▼
	selectedEventContainerTitleDescription: string;
	selectedEventContainerTitleVenueLocationTitle: string;
	selectedEventContainerTitleVenueLocation1: string;
	selectedEventContainerTitleVenueLocation2: string;
	selectedEventContainerTitleVenueSpecialOffers: string;
	selectedEventContainerTitleVenueType: string;
	selectedEventContainerTitleVenueStatus: string;
	selectedEventContainerTitleVenueButton: string;

	// URLS ▼-------------------------------------▼
	getItHereButtonRedirectUrl1: string;
	getItHereButtonRedirectUrl2: string;

	// API MOCKS ▼-------------------------------------▼
	artistNotFound: string;
	expectedStatusCode200: string;

	// ACCESSIBILITY TESTDATA ▼-------------------------------------▼
	accessibilityTestData: {
		wcag2a: string;
		wcag2aa: string;
		wcag21a: string;
		wcag21aa: string;
	};
	fullHomepageAccessibilityViolations: string;
	searchAreaAccessibilityViolations: string;
	selectedEventAreaAccessibilityViolations: string;
	favoritesAreaAccessibilityViolations: string;
}

export const testData: TestData = {
	// TESTDATA FOR THE HOMEPAGE ▼-------------------------------------▼
	homepageTitle: `Who's in Town`,
	homepageFindConcertsTitle: 'Find concerts of your favorite artists',
	homepageSearchBoxPlaceholder: 'Search here',
	homepageSelectedEventTitle: 'Selected event',
	homepageSelectedEventDescription: 'There is no selected event',
	homepageFavoriteEventsTitle: 'Favorite events',

	// DEFAULT TESTDATA FOR AN ARTIST CARD ▼-------------------------------------▼
	artistCardName: 'Against All Authority',
	artistCardImage: 'https://photos.bandsintown.com/thumb/14265756.jpeg',
	artistCardUpcomingEvents: 'Upcoming Events: 2',

	// DEFAULT TESTDATA UPCOMING EVENTS SEARCH RESULTS▼-------------------------------------▼
	searchResultDate1: 'Jun/20',
	upcomingEventsEventName1: 'Camp Punksylvania 2025',
	upcomingEventsEventDate1: 'United States',

	searchResultDate2: 'Jun/21',
	upcomingEventsEventName2: 'Black Cat',
	upcomingEventsEventDate2: 'United States',

	// DEFAULT TESTDATA FOR NO UPCOMING EVENTS SEARCH RESULTS ▼-------------------------------------▼
	noUpcomingEventsSearchResultsTitle: 'test',
	noUpcomingEventsSearchResultsImage: 'https://photos.bandsintown.com/thumb/7833122.jpeg',
	noUpcomingEventsSearchResultsDescription: 'There are no upcoming events',

	// DEFAULT TESTDATA FOR THE SELECTED EVENTS CONTAINER ▼-------------------------------------▼
	selectedEventContainerTitleDescription: 'Description',
	selectedEventContainerTitleVenueLocationTitle: 'Venue location',
	selectedEventContainerTitleVenueLocation1: 'United States | Gilbert',
	selectedEventContainerTitleVenueLocation2: 'United States | Washington',
	selectedEventContainerTitleVenueSpecialOffers: 'Special Offers',
	selectedEventContainerTitleVenueType: 'Type: Tickets',
	selectedEventContainerTitleVenueStatus: 'Status: available',
	selectedEventContainerTitleVenueButton: 'Get it here!',

	getItHereButtonRedirectUrl1: 'https://www.bandsintown.com',
	getItHereButtonRedirectUrl2: 'https://tix.soundrink.com',

	// API MOCKS TESTDATA ▼-------------------------------------▼
	artistNotFound: 'Artist not found',
	expectedStatusCode200: 'Expected status code 200 but got',

	// ACCESSIBILITY TESTDATA ▼-------------------------------------▼
	accessibilityTestData: {
		wcag2a: 'wcag2a',
		wcag2aa: 'wcag2aa',
		wcag21a: 'wcag21a',
		wcag21aa: 'wcag21aa',
	},
	fullHomepageAccessibilityViolations: 'FULL HOMEPAGE ACCESSIBILITY VIOLATIONS:',
	searchAreaAccessibilityViolations: 'SEARCH AREA ACCESSIBILITY VIOLATIONS:',
	selectedEventAreaAccessibilityViolations: 'SELECTED EVENT AREA ACCESSIBILITY VIOLATIONS:',
	favoritesAreaAccessibilityViolations: 'FAVORITES AREA ACCESSIBILITY VIOLATIONS:',
};

// EVENTS DATA ▼-------------------------------------▼
interface Event {
	date: string;
	name: string;
	location: string;
}

export const events: Event[] = [
	{
		date: testData.searchResultDate1,
		name: testData.upcomingEventsEventName1,
		location: testData.upcomingEventsEventDate1,
	},
	{
		date: testData.searchResultDate2,
		name: testData.upcomingEventsEventName2,
		location: testData.upcomingEventsEventDate2,
	},
];
