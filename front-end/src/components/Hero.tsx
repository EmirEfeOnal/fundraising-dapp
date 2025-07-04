"use client"

import { useState, useEffect } from "react"
import { Leaf, Waves, TreePine, Fish } from "lucide-react"

export default function Hero() {
  const [treeCount, setTreeCount] = useState(0)
  const [animatedCount, setAnimatedCount] = useState(0)

  useEffect(() => {
    // Animate tree counter
    const interval = setInterval(() => {
      if (animatedCount < treeCount) {
        setAnimatedCount((prev) => prev + 1)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [treeCount, animatedCount])

  useEffect(() => {
    setTreeCount(847) // Current trees planted
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-primary via-forest-secondary to-ocean-primary">
        <div className="floating-leaves">
          {[...Array(20)].map((_, i) => (
            <Leaf
              key={i}
              className="absolute text-green-300 opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
        <div className="wave-animation absolute bottom-0 w-full h-32 opacity-20">
          <svg viewBox="0 0 1200 120" className="w-full h-full">
            <path
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              fill="currentColor"
              className="text-ocean-primary animate-wave"
            />
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Forest Theme */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-forest-light/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <TreePine className="w-5 h-5 text-forest-accent" />
              <span className="text-forest-accent font-medium">Reforestation Initiative</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Green Earth
              <span className="block bg-gradient-to-r from-forest-accent to-ocean-accent bg-clip-text text-transparent">
                Initiative
              </span>
            </h1>

            <p className="text-xl text-forest-light mb-8 max-w-2xl">
              Join our mission to restore Earth's natural balance through strategic tree planting and ocean cleanup
              initiatives. Every donation plants trees and removes ocean plastic.
            </p>

            {/* Tree Counter */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-forest-accent mb-2">{animatedCount.toLocaleString()}</div>
                  <div className="text-forest-light text-sm">Trees Planted</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-ocean-accent mb-2">2.3T</div>
                  <div className="text-ocean-light text-sm">Plastic Removed</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-forest-accent hover:bg-forest-accent/90 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg">
                Start Donating
              </button>
              <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition-all backdrop-blur-sm">
                View Impact
              </button>
            </div>
          </div>

          {/* Right Side - Ocean Theme */}
          <div className="relative">
            <div className="bg-gradient-to-br from-ocean-primary to-ocean-secondary rounded-3xl p-8 shadow-2xl border border-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <Waves className="w-6 h-6 text-ocean-accent" />
                <h3 className="text-xl font-semibold text-white">Ocean Cleanup Progress</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-ocean-light">Plastic Removed</span>
                  <span className="text-white font-semibold">2.3 Tons</span>
                </div>
                <div className="w-full bg-ocean-dark/30 rounded-full h-3">
                  <div className="bg-gradient-to-r from-ocean-accent to-forest-accent h-3 rounded-full w-3/4 animate-pulse"></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-ocean-light">Marine Life Protected</span>
                  <span className="text-white font-semibold">1,247 Species</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[Fish, Fish, Fish].map((Icon, i) => (
                    <div key={i} className="text-center p-3 bg-white/10 rounded-lg">
                      <Icon className="w-8 h-8 text-ocean-accent mx-auto mb-2" />
                      <div className="text-xs text-ocean-light">Protected</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
