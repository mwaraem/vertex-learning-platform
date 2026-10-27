import type { ReactNode } from "react";

type IconName =
  | "bell"
  | "search"
  | "play"
  | "file"
  | "bookmark"
  | "chart"
  | "clock"
  | "user"
  | "chevron"
  | "eye"
  | "grid"
  | "target"
  | "accessibility"
  | "check"
  | "lock"
  | "external"
  | "folder"
  | "menu";

function Icon({
  name,
  filled = false,
  className = "",
}: {
  name: IconName;
  filled?: boolean;
  className?: string;
}) {
  const fill = filled ? "currentColor" : "none";

  const shapes: Record<IconName, ReactNode> = {
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
    play: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m10 8 6 4-6 4z" fill={filled ? "white" : "currentColor"} stroke="none" />
      </>
    ),
    file: (
      <>
        <path d="M6 3.5h8l4 4V21H6z" />
        <path d="M14 3.5V8h4M9 12h6M9 16h6" />
      </>
    ),
    bookmark: <path d="M6 4h12v17l-6-4-6 4z" fill={fill} />,
    chart: (
      <>
        <path d="M5 20v-6h3v6M11 20V9h3v11M17 20V4h3v16" fill={fill} />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" fill={fill} />
        <path d="M4.5 20c.5-3.4 3.2-5.3 7.5-5.3s7 1.9 7.5 5.3z" fill={fill} />
      </>
    ),
    chevron: <path d="m9 5 7 7-7 7" />,
    eye: (
      <>
        <path d="M2.5 12s3.2-7 9.5-7 9.5 7 9.5 7-3.2 7-9.5 7-9.5-7-9.5-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
      </>
    ),
    target: (
      <>
        <circle cx="11" cy="13" r="8" />
        <circle cx="11" cy="13" r="4" />
        <path d="m14 10 7-7M17 3h4v4" />
      </>
    ),
    accessibility: (
      <>
        <circle cx="12" cy="4.5" r="2" />
        <path d="m5 8 7 2 7-2M12 10l-1 5-4 5m5-5 4 5m-4-5 4-2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" />
      </>
    ),
    external: (
      <>
        <path d="M14 4h6v6M20 4l-9 9" />
        <path d="M18 13v6H5V6h6" />
      </>
    ),
    folder: (
      <path d="M3 6h7l2 2h9v11H3z" fill={fill} />
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {shapes[name]}
    </svg>
  );
}

function SectionTitle({ number, children }: { number: string; children: ReactNode }) {
  return (
    <h2 className="section-title">
      <span>{number}</span>
      {children}
    </h2>
  );
}

const primaryColors = [
  ["Primary 500", "#F97316", "primary-500"],
  ["Primary 400", "#FB923C", "primary-400"],
  ["Primary 300", "#FDBA74", "primary-300"],
  ["Primary 200", "#FED7AA", "primary-200"],
  ["Primary 100", "#FFF1E8", "primary-100"],
];

const neutralColors = [
  ["Neutral 900", "#0F172A", "neutral-900"],
  ["Neutral 700", "#334155", "neutral-700"],
  ["Neutral 500", "#64748B", "neutral-500"],
  ["Neutral 300", "#CBD5E1", "neutral-300"],
  ["Neutral 200", "#E2E8F0", "neutral-200"],
  ["Neutral 100", "#F1F5F9", "neutral-100"],
  ["Neutral 50", "#FAFAFC", "neutral-50"],
  ["White", "#FFFFFF", "white"],
];

const typeScale = [
  ["Display 1", "Playfair Display", "48 / 56", "Bold", "Page titles", "display-one"],
  ["Display 2", "Playfair Display", "36 / 44", "Bold", "Section titles", "display-two"],
  ["Heading 1", "Inter", "28 / 36", "Semi Bold", "Card titles", "heading-one"],
  ["Heading 2", "Inter", "22 / 30", "Semi Bold", "Sub section", "heading-two"],
  ["Heading 3", "Inter", "18 / 26", "Medium", "Small titles", "heading-three"],
  ["Body Large", "Inter", "16 / 24", "Regular", "Body copy", "body-large"],
  ["Body", "Inter", "14 / 20", "Regular", "Supporting text", "body-normal"],
  ["Small", "Inter", "12 / 16", "Regular", "Captions, meta", "body-small"],
];

