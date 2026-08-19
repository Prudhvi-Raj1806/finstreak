/**
 * DESIGN REMINDER — Calm Financial Companion:
 * This page stages a warm-white, emerald-led personal-finance mobile app inside one physical phone.
 * Preserve compact editorial grouping, clear financial hierarchy, soft elevation, and reassuring copy.
 */
import { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Bell,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CircleUserRound,
  Crown,
  Flame,
  Gift,
  Goal,
  HandCoins,
  Home as HomeIcon,
  Info,
  Landmark,
  Lightbulb,
  LineChart,
  LockKeyhole,
  Menu,
  Moon,
  MoreHorizontal,
  PiggyBank,
  Plus,
  ReceiptText,
  RefreshCw,
  ScanLine,
  Send,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

type Screen =
  | "home"
  | "transactions"
  | "fin-ai"
  | "insights"
  | "more"
  | "r-streak"
  | "settings";

const AI_COACH = "/manus-storage/finella-ai-coach_4d4828f7.png";
const FOREST_TEXTURE = "/manus-storage/finella-forest-texture_64222cdd.png";
const FIRE_ART = "/manus-storage/streak-fire-illustration_b7b9ef01.png";
const MILESTONE_ART = "/manus-storage/milestone-landscape_a154cbfb.png";
const SPARK_MARK = "/manus-storage/finella-spark-mark_4a3860f1.png";

const money = (value: string) => <span className="money">₹{value}</span>;

function MiniIcon({ icon: Icon, tone = "green" }: { icon: LucideIcon; tone?: "green" | "mint" | "gold" | "coral" | "lilac" | "blue" }) {
  return (
    <span className={`mini-icon ${tone}`}>
      <Icon size={16} strokeWidth={2.2} />
    </span>
  );
}

function ProgressBar({ value, color = "green", thin = false }: { value: number; color?: "green" | "coral" | "gold" | "purple" | "blue"; thin?: boolean }) {
  return (
    <span className={`progress-track ${thin ? "thin" : ""}`}>
      <span className={`progress-fill ${color}`} style={{ width: `${value}%` }} />
    </span>
  );
}

function SmallLabel({ children }: { children: React.ReactNode }) {
  return <div className="small-label">{children}</div>;
}

function AppHeader({
  title,
  subtitle,
  onBack,
  right,
}: {
  title: React.ReactNode;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  return (
    <header className="app-header">
      <div className="header-leading">
        {onBack ? (
          <button className="round-control back-control" aria-label="Go back" onClick={onBack}>
            <ArrowLeft size={21} />
          </button>
        ) : null}
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      {right ? <div className="header-actions">{right}</div> : null}
    </header>
  );
}

function FinScoreCard({ onDetails }: { onDetails: () => void }) {
  return (
    <section className="card score-card">
      <div className="score-summary">
        <SmallLabel>Finscore <Info size={13} /></SmallLabel>
        <div className="score-number">82</div>
        <strong>Excellent</strong>
        <span className="score-change"><TrendingUp size={14} /> 12 points this month</span>
      </div>
      <div className="score-ring-wrap">
        <div className="score-ring"><span><TrendingUp size={29} /></span></div>
        <p>You’re doing<br /><strong>great!</strong></p>
      </div>
      <div className="score-breakdown">
        {([
          [WalletCards, "Spending", "78"],
          [PiggyBank, "Savings", "86"],
          [LineChart, "Investments", "88"],
          [ReceiptText, "Debt", "72"],
        ] as Array<[LucideIcon, string, string]>).map(([Icon, label, value], index) => {
          const MetricIcon = Icon as LucideIcon;
          return <div className="score-item" key={index}><MiniIcon icon={MetricIcon} /><span>{label}</span><b>{value}/100</b></div>;
        })}
        <button className="text-link align-right" onClick={onDetails}>View details <ChevronRight size={16} /></button>
      </div>
    </section>
  );
}

function HomeScreen({ navigate, notify }: { navigate: (screen: Screen) => void; notify: (message: string) => void }) {
  const [activityExpanded, setActivityExpanded] = useState(false);
  return (
    <>
      <AppHeader
        title={<><span className="greeting">Welcome back,</span><br />Prudhvi <ChevronDown size={18} className="title-chevron" /></>}
        right={<><button className="round-control notification-dot" aria-label="Notifications"><Bell size={20} /></button><button className="round-control" aria-label="Add transaction" onClick={() => notify("New transaction entry opened") }><Plus size={22} /></button></>}
      />
      <div className="app-scroll home-scroll">
        <FinScoreCard onDetails={() => navigate("insights")} />

        <section className="card streak-preview">
          <div className="section-topline"><SmallLabel>R-Streak <Info size={13} /></SmallLabel><button className="text-link" onClick={() => navigate("r-streak")}>View calendar <ChevronRight size={15} /></button></div>
          <div className="streak-summary">
            <div className="flame-badge"><Flame size={30} fill="currentColor" /></div>
            <div><span className="streak-number">18</span> <strong>days</strong><p>Keep it up! Consistency builds freedom.</p></div>
            <div className="streak-side"><span>Longest Streak</span><b>23 <em>days</em></b><span>This Month</span><b>18<em>/31 days</em></b></div>
          </div>
          <div className="week-mini">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, dayIndex) => <div className="mini-day" key={dayIndex}><span>{day}</span><i /><i /><i className={dayIndex === 4 ? "missed" : ""} /></div>)}
          </div>
        </section>

        <section className="section-block networth-block">
          <div className="section-heading"><div><SmallLabel><span className="numbered-label">1</span> What do I have?</SmallLabel><h2>Liquid Net Worth <Info size={14} /></h2></div><button className="text-link" onClick={() => navigate("insights")}>View all <ChevronRight size={15} /></button></div>
          <div className="networth-value">{money("2,48,500")}</div>
          <div className="networth-trend"><span><TrendingUp size={14} /> ₹12,450 (5.28%) vs last month</span><svg viewBox="0 0 300 55" aria-hidden="true"><path d="M0 48 C25 49 28 30 55 35 S85 22 110 29 S140 10 165 20 S195 26 215 9 S250 27 270 10 S285 7 300 0" /></svg></div>
          <div className="asset-row">
            {([[Landmark, "Bank Accounts", "2,85,000", "green"], [LineChart, "Investments", "48,500", "mint"], [WalletCards, "Cash", "12,000", "gold"], [WalletCards, "Credit Cards", "-18,500", "coral"], [CircleUserRound, "Loans", "-18,000", "coral"]] as Array<[LucideIcon, string, string, "green" | "mint" | "gold" | "coral"]>).map(([Icon, label, value, tone], index) => <button key={index} className="asset-tile" onClick={() => notify(`${label} snapshot selected`)}><MiniIcon icon={Icon} tone={tone} /><span>{label}</span><b className={String(value).startsWith("-") ? "negative" : ""}>₹{value}</b></button>)}
          </div>
        </section>

        <div className="home-two-col">
          <section className="section-block activity-block">
            <div className="section-heading"><div><SmallLabel><span className="numbered-label">2</span> What happened?</SmallLabel><h2>Recent Activity</h2></div><button className="text-link" onClick={() => navigate("transactions")}>View all</button></div>
            {([[ArrowDownLeft, "Salary", "Income • HDFC Bank", "+₹45,000", "mint"], [ShoppingBag, "Swiggy", "Food & Dining • HDFC", "-₹420", "gold"], [ShoppingBag, "Amazon", "Shopping • ICICI", "-₹1,299", "lilac"], [Banknote, "Starbucks", "Food & Dining • HDFC", "-₹250", "green"]] as Array<[LucideIcon, string, string, string, "green" | "mint" | "gold" | "lilac"]>).slice(0, activityExpanded ? 4 : 3).map(([Icon, title, sub, value, tone], index) => <div className="transaction-row" key={index}><MiniIcon icon={Icon} tone={tone} /><div><b>{title}</b><span>{sub}</span></div><strong className={String(value).startsWith("+") ? "positive" : ""}>{value}</strong></div>)}
            <button className="pale-callout" onClick={() => setActivityExpanded((current) => !current)}><Lightbulb size={15} /> {activityExpanded ? "Show fewer transactions" : "12 uncategorized transactions"} <ChevronRight size={15} /></button>
          </section>
          <section className="section-block upcoming-block">
            <div className="section-heading"><div><SmallLabel><span className="numbered-label">3</span> What is going to happen?</SmallLabel><h2>Upcoming</h2></div><button className="text-link" onClick={() => navigate("transactions")}>View all</button></div>
            {[['Aug', '20', 'Netflix', 'Entertainment', '649'], ['Aug', '25', 'Rent', 'Housing', '18,000'], ['Aug', '28', 'Phone Bill', 'Utilities', '799']].map(([month, date, title, sub, amount]) => <div className="upcoming-row" key={title}><MiniIcon icon={CalendarDays} tone="mint" /><span className="date-cube">{month}<b>{date}</b></span><div><b>{title}</b><span>{sub}</span></div><strong>₹{amount}</strong></div>)}
            <button className="forecast-card" onClick={() => navigate("insights")}><span>Month-end Forecast <Info size={12} /><small>Expected balance on Aug 31</small></span><b>₹1,62,400 <em>↑ ₹8,250 vs this month</em></b><svg viewBox="0 0 120 35" aria-hidden="true"><path d="M0 30 C12 17 18 25 28 20 S44 27 60 15 S77 20 86 9 S105 14 120 0" /></svg></button>
          </section>
        </div>

        <section className="section-block progress-block">
          <div className="section-heading"><div><SmallLabel><span className="numbered-label">4</span> Am I doing okay?</SmallLabel><h2>Your Progress</h2></div><button className="text-link" onClick={() => navigate("insights")}>View all insights <ChevronRight size={15} /></button></div>
          <div className="progress-layout">
            <div className="tracking-note"><span className="check-dot"><Check size={16} /></span><div><b>You’re on track this month!</b><p>You’ve spent ₹8,420 less than your usual monthly spending.</p></div></div>
            {[["Budget", "81%", "used"], ["Savings", "32%", "of income"], ["Goal: Emergency Fund", "72%", "complete"]].map(([label, value, sub], index) => <div className="donut-stat" key={label}><span>{label}</span><div className={`mini-donut donut-${index}`}><b>{value}</b><small>{sub}</small></div></div>)}
          </div>
        </section>
      </div>
    </>
  );
}

