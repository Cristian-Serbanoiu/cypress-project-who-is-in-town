import HomePage from '../support/PageObjects/HomePagePOM';
import helpers from '../support/Helpers/HelpersFunctions';
import ApiMocks from '../support/Helpers/ApiMocks';
import { testData } from '../support/Helpers/TestData';

const homepage = HomePage;
const apimocks = ApiMocks;

describe('HOMEPAGE API MOCKS TESTS', () => {
	beforeEach(() => {
		helpers.sessionDesktop();
		helpers.viewportDesktop();
		apimocks.loadFixtures().then(() => {
			apimocks.setupApiMocks();
		});
	});

	afterEach(() => {
		cy.clearLocalStorage();
	});

	it('HOMEPAGE-API-001\nASSERTIONS FOR THE DEFAULT ELEMENTS ON THE HOMEPAGE', () => {
		homepage.getHomePageTitle().contains(testData.homepageTitle, { timeout: 10000 }).should('be.visible');
		homepage.getFindConcertsTitle().contains(testData.homepageFindConcertsTitle).should('be.visible');
		homepage.getSearchBoxInput().should('be.visible').should('have.attr', 'placeholder').and('equal', testData.homepageSearchBoxPlaceholder);
		homepage.getSearchBoxInputIcon().should('be.visible');
		homepage.getSelectedEventTitle().contains(testData.homepageSelectedEventTitle).should('be.visible');
		homepage.getSelectedEventDescription().contains(testData.homepageSelectedEventDescription).should('be.visible');
		homepage.getFavoriteEventsTitle().contains(testData.homepageFavoriteEventsTitle).should('be.visible');
	});

	it('HOMEPAGE-API-002\nCLICK ON THE SEARCH BOX + TYPE SOMETHING + CLEAR THE INPUT', () => {
		homepage.getSearchBoxInput().should('be.visible').click().type(apimocks.artistFixture.name, { delay: 0 }).should('have.value', apimocks.artistFixture.name);
		apimocks.verifyArtistApiResponse(apimocks.artistFixture.name, apimocks.eventsFixture.length);
		homepage.getSearchBoxInput().clear().should('have.value', '').should('have.attr', 'placeholder').and('equal', testData.homepageSearchBoxPlaceholder);
	});

	it('HOMEPAGE-API-003\nTYPE "TEST" + ASSERTIONS ON THE CARD FOR NO UPCOMING EVENTS', () => {
		homepage.getSearchBoxInput().click();
		homepage.getSearchBoxInput().type(testData.noUpcomingEventsSearchResultsTitle, { delay: 0 });
		apimocks.verifyArtistApiResponse(testData.noUpcomingEventsSearchResultsTitle, 0);
		homepage.getSearchBoxInput().should('have.value', testData.noUpcomingEventsSearchResultsTitle);
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventCardTitle().should('contain', testData.noUpcomingEventsSearchResultsTitle);
		homepage.getEventCardDescription().should('contain', testData.noUpcomingEventsSearchResultsDescription);
	});

	it('HOMEPAGE-API-004\nTYPE ARTIST NAME + ASSERTIONS ON THE CARD FOR UPCOMING EVENTS', () => {
		homepage.getSearchBoxInput().click();
		homepage.getSearchBoxInput().type(apimocks.artistFixture.name, { delay: 0 });
		apimocks.verifyArtistApiResponse(apimocks.artistFixture.name, apimocks.eventsFixture.length);
		apimocks.verifyEventsApiResponse(apimocks.eventsFixture.length, apimocks.eventsFixture[0].venue.name);
		homepage.getSearchBoxInput().should('have.value', apimocks.artistFixture.name);
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventCardImage().should('have.attr', 'src', apimocks.artistFixture.thumb_url);
		homepage.getEventCardTitle().should('contain', apimocks.artistFixture.name);
		homepage.getEventCardDescription().should('contain', `Upcoming Events: ${apimocks.eventsFixture.length}`);
	});

	it('HOMEPAGE-API-005\nCHECK THAT ALL UPCOMING EVENTS ARE DISPLAYED + ASSERTIONS FOR ALL THE ELEMENTS', () => {
		homepage.getSearchBoxInput().type(apimocks.artistFixture.name, { delay: 0 });
		apimocks.verifyArtistApiResponse(apimocks.artistFixture.name, apimocks.eventsFixture.length);
		apimocks.verifyEventsApiResponse(apimocks.eventsFixture.length);
		homepage.getEventCardContainer().should('be.visible');
		helpers.verifyEvents(
			apimocks.eventsFixture.map((event) => ({
				date: event.datetime,
				name: event.venue.name,
				location: `${event.venue.country}`,
			})),
		);
	});

	it('HOMEPAGE-API-006\nCLICK ON THE FIRST EVENT + ASSERTIONS FOR THE SELECTED EVENTS CONTAINER', () => {
		homepage.getSearchBoxInput().type(apimocks.artistFixture.name, { delay: 0 });
		apimocks.verifyArtistApiResponse(apimocks.artistFixture.name, apimocks.eventsFixture.length);
		apimocks.verifyEventsApiResponse(apimocks.eventsFixture.length);
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventSearchResultLiContainer().first().click();
		homepage.getSelectedEventVenueLocation().should('contain', `${apimocks.eventsFixture[0].venue.country} | ${apimocks.eventsFixture[0].venue.city}`);
		helpers.verifySelectedEventContainer(apimocks.eventsFixture[0].venue.country + ' | ' + apimocks.eventsFixture[0].venue.city);
	});

	it('HOMEPAGE-API-007\nCLICK ON ALL UPCOMING EVENTS + CHECK THAT ONLY ONE SELECTED EVENT IS DISPLAYED', () => {
		homepage.getSearchBoxInput().type(apimocks.artistFixture.name, { delay: 0 });
		apimocks.verifyArtistApiResponse(apimocks.artistFixture.name, apimocks.eventsFixture.length);
		apimocks.verifyEventsApiResponse(apimocks.eventsFixture.length);
		homepage.getEventCardContainer().should('be.visible');

		apimocks.eventsFixture.forEach((event, index) => {
			homepage.getEventSearchResultLiContainer().eq(index).click();
			helpers.verifySelectedEventCardContainer();
			helpers.verifySelectedEventContainer(event.venue.country + ' | ' + event.venue.city);
		});
	});

	it('HOMEPAGE-API-008\nCLICK ON THE "GET IT HERE" BUTTON + CHECK URLS REDIRECTIONS', () => {
		homepage.getSearchBoxInput().type(apimocks.artistFixture.name, { delay: 0 });
		apimocks.verifyArtistApiResponse(apimocks.artistFixture.name, apimocks.eventsFixture.length);
		apimocks.verifyEventsApiResponse(apimocks.eventsFixture.length);
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventSearchResultLiContainer().first().click();
		homepage.getSelectedEventVenueButton().should('be.visible').click();
		helpers.checkUrlsRedirect();
	});

	// THIS TEST WILL FAILL BECAUSE THERE IS A BUG, THIS TEST IS DESIGNED TO FAIL
	it('HOMEPAGE-API-009\nSELECT FIRST EVENT + ADD IT TO FAVORITES + CHECK IF IT IS DISPLAYED IN THE FAVORITES SECTION', () => {
		homepage.getSearchBoxInput().type(apimocks.artistFixture.name, { delay: 0 });
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventSearchResultLiContainer().first().click();
		helpers.verifySelectedEventCardContainer();
		helpers.verifySelectedEventContainer(apimocks.eventsFixture[0].venue.country + ' | ' + apimocks.eventsFixture[0].venue.city);
		homepage.getEventSearchResultShowAddToFavoritesButton().first().should('be.visible').click();
		homepage.getEventSearchResultShowRemoveFromFavoritesButton().first().should('be.visible');

		cy.log('TEST WILL FAIL HERE');
		helpers.verifyFavoriteEvents({
			artistName: apimocks.artistFixture.name,
			locationTitle: apimocks.eventsFixture[0].venue.name,
			indices: [0],
		});
	});

	// THIS TEST WILL PASS BECAUSE THE FAVORITES ARE PERSISTED AFTER PAGE REFRESH
	it('HOMEPAGE-API-010\nCHECK IF THE EVENT ADDED TO FAVORITES IS DISPLAYED AFTER PAGE REFRESH', () => {
		homepage.getSearchBoxInput().type(apimocks.artistFixture.name, { delay: 0 });
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventSearchResultLiContainer().first().click();
		helpers.verifySelectedEventCardContainer();
		helpers.verifySelectedEventContainer(apimocks.eventsFixture[0].venue.country + ' | ' + apimocks.eventsFixture[0].venue.city);
		homepage.getEventSearchResultShowAddToFavoritesButton().first().should('be.visible').click();
		homepage.getEventSearchResultShowRemoveFromFavoritesButton().first().should('be.visible');

		cy.reload(true);
		helpers.verifyFavoriteEvents({
			artistName: apimocks.artistFixture.name,
			locationTitle: apimocks.eventsFixture[0].venue.name,
			indices: [0],
		});
	});

	// THIS TEST WILL FAIL BECAUSE THE FIRST ELEMENT FROM FAVORITES IS NOT DELETED FROM LOCAL STORAGE, THIS TEST IS DESIGNED TO FAIL
	it('HOMEPAGE-API-011\nCHECK IF THE EVENT FROM FAVORITES CAN BE REMOVED FROM FAVORITES', () => {
		homepage.getSearchBoxInput().type(apimocks.artistFixture.name, { delay: 0 });
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventSearchResultShowAddToFavoritesButton().first().should('be.visible').click();
		cy.reload(true);

		helpers.verifyFavoriteEvents({
			artistName: apimocks.artistFixture.name,
			locationTitle: apimocks.eventsFixture[0].venue.name,
			indices: [0],
		});

		helpers.verifyFavoriteEvents({
			artistName: apimocks.artistFixture.name,
			locationTitle: apimocks.eventsFixture[0].venue.name,
			removeIndices: [0],
		});

		cy.log('TEST WILL FAIL HERE');
		homepage.getFavoriteEventsLi().should('not.exist');
	});

	it('HOMEPAGE-API-012\nCHECK THAT ALL EVENTS CAN BE ADDED TO FAVORITES', () => {
		homepage.getSearchBoxInput().type(apimocks.artistFixture.name, { delay: 0 });
		homepage.getEventSearchResultsBigContainer().within(() => {
			homepage.getEventCardContainer().should('be.visible');
			apimocks.eventsFixture.forEach((_, index) => {
				homepage.getEventSearchResultShowAddToFavoritesButton().first().should('be.visible').click();
				homepage.getEventSearchResultShowRemoveFromFavoritesButton().eq(index).should('be.visible');
			});
		});

		cy.reload(true);
		helpers.verifyFavoriteEvents({
			artistName: apimocks.artistFixture.name,
			locationTitle: apimocks.eventsFixture.map((event) => event.venue.name),
			indices: apimocks.eventsFixture.map((_, index) => index),
		});
	});

	// THIS TEST WILL FAIL BECAUSE THE FIRST ELEMENT FROM FAVORITES IS NOT DELETED FROM LOCAL STORAGE, THIS TEST IS DESIGNED TO FAIL
	it('HOMEPAGE-API-013\nCHECK THAT ALL EVENTS CAN BE REMOVED FROM FAVORITES', () => {
		homepage.getSearchBoxInput().type(apimocks.artistFixture.name, { delay: 0 });
		homepage.getEventSearchResultsBigContainer().within(() => {
			homepage.getEventCardContainer().should('be.visible');
			apimocks.eventsFixture.forEach((_, index) => {
				homepage.getEventSearchResultShowAddToFavoritesButton().first().should('be.visible').click();
				homepage.getEventSearchResultShowRemoveFromFavoritesButton().eq(index).should('be.visible');
			});
		});

		cy.reload(true);
		helpers.verifyFavoriteEvents({
			artistName: apimocks.artistFixture.name,
			locationTitle: apimocks.eventsFixture.map((event) => event.venue.name),
			removeIndices: [0],
		});

		cy.log('TEST WILL FAIL HERE');
		homepage.getFavoriteEventsLi().should('not.exist');
	});
});
