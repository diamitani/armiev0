// Fetch and analyze the ARMIE tools data
async function analyzeToolsData() {
  try {
    console.log("Fetching ARMIE tools data...")

    // Fetch the main tools CSV
    const toolsResponse = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Armie%20Tools%20-%20All-GHGdjYlvfVO5sF9UUzwVZQ5cjXxCZ3.csv",
    )
    const toolsData = await toolsResponse.text()

    // Fetch the assistants CSV
    const assistantsResponse = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Armie%20Tools%20-%20Assistants-tpOb8Y7OnImGdfdZXuiJwfbqSQrB8Q.csv",
    )
    const assistantsData = await assistantsResponse.text()

    console.log("=== ARMIE TOOLS DATA ANALYSIS ===\n")

    // Parse tools CSV
    const toolsLines = toolsData.split("\n")
    const toolsHeaders = toolsLines[0].split(",")
    console.log("Tools CSV Headers:", toolsHeaders)
    console.log("Total tools entries:", toolsLines.length - 1)

    // Parse and categorize tools
    const toolsByCategory = {}
    const creditUsageDistribution = {}

    for (let i = 1; i < toolsLines.length; i++) {
      if (toolsLines[i].trim()) {
        const values = toolsLines[i].split(",")
        const category = values[0]?.replace(/"/g, "").trim()
        const toolName = values[1]?.replace(/"/g, "").trim()
        const creditUsage = values[4]?.replace(/"/g, "").trim()

        if (category && toolName) {
          if (!toolsByCategory[category]) {
            toolsByCategory[category] = []
          }
          toolsByCategory[category].push({
            name: toolName,
            function: values[2]?.replace(/"/g, "").trim(),
            benefit: values[3]?.replace(/"/g, "").trim(),
            creditUsage: creditUsage,
          })

          // Track credit usage distribution
          if (creditUsage) {
            creditUsageDistribution[creditUsage] = (creditUsageDistribution[creditUsage] || 0) + 1
          }
        }
      }
    }

    console.log("\n=== TOOLS BY CATEGORY ===")
    Object.keys(toolsByCategory).forEach((category) => {
      console.log(`\n${category.toUpperCase()} (${toolsByCategory[category].length} tools):`)
      toolsByCategory[category].forEach((tool) => {
        console.log(`  • ${tool.name} - ${tool.function} (${tool.creditUsage} credit usage)`)
      })
    })

    console.log("\n=== CREDIT USAGE DISTRIBUTION ===")
    Object.keys(creditUsageDistribution).forEach((usage) => {
      console.log(`${usage}: ${creditUsageDistribution[usage]} tools`)
    })

    // Parse assistants CSV
    console.log("\n=== ASSISTANTS DATA ===")
    const assistantsLines = assistantsData.split("\n")
    const assistantsHeaders = assistantsLines[0].split(",")
    console.log("Assistants CSV Headers:", assistantsHeaders)

    if (assistantsLines.length > 1) {
      const assistantValues = assistantsLines[1].split(",")
      console.log("\nMain Assistant Configuration:")
      console.log(`Name: ${assistantValues[0]?.replace(/"/g, "")}`)
      console.log(`Assistant ID: ${assistantValues[1]?.replace(/"/g, "")}`)
      console.log(`Vector Store: ${assistantValues[6]?.replace(/"/g, "")}`)
      console.log(`Vector Store ID: ${assistantValues[7]?.replace(/"/g, "")}`)
    }

    console.log("\n=== BUSINESS MODEL INSIGHTS ===")
    console.log("Subscription: $5/month or $50/year")
    console.log("Credit system with margin built into each transaction")
    console.log("Hybrid SaaS and usage-based model")

    return { toolsByCategory, creditUsageDistribution }
  } catch (error) {
    console.error("Error analyzing tools data:", error)
  }
}

// Execute the analysis
analyzeToolsData()