function RStreakScreen({ goBack, notify }: { goBack: () => void; notify: (message: string) => void }) {
  const [goal, setGoal] = useState(250);
  const [days, setDays] = useState(0);
  const squares = Array.from({ length: 49 }, (_, index) => index);
  return (
    <>
      <AppHeader title={<>R-Streak <span className="title-fire">🔥</span></>} onBack={goBack} right={<button className="round-control" aria-label="How streaks work"><CircleHelp size={21} /></button>} />
      <div className="app-scroll r-streak-scroll">
        <button className="reconcile-banner" onClick={() => { setDays((current) => current + 1); notify("Accounts reconciled — your streak moved forward") }}><span className="target-emoji">🎯</span><span><b>Reconcile Today’s Accounts</b><small>Stay consistent. Build your streak.</small></span><ChevronRight size={26} /></button>
        <section className="fire-hero" style={{ backgroundImage: `linear-gradient(120deg, rgba(0,66,30,.96), rgba(9,101,45,.84)), url(${FOREST_TEXTURE})` }}>
          <div className="hero-streak-ring"><span>{days}</span><small>Days</small></div>
          <div className="fire-hero-copy"><h2>You’re on fire, let’s<br /><strong>build the streak!</strong></h2><b><em>{days}</em> / {goal} Days</b><ProgressBar value={(days / goal) * 100} /><p>{Math.max(goal - days, 0)} days to go! <ArrowUpRight size={19} /></p></div>
          <img src={FIRE_ART} alt="Illustrated flame" className="fire-illustration" />
        </section>
        <section className="card year-card">
          <div className="section-heading"><h2><CalendarDays size={23} /> Your Progress</h2><button className="filter-button">This Year <ChevronDown size={15} /></button></div>
          <div className="weekday-line">{["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <span key={index}>{day}</span>)}</div>
          <div className="year-grid">{squares.map((square) => <i key={square} className={square < days ? "done" : ""} />)}</div>
          <div className="heat-scale"><span>Less</span><i /><i /><i /><i /><i /><span>More</span></div>
          <div className="streak-stats"><div><b>🔥 {days} days</b><span>Current Streak</span></div><div><b>🏆 {Math.max(days, 0)} days</b><span>Longest Streak</span></div><div><b>📅 {days} days</b><span>Total Days</span></div></div>
        </section>
        <section className="rewards-section"><div className="section-heading"><h2>🎁 &nbsp;Reward Milestones</h2><button className="text-link" onClick={() => notify("Milestone catalog opened")}>See all</button></div><div className="reward-row">{[["🏅", "50 Days", "Exclusive Badge", 50], ["💰", "100 Days", "Cashback Reward", 100], ["⭐", "250 Days", "Free Premium + Tax Returns", 250]].map(([emoji, title, sub, target]) => <button className={`reward-card ${goal === target ? "highlighted" : ""}`} key={String(target)} onClick={() => setGoal(Number(target))}><span>{emoji}</span><b>{title}</b><small>{sub}</small><strong>{days} / {target} days</strong><ProgressBar value={(days / Number(target)) * 100} thin /></button>)}</div></section>
        <section className="goal-section"><h2>🎯 &nbsp;Set your goal</h2><p>Choose your streak target and challenge yourself.</p><div>{[50, 100, 250].map((value) => <button key={value} className={`goal-button ${goal === value ? "selected" : ""}`} onClick={() => { setGoal(value); notify(`${value}-day streak goal selected`) }}>{goal === value && <Check size={16} />}<b>{value}</b><span>Days</span></button>)}</div></section>
        <div className="streak-footer"><Lightbulb size={24} /><span><b>Consistency today, freedom tomorrow.</b><small>Show up for yourself.</small></span><img src={MILESTONE_ART} alt="Mountain milestone landscape" /></div>
      </div>
    </>
  );
}

function TransactionsScreen({ goBack, notify }: { goBack: () => void; notify: (message: string) => void }) {
  const [filter, setFilter] = useState("All");
  const transactions: Array<[string, LucideIcon, string, string, string, "green" | "mint" | "gold" | "lilac" | "blue"]> = [
    ["Today", ArrowDownLeft, "Salary", "HDFC Bank", "+₹45,000", "mint"],
    ["Today", ShoppingBag, "Swiggy", "Food & Dining", "-₹420", "gold"],
    ["Yesterday", ShoppingBag, "Amazon", "Shopping", "-₹1,299", "lilac"],
    ["Aug 16", Banknote, "Starbucks", "Food & Dining", "-₹250", "green"],
    ["Aug 15", ReceiptText, "Netflix", "Entertainment", "-₹649", "blue"],
    ["Aug 15", Landmark, "Rent", "Housing", "-₹18,000", "mint"],
  ];
  return (
    <>
      <AppHeader title="Transactions" subtitle="Track every move with clarity." onBack={goBack} right={<button className="round-control" onClick={() => notify("Add transaction entry opened")}><Plus size={22} /></button>} />
      <div className="app-scroll transaction-screen">
        <div className="balance-strip"><span>Available to spend</span><b>₹11,550</b><small><TrendingUp size={13} /> ₹2,120 more than last week</small></div>
        <div className="filter-row">{["All", "Income", "Expenses"].map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}<button className="filter-more"><CalendarDays size={16} /> Aug 2026 <ChevronDown size={14} /></button></div>
        <section className="transaction-list card">
          <div className="list-header"><h2>Recent activity</h2><button className="text-link" onClick={() => notify("Transaction search activated")}>Search</button></div>
          {transactions.filter((entry) => filter === "All" || (filter === "Income" ? String(entry[4]).startsWith("+") : String(entry[4]).startsWith("-"))).map(([date, Icon, title, sub, amount, tone], index) => <button className="full-transaction" key={index} onClick={() => notify(`${title} transaction details opened`)}><span className="transaction-date">{date}</span><MiniIcon icon={Icon as LucideIcon} tone={tone as "green" | "mint" | "gold" | "lilac" | "blue"} /><span className="transaction-name"><b>{title}</b><small>{sub}</small></span><strong className={String(amount).startsWith("+") ? "positive" : ""}>{amount}</strong><ChevronRight size={16} /></button>)}
        </section>
        <button className="transaction-insight" onClick={() => notify("Insight saved to your Fin AI feed")}><Lightbulb size={20} /><span><b>You spent ₹3,040 more this month.</b><small>See the three categories driving the change.</small></span><ChevronRight size={18} /></button>
      </div>
    </>
  );
}

function InsightsScreen({ notify }: { notify: (message: string) => void }) {
  const [tab, setTab] = useState<"category" | "tag">("category");
  const budgets: Array<[string, string, number, "green" | "coral" | "gold" | "purple" | "blue", string, LucideIcon]> = [["Food & Dining", "6,420 of ₹8,000", 80, "coral", "Over by ₹420", ShoppingBag], ["Shopping", "3,800 of ₹4,000", 95, "gold", "Over by ₹200", ShoppingBag], ["Transport", "4,120 of ₹5,000", 82, "green", "₹880 left", Banknote], ["Entertainment", "1,649 of ₹2,000", 82, "purple", "₹351 left", Gift], ["Bills & Utilities", "6,861 of ₹9,000", 76, "blue", "₹2,139 left", ReceiptText]];
  return (
    <>
      <AppHeader title={<><Sparkles size={23} className="heading-sparkle" /> Insights</>} subtitle="Understand. Improve. Win." right={<button className="date-selector"><CalendarDays size={17} /> Aug 2026 <ChevronDown size={15} /></button>} />
      <div className="app-scroll insight-screen">
        <section className="card budget-card">
          <div className="section-heading"><h2>Budgets</h2><button className="text-link" onClick={() => notify("Full budget view opened")}>View more <ArrowRight size={16} /></button></div>
          <div className="segmented-control"><button className={tab === "category" ? "active" : ""} onClick={() => setTab("category")}><Goal size={15} /> Budget by Category</button><button className={tab === "tag" ? "active" : ""} onClick={() => setTab("tag")}><Target size={15} /> Budget by Tag</button></div>
          <div className="budget-totals"><div><span>Total Budget</span><b>₹40,000</b><small>This month</small></div><div><span>Spent</span><b className="negative">₹28,450</b><small>71% used</small></div><div><span>Remaining</span><b className="positive">₹11,550</b><small>29% left</small></div></div>
          <ProgressBar value={71} />
          <div className="budget-lines">{budgets.map(([label, sub, value, color, caption, Icon]) => <button className="budget-line" key={String(label)} onClick={() => notify(`${label} budget details opened`)}><MiniIcon icon={Icon as LucideIcon} tone={color === "coral" ? "coral" : color === "gold" ? "gold" : color === "purple" ? "lilac" : color === "blue" ? "blue" : "mint"} /><span><b>{label}</b><small>{sub}</small><ProgressBar value={Number(value)} color={color as "green" | "coral" | "gold" | "purple" | "blue"} thin /></span><strong className={Number(value) > 90 ? "negative" : ""}>{value}%<em>{caption}</em></strong><ChevronRight size={15} /></button>)}</div>
          <button className="budget-all-link" onClick={() => notify("All budget categories opened")}>View all categories <ArrowRight size={16} /></button>
        </section>
        <section className="card alert-card"><div className="section-heading"><h2>Budget Alerts</h2><button className="text-link" onClick={() => notify("All alerts opened")}>View all <ArrowRight size={15} /></button></div><div className="alert-row"><span>🍴 <b>Food is over budget</b><em>by ₹420</em></span><span>👜 <b>Shopping is over budget</b><em>by ₹200</em></span><span>📄 <b>Bills & Utilities</b><em>70% used</em></span></div></section>
        <section className="goals-section"><div className="section-heading"><h2>Goals</h2><button className="text-link" onClick={() => notify("Goal dashboard opened")}>View all <ArrowRight size={15} /></button></div><div className="goal-cards">{([[ShieldCheck, "Emergency Fund", "68,000", "1,00,000", 68, "green"], [Banknote, "MacBook Fund", "72,000", "1,20,000", 60, "gold"], [Goal, "Goa Trip", "24,000", "50,000", 48, "purple"]] as Array<[LucideIcon, string, string, string, number, "green" | "gold" | "purple"]>).map(([Icon, title, amount, target, progress, color]) => <button className="card goal-card" key={title} onClick={() => notify(`${title} goal selected`)}><MiniIcon icon={Icon} tone={color === "gold" ? "gold" : color === "purple" ? "lilac" : "mint"} /><b>{title}</b><strong>₹{amount}</strong><span>of ₹{target}</span><ProgressBar value={progress} color={color} thin /><small>{progress}%</small></button>)}</div></section>
        <section className="card spend-analysis"><div className="section-heading"><h2>Spending Analysis <Info size={14} /></h2><span>vs last month</span></div><div className="analysis-body"><div><span>Total Spending</span><b>₹28,450</b><small className="negative">▲ 12%</small><p>You spent <strong>₹3,040</strong> more than last month.</p></div><div>{budgets.map(([label, , value, color]) => <div className="analysis-line" key={String(label)}><span>{label}</span><ProgressBar value={Number(value)} color={color as "green" | "coral" | "gold" | "purple" | "blue"} thin /><b className={color === "green" ? "positive" : "negative"}>{color === "green" ? "▼ 8%" : "▲"}</b></div>)}</div></div><button className="pale-callout" onClick={() => notify("Food spending explanation opened")}><Lightbulb size={15} /> Your food spending is 34% higher than last month. <ChevronRight size={15} /></button></section>
        <section className="moves-card"><div><h2>Your Top 3 Moves <Info size={14} /></h2>{[["01", "Reduce food spending", "₹2,400"], ["02", "Cancel unused subscriptions", "₹1,847"], ["03", "Move ₹5,000 to savings on payday", "₹3,000"]].map(([num, task, saving]) => <button key={num} onClick={() => notify(`${task} added to your plan`)}><span>{num}</span><b>{task}</b><em>{saving} /mo</em></button>)}</div><aside><span>Potential monthly improvement</span><b>₹7,240</b><button onClick={() => notify("Action plan started")}>Take action <ChevronRight size={17} /></button></aside></section>
      </div>
    </>
  );
}

function MoreScreen({ navigate, notify }: { navigate: (screen: Screen) => void; notify: (message: string) => void }) {
  const management: Array<[LucideIcon, string, string]> = [[ReceiptText, "Tax Returns", "File & manage"], [PiggyBank, "Money Saving", "Track savings"], [WalletCards, "Documents", "Store & organize"], [Landmark, "Net Worth", "Track overall value"], [LineChart, "Investments", "Track portfolio"], [Goal, "Goals", "Track your goals"], [Goal, "Budgets", "Manage budgets"], [RefreshCw, "Recurring", "Manage bills"], [Target, "Categories & Tags", "Manage your labels"]];
  return (
    <>
      <AppHeader title="More" subtitle="Everything you need. All in one place." right={<button className="round-control notification-dot"><Bell size={20} /></button>} />
      <div className="app-scroll more-screen">
        <button className="profile-card" style={{ backgroundImage: `linear-gradient(105deg, rgba(7,72,33,.98), rgba(11,99,47,.88)), url(${FOREST_TEXTURE})` }} onClick={() => navigate("settings")}><span className="profile-orb">P<Check size={15} /></span><span><b>Prudhvi Raj</b><small>Financial Score <Info size={13} /></small><strong>82 <em>/100</em></strong><i><TrendingUp size={15} /> Great job! Keep it up.</i></span><svg viewBox="0 0 170 50" aria-hidden="true"><path d="M0 44 C18 35 32 40 46 33 S76 39 94 25 S118 31 134 15 S154 15 170 0" /></svg><ChevronRight size={23} /></button>
        <SmallLabel>Quick actions</SmallLabel><div className="quick-actions">{([[LineChart, "Reports", "See insights", "mint"], [ArrowRight, "Split", "Expenses", "mint"], [Settings, "Settings", "Manage app", "lilac"], [CircleHelp, "Help & Support", "Get help", "coral"]] as Array<[LucideIcon, string, string, "mint" | "lilac" | "coral"]>).map(([Icon, title, sub, tone]) => <button key={title} onClick={() => title === "Settings" ? navigate("settings") : notify(`${title} opened`)}><MiniIcon icon={Icon} tone={tone} /><b>{title}</b><small>{sub}</small></button>)}</div>
        <SmallLabel>Manage finances</SmallLabel><div className="manage-grid">{management.map(([Icon, title, sub]) => <button key={title} onClick={() => notify(`${title} opened`)}><MiniIcon icon={Icon} tone="mint" /><b>{title}</b><small>{sub}</small><ChevronRight size={16} /></button>)}</div>
        <SmallLabel>More tools</SmallLabel><section className="card tools-card">{([[ShieldCheck, "Security & Privacy", "Manage security, passcode, data & more", "mint"], [Banknote, "Backup & Restore", "Backup your data and restore anytime", "blue"], [Info, "About Finella", "App info, terms & policies", "lilac"]] as Array<[LucideIcon, string, string, "mint" | "blue" | "lilac"]>).map(([Icon, title, sub, tone]) => <button key={title} onClick={() => notify(`${title} opened`)}><MiniIcon icon={Icon} tone={tone} /><span><b>{title}</b><small>{sub}</small></span><ChevronRight size={17} /></button>)}</section>
      </div>
    </>
  );
}

function Toggle({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return <button aria-label={label} className={`toggle ${active ? "on" : ""}`} onClick={onClick}><span /></button>;
}

function SettingsScreen({ goBack, darkMode, setDarkMode, notify }: { goBack: () => void; darkMode: boolean; setDarkMode: (value: boolean) => void; notify: (message: string) => void }) {
  const [manualEntry, setManualEntry] = useState(true);
  const [push, setPush] = useState(true);
  const accountItems: Array<[LucideIcon, string, string, "mint" | "gold" | "coral"]> = [[CircleUserRound, "Profile", "Personal information & preferences", "mint"], [Crown, "Subscription", "Manage your plan and billing", "gold"], [WalletCards, "Account", "Manage your account settings", "mint"], [Goal, "Budget", "Manage budget categories", "mint"], [ArrowRight, "Sign out", "Log out from your account", "coral"]];
  const dataItems: Array<[LucideIcon, string, string, string]> = [[ScanLine, "Manual Entry", "Add transactions manually", "toggle"], [ReceiptText, "SMS Parsing", "Extract transactions from SMS", "Active"], [Landmark, "Bank Sync", "Connect your bank accounts", "Connect"], [RefreshCw, "Email Parsing", "Extract transactions from emails", "Active"], [Sparkles, "Auto-Transactions", "Automatically detect transactions", "Connect"], [ReceiptText, "PDF Statement", "Upload & parse bank statements", ""]];
  return (
    <>
      <AppHeader title="Settings" subtitle="Manage your account, preferences & more." onBack={goBack} right={<button className="help-pill" onClick={() => notify("Help & Support opened")}><CircleHelp size={17} /> Help & Support</button>} />
      <div className="app-scroll settings-screen">
        <section className="card settings-profile"><button onClick={() => notify("Profile editor opened")}><MiniIcon icon={CircleUserRound} tone="mint" /><span><b>Raj Prudhvi</b><small>Manage your profile & account</small></span><ChevronRight size={19} /></button><div><MiniIcon icon={Crown} tone="gold" /><span><b>Premium Plan</b><small>You’re enjoying all Premium features</small></span><em><Check size={13} /> Active</em><ChevronRight size={18} /></div></section>
        <h2 className="settings-label">Account</h2><section className="card settings-list">{accountItems.map(([Icon, title, sub, tone]) => <button key={title} onClick={() => title === "Sign out" ? notify("Sign-out confirmation requested") : notify(`${title} settings opened`)}><MiniIcon icon={Icon} tone={tone} /><span><b>{title}</b><small>{sub}</small></span>{title === "Subscription" ? <em>Active</em> : null}<ChevronRight size={17} /></button>)}</section>
        <div className="settings-columns"><div><h2 className="settings-label">Data & Sync <span><ShieldCheck size={13} /> Your data is private & secure</span></h2><section className="card settings-list compact">{dataItems.map(([Icon, title, sub, action]) => <button key={title} onClick={() => action === "toggle" ? setManualEntry(!manualEntry) : notify(`${title} setup opened`)}><MiniIcon icon={Icon} tone="mint" /><span><b>{title}</b><small>{sub}</small></span>{action === "toggle" ? <Toggle active={manualEntry} onClick={() => setManualEntry(!manualEntry)} label="Toggle manual entry" /> : action ? <em>{action}</em> : null}{action !== "toggle" ? <ChevronRight size={16} /> : null}</button>)}</section></div>
          <div><h2 className="settings-label">AI Preferences</h2><section className="card settings-list compact"><button onClick={() => notify("WhatsApp notification preferences opened")}><MiniIcon icon={Send} tone="mint" /><span><b>WhatsApp Notifications</b><small>Receive alerts on WhatsApp</small></span><Toggle active={false} onClick={() => notify("WhatsApp notifications toggled")} label="Toggle WhatsApp notifications" /></button><button onClick={() => setPush(!push)}><MiniIcon icon={Bell} tone="mint" /><span><b>Push Notifications</b><small>Get notified instantly</small></span><Toggle active={push} onClick={() => setPush(!push)} label="Toggle push notifications" /></button><button onClick={() => notify("Alert frequency settings opened")}><MiniIcon icon={RefreshCw} tone="mint" /><span><b>AI Alert Frequency</b><small>How often you get alerts</small></span><em>Real-time</em><ChevronRight size={16} /></button></section><h2 className="settings-label">Security</h2><section className="card settings-list compact"><button onClick={() => notify("Reset PIN opened")}><MiniIcon icon={LockKeyhole} tone="mint" /><span><b>Reset PIN</b><small>Change your app PIN</small></span><ChevronRight size={16} /></button><button onClick={() => notify("Biometric settings opened")}><MiniIcon icon={ScanLine} tone="mint" /><span><b>Biometric Unlock</b><small>Use fingerprint/face ID</small></span><em>Enabled</em><ChevronRight size={16} /></button></section></div></div>
        <div className="settings-bottom"><section className="card settings-list compact"><button onClick={() => notify("Base currency selector opened")}><MiniIcon icon={Banknote} tone="mint" /><span><b>Base Currency</b><small>INR (₹)</small></span><ChevronRight size={15} /></button><button onClick={() => setDarkMode(!darkMode)}><MiniIcon icon={Moon} tone="mint" /><span><b>Dark Mode</b><small>Use dark theme</small></span><Toggle active={darkMode} onClick={() => setDarkMode(!darkMode)} label="Toggle dark mode" /></button></section><section className="card settings-list compact"><button onClick={() => notify("About Finella opened")}><MiniIcon icon={Info} tone="mint" /><span><b>Finella</b><small>Version 1.0.0</small></span><ChevronRight size={15} /></button></section></div>
        <section className="premium-banner"><MiniIcon icon={Crown} tone="gold" /><span><b>Go Premium</b><small>Unlock advanced features and smart insights.</small></span><button onClick={() => notify("Free plan selected")}>♙ &nbsp;Free Plan</button><button className="premium-choice" onClick={() => notify("Premium plan selected")}>♛ &nbsp;Premium Plan</button></section>
      </div>
    </>
  );
}

function FinAIScreen({ notify }: { notify: (message: string) => void }) {
  const [question, setQuestion] = useState<string | null>(null);
  const prompts: Array<[LucideIcon, string, string]> = [[PiggyBank, "How can I save more?", "Smart tips to help you save every day."], [LineChart, "Analyze my spending", "See where your money goes."], [TrendingUp, "Should I invest now?", "Know if it’s the right time for you."], [CalendarDays, "Help with EMI planning", "Plan your EMIs better & stress-free."], [Target, "Show my goal progress", "Check how close you are to your goals."], [WalletCards, "Am I overspending?", "Find out if you’re spending too much."]];
  const choose = (prompt: string) => { setQuestion(prompt); notify("Finella is preparing a tailored answer") };
  return (
    <>
      <AppHeader title={<>Finella <span className="ai-title">AI <Sparkles size={17} /></span></>} subtitle="Your personal financial coach" right={<><button className="premium-top"><Crown size={15} /> Premium</button><button className="round-control notification-dot"><Bell size={20} /></button></>} />
      <div className="app-scroll fin-ai-screen">
        <section className="ai-hero" style={{ backgroundImage: `linear-gradient(105deg, rgba(1,61,32,.92), rgba(1,54,28,.86)), url(${FOREST_TEXTURE})` }}><img src={AI_COACH} alt="Finella AI coach robot" /><div className="ai-speech"><h2><strong>Hey there!</strong> 👋<br />I’m Finella AI, your <strong>financial coach.</strong></h2><p>Ask me anything about your money. I’m here to help.</p></div><div className="ai-quick"><button onClick={() => choose("Analyze my spending")}>📊 Analyze my spending</button><button onClick={() => choose("How can I save more?")}>🐷 How can I save more?</button><button onClick={() => choose("Show my goal progress")}>🎯 Show my goals</button></div></section>
        <button className="monthly-insight" onClick={() => choose("Keep tracking my expenses") }><span>⭐</span><div><b>Insight for this month</b><strong>Keep tracking your expenses!</strong></div><LineChart size={42} /><ChevronRight size={17} /></button>
        <div className="ai-list-heading"><h2>Try asking me...</h2><button>🔥 Popular <ChevronDown size={14} /></button></div>
        <div className="ai-prompt-list">{prompts.map(([Icon, title, sub]) => <button key={title} onClick={() => choose(title)}><MiniIcon icon={Icon} tone="mint" /><span><b>{title}</b><small>{sub}</small></span><ChevronRight size={18} /></button>)}</div>
        {question ? <div className="ai-answer"><Sparkles size={18} /><span><b>Finella AI</b><p>{question === "Analyze my spending" ? "Food & dining is your biggest opportunity this month. A ₹2,400 adjustment would bring you back in line." : "That’s a helpful next step. I’ve turned it into a focused action in your financial plan."}</p></span></div> : null}
        <button className="ai-input" onClick={() => choose("A custom question") }><Sparkles size={21} /><span>Ask Finella anything...</span><i><Send size={19} /></i></button>
        <p className="privacy-line"><ShieldCheck size={15} /> Your data is private and secure</p>
      </div>
    </>
  );
}

function BottomDock({ screen, navigate }: { screen: Screen; navigate: (screen: Screen) => void }) {
  const items: { id: Screen; label: string; icon: LucideIcon }[] = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "transactions", label: "Txns", icon: ArrowRight },
    { id: "fin-ai", label: "FIN AI", icon: Sparkles },
    { id: "insights", label: "Insights", icon: LineChart },
    { id: "more", label: "More", icon: Menu },
  ];
  return <nav className="bottom-dock" aria-label="App navigation">{items.map(({ id, label, icon: Icon }) => <button key={id} className={`${screen === id ? "active" : ""} ${id === "fin-ai" ? "ai-dock-item" : ""}`} onClick={() => navigate(id)}><span>{id === "fin-ai" ? <img src={SPARK_MARK} alt="" /> : <Icon size={23} />}</span><small>{label}</small></button>)}</nav>;
}

export default function Home() {
  const [location, setLocation] = useLocation();
  const screenFromPath = (pathname: string): Screen => {
    const candidate = pathname.replace(/^\//, "") as Screen;
    return ["home", "transactions", "fin-ai", "insights", "more", "r-streak", "settings"].includes(candidate) ? candidate : "home";
  };
  const screen = screenFromPath(location);
  const [previousScreen, setPreviousScreen] = useState<Screen>("home");
  const [toast, setToast] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = (next: Screen) => { if (next !== screen) setPreviousScreen(screen); setLocation(next === "home" ? "/" : `/${next}`); };
  const goBack = () => navigate(previousScreen);
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(null), 2300); };
  const activeSection = screen === "r-streak" ? "R-Streak" : screen === "settings" ? "Settings" : screen === "fin-ai" ? "Fin AI" : screen === "transactions" ? "Transactions" : screen === "insights" ? "Insights" : screen === "more" ? "More" : "Home";
  return (
    <main className={`prototype-stage ${darkMode ? "phone-dark" : ""}`}>
      <aside className="stage-side">
        <div className="stage-brand"><img src={SPARK_MARK} alt="Finella" /><span>finella</span></div>
        <p className="eyebrow">Interactive visual prototype</p>
        <h2>A personal finance habit, <em>in your pocket.</em></h2>
        <p className="stage-copy">Explore the complete Finella experience as a tactile mobile prototype. Use the bottom navigation, cards, toggles, and contextual controls inside the handset.</p>
        <div className="stage-screen-list">{[["01", "Home", "Money at a glance", "home"], ["02", "Transactions", "Every movement", "transactions"], ["03", "R-Streak", "Daily consistency", "r-streak"], ["04", "Fin AI", "Coaching prompts", "fin-ai"], ["05", "Insights", "Decide with clarity", "insights"], ["06", "More", "Your toolkit", "more"], ["07", "Settings", "Personalize Finella", "settings"]].map(([number, title, sub, screenId]) => <button key={number} className={screen === screenId ? "active" : ""} onClick={() => navigate(screenId as Screen)}><span>{number}</span><b>{title}</b><small>{sub}</small></button>)}</div>
        <div className="stage-hint"><span>⌘</span> Click through the app<br />to preview its interactions.</div>
      </aside>
      <section className="device-scene" aria-label="Finella mobile app emulator">
        <div className="device-shadow" />
        <div className="phone-shell">
          <div className="phone-top"><span className="phone-time">9:41</span><div className="dynamic-island" /><span className="phone-status"><i /><i /><i /></span></div>
          <div className="phone-screen">
            <div className="screen-content" key={screen}>
              {screen === "home" && <HomeScreen navigate={navigate} notify={notify} />}
              {screen === "r-streak" && <RStreakScreen goBack={goBack} notify={notify} />}
              {screen === "transactions" && <TransactionsScreen goBack={goBack} notify={notify} />}
              {screen === "insights" && <InsightsScreen notify={notify} />}
              {screen === "more" && <MoreScreen navigate={navigate} notify={notify} />}
              {screen === "settings" && <SettingsScreen goBack={goBack} darkMode={darkMode} setDarkMode={setDarkMode} notify={notify} />}
              {screen === "fin-ai" && <FinAIScreen notify={notify} />}
            </div>
            {screen !== "r-streak" && screen !== "settings" ? <BottomDock screen={screen} navigate={navigate} /> : null}
            {toast ? <div className="prototype-toast"><Check size={15} /> {toast}</div> : null}
          </div>
          <div className="phone-home-indicator" />
        </div>
        <div className="scene-caption"><span>Now previewing</span><b>{activeSection}</b><i /> Tap any interactive element</div>
      </section>
    </main>
  );
}
