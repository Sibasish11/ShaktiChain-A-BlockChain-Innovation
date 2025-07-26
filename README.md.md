# ShaktiChain

ShaktiChain is a secure and anonymous feedback platform designed to empower individuals to share concerns and feedback about campus issues, while allowing organizations to review and address these reports transparently. Built with a focus on privacy and accessibility, it leverages blockchain technology for secure data handling.

## Tech Stack Used

- **Frontend**:
  - Preact: Lightweight React alternative for efficient UI rendering
  - htm: JSX-like syntax for Preact components
  - TypeScript: Type-safe JavaScript for better maintainability
  - Vite: Fast build tool and development server
  - CSS: Custom styles with Tailwind-inspired design system

- **Backend/Blockchain**:
  - Clarinet: Clarity smart contract development toolkit
  - Stacks Blockchain: For secure and decentralized data storage
  - @hirosystems/clarinet-sdk: For interacting with Clarity contracts
  - @stacks/transactions: For handling blockchain transactions

- **Testing**:
  - Vitest: Fast unit testing framework
  - vitest-environment-clarinet: Custom environment for testing Clarity contracts
  - Chokidar: File watcher for automated test runs

- **Other**:
  - Node.js: Runtime for development and testing
  - npm: Package manager for dependencies

## Setup Instructions

1. **Prerequisites**:
   - Install [Node.js](https://nodejs.org/) (v18 or higher).
   - Install [Clarinet](https://www.hiro.so/clarinet) for Clarity smart contract development.
   - Ensure you have a modern browser for testing the frontend.

2. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd shaktichain
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   This starts the Vite development server. Open `http://localhost:5173` in your browser to view the app.

5. **Run Tests**:
   ```bash
   npm run test
   ```
   To run tests with coverage and cost reports:
   ```bash
   npm run test:report
   ```
   To watch for file changes and rerun tests:
   ```bash
   npm run test:watch
   ```

6. **Build for Production**:
   ```bash
   npm run build
   ```
   Preview the production build:
   ```bash
   npm run preview
   ```

7. **Smart Contract Setup**:
   - Ensure Clarinet is installed (`clarinet --version`).
   - Contracts are defined in the `contracts/` directory (uncomment and configure in `Clarinet.toml` as needed).
   - Simulate contract interactions using:
     ```bash
     clarinet console
     ```

## Smart Contract Address

The smart contracts for ShaktiChain are not yet deployed. To deploy on the Stacks testnet or mainnet:
1. Use Clarinet to simulate and test contracts locally.
2. Deploy using the Stacks CLI or Hiro's deployment tools.
3. Update this section with the deployed contract address once available.

**Testnet Deployment**: TBD  
**Mainnet Deployment**: TBD

## How to Use the Project

1. **Access the Platform**:
   - Open the application in your browser (e.g., `http://localhost:5173` during development).
   - The landing page allows you to choose between "Individual" or "Organization" roles.

2. **As an Individual**:
   - Select "For Individuals" to submit anonymous feedback.
   - Choose a category (e.g., Harassment, Facilities, Academics, Other).
   - Write your feedback and submit. Your submission is anonymous and stored securely.
   - After submission, you'll see a confirmation message.

3. **As an Organization**:
   - Select "For Organizations" and log in using your credentials (simulated in the current version).
   - View the dashboard to see all submitted feedback, categorized and listed in reverse chronological order.
   - Use this data to address concerns and improve the environment.

4. **About ShaktiChain**:
   - Click the "About ShaktiChain" link in the footer to learn more about the platform's mission and features.

5. **Testing and Development**:
   - Modify the smart contracts in `contracts/` and test them using Clarinet.
   - Update the frontend in `index.tsx` and styles in `index.css` as needed.
   - Run tests to ensure functionality and contract safety.