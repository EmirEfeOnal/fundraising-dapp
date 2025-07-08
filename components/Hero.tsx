"use client"

import { useState, useEffect } from "react"
import { Leaf, Waves, TreePine, Fish } from "lucide-react"

export default function Hero() {
  const [treeCount, setTreeCount] = useState(0)
  const [animatedCount, setAnimatedCount] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // Hydration-safe client detection
  useEffect(() => {
    setIsClient(true)
    setTreeCount(847)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      if (animatedCount < treeCount) {
        setAnimatedCount((prev) => prev + 1)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [treeCount, animatedCount, isClient])

  // Static positions for leaves to avoid hydration mismatch
  const leafPositions = [
    { left: 10, top: 20, delay: 0, duration: 4 },
    { left: 25, top: 15, delay: 1, duration: 5 },
    { left: 40, top: 30, delay: 2, duration: 3 },
    { left: 60, top: 10, delay: 3, duration: 6 },
    { left: 75, top: 25, delay: 4, duration: 4 },
    { left: 90, top: 35, delay: 0.5, duration: 5 },
    { left: 15, top: 50, delay: 1.5, duration: 4 },
    { left: 35, top: 60, delay: 2.5, duration: 3 },
    { left: 55, top: 45, delay: 3.5, duration: 5 },
    { left: 80, top: 55, delay: 4.5, duration: 4 },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-800 via-green-700 to-blue-800">
        {/* Only render animations on client */}
        {isClient && (
          <div className="absolute inset-0 opacity-20">
            {leafPositions.map((pos, i) => (
              <Leaf
                key={i}
                className="absolute text-green-300 opacity-40 animate-bounce"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  animationDelay: `${pos.delay}s`,
                  animationDuration: `${pos.duration}s`,
                }}
                size={16}
              />
            ))}
          </div>
        )}

        {/* Wave Animation */}
        <div className="absolute bottom-0 w-full h-32 opacity-30">
          <svg viewBox="0 0 1200 120" className="w-full h-full">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="currentColor" className="text-blue-600" />
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-green-900/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-green-400/30">
              <TreePine className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">Reforestation Initiative</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Green Earth
              <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Initiative
              </span>
            </h1>

            <p className="text-xl text-green-100 mb-8 max-w-2xl">
              Join our mission to restore Earth's natural balance through strategic tree planting and ocean cleanup
              initiatives. Every donation plants trees and removes ocean plastic.
            </p>

            {/* Stats Counter */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2">
                    {isClient ? animatedCount.toLocaleString() : "847"}
                  </div>
                  <div className="text-green-200 text-sm">Trees Planted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">2.3T</div>
                  <div className="text-blue-200 text-sm">Plastic Removed</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#donate" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg">
                Start Donating
              </a>
              <a 
                href="#dashboard"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition-all backdrop-blur-sm">
                View Impact
              </a>
            </div>
          </div>

          {/* Right Side - Ocean Stats */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-800/80 to-blue-900/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <Waves className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Ocean Cleanup Progress</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-200">Plastic Removed</span>
                    <span className="text-white font-semibold">2.3 Tons</span>
                  </div>
                  <div className="w-full bg-blue-900/30 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-400 to-green-400 h-3 rounded-full w-3/4"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-blue-200">Marine Life Protected</span>
                    <span className="text-white font-semibold">1,247 Species</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[Fish, Fish, Fish].map((Icon, i) => (
                      <div key={i} className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <Icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <div className="text-xs text-blue-200">Protected</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
