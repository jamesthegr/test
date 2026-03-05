"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { Globe, Settings, Zap } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()

  if (isMobile) return null

  return (
    <div className="w-64 border-r bg-background p-4">
      <nav className="flex flex-col gap-2">
        <Link
          href="/domains"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
            pathname.includes("/domains") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
          )}
        >
          <Globe className="h-4 w-4" />
          Domains
        </Link>
        <Link
          href="/deployments"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
            pathname.includes("/deployments") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
          )}
        >
          <Zap className="h-4 w-4" />
          Deployments
        </Link>
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
            pathname.includes("/settings") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
          )}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </nav>
    </div>
  )
}
