// Fetch and analyze the updated ARMIE tools data
async function fetchToolsData() {
  try {
    console.log("Fetching updated ARMIE tools data...")

    // Fetch the tools CSV
    const toolsResponse = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Armie%20Tools%20-%20All-joYHi2AQfUTL1Wt6PK8EOBS0CAO5ih.csv",
    )
    const toolsData = await toolsResponse.text()

    // Fetch the assistants CSV
    const assistantsResponse = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Armie%20Tools%20-%20Assistants-5LSwBrDTcMztdV1R8GOL85sgMvmO17.csv",
    )
    const assistantsData = await assistantsResponse.text()

    console.log("=== ARMIE TOOLS ANALYSIS ===\n")

    // Parse tools CSV
    const toolsLines = toolsData.split("\n").filter((line) => line.trim())
    console.log(`Found ${toolsLines.length - 1} tools`)

    const tools = []
    const categories = new Set()

    // Skip header and parse each tool
    for (let i = 1; i < toolsLines.length; i++) {
      const line = toolsLines[i]
      if (line.trim()) {
        // Handle CSV parsing with potential commas in quoted fields
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

    console.log("\n=== CATEGORIES FOUND ===")
    categories.forEach((cat) => console.log(`- ${cat}`))

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
            vectorStore: values[6] || "",
            vectorStoreId: values[7] || "",
          })
        }
      }
    }

    assistants.forEach((assistant) => {
      console.log(`- ${assistant.name} (${assistant.id})`)
    })

    return { tools, categories: Array.from(categories), assistants }
  } catch (error) {
    console.error("Error fetching tools data:", error)
    return { tools: [], categories: [], assistants: [] }
  }
}

// Execute the analysis
fetchToolsData()
