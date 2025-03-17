import HomePage from '../support/PageObjects/HomePagePOM';
import helpers from '../support/Helpers/HelpersFunctions';
import { testData } from '../support/Helpers/TestData';
import { Result } from 'axe-core';
const homepage = HomePage;

describe('BASIC ACCESSIBILITY HOMEPAGE TESTS', () => {
	beforeEach(() => {
		helpers.sessionDesktop();
		helpers.viewportDesktop();
		cy.injectAxe();
	});

	afterEach(() => {
		cy.clearLocalStorage();
	});

	it('ACCESIBILITY-001\nCHECK THE WHOLE PAGE FOR ACCESIBILITY VIOLATIONS', () => {
		cy.checkA11y(
			undefined,
			{
				runOnly: {
					type: 'tag',
					values: [testData.accessibilityTestData.wcag2a, testData.accessibilityTestData.wcag2aa, testData.accessibilityTestData.wcag21a, testData.accessibilityTestData.wcag21aa],
				},
			} as any,
			(violations: Result[]) => {
				// LOG VIOLATIONS TO THE CONSOLE FOR EASIER DEBUGGING (IF ANY)
				if (violations.length > 0) {
					console.log(testData.fullHomepageAccessibilityViolations, violations);
					cy.log(testData.fullHomepageAccessibilityViolations, violations);
				}
			},
		);
	});

	it('ACCESIBILITY-002\nCHECK THE SEARCH AND RESULTS AREA FOR ACCESIBILITY VIOLATIONS', () => {
		homepage.getEventSearchResultsBigContainer().then(($el) => {
			cy.checkA11y(
				$el[0],
				{
					runOnly: {
						type: 'tag',
						values: [testData.accessibilityTestData.wcag2a, testData.accessibilityTestData.wcag2aa, testData.accessibilityTestData.wcag21a, testData.accessibilityTestData.wcag21aa],
					},
				} as any,
				(violations: Result[]) => {
					// LOG VIOLATIONS TO THE CONSOLE FOR EASIER DEBUGGING (IF ANY)
					if (violations.length > 0) {
						console.log(testData.searchAreaAccessibilityViolations, violations);
						cy.log(testData.searchAreaAccessibilityViolations, violations);
					}
				},
			);
		});
	});

	it('ACCESIBILITY-003\nCHECK THE SELECTED EVENT AREA FOR ACCESIBILITY VIOLATIONS', () => {
		homepage.getSelectedEventCardBigContainer().then(($el) => {
			cy.checkA11y(
				$el[0],
				{
					runOnly: {
						type: 'tag',
						values: [testData.accessibilityTestData.wcag2a, testData.accessibilityTestData.wcag2aa, testData.accessibilityTestData.wcag21a, testData.accessibilityTestData.wcag21aa],
					},
				} as any,
				(violations: Result[]) => {
					// LOG VIOLATIONS TO THE CONSOLE FOR EASIER DEBUGGING (IF ANY)
					if (violations.length > 0) {
						console.log(testData.selectedEventAreaAccessibilityViolations, violations);
						cy.log(testData.selectedEventAreaAccessibilityViolations, violations);
					}
				},
			);
		});
	});

	it('ACCESIBILITY-004\nCHECK THE FAVORITES AREA FOR ACCESIBILITY VIOLATIONS', () => {
		homepage.getFavoriteEventsBigContainer().then(($el) => {
			cy.checkA11y(
				$el[0],
				{
					runOnly: {
						type: 'tag',
						values: [testData.accessibilityTestData.wcag2a, testData.accessibilityTestData.wcag2aa, testData.accessibilityTestData.wcag21a, testData.accessibilityTestData.wcag21aa],
					},
				} as any,
				(violations: Result[]) => {
					// LOG VIOLATIONS TO THE CONSOLE FOR EASIER DEBUGGING (IF ANY)
					if (violations.length > 0) {
						console.log(testData.favoritesAreaAccessibilityViolations, violations);
						cy.log(testData.favoritesAreaAccessibilityViolations, violations);
					}
				},
			);
		});
	});
});
