"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Frame, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Frame className="h-6 w-6" />
          <span>modified.vercel.app</span>
        </Link>
        {!isMobile ? (
          <nav className="ml-8 flex gap-4 md:gap-6">
            <Link
              href="/domains"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.includes("/domains") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Domains
            </Link>
            <Link
              href="/deployments"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.includes("/deployments") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Deployments
            </Link>
            <Link
              href="/settings"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.includes("/settings") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Settings
            </Link>
          </nav>
        ) : (
          <Button variant="ghost" size="icon" className="ml-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        )}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            Feedback
          </Button>
          <Button size="sm">Upgrade</Button>
        </div>
      </div>
      {isMobile && mobileMenuOpen && (
        <nav className="border-b bg-background p-4">
          <div className="flex flex-col gap-2">
            <Link
              href="/domains"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                pathname.includes("/domains") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Domains
            </Link>
            <Link
              href="/deployments"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                pathname.includes("/deployments") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Deployments
            </Link>
            <Link
              href="/settings"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                pathname.includes("/settings") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Settings
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
