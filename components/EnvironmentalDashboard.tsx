"use client"

import { useState } from "react"
import { TreePine, Waves, MapPin, TrendingUp, Leaf, Fish } from "lucide-react"

interface EnvironmentalStats {
  treesPlanted: number
  co2Absorbed: number
  plasticRemoved: number
  marineLifeProtected: number
  cleanupSites: number
  plantingSites: number
}

export default function EnvironmentalDashboard() {
  const [stats] = useState<EnvironmentalStats>({
    treesPlanted: 847,
    co2Absorbed: 12.5,
    plasticRemoved: 2.3,
    marineLifeProtected: 1247,
    cleanupSites: 15,
    plantingSites: 8,
  })

  const [selectedTab, setSelectedTab] = useState<"forest" | "ocean">("forest")

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Environmental Impact Dashboard</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track our real-time progress in restoring Earth's natural ecosystems
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-lg border inline-flex">
            <button
              onClick={() => setSelectedTab("forest")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedTab === "forest" ? "bg-green-600 text-white shadow-md" : "text-gray-600 hover:text-green-600"
              }`}
            >
              <TreePine className="w-5 h-5" />
              Forest Initiative
            </button>
            <button
              onClick={() => setSelectedTab("ocean")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedTab === "ocean" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Waves className="w-5 h-5" />
              Ocean Cleanup
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {selectedTab === "forest" ? (
            <>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TreePine className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Trees Planted</h3>
                    <p className="text-sm text-gray-600">This campaign</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.treesPlanted.toLocaleString()}</div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+127 this week</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">CO₂ Absorbed</h3>
                    <p className="text-sm text-gray-600">Tons annually</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.co2Absorbed}T</div>
                <div className="text-sm text-gray-600">Equivalent to 2,650 car miles</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Planting Sites</h3>
                    <p className="text-sm text-gray-600">Active locations</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.plantingSites}</div>
                <div className="text-sm text-gray-600">Across 5 countries</div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Waves className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Plastic Removed</h3>
                    <p className="text-sm text-gray-600">Tons collected</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.plasticRemoved}T</div>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+0.3T this month</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Fish className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Marine Life</h3>
                    <p className="text-sm text-gray-600">Species protected</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stats.marineLifeProtected.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">In protected zones</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Cleanup Sites</h3>
                    <p className="text-sm text-gray-600">Active locations</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.cleanupSites}</div>
                <div className="text-sm text-gray-600">Coastal & deep sea</div>
              </div>
            </>
          )}
        </div>

        {/* Progress Visualization */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Campaign Progress</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">25% - Plant 1,000 trees</span>
                <span className="text-green-600 font-bold">84.7% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-600 to-green-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: "84.7%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">50% - Remove 5 tons plastic</span>
                <span className="text-blue-600 font-bold">46% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: "46%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">75% - Establish 3 marine zones</span>
                <span className="text-gray-500 font-bold">Upcoming</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gray-300 h-3 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
