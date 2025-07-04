"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react"

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

interface MediaModalProps {
  isOpen: boolean
  onClose: () => void
  mediaItems: MediaItem[]
  currentIndex: number
  onNavigate: (index: number) => void
}

export default function MediaModal({ isOpen, onClose, mediaItems, currentIndex, onNavigate }: MediaModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  const currentItem = mediaItems[currentIndex]

  // Auto-hide controls for videos - Bu fonksiyonu önce tanımla
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    setShowControls(true)
    if (currentItem?.type === "video" && isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }, [currentItem?.type, isPlaying])

  // Video event handlers - Bu fonksiyonları değiştir
  const handleVideoPlay = useCallback(() => {
    console.log("Video started playing")
    setIsPlaying(true)
    resetControlsTimeout()
  }, [resetControlsTimeout])

  const handleVideoPause = useCallback(() => {
    console.log("Video paused")
    setIsPlaying(false)
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
  }, [])

  // Close modal function
  const closeModal = useCallback(() => {
    console.log("Closing modal")
    setIsPlaying(false)
    onClose()
  }, [onClose])

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        closeModal()
      }
    },
    [closeModal],
  )

  // Handle X button click
  const handleXButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      console.log("X button clicked")
      closeModal()
    },
    [closeModal],
  )

  // Navigation functions
  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : mediaItems.length - 1
    onNavigate(newIndex)
    setIsLoading(true)
    setIsPlaying(false)
  }, [currentIndex, mediaItems.length, onNavigate])

  const handleNext = useCallback(() => {
    const newIndex = currentIndex < mediaItems.length - 1 ? currentIndex + 1 : 0
    onNavigate(newIndex)
    setIsLoading(true)
    setIsPlaying(false)
  }, [currentIndex, mediaItems.length, onNavigate])

  // Video control functions - Bu fonksiyonu değiştir
  const togglePlayPause = useCallback(() => {
    console.log("Toggle play/pause clicked, current isPlaying:", isPlaying)
    if (videoRef.current) {
      if (isPlaying) {
        console.log("Pausing video")
        videoRef.current.pause()
      } else {
        console.log("Playing video")
        videoRef.current.play().catch((error) => {
          console.log("Play failed:", error)
        })
      }
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false
      } else {
        videoRef.current.muted = true
      }
      setIsMuted(!isMuted)
    }
  }, [isMuted])

  const handleVideoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      togglePlayPause()
    },
    [togglePlayPause],
  )

  // Handle mouse movement over video
  const handleMouseMove = useCallback(() => {
    if (currentItem?.type === "video") {
      resetControlsTimeout()
    }
  }, [currentItem?.type, resetControlsTimeout])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      console.log("Key pressed:", e.key)

      switch (e.key) {
        case "Escape":
          e.preventDefault()
          closeModal()
          break
        case "ArrowLeft":
          e.preventDefault()
          handlePrevious()
          break
        case "ArrowRight":
          e.preventDefault()
          handleNext()
          break
        case " ":
        case "k":
          e.preventDefault()
          if (currentItem?.type === "video") {
            togglePlayPause()
          }
          break
        case "m":
          e.preventDefault()
          if (currentItem?.type === "video") {
            toggleMute()
          }
          break
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, closeModal, handlePrevious, handleNext, currentItem?.type, togglePlayPause, toggleMute])

  // Reset states when modal opens or index changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setIsPlaying(false)
      setShowControls(true)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isOpen, currentIndex])

  // Auto-play videos when they load
  useEffect(() => {
    if (currentItem?.type === "video" && videoRef.current && !isLoading) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          resetControlsTimeout()
        })
        .catch((error) => {
          console.log("Autoplay failed:", error)
          setIsPlaying(false)
        })
    }
  }, [currentItem?.type, isLoading, resetControlsTimeout])

  // Video state synchronization
  useEffect(() => {
    if (videoRef.current && currentItem?.type === "video") {
      const video = videoRef.current

      const handlePlay = () => {
        console.log("Video play event")
        setIsPlaying(true)
      }

      const handlePause = () => {
        console.log("Video pause event")
        setIsPlaying(false)
      }

      video.addEventListener("play", handlePlay)
      video.addEventListener("pause", handlePause)

      return () => {
        video.removeEventListener("play", handlePlay)
        video.removeEventListener("pause", handlePause)
      }
    }
  }, [currentItem?.type])

  const handleMediaLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Don't render if not open or no current item
  if (!isOpen || !currentItem) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={handleBackdropClick} />

      {/* Modal Content */}
      <div className="relative z-10 w-full h-full max-w-7xl max-h-screen p-4 flex flex-col">
        {/* Header */}
        <div
          className={`flex items-center justify-between mb-4 relative z-20 transition-opacity duration-300 ${
            currentItem.type === "video" && !showControls ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                currentItem.category === "forest" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
              }`}
            >
              {currentItem.category === "forest" ? "Forest Initiative" : "Ocean Cleanup"}
            </span>
            <span className="text-white/70 text-sm">
              {currentIndex + 1} of {mediaItems.length}
            </span>
          </div>

          {/* X Button */}
          <button
            onClick={handleXButtonClick}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 z-30"
            aria-label="Close modal"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Media Container */}
        <div className="flex-1 flex items-center justify-center relative" onMouseMove={handleMouseMove}>
          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {/* Navigation Buttons */}
          {mediaItems.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all z-20 ${
                  currentItem.type === "video" && !showControls ? "opacity-0" : "opacity-100"
                }`}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all z-20 ${
                  currentItem.type === "video" && !showControls ? "opacity-0" : "opacity-100"
                }`}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Media Content */}
          <div className="w-full h-full flex items-center justify-center">
            {currentItem.type === "image" ? (
              <img
                src={currentItem.src || "/placeholder.svg?height=600&width=800"}
                alt={currentItem.title}
                className={`max-w-full max-h-full object-contain rounded-lg transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={handleMediaLoad}
                onError={() => setIsLoading(false)}
              />
            ) : (
              <div className="relative w-full max-w-4xl aspect-video">
                <video
                  ref={videoRef}
                  src={currentItem.src}
                  className={`w-full h-full object-contain rounded-lg transition-opacity duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                  muted={isMuted}
                  loop
                  playsInline
                  onLoadedData={handleMediaLoad}
                  onError={() => setIsLoading(false)}
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  onClick={handleVideoClick}
                  onLoadedMetadata={() => {
                    console.log("Video metadata loaded")
                    if (videoRef.current) {
                      videoRef.current.muted = isMuted
                    }
                  }}
                />

                {/* Video Controls Overlay */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    showControls ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Center Play/Pause Button */}
                  <button
                    onClick={togglePlayPause}
                    className="p-4 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  </button>
                </div>

                {/* Video Controls Bar */}
                <div
                  className={`absolute bottom-4 left-4 right-4 flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 transition-opacity duration-300 ${
                    showControls ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button
                    onClick={togglePlayPause}
                    className="p-2 rounded-full hover:bg-white/20 text-white transition-all"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full hover:bg-white/20 text-white transition-all"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <div className="flex-1 text-white text-sm">
                    {isPlaying ? "Playing" : "Paused"} • Click to {isPlaying ? "pause" : "play"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Media Info */}
        <div
          className={`mt-4 bg-black/30 backdrop-blur-sm rounded-lg p-6 transition-opacity duration-300 ${
            currentItem.type === "video" && !showControls ? "opacity-0" : "opacity-100"
          }`}
        >
          <h3 className="text-2xl font-bold text-white mb-2">{currentItem.title}</h3>
          <p className="text-white/80 mb-4">{currentItem.description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            {currentItem.location && <span>📍 {currentItem.location}</span>}
            {currentItem.date && <span>📅 {currentItem.date}</span>}
            <span>🎬 {currentItem.type === "image" ? "Photo" : "Video"}</span>
            {currentItem.type === "video" && <span>⌨️ Space/K: Play/Pause • M: Mute/Unmute</span>}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {mediaItems.length > 1 && (
          <div
            className={`mt-4 flex gap-2 overflow-x-auto pb-2 transition-opacity duration-300 ${
              currentItem.type === "video" && !showControls ? "opacity-0" : "opacity-100"
            }`}
          >
            {mediaItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => onNavigate(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all relative ${
                  index === currentIndex ? "border-white scale-110" : "border-white/30 hover:border-white/60"
                }`}
              >
                <img
                  src={item.src || "/placeholder.svg?height=64&width=80"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
