# 🔥 Who's in Town Cypress Framework

Welcome to the **Who's in Town Cypress Framework**! 🚀 This repository provides a robust, scalable, and efficient **end-to-end testing framework** built with Cypress for testing the **Who's in Town project**.

## 🎯 Project Overview

This framework implements comprehensive end-to-end testing for the Who's in Town application, focusing on:
- 🌐 Homepage functionality testing
- 🔄 API integration testing
- ♿ Accessibility compliance testing

## 📌 Getting Started

Follow these steps to set up and run the project on your local machine.

### ✅ Prerequisites
Ensure you have the following installed:

- 📦 [Node.js](https://nodejs.org/) (LTS version recommended)
- 🛠️ [Git](https://git-scm.com/downloads) (Windows/Mac/Linux)
- 📜 [npm](https://www.npmjs.com/) (Comes with Node.js)

### 🎯 Test Application Setup
1. Clone and set up the application for this framework to work:
```bash
git clone https://github.com/CrowdedApp/crowded.assignments.qa
```

### 📥 Cypress Framework Installation
1️⃣ Clone the repository:
```bash
git clone https://github.com/Cristian-Serbanoiu/cypress-project
```

2️⃣ Navigate to the project directory and install dependencies:
```bash
cd cypress-project
npm install
```

## 🚀 Available Scripts

### Running Tests
- 🖥️ **Run test in Open Mode:**
  ```bash
  npx cypress open
  ```

- 🤖 **Run All Tests In Headless Mode:**
  ```bash
  npx cypress run
  ```

### Browser-Specific Test Runs
- 🌐 **Chrome:**
  ```bash
  npm run test:chrome
  ```
- 🦊 **Firefox:**
  ```bash
  npm run test:firefox
  ```
- 📱 **Edge:**
  ```bash
  npm run test:edge
  ```
- 🌍 **All Browsers:**
  ```bash
  npm run test:all-browsers
  ```

### Feature-Specific Test Runs
- 🏠 **Homepage Basic Tests:**
  ```bash
  npm run test:homepage
  ```
- 🔄 **Homepage API Tests:**
  ```bash
  npm run test:homepage-api
  ```
- ♿ **Accessibility Basic Tests:**
  ```bash
  npm run test:accessibility
  ```

## 🐛 Known Bugs

The following bugs have been identified through automated testing:

### Favorites Functionality
1. **Adding Events to Favorites (HOMEPAGE-009)**
   - 🔴 Favorited events are not properly displayed in the favorites section after being added, they only appear after page refresh
   - 🔄 Test: `HOMEPAGE-009` and `HOMEPAGE-API-009`
   - 💡 Expected: Event should appear in favorites section immediately after adding
   - ❌ Actual: Event is not visible in favorites section

2. **Removing Events from Favorites (HOMEPAGE-011, HOMEPAGE-013)**
   - 🔴 Favorited events are not properly removed from the page due to local storage not being cleared
   - 🔄 Test: `HOMEPAGE-011`, `HOMEPAGE-013`, `HOMEPAGE-API-011`, and `HOMEPAGE-API-013`
   - 💡 Expected: All the events should be completely removed from favorites interface and local storage
   - ❌ Actual: First element persists in interface and local storage after removal

## 📁 Project Structure

```
cypress/
├── e2e/                    # Test specifications
│   ├── homepage.cy.ts      # Homepage functionality tests
│   ├── homepage_api.cy.ts  # Homepage API integration tests
│   └── accessibility.cy.ts # Accessibility tests
├── fixtures/               # Test data
└── support/               # Support files and commands
```

## 🧪 Test Coverage

### 1. Homepage Tests (`homepage.cy.ts`)
- 🔍 UI element visibility and interactions
- 📱 Responsive design validation
- 🎯 User journey flows
- 🔄 State management
- 🚫 Error handling

### 2. API Integration Tests (`homepage_api.cy.ts`)
- 🔄 API endpoint validation
- 📊 Response data verification
- 🕒 Request/response timing
- 🚫 Error scenarios handling
- 📱 Mock API data

### 3. Accessibility Tests (`accessibility.cy.ts`)
- ♿ Basic Accesibility compliance checks

## 💡 Best Practices Implemented

1. **Code Organization**
   - 📁 Page Object Model (POM) pattern
   - 🔄 Reusable custom commands
   - 🎯 DRY principles

2. **Test Design**
   - ✅ Inndependent tests
   - 🔄 Before/after hooks for setup/cleanup

3. **Asynchronous Handling**
   - ⏱️ Smart waiting strategies
   - 🔄 Retry-ability
   - 🎯 Network request interception

4. **Mocking & Stubbing**
   - 🔄 API response simulation
   - 🎯 Network state handling
   - 📊 Test data management

5. **Quality Assurance**
   - 📝 TypeScript for type safety
   - 🎯 ESLint/Prettier for code style

## 📚 Useful Resources

- 📖 [Why Cypress?](https://docs.cypress.io/guides/overview/why-cypress)
- 🏆 [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- 🔍 [Official Cypress Documentation](https://docs.cypress.io/)
- ♿ [Accessibility Testing with Cypress](https://docs.cypress.io/app/guides/accessibility-testing)
