# Dexola WebApp

Dexola WebApp is a decentralized application built on the Ethereum blockchain, enabling users to interact with smart contracts and manage token staking. This project is structured with React, Vite, and Web3Modal for blockchain integration.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Technical Task](#technical-task)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Components](#components)
- [Utilities](#utilities)
- [Custom Hooks](#custom-hooks)
- [Routing](#routing)
- [Dependencies](#dependencies)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

- [Contact](#contact)

## Technical Task
This project is organized by [Dexola](https://dexola.com/).<br />
The technical task for this project can be found in the [project documentation](https://docs.google.com/document/d/14Dl0ljfAjNTY32InJRtHVtvHJGYpzGP3NjN3pwRCbAo/edit#heading=h.kybbdiqof5h0).<br />
The design assets and guidelines are provided in the [Figma design file](https://www.figma.com/file/ncCGplINbkkYQW5E59z6zH/Dexola-Camp?type=design&node-id=446-398&mode=design&t=VLW629i0pdKzUyuN-0).<br />

## Prerequisites
- [Node.js](https://nodejs.org/)
- [Vite](https://vitejs.dev/)

## Dependencies
1. **Formik (`formik`)**:
   - A library that helps with building forms in React, managing form state, and validating form fields.
   
2. **Yup (`yup`)**:
   - A JavaScript schema builder for value parsing and validation which integrates well with Formik.
   
3. **Web3Modal (`@web3modal/ethereum` & `@web3modal/react`)**:
   - Libraries for integrating Ethereum blockchain interactions within your React app, providing a modal dialog for connecting to different wallets.
   
4. **WAGMI (`wagmi`)**:
   - A library used for integrating blockchain functionalities in your application. It provides hooks and utilities for working with Ethereum contracts and accounts.
   
5. **Sass (`sass`)**:
   - A preprocessor scripting language that is interpreted or compiled into CSS, which enhances the styling of the application.
   
6. **Normalize.css (`normalize.css`)**:
   - A modern alternative to CSS resets, making built-in browser styling consistent across different browsers.

7. **React Toastify (`react-toastify`)**:
   - Allows for the easy addition of notifications to your app.

8. **React Tooltip (`react-tooltip`)**:
    - A library for creating simple and customizable tooltips in your application.

9. **React Loader Spinner (`react-loader-spinner`)**:
    - Provides loading spinner components which are displayed while waiting for some data.

10. **Viem (`viem`)**:
    - A library for formatting and manipulating values in your application.

## Installation
```bash
git clone https://github.com/your-username/dexola-webapp.git
cd dexola-webapp
npm install
```

## Usage
After installation, run the following command to start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173/) to view the application in your browser.

## Configuration
Ensure to set up your environment variables correctly in a .env file at the root of your project. Here is an example configuration:
```text
VITE_PROJECT_ID=your-project-id
VITE_ALCHEMY_KEY=your-alchemy-key
VITE_TOKEN=your-token-address
VITE_CONTRACT=your-contract-address
```
##

