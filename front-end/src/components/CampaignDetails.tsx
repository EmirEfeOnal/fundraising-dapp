"use client"

import { useState } from "react"
import { Calendar, Target, Users, MapPin, TreePine, Waves, Camera, BarChart3 } from "lucide-react"

export default function CampaignDetails() {
  const [activeTab, setActiveTab] = useState<"overview" | "milestones" | "gallery" | "impact">("overview")

  const milestones = [
    {
      percentage: 25,
      title: "Plant 1,000 trees in deforested areas",
      description: "Focus on native species restoration in Brazil and Indonesia",
      status: "in-progress",
      progress: 84.7,
      icon: TreePine,
      color: "forest",
    },
    {
      percentage: 50,
      title: "Remove 5 tons of ocean plastic",
      description: "Target Pacific and Atlantic garbage patches",
      status: "in-progress",
      progress: 46,
      icon: Waves,
      color: "ocean",
    },
    {
      percentage: 75,
      title: "Establish 3 marine protected zones",
      description: "Create safe havens for endangered marine species",
      status: "upcoming",
      progress: 0,
      icon: MapPin,
      color: "ocean",
    },
    {
      percentage: 100,
      title: "Launch community education programs",
      description: "Environmental awareness in 10 local communities",
      status: "upcoming",
      progress: 0,
      icon: Users,
      color: "forest",
    },
  ]

  const galleryImages = [
    { src: "/api/placeholder/400/300", alt: "Tree planting in Brazil", category: "forest" },
    { src: "/api/placeholder/400/300", alt: "Ocean cleanup crew", category: "ocean" },
    { src: "/api/placeholder/400/300", alt: "Reforested area progress", category: "forest" },
    { src: "/api/placeholder/400/300", alt: "Marine life protection", category: "ocean" },
    { src: "/api/placeholder/400/300", alt: "Community volunteers", category: "forest" },
    { src: "/api/placeholder/400/300", alt: "Plastic collection", category: "ocean" },
  ]

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Green Earth Initiative Details</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dual-approach environmental project tackles two critical issues: deforestation and ocean pollution. We
              work with local communities to plant native trees and organize ocean cleanup expeditions.
            </p>
          </div>

          {/* Campaign Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-forest-primary to-forest-secondary rounded-2xl p-6 text-white text-center">
              <Target className="w-8 h-8 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">50,000</div>
              <div className="text-forest-light text-sm">STX Target</div>
            </div>

            <div className="bg-gradient-to-br from-ocean-primary to-ocean-secondary rounded-2xl p-6 text-white text-center">
              <Calendar className="w-8 h-8 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">90</div>
              <div className="text-ocean-light text-sm">Days Left</div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white text-center">
              <Users className="w-8 h-8 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">1,247</div>
              <div className="text-green-100 text-sm">Supporters</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center">
              <MapPin className="w-8 h-8 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">23</div>
              <div className="text-blue-100 text-sm">Active Sites</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8">
            <div className="bg-gray-100 rounded-2xl p-2">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "milestones", label: "Milestones", icon: Target },
                { id: "gallery", label: "Gallery", icon: Camera },
                { id: "impact", label: "Impact", icon: TreePine },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === id
                      ? "bg-white text-forest-primary shadow-md"
                      : "text-gray-600 hover:text-forest-primary"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-3xl shadow-lg border p-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-forest-primary mb-3 flex items-center gap-2">
                        <TreePine className="w-5 h-5" />
                        Reforestation Initiative
                      </h4>
                      <p className="text-gray-600 mb-4">
                        We focus on planting native tree species in critically deforested areas, working with local
                        communities to ensure long-term sustainability and care.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Native species selection based on local ecosystem needs</li>
                        <li>• Community training and employment programs</li>
                        <li>• Long-term monitoring and maintenance</li>
                        <li>• Biodiversity restoration focus</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-ocean-primary mb-3 flex items-center gap-2">
                        <Waves className="w-5 h-5" />
                        Ocean Cleanup Project
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Our ocean cleanup efforts target both surface plastic and underwater debris, using innovative
                        collection methods and prevention strategies.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Advanced plastic collection systems</li>
                        <li>• Marine life protection protocols</li>
                        <li>• Coastal community engagement</li>
                        <li>• Plastic recycling and upcycling programs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "milestones" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Campaign Milestones</h3>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => {
                    const Icon = milestone.icon
                    const isForest = milestone.color === "forest"

                    return (
                      <div key={index} className="border rounded-2xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              isForest ? "bg-forest-primary/10" : "bg-ocean-primary/10"
                            }`}
                          >
                            <Icon className={`w-6 h-6 ${isForest ? "text-forest-primary" : "text-ocean-primary"}`} />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  isForest
                                    ? "bg-forest-primary/10 text-forest-primary"
                                    : "bg-ocean-primary/10 text-ocean-primary"
                                }`}
                              >
                                {milestone.percentage}% Goal
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  milestone.status === "in-progress"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {milestone.status === "in-progress" ? "In Progress" : "Upcoming"}
                              </span>
                            </div>

                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                            <p className="text-gray-600 mb-4">{milestone.description}</p>

                            {milestone.status === "in-progress" && (
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium text-gray-700">Progress</span>
                                  <span
                                    className={`text-sm font-bold ${
                                      isForest ? "text-forest-primary" : "text-ocean-primary"
                                    }`}
                                  >
                                    {milestone.progress}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                  <div
                                    className={`h-3 rounded-full ${
                                      isForest
                                        ? "bg-gradient-to-r from-forest-primary to-forest-accent"
                                        : "bg-gradient-to-r from-ocean-primary to-ocean-accent"
                                    }`}
                                    style={{ width: `${milestone.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Progress Gallery</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-semibold">{image.alt}</p>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                              image.category === "forest"
                                ? "bg-forest-primary text-white"
                                : "bg-ocean-primary text-white"
                            }`}
                          >
                            {image.category === "forest" ? "Forest" : "Ocean"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "impact" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Environmental Impact</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-forest-primary">Deforestation Statistics</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                        <span className="text-gray-700">Global forest loss (2023)</span>
                        <span className="font-bold text-red-600">11.1M hectares</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                        <span className="text-gray-700">CO₂ from deforestation</span>
                        <span className="font-bold text-orange-600">1.6B tons</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                        <span className="text-gray-700">Our trees planted</span>
                        <span className="font-bold text-green-600">847 trees</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-ocean-primary">Ocean Pollution Data</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                        <span className="text-gray-700">Ocean plastic (total)</span>
                        <span className="font-bold text-red-600">150M tons</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                        <span className="text-gray-700">Marine animals affected</span>
                        <span className="font-bold text-orange-600">1M+ annually</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">Our plastic removed</span>
                        <span className="font-bold text-blue-600">2.3 tons</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
