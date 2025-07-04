import Hero from "../front-end/src/components/Hero"
import EnvironmentalDashboard from "../front-end/src/components/EnvironmentalDashboard"
import ImpactCalculator from "../front-end/src/components/ImpactCalculator"
import CampaignDetails from "../front-end/src/components/CampaignDetails"
import "../front-end/src/styles/globals.css"
import DonationForm from "../front-end/src/components/DonationForm"

export default function Page() {
  return (
    <main>
      <Hero />
      <EnvironmentalDashboard />
      <ImpactCalculator />
      <CampaignDetails />
      <DonationForm />
    </main>
  )
}
