import type { Project } from "@/data/portfolio";

/* Stylised UI previews drawn with plain elements, so no screenshots are needed. */

function Sidebar() {
  return (
    <div className="pm-side">
      <span className="pm-dot" />
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className={i === 1 ? "pm-line pm-line--active" : "pm-line"} />
      ))}
    </div>
  );
}

function Dashboard() {
  const bars = [42, 68, 55, 80, 62, 92, 74, 58, 86];
  return (
    <div className="pm-app">
      <Sidebar />
      <div className="pm-body">
        <div className="pm-row">
          {["₹9.57 Cr", "40,000+", "200K+"].map((v) => (
            <div key={v} className="pm-kpi">
              <span className="pm-tiny" />
              <b>{v}</b>
            </div>
          ))}
        </div>
        <div className="pm-row pm-grow">
          <div className="pm-panel pm-bars">
            {bars.map((h, i) => (
              <span key={i} className="pm-bar" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="pm-panel pm-donut-wrap">
            <div className="pm-donut" />
            <span className="pm-tiny" />
            <span className="pm-tiny pm-tiny--short" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Notes() {
  return (
    <div className="pm-app">
      <Sidebar />
      <div className="pm-body">
        <div className="pm-row">
          <div className="pm-panel pm-wave">
            {Array.from({ length: 28 }).map((_, i) => (
              <span key={i} style={{ height: `${20 + Math.abs(Math.sin(i * 1.7)) * 70}%` }} />
            ))}
          </div>
        </div>
        <div className="pm-row pm-grow">
          <div className="pm-panel pm-chat">
            <p className="pm-msg">
              <i>Dr</i> Since when the fever?
            </p>
            <p className="pm-msg pm-msg--alt">
              <i>Pt</i> Three days, with cough.
            </p>
            <p className="pm-msg">
              <i>Dr</i> Any breathlessness?
            </p>
          </div>
          <div className="pm-panel pm-emr">
            <b>EMR Note</b>
            <span className="pm-tiny" />
            <span className="pm-tiny pm-tiny--short" />
            <div className="pm-tags">
              <em>ICD-10 R50.9</em>
              <em>J06.9</em>
            </div>
            <span className="pm-tiny" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TryOn() {
  return (
    <div className="pm-app">
      <Sidebar />
      <div className="pm-body">
        <div className="pm-row pm-grow">
          <div className="pm-panel pm-photo">
            <div className="pm-figure" />
            <small>Input</small>
          </div>
          <div className="pm-arrow">→</div>
          <div className="pm-panel pm-photo pm-photo--out">
            <div className="pm-figure pm-figure--dress" />
            <small>Try-on</small>
          </div>
        </div>
        <div className="pm-row">
          {["fal.ai", "OpenAI", "Gemini"].map((e, i) => (
            <div key={e} className={i === 0 ? "pm-engine pm-engine--on" : "pm-engine"}>
              {e}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectMock({ kind }: { kind: Project["kind"] }) {
  return (
    <div className="pm-stage">
      <div className="pm-tilt">
        <div className="pm-card pm-card--ghost" />
        <div className="pm-card">
          {kind === "dashboard" && <Dashboard />}
          {kind === "notes" && <Notes />}
          {kind === "tryon" && <TryOn />}
        </div>
      </div>
    </div>
  );
}