const spacing = [
  ["4", "0.25rem"],
  ["8", "0.5rem"],
  ["12", "0.75rem"],
  ["16", "1rem"],
  ["24", "1.5rem"],
  ["32", "2rem"],
  ["40", "2.5rem"],
  ["48", "3rem"],
  ["64", "4rem"],
];

const radius = [
  ["4px", "(xs)", "4px"],
  ["8px", "(sm)", "8px"],
  ["12px", "(md)", "12px"],
  ["16px", "(lg)", "16px"],
  ["24px", "(xl)", "24px"],
  ["Full", "(circle)", "50%"],
];

const shadows = [
  ["Sm", "0 1px 2px 0", "rgba(15, 23, 42, 0.05)"],
  ["Md", "0 4px 12px -2px", "rgba(15, 23, 42, 0.08)"],
  ["Lg", "0 12px 24px -4px", "rgba(15, 23, 42, 0.10)"],
  ["Xl", "0 20px 40px -8px", "rgba(15, 23, 42, 0.12)"],
];

const outlineIcons: IconName[] = [
  "bell",
  "search",
  "play",
  "file",
  "bookmark",
  "chart",
  "clock",
  "user",
  "chevron",
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-symbol" aria-hidden="true">
        <span />
      </span>
      <span>Vertex</span>
    </span>
  );
}

function ColorSwatches({
  colors,
}: {
  colors: typeof primaryColors | typeof neutralColors;
}) {
  return (
    <div className="swatch-grid">
      {colors.map(([name, value, className]) => (
        <div className="swatch" key={name}>
          <div className={`swatch-color ${className}`} />
          <span>{name}</span>
          <code>{value}</code>
        </div>
      ))}
    </div>
  );
}

function ButtonExample({
  kind,
  children,
  disabled = false,
}: {
  kind: "primary" | "secondary" | "tertiary" | "text";
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button className={`button-example ${kind}`} type="button" disabled={disabled}>
      {children}
      {kind === "tertiary" && <Icon name="external" />}
      {kind === "text" && <Icon name="play" />}
    </button>
  );
}

function DesignCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      <SectionTitle number={title.slice(0, 2)}>{title.slice(3)}</SectionTitle>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <main className="design-page">
      <section className="panel hero">
        <div className="hero-intro">
          <BrandMark />
          <h1>Design System</h1>
          <p>
            A unified design language for Vertex learning platform. Clean,
            modern and focused on clarity, consistency and intuitive learning
            experiences.
          </p>
          <div className="version">VERSION 1.0 <span>•</span> MAY 2025</div>
        </div>
        <div className="hero-colors">
          <SectionTitle number="01">Colors</SectionTitle>
          <h3 className="mini-heading">Primary</h3>
          <ColorSwatches colors={primaryColors} />
          <h3 className="mini-heading neutral-heading">Neutral</h3>
          <ColorSwatches colors={neutralColors} />
        </div>
      </section>

      <DesignCard title="02 Typography" className="typography panel">
        <div className="font-specimen">
          <span className="specimen display-font">Ag</span>
          <div>
            <h3 className="playfair">Playfair Display</h3>
            <p>Elegant <i>•</i> Readable <i>•</i> Timeless</p>
          </div>
        </div>
        <div className="font-specimen">
          <span className="specimen inter-font">Ag</span>
          <div>
            <h3>Inter</h3>
            <p>Clean <i>•</i> Modern <i>•</i> Highly legible</p>
          </div>
        </div>
      </DesignCard>

      <DesignCard title="03 Type Scale" className="type-scale panel">
        <div className="type-table" role="table" aria-label="Typography scale">
          <div className="type-row type-header" role="row">
            <span>Style</span>
            <span>Font</span>
            <span>Size / Line Height</span>
            <span>Weight</span>
            <span>Use</span>
          </div>
          {typeScale.map(([style, font, size, weight, use, className]) => (
            <div className="type-row" role="row" key={style}>
              <span className={className}>{style}</span>
              <span>{font}</span>
              <span>{size}</span>
              <span>{weight}</span>
              <span>{use}</span>
            </div>
          ))}
        </div>
      </DesignCard>

      <DesignCard title="04 Spacing System" className="spacing panel">
        <p className="panel-caption">Base unit: 4px</p>
        <div className="spacing-scale">
          {spacing.map(([size, rem]) => (
            <div className="space-token" key={size}>
              <span className="space-bar" style={{ height: `${Number(size)}px` }} />
              <strong>{size}</strong>
              <small>({rem})</small>
            </div>
          ))}
        </div>
      </DesignCard>

      <DesignCard title="05 Radius & Shadows" className="radius-shadow panel">
        <p className="panel-caption">Radius</p>
        <div className="radius-row">
          {radius.map(([size, label, value]) => (
            <div className="radius-token" key={label}>
              <span className="radius-shape" style={{ borderRadius: value }} />
              <strong>{size}</strong>
              <small>{label}</small>
            </div>
          ))}
        </div>
        <p className="panel-caption shadow-caption">Shadows</p>
        <div className="shadow-row">
          {shadows.map(([name, value, color]) => (
            <div
              className="shadow-token"
              key={name}
              style={{ boxShadow: `${value} ${color}` }}
            >
              <strong>{name}</strong>
              <span>{value}</span>
              <small>{color}</small>
            </div>
          ))}
        </div>
      </DesignCard>

      <DesignCard title="06 Icons" className="icons-panel panel">
        <p className="panel-caption">Outline Style</p>
        <div className="icon-row">
          {outlineIcons.map((name) => <Icon name={name} key={name} />)}
        </div>
        <p className="panel-caption filled-caption">Filled Style</p>
        <div className="icon-row filled-icons">
          {outlineIcons.map((name) => <Icon name={name} filled key={name} />)}
        </div>
        <p className="panel-caption icon-spec-title">Icon Specs</p>
        <ul className="compact-list">
          <li>24x24px grid</li>
          <li>2px stroke width (outline)</li>
          <li>Rounded line caps</li>
          <li>Consistent optical balance</li>
        </ul>
      </DesignCard>

      <DesignCard title="07 Buttons" className="buttons-panel panel">
        <div className="button-examples">
          <div className="button-headings">
            <span />
            <span>Primary</span>
            <span>Secondary</span>
            <span>Tertiary</span>
            <span>Text</span>
          </div>
          {(["Default", "Hover", "Disabled"] as const).map((state) => (
            <div className={`button-state ${state.toLowerCase()}`} key={state}>
              <span>{state}</span>
              <ButtonExample kind="primary">Get Started</ButtonExample>
              <ButtonExample kind="secondary">Explore Courses</ButtonExample>
              <ButtonExample kind="tertiary">View Lesson</ButtonExample>
              <ButtonExample kind="text">Watch Video</ButtonExample>
            </div>
          ))}
        </div>
        <p className="panel-caption button-spec-title">Button Specs</p>
        <ul className="compact-list button-specs">
          <li>Height: 44px (default)</li>
          <li>Padding: 0 16px (lg), 0 12px (md)</li>
          <li>Radius: 12px</li>
          <li>Font: Inter Medium (14–16px)</li>
        </ul>
      </DesignCard>

      <DesignCard title="08 Inputs" className="inputs-panel panel">
        <label className="panel-caption" htmlFor="search-demo">Search / Text Input</label>
        <div className="search-field">
          <Icon name="search" />
          <input id="search-demo" aria-label="Search anything" placeholder="Search anything..." />
          <kbd>⌘ K</kbd>
        </div>
        <label className="panel-caption select-label" htmlFor="sort-demo">Select</label>
        <select id="sort-demo" defaultValue="relevant">
          <option value="relevant">Most Relevant</option>
          <option value="newest">Newest</option>
        </select>
        <p className="panel-caption field-spec-title">Field Specs</p>
        <ul className="compact-list">
          <li>Height: 44px</li>
          <li>Radius: 12px</li>
          <li>Border: 1px solid #E2E8F0</li>
          <li>Padding: 0 16px</li>
          <li>Focus: Border color #FB923C</li>
        </ul>
      </DesignCard>

      <DesignCard title="09 Badges / Tags" className="badges-panel panel">
        <div className="badge-examples">
          <div><span>Video</span><strong className="badge video-badge">VIDEO</strong></div>
          <div><span>Lesson</span><strong className="badge lesson-badge">LESSON</strong></div>
          <div><span>Popular</span><strong className="badge popular-badge">POPULAR</strong></div>
        </div>
      </DesignCard>

      <DesignCard title="10 Status / Indicators" className="status-panel panel">
        <div className="status-items">
          <span><i className="status-ring" />In Progress</span>
          <span><i className="status-check"><Icon name="check" /></i>Completed</span>
          <span><i className="status-play"><Icon name="play" filled /></i>Now Playing</span>
          <span><Icon name="lock" />Locked</span>
        </div>
      </DesignCard>

      <DesignCard title="11 Progress Bar" className="progress-panel panel">
        <div className="progress-content">
          <div className="progress-track"><span /></div>
          <span className="progress-label"><strong>35%</strong> complete</span>
        </div>
      </DesignCard>

      <DesignCard title="12 Cards" className="cards-panel panel">
        <div className="card-examples">
          <div className="card-example">
            <span className="card-label">Course Card</span>
            <article className="sample-card course-card">
              <div className="course-logo">N</div>
              <div className="course-info">
                <h3>Next.js for Production</h3>
                <p>Build scalable, high-performance web applications with Next.js.</p>
              </div>
              <div className="card-meta">
                <span><Icon name="chart" />Intermediate</span>
                <span><Icon name="clock" />18h 24m</span>
                <span><Icon name="folder" />12 modules</span>
              </div>
            </article>
          </div>
          <div className="card-example">
            <span className="card-label">Lesson Card (Video)</span>
            <article className="sample-card lesson-video-card">
              <span className="badge video-badge">VIDEO</span>
              <h3>Data Fetching in Server Components</h3>
              <p>Learn how to fetch data on the server using async/await and Next.js best practices.</p>
              <div className="lesson-card-footer">
                <span>Lesson 5.1 <b>·</b> 12:45</span>
                <a href="#video-card"><Icon name="play" />Watch from 12:45</a>
              </div>
            </article>
          </div>
          <div className="card-example">
            <span className="card-label">Lesson Card (Lesson)</span>
            <article className="sample-card lesson-text-card">
              <span className="badge lesson-badge">LESSON</span>
              <h3>Data Fetching &amp; Caching</h3>
              <p>Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance.</p>
              <div className="lesson-card-footer">
                <span>Module 5</span>
                <a href="#lesson-card">View lesson <Icon name="external" /></a>
              </div>
            </article>
          </div>
          <div className="card-example">
            <span className="card-label">Resource Card</span>
            <article className="sample-card resource-card">
              <div className="resource-title"><Icon name="file" /><h3>Caching and Revalidation Guide</h3></div>
              <p>Deep dive into Next.js caching strategies.</p>
              <div className="lesson-card-footer"><span>PDF <b>·</b> 1.2 MB</span><Icon name="external" /></div>
            </article>
          </div>
        </div>
      </DesignCard>

      <section className="panel navigation-panel">
        <SectionTitle number="13">Navigation</SectionTitle>
        <div className="navigation-examples">
          <div className="nav-brand-area">
            <BrandMark compact />
            <a className="active" href="#courses">Courses</a>
            <a href="#learning">My Learning</a>
          </div>
          <div className="breadcrumbs-area">
            <span className="panel-caption">Breadcrumbs</span>
            <nav aria-label="Breadcrumbs">
              <a href="#all-courses">All Courses</a>
              <Icon name="chevron" />
              <a href="#next-course">Next.js for Production</a>
              <Icon name="chevron" />
              <span>Data Fetching &amp; Caching</span>
            </nav>
          </div>
          <div className="pagination-area">
            <span className="panel-caption">Pagination</span>
            <nav aria-label="Pagination">
              <button type="button" aria-label="Previous page"><Icon name="chevron" className="previous" /></button>
              <button type="button" className="current" aria-current="page">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <span>...</span>
              <button type="button">8</button>
              <button type="button" aria-label="Next page"><Icon name="chevron" /></button>
            </nav>
          </div>
        </div>
      </section>

      <section className="panel principles-panel">
        <SectionTitle number="14">Principles</SectionTitle>
        <div className="principle-list">
          <article>
            <Icon name="eye" />
            <div><h3>Clarity First</h3><p>Every element should communicate clearly.</p></div>
          </article>
          <article>
            <Icon name="grid" />
            <div><h3>Consistency</h3><p>Use components and patterns consistently across the platform.</p></div>
          </article>
          <article>
            <Icon name="target" />
            <div><h3>Focus &amp; Calm</h3><p>Remove noise and help learners focus on what matters.</p></div>
          </article>
          <article>
            <Icon name="accessibility" />
            <div><h3>Accessible</h3><p>Design with accessibility and inclusivity in mind.</p></div>
          </article>
        </div>
      </section>
    </main>
  );
}
