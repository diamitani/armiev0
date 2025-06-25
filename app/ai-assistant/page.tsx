"use client"

import { Bot, Brain } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-8 h-8 bg-armie-secondary rounded-full flex items-center justify-center">
            <Bot className="h-4 w-4 text-armie-primary" />
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm border border-armie-secondary/20 max-w-md">
            <p className="text-sm mb-2">
              👋 Hi Alex! I'm Armie, your AI music career manager. I have access to your knowledge base and remember:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 mb-3">
              <li>• Your R&B/Pop style and LA location</li>
              <li>• Current project: "Midnight Dreams" album</li>
              <li>• 2024 goals: 10K listeners, first tour</li>
              <li>• 3 files uploaded including demo tracks</li>
            </ul>
            <p className="text-sm">
              What would you like to work on today? I can help with strategy, create content, or use any of my
              specialized tools.
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-armie-secondary/20">
        <Link href="/knowledge-base">
          <Button variant="outline" className="w-full justify-start text-sm">
            <Brain className="w-4 h-4 mr-2" />
            Knowledge Base
          </Button>
        </Link>
      </div>
    </div>
  )
}
