# MetaMask SDK Node.js Demo

This is a simple Node.js application that demonstrates how to interact with the MetaMask wallet using the MetaMask SDK and gather user input using the `enquirer` library.

## Prerequisites

Before you can run this demo, you need to ensure that you have the following installed:

- Node.js: You can download it from [https://nodejs.org/](https://nodejs.org/).

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd sdk-nodejs-demo
   ```

3. Install the project dependencies:

   ```bash
   yarn install
   ```

## Usage

1. Start the application:

   ```bash
   yarn start
   ```

   The application will prompt you to select an action from a list of options using the `enquirer` library.

2. After selecting an action, the application will dynamically determine the appropriate Ethereum method and execute it using the MetaMask SDK.

3. The results of the Ethereum method calls will be displayed in the console.

## Configuration

- **MetaMask SDK Options**: You can configure MetaMask SDK options in the `options` object in the `index.ts` file. This includes specifying the dapp metadata, logging settings, and customizing modal text.

- **Ethereum Methods**: To add more Ethereum methods or customize the behavior of existing ones, you can modify the `start` function in the `index.ts` file. For example, you can add a new condition to handle a specific action.

## Available Actions

- `getAccounts`: Retrieve the user's Ethereum accounts.
- `getChainId`: Get the current Ethereum chain ID.
- `signMessage`: Send an Ethereum transaction (customize parameters as needed).
- `getBalance`: Get the balance of an Ethereum address (customize parameters as needed).
- Other actions: You can extend the list of available actions as needed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- MetaMask SDK: [https://github.com/MetaMask/metamask-sdk](https://github.com/MetaMask/metamask-sdk)
- enquirer: [https://github.com/enquirer/enquirer](https://github.com/enquirer/enquirer)

## Author

- Dax the Dev
  - Email: haydenaylor911@gmail.com