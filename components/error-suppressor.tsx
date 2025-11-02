"use client"

import { useEffect } from "react"

export function ErrorSuppressor() {
  useEffect(() => {
    // Suppress ResizeObserver errors globally
    const resizeObserverErrorHandler = (e: ErrorEvent) => {
      if (
        e.message === "ResizeObserver loop completed with undelivered notifications." ||
        e.message === "ResizeObserver loop limit exceeded"
      ) {
        e.stopImmediatePropagation()
        e.preventDefault()
        return true
      }
    }

    window.addEventListener("error", resizeObserverErrorHandler)

    // Also suppress unhandled promise rejections related to ResizeObserver
    const unhandledRejectionHandler = (e: PromiseRejectionEvent) => {
      if (e.reason?.message?.includes("ResizeObserver") || e.reason?.toString()?.includes("ResizeObserver")) {
        e.preventDefault()
        return true
      }
    }

    window.addEventListener("unhandledrejection", unhandledRejectionHandler)

    return () => {
      window.removeEventListener("error", resizeObserverErrorHandler)
      window.removeEventListener("unhandledrejection", unhandledRejectionHandler)
    }
  }, [])

  return null
}
