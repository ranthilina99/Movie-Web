"use client"

import type React from "react"

import { useState } from "react"
import { Star, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface ReviewFormProps {
  movieId: number
  onSubmitSuccess?: () => void
}

export function ReviewForm({ movieId, onSubmitSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState("")
  const [review, setReview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    if (!title.trim()) {
      setError("Please enter a review title")
      return
    }

    if (!review.trim()) {
      setError("Please enter your review")
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      // In a real app, you would send this data to your API
      console.log({
        movieId,
        rating,
        title,
        review,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success
      setSuccess(true)
      setRating(0)
      setTitle("")
      setReview("")

      if (onSubmitSuccess) {
        onSubmitSuccess()
      }
    } catch (err) {
      setError("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-600/20 text-green-500 mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Thank You for Your Review!</h3>
          <p className="text-gray-400 mb-4">
            Your review has been submitted successfully and will be published after moderation.
          </p>
          <Button
            variant="outline"
            onClick={() => setSuccess(false)}
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            Write Another Review
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-4">Write a Review</h3>

      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-2 rounded-md mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Your Rating</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-2xl focus:outline-none transition-colors"
              >
                <Star
                  className={`h-8 w-8 ${
                    (hoverRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-gray-400">{rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}</span>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="review-title" className="block text-gray-300 mb-2">
            Review Title
          </label>
          <Input
            id="review-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience"
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="review-content" className="block text-gray-300 mb-2">
            Your Review
          </label>
          <Textarea
            id="review-content"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="What did you like or dislike about this movie?"
            className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
            required
          />
        </div>

        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Review
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

