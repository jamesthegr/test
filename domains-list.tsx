"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, ExternalLink, MoreVertical, Trash2, X } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type Domain = {
  id: string
  name: string
  status: "active" | "pending" | "error"
  type: "primary" | "redirect" | "subdomain"
  createdAt: string
}

const initialDomains: Domain[] = [
  {
    id: "1",
    name: "modified.vercel.app",
    status: "active",
    type: "primary",
    createdAt: "2023-01-01",
  },
  {
    id: "2",
    name: "www.example.com",
    status: "pending",
    type: "subdomain",
    createdAt: "2023-06-15",
  },
  {
    id: "3",
    name: "example.com",
    status: "error",
    type: "redirect",
    createdAt: "2023-06-15",
  },
]

export function DomainsList() {
  const [domains, setDomains] = useState<Domain[]>(initialDomains)
  const [domainToDelete, setDomainToDelete] = useState<Domain | null>(null)

  const handleDeleteDomain = () => {
    if (domainToDelete) {
      setDomains(domains.filter((domain) => domain.id !== domainToDelete.id))
      setDomainToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-[1fr,auto,auto] gap-4 p-4 text-sm font-medium text-muted-foreground md:grid-cols-[1fr,150px,100px,auto]">
          <div>Domain</div>
          <div className="hidden md:block">Status</div>
          <div className="hidden md:block">Type</div>
          <div className="text-right">Actions</div>
        </div>
        {domains.length > 0 ? (
          domains.map((domain) => (
            <div
              key={domain.id}
              className="grid grid-cols-[1fr,auto,auto] gap-4 border-t p-4 text-sm md:grid-cols-[1fr,150px,100px,auto]"
            >
              <div className="font-medium">{domain.name}</div>
              <div className="hidden md:block">
                <StatusBadge status={domain.status} />
              </div>
              <div className="hidden capitalize md:block">{domain.type}</div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <a href={`https://${domain.name}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Visit</span>
                  </a>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-destructive" onClick={() => setDomainToDelete(domain)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <div className="border-t p-4 text-center text-sm text-muted-foreground">No domains found</div>
        )}
      </div>

      <AlertDialog open={!!domainToDelete} onOpenChange={(open) => !open && setDomainToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Domain</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the domain <strong>{domainToDelete?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteDomain}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function StatusBadge({ status }: { status: Domain["status"] }) {
  switch (status) {
    case "active":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Check className="mr-1 h-3 w-3" /> Active
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          Pending
        </Badge>
      )
    case "error":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <X className="mr-1 h-3 w-3" /> Error
        </Badge>
      )
    default:
      return null
  }
}
