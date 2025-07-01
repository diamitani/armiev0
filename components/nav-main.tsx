"use client"

import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function NavMain({
  items,
  title = "Navigation",
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    description?: string
    items?: {
      title: string
      url: string
      icon?: LucideIcon
      description?: string
    }[]
  }[]
  title?: string
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="px-2">
      <SidebarGroupLabel className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 px-2">
        {title}
      </SidebarGroupLabel>
      <SidebarMenu className="space-y-1">
        {items.map((item) => {
          const isActive =
            pathname === item.url || (item.items && item.items.some((subItem) => pathname === subItem.url))

          return (
            <Collapsible key={item.title} asChild defaultOpen={isActive} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.description || item.title}
                    isActive={isActive}
                    className={cn(
                      "w-full h-10 px-3 rounded-lg transition-all duration-200",
                      "hover:bg-slate-100 hover:text-slate-900",
                      "data-[state=open]:bg-slate-100",
                      isActive && "bg-blue-50 text-blue-700 border border-blue-200/50 shadow-sm",
                    )}
                  >
                    <Link href={item.url} className="flex items-center w-full min-w-0">
                      {item.icon && (
                        <item.icon
                          className={cn("w-4 h-4 mr-3 flex-shrink-0", isActive ? "text-blue-600" : "text-slate-500")}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium truncate">{item.title}</span>
                        {item.description && (
                          <p className="text-xs text-slate-500 truncate group-data-[collapsible=icon]:hidden">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        {item.items && (
                          <ChevronRight className="w-4 h-4 text-slate-400 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        )}
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {item.items && (
                  <CollapsibleContent>
                    <SidebarMenuSub className="ml-4 mt-1 space-y-1">
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                            className={cn(
                              "w-full h-9 px-3 rounded-md transition-all duration-200",
                              "hover:bg-slate-100 hover:text-slate-900",
                              pathname === subItem.url && "bg-blue-50 text-blue-700 border border-blue-200/50",
                            )}
                          >
                            <Link href={subItem.url} className="flex items-center w-full min-w-0">
                              {subItem.icon && (
                                <subItem.icon
                                  className={cn(
                                    "w-4 h-4 mr-3 flex-shrink-0",
                                    pathname === subItem.url ? "text-blue-600" : "text-slate-400",
                                  )}
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium truncate">{subItem.title}</span>
                                {subItem.description && (
                                  <p className="text-xs text-slate-500 truncate">{subItem.description}</p>
                                )}
                              </div>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
