import React from "react";

export default function Dashboard({ setActiveTab, posts }) {
  // Compute basic mock summary metrics
  const totalPosts = posts.length;
  const publishedCount =
    posts.filter((p) => p.status === "PUBLISHED").length || 1;
  const pendingCount = posts.filter(
    (p) => p.status === "PENDING_REVIEW",
  ).length;
  const approvedCount = posts.filter((p) => p.status === "APPROVED").length;

  return (
    <div
      className="p-4"
      style={{ height: "calc(100vh - 64px)", overflowY: "auto" }}
    >
      {/* Welcome Message */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h2
            className="m-0 font-weight-bold text-dark"
            style={{ fontSize: "24px" }}
          >
            Welcome back, Alex!
          </h2>
          <p className="text-muted m-0" style={{ fontSize: "13px" }}>
            Here is a summary of your workspace performance and schedule queue.
          </p>
        </div>
        <span
          className="badge bg-primary px-3 py-2"
          style={{ borderRadius: "20px" }}
        >
          June 5, 2026
        </span>
      </div>

      {/* Metrics Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border rounded-3 p-3 bg-white shadow-sm">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span
                className="text-muted text-xs-caps"
                style={{ fontSize: "11px" }}
              >
                Total Reach
              </span>
              <span className="material-symbols-outlined text-primary">
                visibility
              </span>
            </div>
            <h3 className="m-0 font-weight-bold text-dark">142,050</h3>
            <span className="text-success" style={{ fontSize: "12px" }}>
              <i className="bi bi-arrow-up-right me-1"></i>+12.4% this month
            </span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border rounded-3 p-3 bg-white shadow-sm">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span
                className="text-muted text-xs-caps"
                style={{ fontSize: "11px" }}
              >
                Average Engagement
              </span>
              <span className="material-symbols-outlined text-success">
                bolt
              </span>
            </div>
            <h3 className="m-0 font-weight-bold text-dark">8.8%</h3>
            <span className="text-success" style={{ fontSize: "12px" }}>
              <i className="bi bi-arrow-up-right me-1"></i>+2.1% this week
            </span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border rounded-3 p-3 bg-white shadow-sm">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span
                className="text-muted text-xs-caps"
                style={{ fontSize: "11px" }}
              >
                Follower Growth
              </span>
              <span className="material-symbols-outlined text-info">
                trending_up
              </span>
            </div>
            <h3 className="m-0 font-weight-bold text-dark">+1,205</h3>
            <span className="text-success" style={{ fontSize: "12px" }}>
              <i className="bi bi-arrow-up-right me-1"></i>+4.8% growth
            </span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border rounded-3 p-3 bg-white shadow-sm">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span
                className="text-muted text-xs-caps"
                style={{ fontSize: "11px" }}
              >
                Active Queue
              </span>
              <span className="material-symbols-outlined text-warning">
                schedule
              </span>
            </div>
            <h3 className="m-0 font-weight-bold text-dark">
              {approvedCount + pendingCount} Posts
            </h3>
            <span className="text-muted" style={{ fontSize: "12px" }}>
              {approvedCount} Approved / {pendingCount} Pending
            </span>
          </div>
        </div>
      </div>

      {/* Grid splits */}
      <div className="row g-4">
        {/* Left Column: Quick Actions & Chart preview */}
        <div className="col-12 col-lg-7">
          {/* Quick Launch Panel */}
          <div className="card border rounded-3 bg-white p-3 mb-4 shadow-sm">
            <h5
              className="font-weight-bold text-dark mb-3"
              style={{ fontSize: "15px" }}
            >
              Quick Start Widgets
            </h5>
            <div className="row g-2">
              <div className="col-4">
                <button
                  className="btn btn-outline-primary border w-100 p-3 rounded-3 d-flex flex-column align-items-center justify-content-center gap-2"
                  onClick={() => setActiveTab("composer")}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "24px" }}
                  >
                    add_circle
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: "600" }}>
                    Compose Post
                  </span>
                </button>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-outline-primary border w-100 p-3 rounded-3 d-flex flex-column align-items-center justify-content-center gap-2"
                  onClick={() => setActiveTab("ai-assistant")}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "24px" }}
                  >
                    auto_awesome
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: "600" }}>
                    AI Assistant
                  </span>
                </button>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-outline-primary border w-100 p-3 rounded-3 d-flex flex-column align-items-center justify-content-center gap-2"
                  onClick={() => setActiveTab("media-library")}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "24px" }}
                  >
                    perm_media
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: "600" }}>
                    Media Assets
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Analytics Chart Card */}
          <div className="card border rounded-3 bg-white p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5
                className="m-0 font-weight-bold text-dark"
                style={{ fontSize: "15px" }}
              >
                Weekly Engagement Trends
              </h5>
              <button
                className="btn btn-link text-primary text-decoration-none p-0"
                style={{ fontSize: "12px" }}
                onClick={() => setActiveTab("analytics")}
              >
                View Details
              </button>
            </div>
            {/* Visual simulation of chart */}
            <div
              className="bg-light rounded p-4 d-flex flex-column align-items-center justify-content-center text-muted"
              style={{ height: "220px" }}
            >
              <span
                className="material-symbols-outlined text-muted mb-2"
                style={{ fontSize: "32px" }}
              >
                bar_chart
              </span>
              <p className="m-0" style={{ fontSize: "12px" }}>
                Engagement Graph showing reach lines is active.
              </p>
              <div
                className="w-100 mt-3 d-flex justify-content-around text-xs-caps"
                style={{ fontSize: "9px" }}
              >
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scheduler Timeline Card */}
        <div className="col-12 col-lg-5">
          <div className="card border rounded-3 bg-white p-3 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5
                className="m-0 font-weight-bold text-dark"
                style={{ fontSize: "15px" }}
              >
                Upcoming Queue Release
              </h5>
              <button
                className="btn btn-link text-primary text-decoration-none p-0"
                style={{ fontSize: "12px" }}
                onClick={() => setActiveTab("queue")}
              >
                View Queue
              </button>
            </div>

            <div
              className="d-flex flex-column gap-3 overflow-auto"
              style={{ maxHeight: "380px" }}
            >
              {posts
                .filter((p) => p.status !== "PUBLISHED")
                .map((post) => (
                  <div
                    key={post.id}
                    className="p-3 border rounded-3 d-flex gap-3 align-items-start position-relative"
                  >
                    <div
                      className="position-absolute top-0 bottom-0 start-0 rounded-start"
                      style={{
                        width: "4px",
                        backgroundColor:
                          post.status === "APPROVED"
                            ? "#16a34a"
                            : post.status === "PENDING_REVIEW"
                              ? "#ffc107"
                              : "#6b7280",
                      }}
                    ></div>
                    <div className="flex-grow-1 pl-2">
                      <p
                        className="m-0 text-dark font-weight-bold truncate-2"
                        style={{ fontSize: "12px", lineHeight: "1.4" }}
                      >
                        {post.caption}
                      </p>
                      <div className="d-flex align-items-center gap-2 mt-2">
                        <span
                          className="badge bg-secondary-subtle text-secondary-emphasis"
                          style={{ fontSize: "9px" }}
                        >
                          {new Date(post.scheduledTime).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {post.platforms.map((plat) => (
                          <i
                            key={plat}
                            className={`bi bi-${plat === "twitter" ? "twitter-x" : plat} text-muted`}
                            style={{ fontSize: "11px" }}
                          ></i>
                        ))}
                      </div>
                    </div>
                    {post.media.length > 0 && (
                      <img
                        alt="thumbnail"
                        className="rounded"
                        style={{
                          width: "48px",
                          height: "48px",
                          objectFit: "cover",
                        }}
                        src={post.media[0]}
                      />
                    )}
                  </div>
                ))}
              {posts.filter((p) => p.status !== "PUBLISHED").length === 0 && (
                <div className="text-center py-5 text-muted">
                  <span
                    className="material-symbols-outlined mb-2"
                    style={{ fontSize: "32px" }}
                  >
                    event_busy
                  </span>
                  <p className="m-0" style={{ fontSize: "12px" }}>
                    No scheduled posts in the active queue.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
