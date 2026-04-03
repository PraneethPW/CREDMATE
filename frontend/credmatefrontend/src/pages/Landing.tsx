import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Line,
  LineChart,
} from "recharts";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Quote,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";

/** Illustrative weekly series for demo charts (not live market data). */
const INDEX_SERIES = [
  { week: "W1", value: 4120 },
  { week: "W2", value: 4188 },
  { week: "W3", value: 4156 },
  { week: "W4", value: 4234 },
  { week: "W5", value: 4298 },
  { week: "W6", value: 4267 },
  { week: "W7", value: 4321 },
  { week: "W8", value: 4389 },
  { week: "W9", value: 4412 },
  { week: "W10", value: 4467 },
  { week: "W11", value: 4434 },
  { week: "W12", value: 4512 },
];

const SECTOR_BARS = [
  { sector: "FinTech", change: 4.2 },
  { sector: "SaaS", change: 2.8 },
  { sector: "Retail", change: 1.1 },
  { sector: "Energy", change: -0.6 },
  { sector: "Health", change: 3.4 },
];

const VOLATILITY_LINE = [
  { month: "Jan", vix: 14.2, spread: 1.02 },
  { month: "Feb", vix: 15.8, spread: 1.08 },
  { month: "Mar", vix: 16.4, spread: 1.11 },
  { month: "Apr", vix: 15.1, spread: 1.05 },
  { month: "May", vix: 14.6, spread: 0.99 },
  { month: "Jun", vix: 13.9, spread: 0.97 },
];

const testimonials = [
  {
    quote:
      "CredMate turned scattered receipts and proofs into a single reputation story our partners actually trust. Onboarding dropped from weeks to days.",
    name: "Priya Sharma",
    role: "Head of Partnerships",
    org: "Northwind Capital",
  },
  {
    quote:
      "The dashboard visuals make it obvious where we stand. Our risk team finally has a clear, auditable trail without another spreadsheet war.",
    name: "Marcus Chen",
    role: "Risk & Compliance Lead",
    org: "Helix Payments",
  },
  {
    quote:
      "We needed something that feels enterprise-grade but ships fast. CredMate nailed the balance—polished UI, solid API, no drama.",
    name: "Elena Vasquez",
    role: "CTO",
    org: "Brightline Labs",
  },
];

const chartTooltipStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.95)",
  border: "1px solid rgba(99, 102, 241, 0.35)",
  borderRadius: "8px",
  fontSize: "12px",
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[520px] w-[720px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[480px] w-[640px] rounded-full bg-violet-600/15 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.3),rgba(2,6,23,0.95))]" />
      </div>

      {/* Nav */}
      <header className="relative z-10 border-b border-white/5 bg-slate-950/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
              <Shield className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-semibold tracking-tight">CredMate</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            <a href="#markets" className="transition hover:text-white">
              Markets
            </a>
            <a href="#product" className="transition hover:text-white">
              Product
            </a>
            <a href="#testimonials" className="transition hover:text-white">
              Stories
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Proof-backed reputation for modern finance
            </p>
            <h1 className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl sm:leading-tight">
              Credit intelligence that looks as sharp as it performs
            </h1>
            <p className="mt-6 text-lg text-slate-400 sm:text-xl">
              Unify proofs, reputation, and market context in one professional workspace—built
              for teams who ship under scrutiny.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-xl transition hover:bg-slate-100 sm:w-auto"
              >
                Start free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#markets"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 sm:w-auto"
              >
                <BarChart3 className="h-4 w-4 text-indigo-400" />
                View sample markets
              </a>
            </div>
          </div>

          {/* Hero stats strip */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Uptime SLA", value: "99.99%" },
              { label: "Avg. proof time", value: "< 2 min" },
              { label: "Teams onboarded", value: "500+" },
              { label: "Regions", value: "12" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-slate-900/50 p-4 text-center backdrop-blur"
              >
                <div className="text-lg font-semibold text-white sm:text-xl">{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Market charts */}
        <section id="markets" className="border-y border-white/5 bg-slate-900/40 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Market pulse
                </h2>
                <p className="mt-2 max-w-xl text-slate-400">
                  Illustrative series for layout demos—swap in your live feeds when wired to
                  data providers.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <TrendingUp className="h-4 w-4" />
                <span>Sample indicators · not investment advice</span>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 shadow-xl backdrop-blur lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">
                    Composite trust index (12 weeks)
                  </h3>
                  <span className="text-xs text-slate-500">Indexed · rebased</span>
                </div>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={INDEX_SERIES} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="fillIndex" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity={0.45} />
                          <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                      <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} />
                      <YAxis
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        domain={["dataMin - 50", "dataMax + 30"]}
                      />
                      <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: "#e2e8f0" }} />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#818cf8"
                        strokeWidth={2}
                        fill="url(#fillIndex)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 shadow-xl backdrop-blur">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-white">Sector momentum</h3>
                  <p className="text-xs text-slate-500">% change (sample)</p>
                </div>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SECTOR_BARS} layout="vertical" margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" horizontal={false} />
                      <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} />
                      <YAxis
                        type="category"
                        dataKey="sector"
                        width={64}
                        tick={{ fill: "#cbd5e1", fontSize: 11 }}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={chartTooltipStyle}
                        formatter={(v) => {
                          const n = typeof v === "number" ? v : Number(v);
                          return [`${Number.isFinite(n) ? n.toFixed(1) : "—"}%`, "Change"];
                        }}
                      />
                      <Bar dataKey="change" radius={[0, 6, 6, 0]} fill="#a78bfa" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-5 shadow-xl backdrop-blur">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-white">Risk proxies (sample)</h3>
                  <p className="text-xs text-slate-500">Volatility index vs. credit spread</p>
                </div>
              </div>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={VOLATILITY_LINE} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                    <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} />
                    <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      axisLine={false}
                    />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Legend
                      wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                      formatter={(value) =>
                        value === "vix" ? "Volatility proxy" : "Credit spread"
                      }
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="vix"
                      stroke="#38bdf8"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="spread"
                      stroke="#f472b6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Product */}
        <section id="product" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Everything your reviewers expect—nothing they do not
              </h2>
              <ul className="mt-8 space-y-4">
                {[
                  "Cryptographic proofs tied to reputation scores your partners can verify.",
                  "Dashboards that read executive-ready on day one—dark mode included.",
                  "API-first design so you can embed trust signals where decisions happen.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/80 to-slate-900/80 p-8 shadow-2xl">
              <div className="flex items-center gap-3 text-indigo-300">
                <Shield className="h-6 w-6" />
                <span className="text-sm font-semibold uppercase tracking-wider">CredMate stack</span>
              </div>
              <p className="mt-4 text-slate-300">
                Upload proofs, watch your reputation move, and export audit trails without leaving
                the browser. Built for velocity without cutting corners on compliance posture.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                  <div className="text-xs text-slate-500">Encryption</div>
                  <div className="font-medium text-white">At rest & in transit</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                  <div className="text-xs text-slate-500">Access</div>
                  <div className="font-medium text-white">Role-based</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="border-t border-white/5 bg-slate-900/30 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Trusted by teams who ship under pressure
              </h2>
              <p className="mt-3 text-slate-400">
                Real workflows from product, risk, and engineering leaders—summarized for
                clarity.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure
                  key={t.name}
                  className="flex flex-col rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-lg backdrop-blur transition hover:border-indigo-500/30"
                >
                  <Quote className="h-8 w-8 text-indigo-500/50" aria-hidden />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 border-t border-white/10 pt-4">
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-slate-500">
                      {t.role} · {t.org}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-24 pt-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-600/90 via-violet-600/80 to-indigo-700/90 px-8 py-14 text-center shadow-2xl shadow-indigo-900/40">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <h2 className="relative text-2xl font-bold text-white sm:text-3xl">
              Ready to make reputation measurable?
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-indigo-100">
              Join CredMate and give your partners a proof-backed view they can trust.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
              >
                Create account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="text-sm font-semibold text-white/90 underline-offset-4 hover:underline"
              >
                I already have access
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-slate-950 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-slate-600" />
            <span>© {new Date().getFullYear()} CredMate</span>
          </div>
          <div className="flex gap-6">
            <Link to="/login" className="transition hover:text-slate-300">
              Log in
            </Link>
            <Link to="/signup" className="transition hover:text-slate-300">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
