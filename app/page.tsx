import type { ReactNode } from "react";

type IconName = "bell" | "search" | "arrow" | "levels" | "clock" | "file" | "star";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    arrow: (
      <>
        <path d="M4 12h16" />
        <path d="m14 5 7 7-7 7" />
      </>
    ),
    levels: (
      <>
        <path d="M4 20v-5M9 20V9M14 20V4M19 20v-8" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    file: (
      <>
        <path d="M6 3.5h8l4 4V21H6z" />
        <path d="M14 3.5V8h4" />
      </>
    ),
    star: (
      <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.4l6.3-.9z" />
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={`icon icon-${name}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function VertexMark() {
  return (
    <svg className="vertex-mark" viewBox="0 0 40 34" aria-hidden="true">
      <path d="M1 1h38L20 33 1 1Z" fill="currentColor" />
      <path d="M10 7h17L19 24 10 7Z" fill="#fffdfb" />
      <path d="m24 7-6 10 5 1 6-11h-5Z" fill="currentColor" />
    </svg>
  );
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Vertex home">
      <VertexMark />
      <span>Vertex</span>
    </a>
  );
}

function ProfileAvatar() {
  return (
    <svg
      className="profile-avatar"
      viewBox="0 0 52 52"
      role="img"
      aria-label="Profile"
    >
      <defs>
        <clipPath id="avatar-clip">
          <circle cx="26" cy="26" r="26" />
        </clipPath>
        <linearGradient id="avatar-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f3e7dd" />
          <stop offset="1" stopColor="#d9c6b8" />
        </linearGradient>
      </defs>
      <g clipPath="url(#avatar-clip)">
        <rect width="52" height="52" fill="url(#avatar-bg)" />
        <path d="M11 53c1-11 7-17 15-17s14 6 15 17" fill="#292827" />
        <path d="M18 16c0-7 14-9 17 2l-1 13c-2 7-13 8-16 0z" fill="#28201e" />
        <path d="M20 17c0-5 12-6 13 1l-1 12c-1 5-10 5-12 0z" fill="#d89c7f" />
        <path d="M19 18c1-8 12-10 16-2l-1 5c-3-1-6-4-7-6-2 3-5 5-9 6z" fill="#302521" />
        <path d="M22 25h1m6 0h1" stroke="#382923" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M24 31c1 1 3 1 4 0" stroke="#9b5549" strokeWidth="1" strokeLinecap="round" />
        <path d="M20 38h12l-6 8z" fill="#f3f0ed" />
      </g>
    </svg>
  );
}

function CourseLogo({ kind }: { kind: "next" | "docker" | "typescript" }) {
  if (kind === "docker") {
    return (
      <svg className="course-logo docker-logo" viewBox="0 0 88 74" role="img" aria-label="Docker">
        <g fill="#1597dc" stroke="#101820" strokeWidth="2">
          <path d="M19 28h10v10H19zM31 28h10v10H31zM43 28h10v10H43zM31 16h10v10H31zM43 16h10v10H43zM55 16h10v10H55zM43 4h10v10H43z" />
          <path d="M7 40h58c4-7 10-10 17-8-2 4-2 7-1 10-4 3-8 4-13 3-7 15-20 23-38 23C15 68 5 60 3 48z" />
        </g>
        <path d="M15 50h7m6 0h7m6 0h7m6 0h6M34 59h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "typescript") {
    return (
      <span className="course-logo typescript-logo" aria-label="TypeScript">TS</span>
    );
  }

  return <span className="course-logo next-logo" aria-label="Next.js">N</span>;
}

const courses = [
  {
    kind: "next" as const,
    title: "Next.js for Production",
    description: "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    modules: "12 modules",
  },
  {
    kind: "docker" as const,
    title: "Docker Essentials",
    description: "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    modules: "8 modules",
  },
  {
    kind: "typescript" as const,
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    modules: "10 modules",
  },
];

export default function Home() {
  return (
    <main className="site-shell" id="top">
      <div className="site-frame">
        <header className="site-header">
          <Brand />
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#courses">Courses</a>
            <a href="#courses">My Learning</a>
          </nav>
          <div className="header-actions">
            <button type="button" className="notification-button" aria-label="Notifications">
              <Icon name="bell" />
            </button>
            <ProfileAvatar />
          </div>
        </header>

        <section className="hero-section" aria-labelledby="hero-title">
          <span className="hero-eyebrow">Intelligent Learning</span>
          <h1 id="hero-title">
            Search your learning
            <br className="desktop-break" /> in plain English.
          </h1>
          <p>
            Vertex understands what you want to learn and
            <br className="desktop-break" /> finds the exact lessons across all your courses.
          </p>
          <a className="explore-button" href="#courses">
            Explore Courses
            <Icon name="arrow" />
          </a>
          <div className="hero-search" role="search">
            <Icon name="search" />
            <label className="sr-only" htmlFor="learning-search">Search your learning</label>
            <input
              id="learning-search"
              name="q"
              type="search"
              placeholder="Ask anything about your learning..."
            />
            <kbd aria-hidden="true">⌘ K</kbd>
          </div>
        </section>

        <section className="courses-section" id="courses" aria-labelledby="courses-title">
          <div className="section-heading">
            <h2 id="courses-title">All Courses</h2>
            <a href="#courses">
              View all courses
              <Icon name="arrow" />
            </a>
          </div>
          <div className="course-grid">
            {courses.map((course) => (
              <article className="course-card" key={course.title}>
                <CourseLogo kind={course.kind} />
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span><Icon name="levels" />{course.level}</span>
                  <span><Icon name="clock" />{course.duration}</span>
                  <span><Icon name="file" />{course.modules}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="weekly-callout">
            <span className="callout-line" />
            <Icon name="star" />
            <p>New courses and lessons added every week.</p>
            <span className="callout-line" />
          </div>
        </section>

        <div className="bottom-art" aria-hidden="true">
          <span style={{ height: "64px" }} />
          <span style={{ height: "100px" }} />
          <span style={{ height: "130px" }} />
          <span style={{ height: "165px" }} />
          <span style={{ height: "110px" }} />
          <span style={{ height: "72px" }} />
          <span style={{ height: "46px" }} />
          <span style={{ height: "80px" }} />
          <span style={{ height: "118px" }} />
          <span style={{ height: "160px" }} />
          <span style={{ height: "190px" }} />
          <span style={{ height: "116px" }} />
          <span style={{ height: "88px" }} />
          <span style={{ height: "142px" }} />
          <span style={{ height: "156px" }} />
        </div>
      </div>
    </main>
  );
}
