/// <reference types="cypress" />

class HomePage {
	// ROOT ▼--------------▼
	getRoot(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('#root');
	}

	// TITLES ▼--------------▼
	getHomePageTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-h1.css-4j6dol-MuiTypography-root');
	}

	getFindConcertsTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-h1.css-z3zhnb-MuiTypography-root');
	}

	getSelectedEventTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-h1.css-z3zhnb-MuiTypography-root');
	}

	getSelectedEventDescription(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-body1.css-ahj2mt-MuiTypography-root');
	}

	getFavoriteEventsTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-h1.css-z3zhnb-MuiTypography-root');
	}

	getFavoriteEventsList(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiList-root.css-1q41bvh-MuiList-root');
	}

	// SEARCH BOX ▼--------------▼
	getSearchBoxInputIcon(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('[data-testid="SearchIcon"]');
	}

	getSearchBoxInput(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('[type="search"]').should('have.attr', 'placeholder', 'Search here');
	}

	// EVENT CARD ▼--------------▼
	getEventCardContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.css-1mdvjoc-MuiPaper-root-MuiCard-root');
	}

	getEventCardImage(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiCardMedia-root.MuiCardMedia-media.MuiCardMedia-img.css-1g95oww-MuiCardMedia-root');
	}

	getEventCardTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-h4.css-5lbw0b-MuiTypography-root');
	}

	getEventCardDescription(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-subtitle1.css-10wpov9-MuiTypography-root');
	}

	// EVENT SEARCH RESULTS ▼--------------▼
	getEventSearchResultsBigContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-4.css-gj1fbr-MuiGrid-root').first();
	}

	getEventSearchResultsContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiList-root.MuiList-padding.css-7cnmzf-MuiList-root');
	}

	getEventSearchResultLiContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiListItem-root.MuiListItem-gutters.MuiListItem-padding.MuiListItem-divider.MuiListItem-alignItemsFlexStart.css-niofb-MuiListItem-root');
	}

	getEventSearchResultDate(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-body1.css-17k3btx-MuiTypography-root');
	}

	getEventSearchResultShowName(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-body1.MuiListItemText-primary.css-10hburv-MuiTypography-root');
	}

	getEventSearchResultShowLocation(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-body2.css-141vi1f-MuiTypography-root');
	}

	getEventSearchResultShowAddToFavoritesButton(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('[aria-label="Add to Favorites"]');
	}

	getEventSearchResultShowRemoveFromFavoritesButton(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('[aria-label="Remove from Favorites"]');
	}

	// SELECTED EVENT CARD ▼--------------▼
	getSelectedEventCardBigContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-4.css-gj1fbr-MuiGrid-root').eq(1);
	}

	getSelectedEventCardContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiCardContent-root.css-46bh2p-MuiCardContent-root');
	}

	getSelectedEventCardDescription(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-body1.MuiTypography-gutterBottom.css-fuf5ag-MuiTypography-root');
	}

	getSelectedEventVenueLocationTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-body1.MuiTypography-gutterBottom.css-fuf5ag-MuiTypography-root');
	}

	getSelectedEventVenueLocation(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-body1.MuiTypography-gutterBottom.css-1945f9x-MuiTypography-root');
	}

	getSelectedEventVenueSpecialOffers(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-body1.MuiTypography-gutterBottom.css-i55qve-MuiTypography-root');
	}

	getSelectedEventVenueType(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-body1.css-ahj2mt-MuiTypography-root');
	}

	getSelectedEventVenueStatus(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-body1.css-ahj2mt-MuiTypography-root');
	}

	getSelectedEventVenueButton(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-inherit.MuiLink-root.MuiLink-underlineAlways.css-1cubsp8-MuiTypography-root-MuiLink-root');
	}

	// FAVORITE EVENTS ▼--------------▼
	getFavoriteEventsBigContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-4.css-gj1fbr-MuiGrid-root').eq(2);
	}

	getFavoriteEventsContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiStack-root.css-163ljxj-MuiStack-root');
	}

	getFavoriteEventsSubContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiList-root.MuiList-padding.css-7cnmzf-MuiList-root');
	}

	getFavoriteEventsLi(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiListItem-root.MuiListItem-gutters.MuiListItem-padding.MuiListItem-divider.MuiListItem-alignItemsFlexStart.css-niofb-MuiListItem-root');
	}

	getFavoriteEventsArtistName(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-body1.MuiListItemText-primary.css-10hburv-MuiTypography-root');
	}

	getFavoriteEventsLocationTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('.MuiTypography-root.MuiTypography-body2.css-141vi1f-MuiTypography-root');
	}

	getFavoriteEventsRemoveFromFavoritesButton(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get('[data-testid="StarIcon"]');
	}
}

export default new HomePage();
