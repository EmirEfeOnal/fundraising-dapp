import Header from "../components/Header"
import Hero from "../components/Hero"
import EnvironmentalDashboard from "../components/EnvironmentalDashboard"
import ImpactCalculator from "../components/ImpactCalculator"
import CampaignDetails from "../components/CampaignDetails"
import DonationFormWithWallet from "../components/DonationFormWithWallet"
import DashboardWithHiro from "../components/DashboardWithHiro"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24">
        {" "}
        {/* Increased padding for header + API status */}
        <section id="home">
          <Hero />
        </section>
        <section id="dashboard">
          <EnvironmentalDashboard />
        </section>
        <section id="wallet">
          <DashboardWithHiro />
        </section>
        <section id="calculator">
          <ImpactCalculator />
        </section>
        <section id="campaign">
          <CampaignDetails />
        </section>
        <section id="donate">
          <DonationFormWithWallet />
        </section>
      </div>
    </main>
  )
}
