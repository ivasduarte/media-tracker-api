# Media Tracker API

RESTful API for tracking movies and TV series, built with Node.js and Domain-Driven Design (DDD).

## Architecture
- **Domain:** Media entities and validation rules (e.g., rating boundaries).
- **Application:** Use cases orchestrating data flow.
- **Infrastructure:** External TMDB API integration and databse persistence.
- **Presentation:** Express.js REST controllers.

## Testing Strategy

Tests are strictly isolated. External dependencies (like TMDB API calls and Database saves) are simulated using mocking techniques (Stubs, Spies, and Mocks) via native Node.js test runner to emulate frameworks like Mockito.