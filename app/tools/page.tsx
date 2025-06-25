const ToolsPage = () => {
  const tools = [
    {
      id: "music-career-roadmap",
      name: "Music Career Roadmap",
      description: "Create a personalized roadmap for your music career",
      category: "Core Management",
      function: "Strategic planning",
      userBenefit: "Clear direction and actionable steps",
      slug: "music-career-roadmap",
      icon: "🗺️",
      href: "/tools/music-career-roadmap",
    },
    {
      id: "song-splitter",
      name: "Song Splitter",
      description: "Easily split your song royalties with collaborators",
      category: "Legal & Financial",
      function: "Royalty management",
      userBenefit: "Fair and transparent royalty distribution",
      slug: "song-splitter",
      icon: "⚖️",
      href: "/tools/song-splitter",
    },
    {
      id: "release-checklist",
      name: "Release Checklist",
      description: "Ensure a smooth release with our comprehensive checklist",
      category: "Release Management",
      function: "Release planning",
      userBenefit: "Organized and successful music releases",
      slug: "release-checklist",
      icon: "✅",
      href: "/tools/release-checklist",
    },
    {
      id: "music-business-plan",
      name: "Music Business Plan Generator",
      description: "Create a professional business plan for your music career",
      category: "Core Management",
      function: "Business planning",
      userBenefit: "Attract investors and secure funding",
      slug: "music-business-plan",
      icon: "📈",
      href: "/tools/music-business-plan",
    },
    {
      id: "task-generator",
      name: "AI Task & Goal Generator",
      description: "Get personalized tasks and goals based on your music career situation",
      category: "Core Management",
      function: "AI-powered task and goal planning",
      userBenefit: "Personalized action plans and strategic guidance",
      slug: "task-generator",
      icon: "🎯",
      href: "/tools/task-generator",
    },
  ]

  return (
    <div>
      <h1>Tools</h1>
      <ul>
        {tools.map((tool) => (
          <li key={tool.id}>
            <a href={tool.href}>
              {tool.name} ({tool.description})
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ToolsPage
