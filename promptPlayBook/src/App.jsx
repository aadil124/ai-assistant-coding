import React, { useState, useMemo } from "react";
import promptsData from "./prompts.json";

// Simple helper to get bootstrap-icons tag classes
const getTagClass = (tag) => {
  const mapping = {
    Kickstart: "kickstart",
    Planning: "planning",
    Dev: "dev",
    UI: "ui",
    Debug: "debug",
    Refactor: "refactor",
    Review: "review",
    Test: "test",
    Deploy: "deploy",
    Docs: "docs",
    AI: "ai",
    Performance: "performance",
  };
  return `tag-badge ${mapping[tag] || "docs"}`;
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholderInputs, setPlaceholderInputs] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Extract unique categories and counts
  const categories = useMemo(() => {
    const counts = {};
    promptsData.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return [
      { name: "All", count: promptsData.length },
      ...Object.keys(counts).map((name) => ({ name, count: counts[name] })),
    ];
  }, []);

  // Filter prompts based on search term and selected category
  const filteredPrompts = useMemo(() => {
    return promptsData.filter((prompt) => {
      const matchesCategory =
        selectedCategory === "All" || prompt.category === selectedCategory;
      const cleanSearch = searchTerm.toLowerCase();
      const matchesSearch =
        prompt.title.toLowerCase().includes(cleanSearch) ||
        prompt.description.toLowerCase().includes(cleanSearch) ||
        prompt.content.toLowerCase().includes(cleanSearch) ||
        prompt.tag.toLowerCase().includes(cleanSearch) ||
        prompt.category.toLowerCase().includes(cleanSearch);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Handle input change for placeholders
  const handlePlaceholderChange = (promptId, placeholder, value) => {
    setPlaceholderInputs((prev) => ({
      ...prev,
      [`${promptId}-${placeholder}`]: value,
    }));
  };

  // Generate finalized prompt text with inputs substituted
  const getSubstitutedPrompt = (prompt) => {
    let text = prompt.content;
    prompt.placeholders.forEach((placeholder) => {
      const userVal = placeholderInputs[`${prompt.id}-${placeholder}`];
      if (userVal && userVal.trim() !== "") {
        text = text.replaceAll(placeholder, userVal);
      }
    });
    return text;
  };

  // Copy to clipboard handler
  const handleCopy = (prompt) => {
    const textToCopy = getSubstitutedPrompt(prompt);
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopiedId(prompt.id);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="container-fluid min-vh-100 p-0 d-flex flex-column">
      {/* Premium Navbar / Header */}
      <header className="main-header border-bottom py-3 sticky-top bg-dark bg-opacity-75">
        <div className="container">
          <div className="row align-items-center justify-content-between g-3">
            <div className="col-12 col-md-5">
              <div className="d-flex align-items-center gap-3">
                <span className="fs-1">📖</span>
                <div>
                  <h1 className="h3 mb-0 title-gradient">Prompt Playbook</h1>
                  <p className="small text-muted mb-0">
                    Production-grade prompts for Vibe Coding & AI tools
                  </p>
                </div>
              </div>
            </div>

            {/* Search inputs */}
            <div className="col-12 col-md-5">
              <div className="search-wrapper">
                <i className="bi bi-search search-icon"></i>
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search prompts, categories, tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-md-2 text-md-end d-none d-md-block">
              <a
                href="https://github.com/aadil124/ai-assistant-coding"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-secondary border-secondary-subtle rounded-pill btn-sm text-light"
              >
                <i className="bi bi-github me-1"></i> Star Playbook
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Body */}
      <main className="container flex-grow-1 py-4">
        <div className="row g-4">
          {/* Sidebar / Category List (Desktop Only) */}
          <div className="col-lg-3 sidebar-column">
            <div className="sidebar-sticky glass-panel p-3">
              <h5 className="mb-3 px-2 text-uppercase fs-6 tracking-wider text-muted">
                Categories
              </h5>
              <div className="nav flex-column">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    className={`nav-link text-start category-link ${selectedCategory === cat.name ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    <i
                      className={`bi ${selectedCategory === cat.name ? "bi-folder2-open" : "bi-folder2"} me-2`}
                    ></i>
                    <span className="flex-grow-1 text-truncate">
                      {cat.name}
                    </span>
                    <span className="badge rounded-pill bg-dark text-muted border border-secondary-subtle small px-2 py-1">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Horizontal Scrolling Filter Bar (Mobile / Tablet Only) */}
          <div className="col-12 d-lg-none">
            <div className="mobile-filter-bar">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  className={`mobile-filter-btn ${selectedCategory === cat.name ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Prompts Display Grid */}
          <div className="col-lg-9">
            {/* Header info */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="h4 mb-0 font-outfit">
                  {selectedCategory === "All"
                    ? "All Curated Prompts"
                    : selectedCategory}
                </h2>
                <p className="text-muted small mb-0">
                  Showing {filteredPrompts.length} of {promptsData.length}{" "}
                  production prompts
                </p>
              </div>
            </div>

            {/* Empty state */}
            {filteredPrompts.length === 0 && (
              <div className="glass-panel empty-state my-5">
                <i className="bi bi-clipboard-x empty-state-icon"></i>
                <h3>No prompts found</h3>
                <p className="text-muted">
                  We couldn't find anything matching your search term. Try
                  another keyword.
                </p>
                <button
                  className="btn btn-primary rounded-pill px-4 mt-3"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Prompts list */}
            <div className="row g-4">
              {filteredPrompts.map((prompt) => {
                const substitutedContent = getSubstitutedPrompt(prompt);
                const isCopied = copiedId === prompt.id;

                return (
                  <div className="col-12" key={prompt.id}>
                    <div className="prompt-card">
                      {/* Badge / Tag & Actions Row */}
                      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                        <span className={getTagClass(prompt.tag)}>
                          {prompt.tag}
                        </span>

                        <button
                          className={`btn btn-copy ${isCopied ? "copied" : ""}`}
                          onClick={() => handleCopy(prompt)}
                          title="Copy prompt text to clipboard"
                        >
                          <i
                            className={`bi ${isCopied ? "bi-check-circle-fill" : "bi-clipboard"}`}
                          ></i>
                          {isCopied ? "Copied!" : "Copy Prompt"}
                        </button>
                      </div>

                      {/* Title & Description */}
                      <h3 className="h5 mb-2 font-outfit text-white">
                        [{prompt.tag}] {prompt.title}
                      </h3>
                      <p className="text-muted small mb-3">
                        {prompt.description}
                      </p>

                      {/* Placeholders Builder */}
                      {prompt.placeholders &&
                        prompt.placeholders.length > 0 && (
                          <div className="bg-dark bg-opacity-25 rounded-3 p-3 mb-3 border border-secondary-subtle">
                            <span className="small text-muted fw-bold d-block mb-2 uppercase-tracking">
                              <i className="bi bi-sliders me-1"></i> Interactive
                              Placeholders (Optional)
                            </span>
                            <div className="row g-2">
                              {prompt.placeholders.map((ph) => (
                                <div className="col-12 col-sm-6" key={ph}>
                                  <div className="input-group input-group-sm">
                                    <span
                                      className="input-group-text bg-dark border-secondary-subtle text-muted text-monospace"
                                      style={{ fontSize: "0.75rem" }}
                                    >
                                      {ph}
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control bg-dark text-white border-secondary-subtle placeholder-interactive-input"
                                      placeholder="Replace with custom value..."
                                      value={
                                        placeholderInputs[
                                          `${prompt.id}-${ph}`
                                        ] || ""
                                      }
                                      onChange={(e) =>
                                        handlePlaceholderChange(
                                          prompt.id,
                                          ph,
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Display Code Sandbox */}
                      <div className="code-container">
                        <pre>
                          <code>{substitutedContent}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Premium Footer */}
      <footer className="mt-auto py-4 border-top bg-dark bg-opacity-50">
        <div className="container text-center">
          <p className="mb-1 footer-text">
            <strong>Prompt Playbook</strong> &copy; {new Date().getFullYear()}.
            Curated prompts for senior engineers.
          </p>
          <p className="mb-0 text-muted small">
            Designed for ChatGPT, Claude, Gemini, Cursor, Windsurf, Cline, Roo
            Code and other AI development tools.
          </p>
        </div>
      </footer>
    </div>
  );
}
