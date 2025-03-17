import { defineConfig } from 'cypress';

export default defineConfig({
	// projectId: "project-id", // IF WE USED CYPRESS CLOUD
	// TIMEOUTS ▼------------▼
	defaultCommandTimeout: 10000,
	pageLoadTimeout: 10000,
	responseTimeout: 10000,
	// TIMEOUTS ▲------------▲
	chromeWebSecurity: false, // CORS DISABLED
	screenshotsFolder: 'cypress/screenshots',
	videosFolder: 'cypress/videos',
	trashAssetsBeforeRuns: true,
	numTestsKeptInMemory: 2,
	retries: {
		runMode: 0, // NO NEED FOR RETRIES FOR NOW CAUSE WE DON'T NEED FOR THIS PROJECT
		openMode: 0 // NO NEED FOR RETRIES FOR NOW CAUSE WE DON'T NEED FOR THIS PROJECT
	},
	e2e: {
		baseUrl: 'http://localhost:3000/',
		video: true,
		specPattern: 'cypress/e2e/**/*.cy.ts',
		supportFile: 'cypress/support/e2e.ts',
		viewportWidth: 1920,
		viewportHeight: 1080,
		experimentalRunAllSpecs: true,
		screenshotOnRunFailure: true,
		chromeWebSecurity: false,
		requestTimeout: 10000
	},
});
