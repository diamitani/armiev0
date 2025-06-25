import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ContractNotFound() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contract Not Found</h3>
            <p className="text-gray-600 mb-6">The contract you're looking for doesn't exist or may have been moved.</p>
            <Link href="/contracts">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Contracts
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
