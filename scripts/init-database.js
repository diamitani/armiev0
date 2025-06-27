import { neon } from "@neondatabase/serverless"
import fs from "fs"
import path from "path"

// Check for DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is not set")
  console.log("Please add your Neon database URL to your environment variables:")
  console.log("DATABASE_URL=postgresql://username:password@host/database")
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)

async function initializeDatabase() {
  try {
    console.log("🚀 Initializing ARMIE database...")

    // Read and execute schema
    const schemaPath = path.join(process.cwd(), "scripts", "create-schema.sql")
    const schemaSQL = fs.readFileSync(schemaPath, "utf8")

    console.log("📋 Creating database schema...")
    await sql(schemaSQL)
    console.log("✅ Schema created successfully")

    // Read and execute seed data
    const seedPath = path.join(process.cwd(), "scripts", "seed-data.sql")
    const seedSQL = fs.readFileSync(seedPath, "utf8")

    console.log("🌱 Seeding database with sample data...")
    await sql(seedSQL)
    console.log("✅ Sample data inserted successfully")

    // Verify the setup
    console.log("🔍 Verifying database setup...")
    const artistCount = await sql`SELECT COUNT(*) as count FROM artists`
    const assistantCount = await sql`SELECT COUNT(*) as count FROM assistants`
    const chatCount = await sql`SELECT COUNT(*) as count FROM chats`
    const messageCount = await sql`SELECT COUNT(*) as count FROM messages`

    console.log(`📊 Database Statistics:`)
    console.log(`   Artists: ${artistCount[0].count}`)
    console.log(`   Assistants: ${assistantCount[0].count}`)
    console.log(`   Chats: ${chatCount[0].count}`)
    console.log(`   Messages: ${messageCount[0].count}`)

    console.log("🎉 Database initialization completed successfully!")
    console.log("\n📝 Next steps:")
    console.log("1. Update your OpenAI assistant IDs in the assistants table")
    console.log("2. Configure your AI SDK integration")
    console.log("3. Test the API endpoints")
  } catch (error) {
    console.error("❌ Database initialization failed:", error)
    process.exit(1)
  }
}

// Run the initialization
initializeDatabase()
