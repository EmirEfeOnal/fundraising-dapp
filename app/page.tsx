import Hero from "../components/Hero"
import EnvironmentalDashboard from "../components/EnvironmentalDashboard"
import ImpactCalculator from "../components/ImpactCalculator"
import CampaignDetails from "../components/CampaignDetails"
import DonationForm from "../components/DonationForm"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <EnvironmentalDashboard />
      <ImpactCalculator />
      <CampaignDetails />
      <DonationForm />
    </main>
  )
}
