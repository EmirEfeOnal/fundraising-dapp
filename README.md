# Green Earth Initiative - Environmental Fundraising DApp

A decentralized fundraising platform for environmental restoration projects built on the Stacks blockchain with Hiro wallet integration.

## 🌱 Features

- **Dual Environmental Focus**: Tree planting and ocean cleanup initiatives
- **Real-time Impact Tracking**: See exactly how your donation helps the environment
- **Stacks Blockchain Integration**: Secure, transparent donations using STX
- **Hiro Wallet Support**: Native Stacks wallet integration
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Hiro Wallet browser extension

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/green-earth-initiative.git
cd green-earth-initiative
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update \`.env.local\` with your configuration:
\`\`\`env
NEXT_PUBLIC_STACKS_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=your-contract-address
NEXT_PUBLIC_CONTRACT_NAME=your-contract-name
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| \`NEXT_PUBLIC_STACKS_NETWORK\` | Stacks network (testnet/mainnet) | testnet |
| \`NEXT_PUBLIC_STACKS_API_URL\` | Stacks API endpoint | testnet API |
| \`NEXT_PUBLIC_CONTRACT_ADDRESS\` | Smart contract address | - |
| \`NEXT_PUBLIC_CONTRACT_NAME\` | Smart contract name | - |
| \`NEXT_PUBLIC_APP_NAME\` | App name for wallet | Green Earth Initiative |

## 🌍 How It Works

### Environmental Impact

Your STX donations are automatically split:
- **60% Reforestation**: Native tree planting and maintenance
- **40% Ocean Cleanup**: Plastic removal and marine protection

### Impact Calculation

- **0.5 trees** planted per STX
- **0.02 kg plastic** removed per STX  
- **48 lbs CO₂** absorbed per tree annually
- **5 marine animals** protected per kg plastic removed

## 🔗 Wallet Integration

### Hiro Wallet Setup

1. Install [Hiro Wallet](https://wallet.hiro.so/) browser extension
2. Create or import your Stacks wallet
3. Switch to testnet for development
4. Get testnet STX from the [faucet](https://explorer.stacks.co/sandbox/faucet)

### Making Donations

1. Connect your Hiro wallet
2. Choose donation amount
3. Review environmental impact
4. Confirm transaction in wallet
5. Track your contribution

## 🏗️ Architecture

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Blockchain
- **Stacks Blockchain** - Layer-1 blockchain
- **Clarity Smart Contracts** - Secure contract language
- **Hiro Wallet** - Native Stacks wallet

### Components
- \`WalletProvider\` - Global wallet state
- \`DonationForm\` - Donation interface
- \`ImpactCalculator\` - Environmental impact calculator
- \`MediaModal\` - Progress gallery

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop browsers
- Mobile devices
- Tablet screens

## 🔒 Security

- Private keys never leave your device
- All transactions signed locally
- Smart contract verification
- Transparent fund tracking

## 🌟 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

- [Documentation](https://docs.stacks.co/)
- [Hiro Wallet](https://wallet.hiro.so/)
- [Stacks Explorer](https://explorer.stacks.co/)

## 🎯 Roadmap

- [ ] Smart contract deployment
- [ ] Real transaction integration
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Additional payment methods

---

Built with ❤️ for the environment using Stacks blockchain technology.
\`\`\`
