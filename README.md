# Fire Homes

Fire Homes is a property listing web application built with Next.js and Firebase. It provides a modern interface for browsing properties while giving administrators tools to manage listings from a single platform.

## Tech Stack

- Next.js
- Firebase Authentication
- Cloud Firestore
- Firebase Storage

## Features

### Admin

- Manage properties with full CRUD operations
- Upload and manage property-related assets
- Maintain listing data in Firestore

### User

- Search properties
- Filter property results
- Save favorite properties

## Getting Started

### Prerequisites

- Node.js
- npm
- Firebase project configuration

### Environment Variables

Use [`.env.example`](/Users/jeans/Dev/fire-homes/.env.example:1) as the template and place your real values in `.env.local`.

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` starts the development server
- `npm run build` builds the app for production
- `npm run start` starts the production server
- `npm run lint` runs linting

## Project Goal

This project is designed to support both property administrators and end users in a single workflow: admins can manage listings efficiently, and users can discover properties through search, filtering, and favorites.
