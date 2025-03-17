import HomePage from '../support/PageObjects/HomePagePOM';
import helpers from '../support/Helpers/HelpersFunctions';
import { testData, events } from '../support/Helpers/TestData';

const homepage = HomePage;

describe('HOMEPAGE REAL DATA TESTS', () => {
	beforeEach(() => {
		helpers.sessionDesktop();
		helpers.viewportDesktop();
	});

	afterEach(() => {
		cy.clearLocalStorage();
	});

	it('HOMEPAGE-001\nASSERTIONS FOR THE DEFAULT ELEMENTS ON THE HOMEPAGE', () => {
		homepage.getHomePageTitle().contains(testData.homepageTitle);
		homepage.getFindConcertsTitle().contains(testData.homepageFindConcertsTitle);
		homepage.getSearchBoxInput().should('have.attr', 'placeholder', testData.homepageSearchBoxPlaceholder);
		homepage.getSearchBoxInputIcon().should('be.visible');
		homepage.getSelectedEventTitle().contains(testData.homepageSelectedEventTitle);
		homepage.getSelectedEventDescription().contains(testData.homepageSelectedEventDescription);
		homepage.getFavoriteEventsTitle().contains(testData.homepageFavoriteEventsTitle);
	});

	it('HOMEPAGE-002\nCLICK ON THE SEARCH BOX + TYPE SOMETHING + CLEAR THE INPUT', () => {
		homepage.getSearchBoxInput().click();
		homepage.getSearchBoxInput().type(testData.artistCardName);
		homepage.getSearchBoxInput().should('have.value', testData.artistCardName);
		homepage.getSearchBoxInput().clear();
		homepage.getSearchBoxInput().should('have.value', '');
		homepage.getSearchBoxInput().should('have.attr', 'placeholder', testData.homepageSearchBoxPlaceholder);
	});

	it('HOMEPAGE-003\nTYPE "TEST" + ASSERTIONS ON THE CARD FOR NO UPCOMING EVENTS', () => {
		homepage.getSearchBoxInput().click();
		homepage.getSearchBoxInput().type(testData.noUpcomingEventsSearchResultsTitle);
		homepage.getSearchBoxInput().should('have.value', testData.noUpcomingEventsSearchResultsTitle);
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventCardImage().should('have.attr', 'src', testData.noUpcomingEventsSearchResultsImage);
		homepage.getEventCardTitle().should('contain', testData.noUpcomingEventsSearchResultsTitle);
		homepage.getEventCardDescription().should('contain', testData.noUpcomingEventsSearchResultsDescription);
	});

	it(`HOMEPAGE-004\nTYPE ${testData.artistCardName} + ASSERTIONS ON THE CARD FOR UPCOMING EVENTS`, () => {
		homepage.getSearchBoxInput().click();
		homepage.getSearchBoxInput().type(testData.artistCardName);
		homepage.getSearchBoxInput().should('have.value', testData.artistCardName);
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventCardImage().should('have.attr', 'src', testData.artistCardImage);
		homepage.getEventCardTitle().should('contain', testData.artistCardName);
		homepage.getEventCardDescription().should('contain', testData.artistCardUpcomingEvents);
	});

	it(`HOMEPAGE-005\nCHECK THAT ALL 2 UPCOMING EVENTS ARE DISPLAYED + ASSERTIONS FOR ALL THE ELEMENTS`, () => {
		homepage.getSearchBoxInput().type(testData.artistCardName);
		homepage.getEventCardContainer().should('be.visible');
		helpers.verifyEvents(events);
	});

	it(`HOMEPAGE-006\nCLICK ON THE FIRST EVENT + ASSERTIONS FOR THE SELECTED EVENTS CONTAINER`, () => {
		homepage.getSearchBoxInput().type(testData.artistCardName);
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventSearchResultLiContainer().first().click();
		helpers.verifySelectedEventContainer(testData.selectedEventContainerTitleVenueLocation1);
	});

	it(`HOMEPAGE-007\nCLICK ON ALL 2 UPCOMING EVENTS + CHECK THAT ONLY ONE SELECTED EVENT IS DISPLAYED`, () => {
		homepage.getSearchBoxInput().type(testData.artistCardName);
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventSearchResultLiContainer().first().click();
		helpers.verifySelectedEventCardContainer();
		helpers.verifySelectedEventContainer(testData.selectedEventContainerTitleVenueLocation1);
		homepage.getEventSearchResultLiContainer().eq(1).click();
		helpers.verifySelectedEventCardContainer();
		helpers.verifySelectedEventContainer(testData.selectedEventContainerTitleVenueLocation2);
	});

	it(`HOMEPAGE-008\nCLICK ON THE "GET IT HERE" BUTTON + CHECK URLS REDIRECTIONS`, () => {
		homepage.getSearchBoxInput().type(testData.artistCardName);
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventSearchResultLiContainer().first().click();
		homepage.getSelectedEventVenueButton().should('contain', testData.selectedEventContainerTitleVenueButton).should('be.visible');
		homepage.getSelectedEventVenueButton().should('contain', testData.selectedEventContainerTitleVenueButton).click();
		helpers.checkUrlsRedirect();
	});

	// THIS TEST WILL FAILL BECAUSE THERE IS A BUG, THIS TEST IS DESIGNED TO FAIL
	it(`HOMEPAGE-009\nSELECT FIRST EVENT + ADD IT TO FAVORITES + CHECK IF IT IS DISPLAYED IN THE FAVORITES SECTION`, () => {
		homepage.getSearchBoxInput().type(testData.artistCardName);
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventSearchResultLiContainer().first().click();
		helpers.verifySelectedEventCardContainer();
		helpers.verifySelectedEventContainer(testData.selectedEventContainerTitleVenueLocation1);
		homepage.getEventSearchResultLiContainer().eq(1).click();
		homepage.getEventSearchResultShowAddToFavoritesButton().first().should('be.visible');
		homepage.getEventSearchResultShowAddToFavoritesButton().first().click();
		homepage.getEventSearchResultShowRemoveFromFavoritesButton().first().should('be.visible');

		cy.log('TEST WILL FAIL HERE');
		helpers.verifyFavoriteEvents({
			artistName: testData.artistCardName,
			locationTitle: testData.upcomingEventsEventName1,
			indices: [0],
		});
	});

	// THIS TEST WILL PASS BECAUSE THE FAVORITES ARE PERSISTED AFTER PAGE REFRESH
	it(`HOMEPAGE-010\nCHECK IF THE EVENT ADDED TO FAVORITES IS DISPLAYED AFTER PAGE REFRESH`, () => {
		homepage.getSearchBoxInput().type(testData.artistCardName);
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventSearchResultLiContainer().first().click();
		helpers.verifySelectedEventCardContainer();
		helpers.verifySelectedEventContainer(testData.selectedEventContainerTitleVenueLocation1);
		homepage.getEventSearchResultLiContainer().eq(1).click();
		homepage.getEventSearchResultShowAddToFavoritesButton().first().should('be.visible');
		homepage.getEventSearchResultShowAddToFavoritesButton().first().click();
		homepage.getEventSearchResultShowRemoveFromFavoritesButton().first().should('be.visible');

		cy.reload(true);
		helpers.verifyFavoriteEvents({
			artistName: testData.artistCardName,
			locationTitle: testData.upcomingEventsEventName1,
			indices: [0],
		});
	});

	// THIS TEST WILL FAIL BECAUSE THE FIRST ELEMENT FROM FAVORITES IS NOT DELETED FROM LOCAL STORAGE, THIS TEST IS DESIGNED TO FAIL
	it(`HOMEPAGE-011\nCHECK IF THE EVENT FROM FAVORITES CAN BE REMOVED FROM FAVORITES`, () => {
		homepage.getSearchBoxInput().type(testData.artistCardName);
		homepage.getEventCardContainer().should('be.visible');
		homepage.getEventSearchResultShowAddToFavoritesButton().first().should('be.visible');
		homepage.getEventSearchResultShowAddToFavoritesButton().first().click();
		cy.reload(true);

		helpers.verifyFavoriteEvents({
			artistName: testData.artistCardName,
			locationTitle: testData.upcomingEventsEventName1,
			indices: [0],
		});

		helpers.verifyFavoriteEvents({
			artistName: testData.artistCardName,
			locationTitle: testData.upcomingEventsEventName1,
			removeIndices: [0],
		});

		cy.log('TEST WILL FAIL HERE');
		homepage.getFavoriteEventsLi().should('not.exist');
	});

	it(`HOMEPAGE-012\nCHECK THAT ALL 2 EVENTS CAN BE ADDED TO FAVORITES`, () => {
		homepage.getSearchBoxInput().type(testData.artistCardName);
		homepage.getEventSearchResultsBigContainer().within(() => {
			homepage.getEventCardContainer().should('be.visible');

			homepage.getEventSearchResultShowAddToFavoritesButton().first().should('be.visible');
			homepage.getEventSearchResultShowAddToFavoritesButton().first().click();
			homepage.getEventSearchResultShowRemoveFromFavoritesButton().eq(0).should('be.visible');

			homepage.getEventSearchResultShowAddToFavoritesButton().first().should('be.visible');
			homepage.getEventSearchResultShowAddToFavoritesButton().first().click();
			homepage.getEventSearchResultShowRemoveFromFavoritesButton().eq(1).should('be.visible');
		});

		cy.reload(true);
		helpers.verifyFavoriteEvents({
			artistName: testData.artistCardName,
			locationTitle: [testData.upcomingEventsEventName1, testData.upcomingEventsEventName2],
			indices: [0, 1],
		});
	});

	// THIS TEST WILL FAIL BECAUSE THE FIRST ELEMENT FROM FAVORITES IS NOT DELETED FROM LOCAL STORAGE, THIS TEST IS DESIGNED TO FAIL
	it(`HOMEPAGE-013\nCHECK THAT ALL 2 EVENTS CAN BE REMOVED FROM FAVORITES`, () => {
		homepage.getSearchBoxInput().type(testData.artistCardName);
		homepage.getEventSearchResultsBigContainer().within(() => {
			homepage.getEventCardContainer().should('be.visible');

			homepage.getEventSearchResultShowAddToFavoritesButton().first().should('be.visible');
			homepage.getEventSearchResultShowAddToFavoritesButton().first().click();
			homepage.getEventSearchResultShowRemoveFromFavoritesButton().eq(0).should('be.visible');

			homepage.getEventSearchResultShowAddToFavoritesButton().first().should('be.visible');
			homepage.getEventSearchResultShowAddToFavoritesButton().first().click();
			homepage.getEventSearchResultShowRemoveFromFavoritesButton().eq(1).should('be.visible');
		});

		cy.reload(true);
		helpers.verifyFavoriteEvents({
			artistName: testData.artistCardName,
			locationTitle: [testData.upcomingEventsEventName1, testData.upcomingEventsEventName2],
			removeIndices: [0],
		});

		cy.log('TEST WILL FAIL HERE');
		homepage.getFavoriteEventsLi().should('not.exist');
	});
});
