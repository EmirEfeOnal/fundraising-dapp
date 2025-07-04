# 🌍 Green Earth Initiative - Environmental Fundraising DApp

<div align="center">

![Green Earth Initiative Banner](https://via.placeholder.com/800x200/2d5016/ffffff?text=Green+Earth+Initiative)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/yourusername/green-earth-initiative)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stacks](https://img.shields.io/badge/Stacks-Blockchain-purple.svg)](https://stacks.co)
[![Next.js](https://img.shields.io/badge/Next.js-13+-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://typescriptlang.org)

**A decentralized fundraising platform for environmental restoration projects built on the Stacks blockchain**

[🚀 Live Demo](https://green-earth-initiative.vercel.app) • [📖 Documentation](https://docs.green-earth-initiative.com) • [🐛 Report Bug](https://github.com/yourusername/green-earth-initiative/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact & Support](#contact--support)
- [Acknowledgments](#acknowledgments)

---

## 🌱 About the Project

The **Green Earth Initiative** is a revolutionary decentralized fundraising platform that combines blockchain transparency with environmental impact. Built on the Stacks blockchain, our platform enables global communities to fund and track real-world environmental restoration projects including reforestation and ocean cleanup initiatives.

### 🎯 Mission Statement

To create a transparent, efficient, and impactful way for people worldwide to contribute to environmental restoration while leveraging blockchain technology for accountability and real-time impact tracking.

### 🌟 Why Green Earth Initiative?

- **🔍 Transparency**: Every donation is tracked on-chain with real-time impact metrics
- **🌍 Global Impact**: Support environmental projects across multiple continents
- **📊 Data-Driven**: Real-time tracking of trees planted, plastic removed, and CO₂ absorbed
- **💰 Efficient**: Low transaction fees using Stacks blockchain
- **🤝 Community-Driven**: Decentralized governance for project selection and fund allocation

---

## ✨ Key Features

### 🌳 **Dual Environmental Focus**
- **Reforestation Initiative**: Plant native trees in deforested areas
- **Ocean Cleanup Project**: Remove plastic waste from oceans and waterways

### 💎 **Blockchain Integration**
- **STX Token Donations**: Secure, transparent donations using Stacks tokens
- **Smart Contract Automation**: Automated fund distribution and milestone tracking
- **On-Chain Governance**: Community voting on project priorities

### 📈 **Impact Tracking**
- **Real-Time Metrics**: Live updates on environmental impact
- **Impact Calculator**: See exactly what your donation will accomplish
- **Progress Visualization**: Interactive dashboards showing campaign progress
- **Media Gallery**: Photos and videos from active restoration sites

### 🎨 **User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Interactive Media Modal**: High-quality photos and videos with autoplay
- **Environmental Dashboard**: Switch between forest and ocean initiatives
- **Donation Form**: Easy-to-use donation interface with impact preview

---

## 🛠 Technology Stack

### **Blockchain & Smart Contracts**
- **Stacks Blockchain** - Layer-1 blockchain for Bitcoin
- **Clarity Smart Contracts** - Secure, predictable smart contracts

### **Frontend**
- **Next.js 13+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 18+** - UI library with hooks

### **Stacks Integration**
- **@stacks/connect** - Wallet connection
- **@stacks/transactions** - Transaction building
- **@stacks/network** - Network configuration

### **UI Components**
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **Stacks Wallet** (Hiro Wallet or Xverse)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/green-earth-initiative.git
   cd green-earth-initiative
2. **Install dependencies**
    npm install
    # or
    yarn install
3. **Set up environment variables**
    cp .env.example .env.local
  Edit `.env.local` with your configuration:
    NEXT_PUBLIC_STACKS_NETWORK=testnet
    NEXT_PUBLIC_CONTRACT_ADDRESS=your-contract-address
    NEXT_PUBLIC_CONTRACT_NAME=green-earth-fundraising
4. **Start the development server**
    npm run dev
    # or
    yarn dev
5. **Open your browser**
    Navigate to [http://localhost:3000](http://localhost:3000)

## **Quick Setup with Docker**
    # Clone and run with Docker
    git clone https://github.com/EmirEfeOnal/fundraising-dapp.git
    cd green-earth-initiative
    docker-compose up -d
## Usage

### For Donors

1. **Connect Your Wallet**

1. Click "Connect Wallet" and select your Stacks wallet
2. Ensure you have STX tokens for donations



2. **Explore Impact**

1. Use the Impact Calculator to see what your donation will accomplish
2. Browse the Environmental Dashboard to track progress



3. **Make a Donation**

1. Choose a preset amount or enter a custom donation
2. Review your environmental impact preview
3. Confirm the transaction in your wallet



4. **Track Your Impact**

1. View real-time updates on trees planted and plastic removed
2. Browse the media gallery for project updates





### For Project Managers

1. **Submit Project Proposals**

1. Create detailed project proposals with location and goals
2. Include media documentation and impact metrics



2. **Update Progress**

1. Upload photos and videos from restoration sites
2. Update milestone completion status



3. **Manage Funds**

1. Track fund allocation and spending
2. Generate impact reports for transparency





### Example Donation Flow
    // Example donation transaction
    const donationAmount = 100; // STX
    const impactPreview = {
      trees: 50,
      plastic: 2.0, // kg
      co2: 2400, // lbs absorbed annually
      marineLife: 10 // animals protected
    };

    // Transaction is handled by smart contract
    await submitDonation(donationAmount);
## Smart Contracts

### Core Contracts

#### **`fundraising-core.clar`**

Main fundraising contract handling donations and fund distribution.

**Key Functions:**

- `donate(amount uint)` - Process STX donations
- `get-campaign-stats()` - Retrieve campaign statistics
- `distribute-funds(project-id uint)` - Distribute funds to projects


#### **`project-management.clar`**

Manages environmental projects and milestones.

**Key Functions:**

- `create-project(details)` - Create new environmental project
- `update-milestone(project-id uint, milestone-id uint)` - Update project progress
- `get-project-details(project-id uint)` - Get project information


#### **`governance.clar`**

Handles community governance and voting.

**Key Functions:**

- `propose-project(details)` - Submit project proposal
- `vote-on-proposal(proposal-id uint, vote bool)` - Vote on proposals
- `execute-proposal(proposal-id uint)` - Execute approved proposals

### Contract Deployment
    # Deploy to testnet
    clarinet deploy --testnet

    # Deploy to mainnet
    clarinet deploy --mainnet

### Contract Interaction Examples
    // Donate STX tokens
    const donateCall = await openContractCall({
      network,
      contractAddress: 'ST1234...', 
      contractName: 'fundraising-core',
      functionName: 'donate',
      functionArgs: [uintCV(100)], // 100 STX
    });

    // Get campaign statistics
    const statsCall = await callReadOnlyFunction({
      network,
      contractAddress: 'ST1234...',
      contractName: 'fundraising-core',
      functionName: 'get-campaign-stats',
      functionArgs: [],
    });

## Deployment

### Frontend Deployment (Vercel)

1. **Connect to Vercel**
    npm install -g vercel
    vercel login
    vercel
2. **Set Environment Variables**

    - Add production environment variables in Vercel dashboard
    - Configure Stacks mainnet settings

**Deploy**
    vercel --prod

### Smart Contract Deployment

1. **Testnet Deployment**
    # Using Clarinet
    clarinet deploy --testnet

    # Using Stacks CLI
    stx deploy_contract fundraising-core fundraising-core.clar --testnet

2. **Mainnet Deployment**
    # Ensure thorough testing before mainnet deployment
    clarinet deploy --mainnet

### Environment Configuration
    # Production Environment Variables
    NEXT_PUBLIC_STACKS_NETWORK=mainnet
    NEXT_PUBLIC_CONTRACT_ADDRESS=SP1234567890ABCDEF
    NEXT_PUBLIC_CONTRACT_NAME=green-earth-fundraising
    NEXT_PUBLIC_API_URL=https://api.green-earth-initiative.com

## Testing

### Frontend Testing
    # Run unit tests
    npm run test

    # Run integration tests
    npm run test:integration

    # Run e2e tests
    npm run test:e2e

    # Test coverage
    npm run test:coverage


### Smart Contract Testing
    # Run Clarinet tests
    clarinet test

    # Run specific test file
    clarinet test tests/fundraising-core_test.ts

    # Check contract syntax
    clarinet check

### Manual Testing Checklist

- Wallet connection works
- Donation flow completes successfully
- Impact calculator shows correct values
- Media modal displays properly
- Responsive design works on mobile
- Smart contract functions execute correctly



## Contributing

We welcome contributions from the community! Here's how you can help:

### Development Process

1. **Fork the repository**
2. **Create a feature branch**
    git checkout -b feature/amazing-feature
3. **Make your changes**
4. **Add tests** for new functionality
5. **Commit your changes**
    git commit -m 'Add amazing feature'
6. **Push to your branch**
    git push origin feature/amazing-feature
7. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, concise commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting


### Areas for Contribution

- 🐛 **Bug Fixes** - Help us squash bugs
- ✨ **New Features** - Add exciting functionality
- 📚 **Documentation** - Improve our docs
- 🎨 **UI/UX** - Enhance user experience
- 🔧 **Smart Contracts** - Optimize contract logic

## Acknowledgments

### Built With Love Using

- **[Stacks Foundation](https://stacks.org)** - For the amazing blockchain infrastructure
- **[Hiro](https://hiro.so)** - For excellent developer tools and wallet
- **[Vercel](https://vercel.com)** - For seamless deployment platform
- **[Next.js Team](https://nextjs.org)** - For the incredible React framework
### Special Thanks

- 🌱 **Environmental Partners** - Local organizations implementing restoration projects
- 👥 **Community Contributors** - Developers, designers, and environmental advocates
- 🔬 **Research Partners** - Universities providing impact measurement data
- 💚 **Early Supporters** - Beta testers and initial donors

### Inspiration

This project was inspired by the urgent need for transparent, efficient environmental funding mechanisms and the potential of blockchain technology to create positive real-world impact.

**🌍 Together, we can restore our planet, one transaction at a time. 🌱**