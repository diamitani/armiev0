// Fetch and analyze the latest ARMIE data
async function fetchLatestArmieData() {
  try {
    console.log("Fetching latest ARMIE data...")

    // Fetch the tools CSV
    const toolsResponse = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Armie%20Tools%20-%20All-ghlFFIOf5tsgHvoFqNdqpvUP3TTFBH.csv",
    )
    const toolsData = await toolsResponse.text()

    // Fetch the assistants CSV
    const assistantsResponse = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Armie%20Tools%20-%20Assistants-6hjglBgpL00KLcyUdngMsMFScuOLs8.csv",
    )
    const assistantsData = await assistantsResponse.text()

    console.log("=== LATEST ARMIE DATA ANALYSIS ===\n")

    // Parse tools CSV
    const toolsLines = toolsData.split("\n").filter((line) => line.trim())
    console.log(`Found ${toolsLines.length - 1} tools`)

    const tools = []
    const categories = new Set()

    // Parse tools data
    for (let i = 1; i < toolsLines.length; i++) {
      const line = toolsLines[i]
      if (line.trim()) {
        const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || []
        const cleanValues = values.map((v) => v.replace(/^"|"$/g, "").trim())

        if (cleanValues.length >= 4) {
          const tool = {
            category: cleanValues[0],
            name: cleanValues[1],
            function: cleanValues[2],
            benefit: cleanValues[3],
            creditUsage: cleanValues[4] || "Medium",
          }
          tools.push(tool)
          categories.add(tool.category)
        }
      }
    }

    console.log("\n=== TOOLS BY CATEGORY ===")
    categories.forEach((category) => {
      const categoryTools = tools.filter((t) => t.category === category)
      console.log(`\n${category.toUpperCase()} (${categoryTools.length} tools):`)
      categoryTools.forEach((tool) => {
        console.log(`  • ${tool.name} - ${tool.function} (${tool.creditUsage} credits)`)
      })
    })

    // Parse assistants CSV
    console.log("\n=== ASSISTANTS DATA ===")
    const assistantsLines = assistantsData.split("\n").filter((line) => line.trim())
    console.log(`Found ${assistantsLines.length - 1} assistants`)

    const assistants = []
    for (let i = 1; i < assistantsLines.length; i++) {
      const line = assistantsLines[i]
      if (line.trim()) {
        const values = line.split(",").map((v) => v.replace(/^"|"$/g, "").trim())
        if (values.length >= 2 && values[0] && values[1]) {
          assistants.push({
            name: values[0],
            id: values[1],
            projectName: values[2] || "",
            vectorStore: values[6] || "",
            vectorStoreId: values[7] || "",
            apiKey: values[8] || "",
          })
        }
      }
    }

    console.log("\n=== AVAILABLE ASSISTANTS ===")
    assistants.forEach((assistant) => {
      console.log(`- ${assistant.name} (${assistant.id})`)
      if (assistant.vectorStore) {
        console.log(`  Vector Store: ${assistant.vectorStore} (${assistant.vectorStoreId})`)
      }
    })

    console.log("\n=== INTEGRATION OPPORTUNITIES ===")
    console.log("Main Armie Assistant:", assistants.find((a) => a.name === "Armie")?.id)
    console.log("Specialized Assistants:", assistants.filter((a) => a.name !== "Armie").length)

    return { tools, categories: Array.from(categories), assistants }
  } catch (error) {
    console.error("Error fetching latest data:", error)
    return { tools: [], categories: [], assistants: [] }
  }
}

// Execute the analysis
fetchLatestArmieData()
