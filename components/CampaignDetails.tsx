"use client"

import { useState, useCallback } from "react"
import { Calendar, Target, Users, MapPin, TreePine, Waves, Camera, BarChart3, Play } from "lucide-react"
import MediaModal from "./MediaModal"

interface MediaItem {
  id: string
  type: "image" | "video"
  src: string
  title: string
  description: string
  category: "forest" | "ocean"
  location?: string
  date?: string
}

export default function CampaignDetails() {
  const [activeTab, setActiveTab] = useState<"overview" | "milestones" | "gallery" | "impact">("overview")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  const milestones = [
    {
      percentage: 25,
      title: "Plant 1,000 trees in deforested areas",
      description: "Focus on native species restoration in Brazil and Indonesia",
      status: "in-progress" as const,
      progress: 84.7,
      icon: TreePine,
      color: "forest" as const,
    },
    {
      percentage: 50,
      title: "Remove 5 tons of ocean plastic",
      description: "Target Pacific and Atlantic garbage patches",
      status: "in-progress" as const,
      progress: 46,
      icon: Waves,
      color: "ocean" as const,
    },
    {
      percentage: 75,
      title: "Establish 3 marine protected zones",
      description: "Create safe havens for endangered marine species",
      status: "upcoming" as const,
      progress: 0,
      icon: MapPin,
      color: "ocean" as const,
    },
    {
      percentage: 100,
      title: "Launch community education programs",
      description: "Environmental awareness in 10 local communities",
      status: "upcoming" as const,
      progress: 0,
      icon: Users,
      color: "forest" as const,
    },
  ]

  const mediaItems: MediaItem[] = [
    {
      id: "media-1",
      type: "image",
      src: "/amazon.jpg?height=600&width=800",
      title: "Tree Planting in Amazon Rainforest",
      description:
        "Local communities working together to plant native species in deforested areas of Brazil. This initiative focuses on restoring biodiversity and creating sustainable livelihoods.",
      category: "forest",
      location: "Amazon Basin, Brazil",
      date: "March 15, 2024",
    },
    {
      id: "media-2",
      type: "video",
      src: "/ocean-cleanup.mp4",
      title: "Ocean Cleanup Operation",
      description:
        "Our cleanup crew removing plastic waste from the Pacific Ocean using advanced collection systems while protecting marine life.",
      category: "ocean",
      location: "Pacific Ocean",
      date: "February 28, 2024",
    },
    {
      id: "media-3",
      type: "image",
      src: "/reforestedarea.jpg?height=600&width=800",
      title: "Reforested Area Progress",
      description:
        "Before and after comparison showing the remarkable recovery of a previously deforested area after 18 months of restoration work.",
      category: "forest",
      location: "Borneo, Indonesia",
      date: "January 10, 2024",
    },
    {
      id: "media-4",
      type: "image",
      src: "/marinelifeprotection.jpg?height=600&width=800",
      title: "Marine Life Protection Zone",
      description:
        "Establishing protected areas where marine species can thrive without the threat of plastic pollution and human interference.",
      category: "ocean",
      location: "Coral Triangle",
      date: "March 5, 2024",
    },
    {
      id: "media-5",
      type: "video",
      src: "/volunteer-training.mp4",
      title: "Community Volunteer Training",
      description:
        "Training local volunteers in sustainable forestry practices and environmental conservation techniques.",
      category: "forest",
      location: "Costa Rica",
      date: "February 20, 2024",
    },
    {
      id: "media-6",
      type: "image",
      src: "/plasticcollection.jpg?height=600&width=800",
      title: "Plastic Collection and Recycling",
      description:
        "Innovative plastic collection systems and recycling processes that turn ocean waste into useful products.",
      category: "ocean",
      location: "Mediterranean Sea",
      date: "March 12, 2024",
    },
    {
      id: "media-7",
      type: "image",
      src: "/nativespecies.jpg?height=600&width=800",
      title: "Native Species Nursery",
      description: "Our tree nursery where we grow native species before planting them in restoration sites.",
      category: "forest",
      location: "Ecuador",
      date: "January 25, 2024",
    },
    {
      id: "media-8",
      type: "video",
      src: "/underwater-cleanup.mp4",
      title: "Underwater Cleanup Mission",
      description: "Divers removing plastic debris from coral reefs and underwater ecosystems.",
      category: "ocean",
      location: "Great Barrier Reef",
      date: "February 15, 2024",
    },
  ]

  // Open modal with specific media
  const handleMediaClick = useCallback((index: number) => {
    console.log("Opening modal with index:", index)
    setCurrentMediaIndex(index)
    setIsModalOpen(true)
  }, [])

  // Close modal
  const handleCloseModal = useCallback(() => {
    console.log("Modal close requested")
    setIsModalOpen(false)
  }, [])

  // Navigate to different media
  const handleModalNavigate = useCallback(
    (index: number) => {
      if (index >= 0 && index < mediaItems.length) {
        setCurrentMediaIndex(index)
      }
    },
    [mediaItems.length],
  )

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Green Earth Initiative Details</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dual-approach environmental project tackles two critical issues: deforestation and ocean pollution.
            </p>
          </div>

          {/* Campaign Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white text-center">
              <Target className="w-8 h-8 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">50,000</div>
              <div className="text-green-100 text-sm">STX Target</div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white text-center">
              <Calendar className="w-8 h-8 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">90</div>
              <div className="text-blue-100 text-sm">Days Left</div>
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
            <div className="bg-gray-100 rounded-2xl p-2 inline-flex">
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
                    activeTab === id ? "bg-white text-green-600 shadow-md" : "text-gray-600 hover:text-green-600"
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
                      <h4 className="text-lg font-semibold text-green-600 mb-3 flex items-center gap-2">
                        <TreePine className="w-5 h-5" />
                        Reforestation Initiative
                      </h4>
                      <p className="text-gray-600 mb-4">
                        We focus on planting native tree species in critically deforested areas, working with local
                        communities to ensure long-term sustainability.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Native species selection based on local ecosystem needs</li>
                        <li>• Community training and employment programs</li>
                        <li>• Long-term monitoring and maintenance</li>
                        <li>• Biodiversity restoration focus</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-blue-600 mb-3 flex items-center gap-2">
                        <Waves className="w-5 h-5" />
                        Ocean Cleanup Project
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Our ocean cleanup efforts target both surface plastic and underwater debris, using innovative
                        collection methods.
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
                              isForest ? "bg-green-100" : "bg-blue-100"
                            }`}
                          >
                            <Icon className={`w-6 h-6 ${isForest ? "text-green-600" : "text-blue-600"}`} />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  isForest ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
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
                                    className={`text-sm font-bold ${isForest ? "text-green-600" : "text-blue-600"}`}
                                  >
                                    {milestone.progress}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                  <div
                                    className={`h-3 rounded-full transition-all duration-1000 ${
                                      isForest
                                        ? "bg-gradient-to-r from-green-600 to-green-500"
                                        : "bg-gradient-to-r from-blue-600 to-blue-500"
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
                  {mediaItems.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => handleMediaClick(index)}
                      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                    >
                      <div className="aspect-video relative">
                        <img
                          src={item.src || "/placeholder.svg?height=300&width=400"}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />

                        {/* Video Play Button */}
                        {item.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center group-hover:bg-black/80 transition-colors backdrop-blur-sm">
                              <Play className="w-8 h-8 text-white ml-1" />
                            </div>
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className="text-white font-semibold text-lg mb-2 line-clamp-2">{item.title}</h4>
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                  item.category === "forest" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                                }`}
                              >
                                {item.category === "forest" ? "Forest" : "Ocean"}
                              </span>
                              <span className="text-white/80 text-xs">
                                {item.type === "image" ? "📷 Photo" : "🎬 Video"}
                              </span>
                            </div>
                            {item.location && <p className="text-white/80 text-sm">📍 {item.location}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gallery Info */}
                <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Gallery Features</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-green-600" />
                      <span>High-resolution photos and videos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>Location and date information</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 text-purple-600" />
                      <span>Auto-play videos with controls</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "impact" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Environmental Impact</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-green-600">Deforestation Statistics</h4>
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
                    <h4 className="text-lg font-semibold text-blue-600">Ocean Pollution Data</h4>
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

      {/* Media Modal */}
      <MediaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mediaItems={mediaItems}
        currentIndex={currentMediaIndex}
        onNavigate={handleModalNavigate}
      />
    </div>
  )
}
