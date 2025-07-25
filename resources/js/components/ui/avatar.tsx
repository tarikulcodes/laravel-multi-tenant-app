import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

// Color mapping function for different starting characters
function getBackgroundColorFromChar(char: string): string {
  if (!char) return "bg-muted"

  const firstChar = char.charAt(0).toLowerCase()

  const colorMap: Record<string, string> = {
    'a': 'bg-red-500',
    'b': 'bg-orange-500',
    'c': 'bg-amber-500',
    'd': 'bg-yellow-500',
    'e': 'bg-lime-500',
    'f': 'bg-green-500',
    'g': 'bg-emerald-500',
    'h': 'bg-teal-500',
    'i': 'bg-cyan-500',
    'j': 'bg-sky-500',
    'k': 'bg-blue-500',
    'l': 'bg-indigo-500',
    'm': 'bg-violet-500',
    'n': 'bg-purple-500',
    'o': 'bg-fuchsia-500',
    'p': 'bg-pink-500',
    'q': 'bg-rose-500',
    'r': 'bg-red-600',
    's': 'bg-orange-600',
    't': 'bg-amber-600',
    'u': 'bg-green-600',
    'v': 'bg-blue-600',
    'w': 'bg-indigo-600',
    'x': 'bg-purple-600',
    'y': 'bg-pink-600',
    'z': 'bg-slate-600',
  }

  return colorMap[firstChar] || 'bg-gray-500'
}

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  // Determine background color based on the first character of children
  const backgroundColorClass = React.useMemo(() => {
    if (className && (className.includes('bg-') || className.includes('dark:bg-'))) {
      // If className already contains background colors, don't override
      return ''
    }

    const content = typeof children === 'string' ? children : children?.toString() || ''
    return getBackgroundColorFromChar(content)
  }, [children, className])

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full text-white font-medium",
        backgroundColorClass,
        className
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  )
}

export { Avatar, AvatarImage, AvatarFallback }
