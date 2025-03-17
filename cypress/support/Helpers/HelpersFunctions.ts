import HomePage from '../PageObjects/HomePagePOM';
import { testData } from './TestData';

const homepage = HomePage;

// DEFINE SESSION PARAMETERS ▼-------------------------------------▼
// I WOULD HAVE ADDED ENV VARIABLES HERE BUT WE DON'T NEED ANY FOR THIS PROJECT
interface SessionParameters {
	viewportWidth: number;
	viewportHeight: number;
}

export const sessionParams: SessionParameters = {
	viewportWidth: 1920,
	viewportHeight: 1080,
};

// VIEWPORT DESKTOP ▼-------------------------------------▼
function viewportDesktop(): void {
	cy.viewport(sessionParams.viewportWidth, sessionParams.viewportHeight);
}

// SESSION DESKTOP ▼-------------------------------------▼
function sessionDesktop(): void {
	const baseUrl: string = '/';
	cy.session('Desktop', () => {}, { cacheAcrossSpecs: true });
	cy.visit(baseUrl);
	cy.viewport(sessionParams.viewportWidth, sessionParams.viewportHeight);
	cy.url().should('eq', Cypress.config().baseUrl);
}

// VERIFY UPCOMING EVENTS FUNCTION ▼-------------------------------------▼
interface EventData {
	date: string;
	name: string;
	location: string;
}

function verifyEvents(events: EventData[]): void {
	homepage.getEventSearchResultsBigContainer().within(() => {
		// VERIFY THE CONTAINER AND NUMBER OF EVENTS
		homepage.getEventSearchResultsContainer().should('be.visible');
		homepage.getEventSearchResultLiContainer().should('have.length', events.length);
		homepage.getEventSearchResultDate().should('have.length', events.length);
		homepage.getEventSearchResultShowName().should('have.length', events.length);
		homepage.getEventSearchResultShowLocation().should('have.length', events.length);
		homepage.getEventSearchResultShowAddToFavoritesButton().should('have.length', events.length);

		// VERIFY EACH EVENT'S DETAILS
		events.forEach((event, index) => {
			homepage.getEventSearchResultDate().eq(index).should('contain', event.date);
			homepage.getEventSearchResultShowName().eq(index).should('contain', event.name);
			homepage.getEventSearchResultShowLocation().eq(index).should('contain', event.location);
			homepage.getEventSearchResultShowAddToFavoritesButton().eq(index).should('be.visible');
		});
	});
}

// VERIFY SELECTED EVENT CONTAINER FUNCTION ▼-------------------------------------▼
function verifySelectedEventContainer(venueLocation: string): void {
	homepage.getSelectedEventCardBigContainer().within(() => {
		homepage.getSelectedEventCardDescription().should('contain', testData.selectedEventContainerTitleDescription);
		homepage.getSelectedEventVenueLocationTitle().should('contain', testData.selectedEventContainerTitleVenueLocationTitle);
		homepage.getSelectedEventVenueLocation().should('contain', venueLocation); // DYNAMIC TEST DATA
		homepage.getSelectedEventVenueSpecialOffers().should('contain', testData.selectedEventContainerTitleVenueSpecialOffers);
		homepage.getSelectedEventVenueType().should('contain', testData.selectedEventContainerTitleVenueType);
		homepage.getSelectedEventVenueStatus().should('contain', testData.selectedEventContainerTitleVenueStatus);
		homepage.getSelectedEventVenueButton().should('contain', testData.selectedEventContainerTitleVenueButton);
	});
}

// VERIFY SELECTED EVENT CARD CONTAINER FUNCTION ▼-------------------------------------▼
function verifySelectedEventCardContainer(): void {
	homepage.getSelectedEventCardContainer().should('have.length', 1);
}

// CHECK URLS REDIRECT ▼-------------------------------------▼
function checkUrlsRedirect(): void {
	cy.origin(testData.getItHereButtonRedirectUrl1, () => {});
	cy.origin(testData.getItHereButtonRedirectUrl2, () => {});
}

// VERIFY FAVORITE EVENTS FUNCTION ▼-------------------------------------▼
interface FavoriteEventData {
	artistName: string;
	locationTitle: string | string[];
	indices?: number[];
	removeIndices?: number[];
}

function verifyFavoriteEvents(favoritedEvent: FavoriteEventData): void {
	homepage.getFavoriteEventsBigContainer().within(() => {
		homepage.getFavoriteEventsContainer().should('be.visible');
		homepage.getFavoriteEventsSubContainer().should('be.visible');
		homepage.getFavoriteEventsLi().should('be.visible');

		if (favoritedEvent.indices && favoritedEvent.indices.length > 0) {
			// CHECK IF THE SPECIFIC EVENTS ARE DISPLAYED GIVEN THE INDICES
			favoritedEvent.indices.forEach((index) => {
				homepage.getFavoriteEventsArtistName().eq(index).should('contain', favoritedEvent.artistName);
				if (Array.isArray(favoritedEvent.locationTitle)) {
					// VERIFY THE LOCATION NAME IF IT IS AN ARRAY
					homepage.getFavoriteEventsLocationTitle().eq(index).invoke('text').then((text) => {
						expect(favoritedEvent.locationTitle as string[]).to.include(text.trim());
					});
				} else {
					// VERIFY THE LOCATION NAME IF IT IS A STRING
					homepage.getFavoriteEventsLocationTitle().eq(index).should('contain', favoritedEvent.locationTitle);
				}
				homepage.getFavoriteEventsRemoveFromFavoritesButton().eq(index).should('be.visible');
			});
		} else {
			// CHECK IF ALL EVENTS ARE DISPLAYED
			homepage.getFavoriteEventsArtistName().each(($el) => {
				cy.wrap($el).should('contain', favoritedEvent.artistName);
			});
			if (Array.isArray(favoritedEvent.locationTitle)) {
				homepage.getFavoriteEventsLocationTitle().each(($el) => {
					cy.wrap($el).invoke('text').then((text) => {
						expect(favoritedEvent.locationTitle as string[]).to.include(text.trim());
					});
				});
			} else {
				homepage.getFavoriteEventsLocationTitle().each(($el) => {
					cy.wrap($el).should('contain', favoritedEvent.locationTitle);
				});
			}
			homepage.getFavoriteEventsRemoveFromFavoritesButton().should('be.visible');
		}

		// FOR REMOVING EVENTS FROM FAVORITES IF NEEDED
		if (favoritedEvent.removeIndices && favoritedEvent.removeIndices.length > 0) {
			favoritedEvent.removeIndices.forEach((index, arrayIndex) => {
				if (arrayIndex === 0) {
					homepage.getFavoriteEventsRemoveFromFavoritesButton().first().click();
				} else if (favoritedEvent.removeIndices && favoritedEvent.removeIndices.length > 2) {
					homepage.getFavoriteEventsRemoveFromFavoritesButton().eq(index).click();
				}
			});
		}
	});
}

export default {
	viewportDesktop,
	sessionDesktop,
	verifyEvents,
	verifySelectedEventContainer,
	verifySelectedEventCardContainer,
	checkUrlsRedirect,
	verifyFavoriteEvents,
};
