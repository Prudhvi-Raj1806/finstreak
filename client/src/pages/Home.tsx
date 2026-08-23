/**
 * DESIGN REMINDER — Premium Executive Operating System:
 * This page stages a warm-white, emerald-led CEO/CFO operating system in a device-only Samsung-style emulator.
 * Preserve compact editorial grouping, decisive financial hierarchy, soft elevation, and a tall 19.5:9 screen rhythm.
 */
import { useRef, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowDownLeft,
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeIndianRupee,
  Banknote,
  Bell,
  Bot,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
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
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  Trash2,
  UserRoundPen,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";

type Screen =
  | "home"
  | "transactions"
  | "fin-ai"
  | "insights"
  | "more"
  | "r-streak"
  | "settings"
  | "bank-accounts"
  | "investments"
  | "cash"
  | "credit-cards"
  | "loans"
  | "budgets"
  | "budget-detail"
  | "finscore"
  | "finscore-detail"
  | "notifications"
  | "reports"
  | "profile"
  | "categories"
  | "tags"
  | "reconcile"
  | "insight-detail"
  | "goal-detail"
  | "goals"
  | "recurring"
  | "security"
  | "help"
  | "feedback"
  | "about"
  | "tax-returns"
  | "money-saving"
  | "documents"
  | "net-worth"
  | "backup-restore"
  | "account"
  | "subscription";

type AssetScreen = "bank-accounts" | "investments" | "cash" | "credit-cards" | "loans";
const assetScreenIds: AssetScreen[] = ["bank-accounts", "investments", "cash", "credit-cards", "loans"];

const AI_COACH = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663805166564/ohgfOiQaHzMiADoL.png";
const FOREST_TEXTURE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663805166564/CbrODAxVKcgQJvdU.png";
const FIRE_ART = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663805166564/BfXJpMvgwMMrkrmL.png";
const MILESTONE_ART = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663805166564/lqwPNhNetzTZxijC.png";
const SPARK_MARK = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663805166564/MofcSvVFATnAhInl.png";

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
        <img className="header-spark" src={SPARK_MARK} alt="" aria-hidden="true" />
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
  const homeAssets: Array<[LucideIcon, string, string, "green" | "mint" | "gold" | "coral", AssetScreen]> = [[Landmark, "Bank Accounts", "2,85,000", "green", "bank-accounts"], [LineChart, "Investments", "48,500", "mint", "investments"], [WalletCards, "Cash", "12,000", "gold", "cash"], [WalletCards, "Credit Cards", "-18,500", "coral", "credit-cards"], [CircleUserRound, "Loans", "-18,000", "coral", "loans"]];
  return (
    <>
      <AppHeader
        title={<button className="home-title home-profile-trigger" aria-label="Open profile" onClick={() => navigate("profile")}><span className="home-profile-avatar" aria-hidden="true">P</span><span><span className="greeting">Welcome back,</span><br />Prudhvi <ChevronDown size={18} className="title-chevron" /></span></button>}
        right={<><button className="round-control notification-dot" aria-label="Notifications" onClick={() => navigate("notifications")}><Bell size={20} /></button><button className="round-control" aria-label="Add transaction" onClick={() => navigate("transactions")}><Plus size={22} /></button><button className="round-control" aria-label="Open Settings" onClick={() => navigate("settings")}><Settings size={19} /></button></>}
      />
      <div className="app-scroll home-scroll">
        <FinScoreCard onDetails={() => navigate("finscore")} />

        <section className="card streak-preview">
          <div className="section-topline"><SmallLabel>R-Streak <Info size={13} /></SmallLabel><button className="text-link" onClick={() => navigate("r-streak")}>View calendar <ChevronRight size={15} /></button></div>
          <div className="streak-summary">
            <div className="flame-badge"><Flame size={30} fill="currentColor" /></div>
            <div><span className="streak-number">18</span> <strong>days</strong><p>Keep it up! Consistency builds freedom.</p></div>
            <div className="streak-side"><span>Longest Streak</span><b>23 <em>days</em></b><span>This Month</span><b>18<em>/31 days</em></b></div>
          </div>
          <div className="week-mini">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, dayIndex) => <div className="mini-day" key={dayIndex}><span>{day}<b>{18 + dayIndex}</b></span><i /><i /><i className={dayIndex === 4 ? "missed" : ""} /></div>)}
          </div>
        </section>

        <section className="section-block networth-block">
          <div className="section-heading"><div><SmallLabel><span className="numbered-label">1</span> What do I have?</SmallLabel><h2>Liquid Net Worth <Info size={14} /></h2></div><button className="text-link" onClick={() => navigate("reports")}>View all <ChevronRight size={15} /></button></div>
          <div className="networth-value">{money("2,48,500")}</div>
          <div className="networth-trend"><span><TrendingUp size={14} /> ₹12,450 (5.28%) vs last month</span><svg viewBox="0 0 300 55" aria-hidden="true"><path d="M0 48 C25 49 28 30 55 35 S85 22 110 29 S140 10 165 20 S195 26 215 9 S250 27 270 10 S285 7 300 0" /></svg></div>
          <div className="asset-row">
            {homeAssets.map(([Icon, label, value, tone, destination], index) => <button key={index} className="asset-tile" onClick={() => navigate(destination)}><MiniIcon icon={Icon} tone={tone} /><span>{label}</span><b className={String(value).startsWith("-") ? "negative" : ""}>₹{value}</b></button>)}
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
            <button className="forecast-card" onClick={() => navigate("reports")}><span>Month-end Forecast <Info size={12} /><small>Expected balance on Aug 31</small></span><b>₹1,62,400 <em>↑ ₹8,250 vs this month</em></b><svg viewBox="0 0 120 35" aria-hidden="true"><path d="M0 30 C12 17 18 25 28 20 S44 27 60 15 S77 20 86 9 S105 14 120 0" /></svg></button>
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

function RStreakScreen({ goBack, navigate, notify }: { goBack: () => void; navigate: (screen: Screen) => void; notify: (message: string) => void }) {
  const [goal, setGoal] = useState(250);
  const [days, setDays] = useState(18);
  const calendarDays = Array.from({ length: 49 }, (_, index) => index < 31 ? index + 1 : null);
  return (
    <>
      <AppHeader title={<>Close cadence <span className="title-fire">🔥</span></>} subtitle="CFO workspace · build a reliable close habit." onBack={goBack} right={<button className="round-control" aria-label="How close cadence works" onClick={() => navigate("help")}><CircleHelp size={21} /></button>} />
      <div className="app-scroll r-streak-scroll">
        <button className="reconcile-banner" onClick={() => navigate("reconcile")}><span className="target-emoji">🎯</span><span><b>Close today’s accounts</b><small>Protect the forecast. Build your close cadence.</small></span><ChevronRight size={26} /></button>
        <section className="fire-hero" style={{ backgroundImage: `linear-gradient(120deg, rgba(0,66,30,.96), rgba(9,101,45,.84)), url(${FOREST_TEXTURE})` }}>
          <div className="hero-streak-ring"><span>{days}</span><small>Days</small></div>
          <div className="fire-hero-copy"><h2>You’re on fire, let’s<br /><strong>build the streak!</strong></h2><b><em>{days}</em> / {goal} Days</b><ProgressBar value={(days / goal) * 100} /><p>{Math.max(goal - days, 0)} days to go! <ArrowUpRight size={19} /></p></div>
          <img src={FIRE_ART} alt="Illustrated flame" className="fire-illustration" />
        </section>
        <section className="card year-card">
          <div className="section-heading"><h2><CalendarDays size={23} /> Your Progress</h2><button className="filter-button">This Year <ChevronDown size={15} /></button></div>
          <div className="weekday-line">{["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <span key={index}>{day}</span>)}</div>
          <div className="year-grid">{calendarDays.map((date, index) => <span key={index} className={`calendar-cell ${date ? "" : "empty"}`}><i className={date && date <= days ? "done" : ""} />{date ? <b>{date}</b> : null}</span>)}</div>
          <div className="heat-scale"><span>Less</span><i /><i /><i /><i /><i /><span>More</span></div>
          <div className="streak-stats"><div><b>🔥 {days} days</b><span>Current Streak</span></div><div><b>🏆 {Math.max(days, 0)} days</b><span>Longest Streak</span></div><div><b>📅 {days} days</b><span>Total Days</span></div></div>
        </section>
        <section className="rewards-section"><div className="section-heading"><h2>🎁 &nbsp;Reward Milestones</h2><button className="text-link" onClick={() => navigate("goals")}>See goals</button></div><div className="reward-row">{[["🏅", "50 Days", "Exclusive Badge", 50], ["💰", "100 Days", "Cashback Reward", 100], ["⭐", "250 Days", "Free Premium + Tax Returns", 250]].map(([emoji, title, sub, target]) => <button className={`reward-card ${goal === target ? "highlighted" : ""}`} key={String(target)} onClick={() => setGoal(Number(target))}><span>{emoji}</span><b>{title}</b><small>{sub}</small><strong>{days} / {target} days</strong><ProgressBar value={(days / Number(target)) * 100} thin /></button>)}</div></section>
        <section className="goal-section"><h2>🎯 &nbsp;Set your goal</h2><p>Choose your streak target and challenge yourself.</p><div>{[50, 100, 250].map((value) => <button key={value} className={`goal-button ${goal === value ? "selected" : ""}`} onClick={() => { setGoal(value); notify(`${value}-day streak goal selected`) }}>{goal === value && <Check size={16} />}<b>{value}</b><span>Days</span></button>)}</div></section>
        <div className="streak-footer"><Lightbulb size={24} /><span><b>Consistency today, freedom tomorrow.</b><small>Show up for yourself.</small></span><img src={MILESTONE_ART} alt="Mountain milestone landscape" /></div>
      </div>
    </>
  );
}

function TransactionsScreen({ goBack, notify, navigate }: { goBack: () => void; notify: (message: string) => void; navigate: (screen: Screen) => void }) {
  type TransactionRecord = { id: string; date: string; icon: LucideIcon; title: string; category: string; amount: string; amountValue: number; tone: "green" | "mint" | "gold" | "coral" | "lilac" | "blue"; categorised: boolean };
  const [filter, setFilter] = useState<"All" | "Income" | "Expenses">("All");
  const [amountFilter, setAmountFilter] = useState<"All" | "Large" | "Small">("All");
  const [activeGroup, setActiveGroup] = useState<"Uncategorised" | "Categorised">("Uncategorised");
  const [sort, setSort] = useState<"Newest" | "Highest">("Newest");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionRecord | null>(null);
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [period, setPeriod] = useState("Aug 2026");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftAmount, setDraftAmount] = useState("");
  const [draftCategory, setDraftCategory] = useState("Uncategorised");
  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => [
    { id: "salary", date: "Today", icon: ArrowDownLeft, title: "Salary", category: "Income · HDFC Bank", amount: "+₹45,000", amountValue: 45000, tone: "mint", categorised: true },
    { id: "swiggy", date: "Today", icon: ShoppingBag, title: "Swiggy", category: "Food & Dining", amount: "-₹420", amountValue: 420, tone: "gold", categorised: true },
    { id: "amazon", date: "Yesterday", icon: ShoppingBag, title: "Amazon", category: "Shopping", amount: "-₹1,299", amountValue: 1299, tone: "lilac", categorised: true },
    { id: "starbucks", date: "Aug 16", icon: Banknote, title: "Starbucks", category: "Food & Dining", amount: "-₹250", amountValue: 250, tone: "green", categorised: true },
    { id: "netflix", date: "Aug 15", icon: ReceiptText, title: "Netflix", category: "Entertainment", amount: "-₹649", amountValue: 649, tone: "blue", categorised: true },
    { id: "rent", date: "Aug 15", icon: Landmark, title: "Rent", category: "Housing", amount: "-₹18,000", amountValue: 18000, tone: "mint", categorised: true },
    { id: "upi", date: "Aug 14", icon: WalletCards, title: "UPI transfer", category: "Needs review", amount: "-₹1,200", amountValue: 1200, tone: "coral", categorised: false },
    { id: "metro", date: "Aug 13", icon: ReceiptText, title: "Metro Card", category: "Needs review", amount: "-₹550", amountValue: 550, tone: "blue", categorised: false },
    { id: "merchant", date: "Aug 13", icon: MoreHorizontal, title: "Merchant payment", category: "Needs review", amount: "-₹890", amountValue: 890, tone: "lilac", categorised: false },
  ]);
  const visibleTransactions = transactions.filter((entry) => filter === "All" || (filter === "Income" ? entry.amount.startsWith("+") : entry.amount.startsWith("-"))).filter((entry) => amountFilter === "All" || (amountFilter === "Large" ? entry.amountValue >= 1000 : entry.amountValue < 1000)).sort((a, b) => sort === "Highest" ? b.amountValue - a.amountValue : 0);
  const uncategorisedTransactions = visibleTransactions.filter((entry) => !entry.categorised);
  const categorisedTransactions = visibleTransactions.filter((entry) => entry.categorised);
  const activeTransactions = activeGroup === "Uncategorised" ? uncategorisedTransactions : categorisedTransactions;
  const addTransaction = () => {
    const amountValue = Number(draftAmount.replace(/[^0-9.]/g, ""));
    if (!draftTitle.trim() || !amountValue) { notify("Add a merchant and amount to continue"); return; }
    const categorised = draftCategory !== "Uncategorised";
    const entry: TransactionRecord = { id: editingId || `manual-${Date.now()}`, date: "Today", icon: ReceiptText, title: draftTitle.trim(), category: categorised ? draftCategory : "Needs review", amount: `-₹${amountValue.toLocaleString("en-IN")}`, amountValue, tone: categorised ? "green" : "gold", categorised };
    setTransactions((current) => editingId ? current.map((item) => item.id === editingId ? entry : item) : [entry, ...current]);
    setActiveGroup(categorised ? "Categorised" : "Uncategorised");
    setDraftTitle(""); setDraftAmount(""); setDraftCategory("Uncategorised"); setShowAddSheet(false); setEditingId(null); notify(editingId ? "Transaction updated" : "Transaction added");
  };
  const deleteTransaction = (id: string, title: string) => { setTransactions((current) => current.filter((entry) => entry.id !== id)); setSelectedTransaction(null); notify(`${title} deleted`); };
  const renderTransaction = (entry: TransactionRecord) => <button className="full-transaction" key={entry.id} onClick={() => setSelectedTransaction(entry)}><span className="transaction-date">{entry.date}</span><MiniIcon icon={entry.icon} tone={entry.tone} /><span className="transaction-name"><b>{entry.title}</b><small>{entry.category}</small></span><strong className={entry.amount.startsWith("+") ? "positive" : ""}>{entry.amount}</strong><ChevronRight size={16} /></button>;
  return <><AppHeader title="Transactions" subtitle="Track every move with clarity." onBack={goBack} right={<button className="round-control" aria-label="Add transaction" onClick={() => setShowAddSheet(true)}><Plus size={22} /></button>} /><div className="app-scroll transaction-screen"><div className="balance-strip"><span>Available to spend</span><b>₹11,550</b><small><TrendingUp size={13} /> ₹2,120 more than last week</small></div><div className="filter-row">{(["All", "Income", "Expenses"] as const).map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}<button className="filter-more" onClick={() => notify("Date range selector opened")}><CalendarDays size={16} /> Aug 2026 <ChevronDown size={14} /></button></div><section className="transaction-list card"><div className="list-header"><h2>Transactions</h2><button className="text-link" onClick={() => setShowAddSheet(true)}>Add <Plus size={14} /></button></div><div className="transaction-category-row" role="tablist" aria-label="Transaction category"><button className={`transaction-category-card uncat ${activeGroup === "Uncategorised" ? "active" : ""}`} onClick={() => setActiveGroup("Uncategorised")} role="tab" aria-selected={activeGroup === "Uncategorised"}><span><ReceiptText size={17} /><b>Uncategorised</b></span><strong>{uncategorisedTransactions.length}</strong><small>Needs review</small></button><button className={`transaction-category-card cat ${activeGroup === "Categorised" ? "active" : ""}`} onClick={() => setActiveGroup("Categorised")} role="tab" aria-selected={activeGroup === "Categorised"}><span><Check size={17} /><b>Categorised</b></span><strong>{categorisedTransactions.length}</strong><small>Organised activity</small></button></div><div className="transaction-tools persistent-tools"><div className="transaction-tool-wrap"><button className={`tool-chip ${showSortMenu ? "selected" : ""}`} onClick={() => { setShowSortMenu(!showSortMenu); setShowFilterMenu(false); }}><ArrowDownUp size={14} /> Sort: {sort}<ChevronDown size={13} /></button>{showSortMenu ? <div className="tool-menu"><button className={sort === "Newest" ? "active" : ""} onClick={() => { setSort("Newest"); setShowSortMenu(false); }}>Newest first</button><button className={sort === "Highest" ? "active" : ""} onClick={() => { setSort("Highest"); setShowSortMenu(false); }}>Highest amount</button></div> : null}</div><div className="transaction-tool-wrap"><button className={`tool-chip ${showFilterMenu ? "selected" : ""}`} onClick={() => { setShowFilterMenu(!showFilterMenu); setShowSortMenu(false); }}><SlidersHorizontal size={14} /> Filter: {amountFilter}<ChevronDown size={13} /></button>{showFilterMenu ? <div className="tool-menu filter-menu">{(["All", "Large", "Small"] as const).map((option) => <button className={amountFilter === option ? "active" : ""} key={option} onClick={() => { setAmountFilter(option); setShowFilterMenu(false); }}>{option === "All" ? "All amounts" : option === "Large" ? "Over ₹1,000" : "Under ₹1,000"}</button>)}</div> : null}</div><span>{activeTransactions.length} shown</span></div><div className="transaction-tab-panel" role="tabpanel">{activeGroup === "Uncategorised" && activeTransactions.length ? <div className="tab-panel-note"><span><b>Review your transactions</b><small>Tap one to categorise, edit, or delete it.</small></span><button onClick={() => notify("Bulk categorisation opened")}>Review all</button></div> : null}{activeGroup === "Categorised" && activeTransactions.length ? <div className="tab-panel-note categorised-note"><span><b>Everything is organised</b><small>Tap any record to view or manage it.</small></span><Check size={16} /></div> : null}{activeTransactions.map(renderTransaction)}{!activeTransactions.length ? <div className="transaction-empty"><SlidersHorizontal size={19} /><b>No {activeGroup.toLowerCase()} transactions</b><small>Try a different filter or add a transaction.</small></div> : null}</div></section><button className="transaction-insight" onClick={() => notify("Insight saved to your Fin AI feed")}><Lightbulb size={20} /><span><b>You spent ₹3,040 more this month.</b><small>See the three categories driving the change.</small></span><ChevronRight size={18} /></button></div>{selectedTransaction ? <div className="transaction-sheet-layer" role="dialog" aria-modal="true" aria-label="Transaction details"><button className="sheet-scrim" aria-label="Close details" onClick={() => setSelectedTransaction(null)} /><section className="transaction-sheet"><button className="sheet-close" aria-label="Close details" onClick={() => setSelectedTransaction(null)}><X size={18} /></button><MiniIcon icon={selectedTransaction.icon} tone={selectedTransaction.tone} /><small>{selectedTransaction.date} · {selectedTransaction.category}</small><h2>{selectedTransaction.title}</h2><strong className={selectedTransaction.amount.startsWith("+") ? "positive" : ""}>{selectedTransaction.amount}</strong><div className="sheet-meta"><span>Account <b>HDFC Bank</b></span><span>Status <b>{selectedTransaction.categorised ? "Categorised" : "Needs review"}</b></span></div><button className="sheet-primary" onClick={() => notify(`${selectedTransaction.title} edit flow opened`)}>Edit transaction</button><button className="sheet-danger" onClick={() => deleteTransaction(selectedTransaction.id, selectedTransaction.title)}><Trash2 size={16} /> Delete transaction</button></section></div> : null}{showAddSheet ? <div className="transaction-sheet-layer" role="dialog" aria-modal="true" aria-label="Add transaction"><button className="sheet-scrim" aria-label="Close add transaction" onClick={() => setShowAddSheet(false)} /><form className="transaction-sheet add-sheet" onSubmit={(event) => { event.preventDefault(); addTransaction(); }}><button className="sheet-close" type="button" aria-label="Close add transaction" onClick={() => setShowAddSheet(false)}><X size={18} /></button><SmallLabel>New transaction</SmallLabel><h2>Add an expense</h2><label>Merchant<input autoFocus value={draftTitle} onChange={(event) => setDraftTitle(event.target.value)} placeholder="e.g. Coffee shop" /></label><label>Amount<input inputMode="decimal" value={draftAmount} onChange={(event) => setDraftAmount(event.target.value)} placeholder="0" /></label><label>Category<select value={draftCategory} onChange={(event) => setDraftCategory(event.target.value)}><option>Uncategorised</option><option>Food & Dining</option><option>Shopping</option><option>Transport</option><option>Entertainment</option></select></label><button className="sheet-primary" type="submit"><Plus size={16} /> Add transaction</button></form></div> : null}</>;
}

function TransactionsScreenV2({ goBack, navigate, notify }: { goBack: () => void; navigate: (screen: Screen) => void; notify: (message: string) => void }) {
  type Row = { id: string; name: string; category: string; amount: number; date: string; categorised: boolean; icon: LucideIcon; tone: "green" | "mint" | "gold" | "coral" | "lilac" | "blue" };
  const [rows, setRows] = useState<Row[]>([
    { id: "upi", name: "UPI transfer", category: "Needs review", amount: -1200, date: "Aug 14", categorised: false, icon: WalletCards, tone: "coral" },
    { id: "metro", name: "Metro Card", category: "Needs review", amount: -550, date: "Aug 13", categorised: false, icon: ReceiptText, tone: "blue" },
    { id: "swiggy", name: "Swiggy", category: "Food & Dining", amount: -420, date: "Today", categorised: true, icon: ShoppingBag, tone: "gold" },
    { id: "salary", name: "Client receipt", category: "Income · HDFC Bank", amount: 45000, date: "Today", categorised: true, icon: ArrowDownLeft, tone: "mint" },
    { id: "amazon", name: "Amazon", category: "Operating supplies", amount: -1299, date: "Yesterday", categorised: true, icon: ShoppingBag, tone: "lilac" },
  ]);
  const [group, setGroup] = useState<"Uncategorised" | "Categorised">("Uncategorised");
  const [sort, setSort] = useState<"Newest" | "Highest">("Newest");
  const [amountFilter, setAmountFilter] = useState<"All" | "Large" | "Small">("All");
  const [period, setPeriod] = useState("Aug 2026");
  const [selected, setSelected] = useState<Row | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftAmount, setDraftAmount] = useState("");
  const [draftCategory, setDraftCategory] = useState("Uncategorised");
  const shown = rows
    .filter((row) => (group === "Categorised") === row.categorised)
    .filter((row) => amountFilter === "All" || (amountFilter === "Large" ? Math.abs(row.amount) >= 1000 : Math.abs(row.amount) < 1000))
    .sort((a, b) => sort === "Highest" ? Math.abs(b.amount) - Math.abs(a.amount) : 0);
  const openAdd = () => { setDraftName(""); setDraftAmount(""); setDraftCategory("Uncategorised"); setSelected(null); setFormMode("add"); };
  const save = () => {
    const amount = Number(draftAmount.replace(/[^0-9.]/g, ""));
    if (!draftName.trim() || !amount) { notify("Add a counterparty and amount to continue"); return; }
    const categorised = draftCategory !== "Uncategorised";
    const entry = { id: selected?.id ?? `entry-${Date.now()}`, name: draftName.trim(), amount: -amount, category: categorised ? draftCategory : "Needs review", date: selected?.date ?? "Today", categorised, icon: selected?.icon ?? ReceiptText, tone: categorised ? "gold" as const : "coral" as const };
    setRows((current) => formMode === "edit" && selected ? current.map((row) => row.id === selected.id ? entry : row) : [entry, ...current]);
    setGroup(categorised ? "Categorised" : "Uncategorised"); setFormMode(null); setSelected(null); notify(formMode === "edit" ? "Ledger entry updated" : "Ledger entry added");
  };
  const openEditor = (row: Row) => { setDraftName(row.name); setDraftAmount(String(Math.abs(row.amount))); setDraftCategory(row.categorised ? row.category : "Uncategorised"); setFormMode("edit"); };
  return <>
    <AppHeader title="Transactions" subtitle="CFO workspace · cash ledger, burn and runway." onBack={goBack} right={<button className="round-control" aria-label="Add ledger entry" onClick={openAdd}><Plus size={22} /></button>} />
    <div className="app-scroll transaction-screen executive-transaction-screen">
      <section className="transaction-command-card">
        <div className="transaction-command-heading"><SmallLabel>CFO COMMAND CENTRE</SmallLabel><button onClick={() => navigate("reports")}>Open forecast <ArrowRight size={15} /></button></div>
        <div className="transaction-kpi-grid">
          <button onClick={() => navigate("reports")}><span>Operating cash</span><b>₹18.4L</b><small>↑ 7% vs plan</small></button>
          <button onClick={() => navigate("reports")}><span>Monthly burn</span><b>₹1.26L</b><small>↓ ₹9k vs July</small></button>
          <button onClick={() => navigate("reports")}><span>Runway</span><b>14.6 mo</b><small>At current net burn</small></button>
        </div>
      </section>
      <div className="filter-row"><label className="filter-more"><CalendarDays size={16} /><select aria-label="Transaction period" value={period} onChange={(event) => setPeriod(event.target.value)}><option>Aug 2026</option><option>Jul 2026</option><option>This year</option></select></label></div>
      <section className="transaction-list card">
        <div className="list-header"><div><SmallLabel>LEDGER</SmallLabel><h2>Transaction review</h2></div><button className="text-link" onClick={openAdd}>Add <Plus size={14} /></button></div>
        <div className="transaction-category-row" role="tablist" aria-label="Ledger review status">
          <button className={`transaction-category-card uncat ${group === "Uncategorised" ? "active" : ""}`} onClick={() => setGroup("Uncategorised")} role="tab" aria-selected={group === "Uncategorised"}><span><ReceiptText size={17} /><b>Needs review</b></span><strong>{rows.filter((row) => !row.categorised).length}</strong><small>Awaiting finance coding</small></button>
          <button className={`transaction-category-card cat ${group === "Categorised" ? "active" : ""}`} onClick={() => setGroup("Categorised")} role="tab" aria-selected={group === "Categorised"}><span><Check size={17} /><b>Controlled</b></span><strong>{rows.filter((row) => row.categorised).length}</strong><small>Ready for reporting</small></button>
        </div>
        <div className="transaction-tools persistent-tools"><label className="tool-chip">Sort:<select aria-label="Transaction sorting" value={sort} onChange={(event) => setSort(event.target.value as "Newest" | "Highest")}><option>Newest</option><option>Highest</option></select></label><label className="tool-chip">Filter:<select aria-label="Transaction amount filter" value={amountFilter} onChange={(event) => setAmountFilter(event.target.value as "All" | "Large" | "Small")}><option>All</option><option>Large</option><option>Small</option></select></label><span>{shown.length} shown</span></div>
        <div className="transaction-tab-panel" role="tabpanel">
          {group === "Uncategorised" && shown.length ? <div className="tab-panel-note"><span><b>Clear the finance queue</b><small>Apply consistent coding before you close the period.</small></span><button onClick={() => { setRows((current) => current.map((row) => row.categorised ? row : { ...row, category: "Operating supplies", categorised: true, tone: "gold" })); setGroup("Categorised"); notify("Pending entries moved to controlled ledger"); }}>Control all</button></div> : null}
          {shown.map((row) => <button className="full-transaction" key={row.id} onClick={() => setSelected(row)}><span className="transaction-date">{row.date}</span><MiniIcon icon={row.icon} tone={row.tone} /><span className="transaction-name"><b>{row.name}</b><small>{row.category}</small></span><strong className={row.amount > 0 ? "positive" : ""}>{row.amount > 0 ? "+" : "-"}₹{Math.abs(row.amount).toLocaleString("en-IN")}</strong><ChevronRight size={16} /></button>)}
          {!shown.length ? <div className="transaction-empty"><SlidersHorizontal size={19} /><b>No {group.toLowerCase()} entries</b><small>Try a different filter or add a ledger entry.</small></div> : null}
        </div>
      </section>
      <button className="transaction-insight" onClick={() => navigate("insight-detail")}><Lightbulb size={20} /><span><b>Burn is ₹9,000 below July.</b><small>Review the categories improving your cash conversion.</small></span><ChevronRight size={18} /></button>
    </div>
    {selected && !formMode ? <div className="transaction-sheet-layer" role="dialog" aria-modal="true" aria-label="Ledger entry details"><button className="sheet-scrim" aria-label="Close ledger entry details" onClick={() => setSelected(null)} /><section className="transaction-sheet"><button className="sheet-close" aria-label="Close ledger entry details" onClick={() => setSelected(null)}><X size={18} /></button><MiniIcon icon={selected.icon} tone={selected.tone} /><small>{selected.date} · {selected.category}</small><h2>{selected.name}</h2><strong className={selected.amount > 0 ? "positive" : ""}>{selected.amount > 0 ? "+" : "-"}₹{Math.abs(selected.amount).toLocaleString("en-IN")}</strong><div className="sheet-meta"><span>Account <b>HDFC Bank</b></span><span>Status <b>{selected.categorised ? "Controlled" : "Needs review"}</b></span></div><button className="sheet-primary" onClick={() => openEditor(selected)}>Edit entry</button><button className="sheet-danger" onClick={() => { setRows((current) => current.filter((row) => row.id !== selected.id)); setSelected(null); notify(`${selected.name} deleted`); }}><Trash2 size={16} /> Delete entry</button></section></div> : null}
    {formMode ? <div className="transaction-sheet-layer" role="dialog" aria-modal="true" aria-label={formMode === "edit" ? "Edit ledger entry" : "Add ledger entry"}><button className="sheet-scrim" aria-label="Close ledger form" onClick={() => { setFormMode(null); setSelected(null); }} /><form className="transaction-sheet add-sheet" onSubmit={(event) => { event.preventDefault(); save(); }}><button type="button" className="sheet-close" aria-label="Close ledger form" onClick={() => { setFormMode(null); setSelected(null); }}><X size={18} /></button><SmallLabel>{formMode === "edit" ? "EDIT LEDGER ENTRY" : "NEW LEDGER ENTRY"}</SmallLabel><h2>{formMode === "edit" ? "Edit movement" : "Record movement"}</h2><label>Counterparty<input autoFocus value={draftName} onChange={(event) => setDraftName(event.target.value)} placeholder="e.g. Supplier payment" /></label><label>Amount<input inputMode="decimal" value={draftAmount} onChange={(event) => setDraftAmount(event.target.value)} placeholder="0" /></label><label>Finance code<select value={draftCategory} onChange={(event) => setDraftCategory(event.target.value)}><option>Uncategorised</option><option>Operating supplies</option><option>Software & tools</option><option>Marketing</option><option>Travel</option></select></label><button className="sheet-primary" type="submit">{formMode === "edit" ? "Save entry" : <><Plus size={16} /> Add entry</>}</button></form></div> : null}
  </>;
}

function InsightsScreen({ navigate }: { notify: (message: string) => void; navigate: (screen: Screen) => void }) {
  const [mode, setMode] = useState<"ceo" | "cfo">(() => new URLSearchParams(window.location.search).get("audience") === "cfo" ? "cfo" : "ceo");
  const cfo = mode === "cfo";
  const metrics: Array<[string, string, string]> = cfo
    ? [["Close readiness", "82%", "6 items open"], ["Free cash flow", "₹2.46L", "↑ 11% vs plan"], ["Working capital", "36 days", "3 days tighter"]]
    : [["Net cash", "₹18.4L", "↑ 14% this month"], ["Revenue pace", "112%", "of monthly plan"], ["Runway", "14.6 mo", "steady at current burn"]];
  const priorities: Array<[LucideIcon, string, string, string, Screen]> = cfo
    ? [[RefreshCw, "Reconcile 3 account exceptions", "₹38,400 is still unmatched across HDFC, ICICI, and UPI", "Reconcile", "reconcile"], [CircleAlert, "Investigate budget variance", "Operating spend is ₹42,600 above the approved forecast", "Inspect variance", "budget-detail"], [ReceiptText, "Lock the month-end close", "Six evidence items need owner confirmation before close", "Open documents", "documents"]]
    : [[TrendingUp, "Protect the growth engine", "Revenue is ahead of plan, but conversion weakened in the last 7 days", "Open performance", "reports"], [CircleAlert, "Approve a ₹2L hiring envelope", "Runway remains above 14 months after the planned specialist hire", "Review scenario", "reports"], [Target, "Focus the next leadership review", "Three projects account for 71% of spend uplift this month", "See priorities", "insight-detail"]];
  const signals: Array<[string, string, string, string, Screen]> = cfo
    ? [["Cash control", "Collections due this week", "₹1.20L", "Review AR", "reports"], ["Forecast integrity", "Q3 operating expense variance", "+₹42,600", "Inspect budget", "budget-detail"]]
    : [["Growth signal", "Highest-converting channel", "Partner referrals", "View detail", "reports"], ["Execution risk", "Initiatives behind decision date", "2 of 7", "Review plan", "goal-detail"]];
  return <><AppHeader title={<><Sparkles size={21} className="heading-sparkle" /> Insights</>} subtitle={cfo ? "Control, forecast, and close with confidence." : "Lead with signal, not noise."} right={<button className="date-selector" onClick={() => navigate("reports")}><CalendarDays size={16} /> Aug 2026 <ChevronDown size={14} /></button>} /><div className="app-scroll insight-screen executive-insights-screen"><div className="insights-mode-switch" role="tablist" aria-label="Insights audience"><button role="tab" aria-selected={!cfo} className={!cfo ? "active" : ""} onClick={() => setMode("ceo")}><span>CEO</span><small>Growth & decisions</small></button><button role="tab" aria-selected={cfo} className={cfo ? "active" : ""} onClick={() => setMode("cfo")}><span>CFO</span><small>Control & forecast</small></button></div><section className={`role-brief-card ${cfo ? "cfo" : "ceo"}`}><div className="role-brief-meta"><SmallLabel>{cfo ? "CFO BRIEFING" : "CEO BRIEFING"}</SmallLabel><span>August · Week 4</span></div><h2>{cfo ? "Close is on track. Resolve exceptions before Friday." : "Growth is ahead. Keep cash conversion in view."}</h2><p>{cfo ? "The close is 82% complete. Three reconciliations and six evidence items need attention." : "Demand is above plan and runway is stable. Two decisions will protect next month’s momentum."}</p><div className="role-metric-grid">{metrics.map(([label, value, note]) => <button key={label} onClick={() => navigate("reports")}><span>{label}</span><b>{value}</b><small>{note}</small></button>)}</div></section><section className="card priorities-card"><div className="section-heading"><div><SmallLabel>{cfo ? "CONTROL ROOM" : "DECISION DESK"}</SmallLabel><h2>{cfo ? "What needs finance leadership" : "What needs your decision"}</h2></div><button className="text-link" onClick={() => navigate(cfo ? "reconcile" : "reports")}>View board <ArrowRight size={15} /></button></div><div className="priority-list">{priorities.map(([Icon, title, copy, action, destination]) => <article key={title}><MiniIcon icon={Icon as LucideIcon} tone={title.includes("budget") ? "coral" : title.includes("close") ? "blue" : "mint"} /><div><b>{title}</b><p>{copy}</p><button onClick={() => navigate(destination as Screen)}>{action} <ArrowRight size={14} /></button></div></article>)}</div></section><section className="signal-grid">{signals.map(([eyebrow, label, value, action, destination]) => <button className="card signal-card" key={label} onClick={() => navigate(destination as Screen)}><SmallLabel>{eyebrow}</SmallLabel><span>{label}</span><b className={value.startsWith("+") ? "negative" : ""}>{value}</b><small>{action} <ChevronRight size={14} /></small></button>)}</section><ExecutiveWorkspace role={cfo ? "cfo" : "ceo"} navigate={navigate} compact /><section className="card role-action-card"><div><MiniIcon icon={cfo ? ShieldCheck : Lightbulb} tone={cfo ? "blue" : "gold"} /><span><SmallLabel>{cfo ? "FINANCE STANDARD" : "LEADERSHIP FOCUS"}</SmallLabel><b>{cfo ? "Reconciliation quality protects the forecast." : "Choose the next move, then assign an owner."}</b><p>{cfo ? "Clear the three exceptions today to make cash and close reporting dependable." : "Use the decision brief to convert your strongest signal into a clear next action."}</p></span></div><button className="sheet-primary" onClick={() => navigate(cfo ? "reconcile" : "insight-detail")}>{cfo ? "Open reconciliation" : "Open decision brief"} <ArrowRight size={16} /></button></section></div></>;
}

type ExecutiveMode = "ceo" | "cfo";
const executiveWorkflows: Record<ExecutiveMode, Array<[LucideIcon, string, string, Screen, "mint" | "gold" | "blue" | "coral" | "lilac"]>> = {
  ceo: [[TrendingUp, "Growth performance", "Revenue pace, conversion & operating signal", "reports", "mint"], [Goal, "Strategic goals", "Capital allocation and milestones", "goals", "gold"], [PiggyBank, "Margin improvement", "Savings levers and efficiency moves", "money-saving", "mint"], [Landmark, "Capital position", "Net worth, investments & deployment", "net-worth", "blue"], [Sparkles, "Decision co-pilot", "Evidence-led leadership guidance", "fin-ai", "lilac"], [Goal, "Operating plan", "Plan spend against key priorities", "budgets", "gold"]],
  cfo: [[WalletCards, "Cash ledger", "Transactions, burn rate & runway", "transactions", "mint"], [Goal, "Operating budgets", "Planned versus actual spend", "budgets", "gold"], [RefreshCw, "Close & reconciliation", "Accounts, exceptions and close cadence", "reconcile", "blue"], [LineChart, "Forecast & reports", "Cash flow, P&L and financial position", "reports", "mint"], [WalletCards, "Finance evidence", "Statements, invoices and supporting docs", "documents", "lilac"], [RefreshCw, "Recurring commitments", "Fixed costs and renewal timing", "recurring", "coral"]],
};

function ExecutiveWorkspace({ role, navigate, compact = false }: { role: ExecutiveMode; navigate: (screen: Screen) => void; compact?: boolean }) {
  const items = executiveWorkflows[role];
  return <section className={`executive-workspace ${role} ${compact ? "compact" : ""}`}><div className="section-heading"><div><SmallLabel>{role === "cfo" ? "CFO OPERATING SYSTEM" : "CEO OPERATING SYSTEM"}</SmallLabel><h2>{role === "cfo" ? "Control the numbers" : "Lead the business"}</h2></div>{compact ? <button className="text-link" onClick={() => navigate("more")}>Open workspace <ArrowRight size={15} /></button> : null}</div><div className="executive-workspace-grid">{items.map(([Icon, title, detail, destination, tone]) => <button key={title} onClick={() => navigate(destination)}><MiniIcon icon={Icon} tone={tone} /><span><b>{title}</b><small>{detail}</small></span><ChevronRight size={16} /></button>)}</div></section>;
}

function MoreScreen({ navigate }: { navigate: (screen: Screen) => void; notify: (message: string) => void }) {
  const [role, setRole] = useState<ExecutiveMode>("cfo");
  const governance: Array<[LucideIcon, string, string, Screen, "mint" | "gold" | "blue" | "lilac"]> = [[ReceiptText, "Tax & compliance", "Tax pack, returns and records", "tax-returns", "gold"], [Target, "Category controls", "Spend labels and cost taxonomy", "categories", "mint"], [Target, "Tags & reporting groups", "Custom reporting dimensions", "tags", "blue"], [ShieldCheck, "Data controls", "Security, privacy and access", "security", "mint"], [Banknote, "Backup & restore", "Protect finance configuration", "backup-restore", "blue"], [Settings, "System settings", "Connections, preferences and data flow", "settings", "lilac"]];
  return <><AppHeader title="Workspace" subtitle="Every finance workflow, organised by the decision it supports." right={<button className="round-control notification-dot" aria-label="Open notifications" onClick={() => navigate("notifications")}><Bell size={20} /></button>} /><div className="app-scroll more-screen executive-more-screen"><button className="profile-card" style={{ backgroundImage: `linear-gradient(105deg, rgba(7,72,33,.98), rgba(11,99,47,.88)), url(${FOREST_TEXTURE})` }} onClick={() => navigate("profile")}><span className="profile-orb">P<Check size={15} /></span><span><SmallLabel>EXECUTIVE PROFILE</SmallLabel><b>Prudhvi Raj</b><small>Operating confidence <Info size={13} /></small><strong>82 <em>/100</em></strong><i><TrendingUp size={15} /> Cash position remains healthy.</i></span><svg viewBox="0 0 170 50" aria-hidden="true"><path d="M0 44 C18 35 32 40 46 33 S76 39 94 25 S118 31 134 15 S154 15 170 0" /></svg><ChevronRight size={23} /></button><div className="workspace-role-switch" role="tablist" aria-label="Executive workspace role"><button role="tab" aria-selected={role === "ceo"} className={role === "ceo" ? "active" : ""} onClick={() => setRole("ceo")}><span>CEO</span><small>Growth & decisions</small></button><button role="tab" aria-selected={role === "cfo"} className={role === "cfo" ? "active" : ""} onClick={() => setRole("cfo")}><span>CFO</span><small>Control & forecast</small></button></div><ExecutiveWorkspace role={role} navigate={navigate} /><SmallLabel>FINANCE GOVERNANCE</SmallLabel><section className="card tools-card governance-tools">{governance.map(([Icon, title, sub, destination, tone]) => <button key={title} onClick={() => navigate(destination)}><MiniIcon icon={Icon} tone={tone} /><span><b>{title}</b><small>{sub}</small></span><ChevronRight size={17} /></button>)}</section></div></>;
}

function Toggle({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return <button aria-label={label} className={`toggle ${active ? "on" : ""}`} onClick={onClick}><span /></button>;
}

function SettingsToggleRow({ icon: Icon, title, subtitle, active, onToggle, label }: { icon: LucideIcon; title: string; subtitle: string; active: boolean; onToggle: () => void; label: string }) {
  return <div className="settings-toggle-row"><button type="button" className="settings-toggle-trigger" onClick={onToggle}><MiniIcon icon={Icon} tone="mint" /><span><b>{title}</b><small>{subtitle}</small></span></button><Toggle active={active} onClick={onToggle} label={label} /></div>;
}

function SettingsScreen({ goBack, darkMode, setDarkMode, notify, navigate }: { goBack: () => void; darkMode: boolean; setDarkMode: (value: boolean) => void; notify: (message: string) => void; navigate: (screen: Screen) => void }) {
  const [manualEntry, setManualEntry] = useState(true);
  const [push, setPush] = useState(true);
  const [whatsapp, setWhatsapp] = useState(false);
  const accountItems: Array<[LucideIcon, string, string, "mint" | "gold" | "coral"]> = [[CircleUserRound, "Profile", "Personal information & preferences", "mint"], [Crown, "Subscription", "Manage your plan and billing", "gold"], [WalletCards, "Account", "Manage your account settings", "mint"], [Goal, "Budget", "Manage budget categories", "mint"], [ArrowRight, "Sign out", "Log out from your account", "coral"]];
  const dataItems: Array<[LucideIcon, string, string, string]> = [[ScanLine, "Manual Entry", "Add transactions manually", "toggle"], [ReceiptText, "SMS Parsing", "Extract transactions from SMS", "Active"], [Landmark, "Bank Sync", "Connect your bank accounts", "Connect"], [RefreshCw, "Email Parsing", "Extract transactions from emails", "Active"], [Sparkles, "Auto-Transactions", "Automatically detect transactions", "Connect"], [ReceiptText, "PDF Statement", "Upload & parse bank statements", ""]];
  return (
    <>
      <AppHeader title="Settings" subtitle="Manage your account, preferences & more." onBack={goBack} right={<button className="help-pill" onClick={() => navigate("help")}><CircleHelp size={17} /> Help & Support</button>} />
      <div className="app-scroll settings-screen">
        <section className="card settings-profile"><button onClick={() => navigate("profile")}><MiniIcon icon={CircleUserRound} tone="mint" /><span><b>Raj Prudhvi</b><small>Manage your profile & account</small></span><ChevronRight size={19} /></button><button onClick={() => navigate("subscription")}><MiniIcon icon={Crown} tone="gold" /><span><b>Premium Plan</b><small>You’re enjoying all Premium features</small></span><em><Check size={13} /> Active</em><ChevronRight size={18} /></button></section>
        <h2 className="settings-label">Account</h2><section className="card settings-list">{accountItems.map(([Icon, title, sub, tone]) => <button key={title} onClick={() => { const destination: Partial<Record<string, Screen>> = { Profile: "profile", Subscription: "subscription", Account: "account", Budget: "budgets" }; if (destination[title]) navigate(destination[title]); else notify("Sign-out confirmation requested"); }}><MiniIcon icon={Icon} tone={tone} /><span><b>{title}</b><small>{sub}</small></span>{title === "Subscription" ? <em>Active</em> : null}<ChevronRight size={17} /></button>)}</section>
        <div className="settings-columns"><div><h2 className="settings-label">Data & Sync <span><ShieldCheck size={13} /> Your data is private & secure</span></h2><section className="card settings-list compact">{dataItems.map(([Icon, title, sub, action]) => { const destination: Partial<Record<string, Screen>> = { "SMS Parsing": "documents", "Bank Sync": "bank-accounts", "Email Parsing": "documents", "Auto-Transactions": "transactions", "PDF Statement": "documents" }; return action === "toggle" ? <SettingsToggleRow key={title} icon={Icon} title={title} subtitle={sub} active={manualEntry} onToggle={() => setManualEntry(!manualEntry)} label="Toggle manual entry" /> : <button key={title} onClick={() => destination[title] && navigate(destination[title])}><MiniIcon icon={Icon} tone="mint" /><span><b>{title}</b><small>{sub}</small></span>{action ? <em>{action}</em> : null}<ChevronRight size={16} /></button>; })}</section></div>
          <div><h2 className="settings-label">AI Preferences</h2><section className="card settings-list compact"><SettingsToggleRow icon={Send} title="WhatsApp Notifications" subtitle="Receive alerts on WhatsApp" active={whatsapp} onToggle={() => setWhatsapp(!whatsapp)} label="Toggle WhatsApp notifications" /><SettingsToggleRow icon={Bell} title="Push Notifications" subtitle="Get notified instantly" active={push} onToggle={() => setPush(!push)} label="Toggle push notifications" /><button onClick={() => navigate("notifications")}><MiniIcon icon={RefreshCw} tone="mint" /><span><b>AI Alert Frequency</b><small>How often you get alerts</small></span><em>Real-time</em><ChevronRight size={16} /></button></section><h2 className="settings-label">Security</h2><section className="card settings-list compact"><button onClick={() => navigate("security")}><MiniIcon icon={LockKeyhole} tone="mint" /><span><b>Reset PIN</b><small>Change your app PIN</small></span><ChevronRight size={16} /></button><button onClick={() => navigate("security")}><MiniIcon icon={ScanLine} tone="mint" /><span><b>Biometric Unlock</b><small>Use fingerprint/face ID</small></span><em>Enabled</em><ChevronRight size={16} /></button></section></div></div>
        <div className="settings-bottom"><section className="card settings-list compact"><button onClick={() => navigate("profile")}><MiniIcon icon={Banknote} tone="mint" /><span><b>Base Currency</b><small>INR (₹)</small></span><ChevronRight size={15} /></button><SettingsToggleRow icon={Moon} title="Dark Mode" subtitle="Use dark theme" active={darkMode} onToggle={() => setDarkMode(!darkMode)} label="Toggle dark mode" /></section><section className="card settings-list compact"><button onClick={() => navigate("about")}><MiniIcon icon={Info} tone="mint" /><span><b>Finella</b><small>Version 1.0.0</small></span><ChevronRight size={15} /></button></section></div>
        <section className="premium-banner"><MiniIcon icon={Crown} tone="gold" /><span><b>Go Premium</b><small>Unlock advanced features and smart insights.</small></span><button onClick={() => navigate("subscription")}>♙ &nbsp;Free Plan</button><button className="premium-choice" onClick={() => navigate("subscription")}>♛ &nbsp;Premium Plan</button></section>
      </div>
    </>
  );
}

function FinAIScreen({ notify, navigate }: { notify: (message: string) => void; navigate: (screen: Screen) => void }) {
  const [question, setQuestion] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [popularOpen, setPopularOpen] = useState(false);
  const prompts: Array<[LucideIcon, string, string]> = [[PiggyBank, "How can I save more?", "Smart tips to help you save every day."], [LineChart, "Analyze my spending", "See where your money goes."], [TrendingUp, "Should I invest now?", "Know if it’s the right time for you."], [CalendarDays, "Help with EMI planning", "Plan your EMIs better & stress-free."], [Target, "Show my goal progress", "Check how close you are to your goals."], [WalletCards, "Am I overspending?", "Find out if you’re spending too much."]];
  const choose = (prompt: string) => { setQuestion(prompt); notify("Finella prepared a tailored answer"); };
  const reply = question?.toLowerCase().includes("spending") || question?.toLowerCase().includes("overspending") ? "Food & Dining is your clearest opportunity this month. Capping your next four orders at ₹1,145 would bring the category back toward plan." : question?.toLowerCase().includes("goal") ? "Your Emergency Fund is 68% funded. Keeping a ₹5,000 monthly contribution gets you to the goal in about four months." : question?.toLowerCase().includes("save") ? "Start with food and subscriptions. Those two areas could free up roughly ₹4,247 per month without affecting essentials." : "I’ve looked at your recent plan and turned that into one focused next step. Open your insights or budget to see the supporting numbers.";
  return (
    <>
      <AppHeader title={<>Finella <span className="ai-title">AI <Sparkles size={17} /></span></>} subtitle="Your personal financial coach" right={<><button className="premium-top" onClick={() => navigate("subscription")}><Crown size={15} /> Premium</button><button className="round-control notification-dot" aria-label="Open notifications" onClick={() => navigate("notifications")}><Bell size={20} /></button></>} />
      <div className="app-scroll fin-ai-screen">
        <section className="ai-hero" style={{ backgroundImage: `linear-gradient(105deg, rgba(1,61,32,.92), rgba(1,54,28,.86)), url(${FOREST_TEXTURE})` }}><div className="ai-compass-coach"><img src={SPARK_MARK} alt="Finella compass spark" /><span>CALM<br />MONEY<br />CLARITY</span><i aria-hidden="true" /></div><div className="ai-speech"><h2><strong>Hey there.</strong><br />I’m Finella AI, your <strong>financial coach.</strong></h2><p>Ask for an evidence-led next step, not a generic answer.</p></div><div className="ai-quick"><button onClick={() => choose("Analyze my spending")}>Analyze spending</button><button onClick={() => choose("How can I save more?")}>Find savings</button><button onClick={() => choose("Show my goal progress")}>Check goals</button></div></section>
        <button className="monthly-insight" onClick={() => choose("Keep tracking my expenses") }><span>⭐</span><div><b>Insight for this month</b><strong>Keep tracking your expenses!</strong></div><LineChart size={42} /><ChevronRight size={17} /></button>
        <div className="ai-list-heading"><h2>Try asking me...</h2><button onClick={() => setPopularOpen(!popularOpen)}>🔥 Popular <ChevronDown size={14} /></button></div>
        {popularOpen ? <div className="ai-popular-menu"><button onClick={() => choose("Show my goal progress")}>Goals</button><button onClick={() => choose("Analyze my spending")}>Spending</button><button onClick={() => choose("How can I save more?")}>Saving</button></div> : null}
        <div className="ai-prompt-list">{prompts.map(([Icon, title, sub]) => <button key={title} onClick={() => choose(title)}><MiniIcon icon={Icon} tone="mint" /><span><b>{title}</b><small>{sub}</small></span><ChevronRight size={18} /></button>)}</div>
        {question ? <div className="ai-answer"><Sparkles size={18} /><span><b>Finella AI</b><small>You asked: {question}</small><p>{reply}</p><button onClick={() => navigate(question.toLowerCase().includes("goal") ? "goal-detail" : question.toLowerCase().includes("spending") ? "insight-detail" : "budgets")}>Open related plan <ChevronRight size={14} /></button></span></div> : null}
        <form className="ai-input" onSubmit={(event) => { event.preventDefault(); if (!draft.trim()) { notify("Write a question for Finella first"); return; } choose(draft.trim()); setDraft(""); }}><Sparkles size={21} /><input aria-label="Ask Finella anything" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask Finella anything..." /><button aria-label="Send question" type="submit"><Send size={19} /></button></form>
        <p className="privacy-line"><ShieldCheck size={15} /> Your data is private and secure</p>
      </div>
    </>
  );
}

function AssetDetailScreen({ screen, goBack, navigate }: { screen: AssetScreen; goBack: () => void; navigate: (screen: Screen) => void }) {
  const detail = {
    "bank-accounts": { title: "Bank Accounts", total: "2,85,000", icon: Landmark, tone: "green" as const, subtitle: "2 accounts connected", items: [["HDFC Bank", "Salary account", "1,75,000"], ["SBI Savings", "Primary savings", "1,10,000"]] },
    investments: { title: "Investments", total: "48,500", icon: LineChart, tone: "mint" as const, subtitle: "Your active portfolio", items: [["Index Funds", "Long-term growth", "32,500"], ["Gold Fund", "Diversified allocation", "16,000"]] },
    cash: { title: "Cash", total: "12,000", icon: WalletCards, tone: "gold" as const, subtitle: "Available cash balances", items: [["Wallet Cash", "Everyday spend", "7,000"], ["Emergency cash", "Quick-access reserve", "5,000"]] },
    "credit-cards": { title: "Credit Cards", total: "-18,500", icon: WalletCards, tone: "coral" as const, subtitle: "Current outstanding balance", items: [["HDFC Regalia", "Payment due Aug 25", "12,300"], ["ICICI Coral", "Payment due Aug 28", "6,200"]] },
    loans: { title: "Loans", total: "-18,000", icon: CircleUserRound, tone: "coral" as const, subtitle: "Upcoming loan commitments", items: [["Personal Loan", "EMI due Aug 28", "12,000"], ["Education Loan", "EMI due Sep 02", "6,000"]] },
  }[screen];
  const DetailIcon = detail.icon;
  return <><AppHeader title={detail.title} subtitle={detail.subtitle} onBack={goBack} right={<button className="round-control" aria-label={`Add ${detail.title}`} onClick={() => navigate(screen === "bank-accounts" ? "reconcile" : "transactions")}><Plus size={21} /></button>} /><div className="app-scroll asset-detail-scroll"><section className="asset-detail-hero"><MiniIcon icon={DetailIcon} tone={detail.tone} /><span><small>Total value</small><b className={detail.total.startsWith("-") ? "negative" : ""}>₹{detail.total}</b><em>{screen === "bank-accounts" ? "↑ ₹12,450 since last month" : "Updated today"}</em></span><LineChart size={37} /></section><section className="card asset-detail-list"><div className="section-heading"><div><SmallLabel>Connected accounts</SmallLabel><h2>{detail.title}</h2></div><button className="text-link" onClick={() => navigate("account")}>Manage <ChevronRight size={15} /></button></div>{detail.items.map(([name, description, amount]) => <button key={name} onClick={() => navigate(screen === "bank-accounts" ? "reconcile" : "transactions")}><MiniIcon icon={DetailIcon} tone={detail.tone} /><span><b>{name}</b><small>{description}</small></span><strong>₹{amount}</strong><ChevronRight size={16} /></button>)}</section><section className="asset-detail-note"><ShieldCheck size={18} /><span><b>Your data is private and secure</b><small>Connected accounts refresh automatically when available.</small></span></section></div></>;
}

type BudgetKind = "category" | "tag";
const categoryBudgets = [
  { name: "Food & Dining", spent: 6420, limit: 6000, tone: "coral" as const, icon: ShoppingBag, note: "₹420 over plan" },
  { name: "Shopping", spent: 3800, limit: 4000, tone: "gold" as const, icon: ShoppingBag, note: "₹200 left" },
  { name: "Transport", spent: 4120, limit: 5000, tone: "green" as const, icon: Banknote, note: "₹880 left" },
  { name: "Entertainment", spent: 1649, limit: 2000, tone: "purple" as const, icon: Gift, note: "₹351 left" },
];
const tagBudgets = [
  { name: "Essentials", spent: 22870, limit: 28000, tone: "green" as const, icon: ShieldCheck, note: "₹5,130 left" },
  { name: "Lifestyle", spent: 10220, limit: 11000, tone: "gold" as const, icon: Sparkles, note: "₹780 left" },
  { name: "College", spent: 3450, limit: 5000, tone: "blue" as const, icon: BadgeIndianRupee, note: "₹1,550 left" },
];

function BudgetCardRow({ budget, onClick }: { budget: (typeof categoryBudgets)[number] | (typeof tagBudgets)[number]; onClick: () => void }) {
  const progress = Math.min(100, Math.round((budget.spent / budget.limit) * 100));
  return <button className="feature-row budget-feature-row" onClick={onClick}><MiniIcon icon={budget.icon} tone={budget.tone === "purple" ? "lilac" : budget.tone === "blue" ? "blue" : budget.tone} /><span><b>{budget.name}</b><small>₹{budget.spent.toLocaleString("en-IN")} of ₹{budget.limit.toLocaleString("en-IN")}</small><ProgressBar value={progress} color={budget.tone} thin /></span><strong className={progress >= 100 ? "negative" : ""}>{progress}%<em>{budget.note}</em></strong><ChevronRight size={16} /></button>;
}

function BudgetsScreen({ goBack, navigate, notify }: { goBack: () => void; navigate: (screen: Screen) => void; notify: (message: string) => void }) {
  const [kind, setKind] = useState<BudgetKind>("category");
  const [showForm, setShowForm] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftLimit, setDraftLimit] = useState("");
  const budgets = kind === "category" ? categoryBudgets : tagBudgets;
  const spent = budgets.reduce((total, item) => total + item.spent, 0);
  const limit = budgets.reduce((total, item) => total + item.limit, 0);
  return <><AppHeader title="Operating budgets" subtitle="CFO workspace · control spend against the operating plan." onBack={goBack} right={<button className="round-control" aria-label="Add operating budget" onClick={() => setShowForm(true)}><Plus size={21} /></button>} /><div className="app-scroll feature-screen"><section className="feature-hero budget-hero"><SmallLabel>OPERATING PLAN · AUGUST 2026</SmallLabel><div><span>Total planned</span><b>₹{limit.toLocaleString("en-IN")}</b><em>₹{(limit - spent).toLocaleString("en-IN")} still available</em></div><ProgressBar value={Math.round((spent / limit) * 100)} /><p><CheckCircle2 size={16} /> {Math.round((spent / limit) * 100)}% allocated this month</p></section><section className="card feature-card"><div className="section-heading"><div><SmallLabel>SPEND CONTROL</SmallLabel><h2>Budget variance</h2></div><button className="text-link" onClick={() => setShowForm(true)}>Add budget <Plus size={15} /></button></div><div className="segmented-control"><button className={kind === "category" ? "active" : ""} onClick={() => setKind("category")}><Goal size={15} /> By cost centre</button><button className={kind === "tag" ? "active" : ""} onClick={() => setKind("tag")}><Target size={15} /> By reporting group</button></div><div className="feature-list">{budgets.map((budget) => <BudgetCardRow budget={budget} key={budget.name} onClick={() => navigate("budget-detail")} />)}</div></section><section className="card action-note"><CircleAlert size={19} /><span><b>One variance needs attention</b><small>Food & Dining is ₹420 over the approved plan.</small></span><button onClick={() => navigate("insight-detail")}>Review <ChevronRight size={15} /></button></section></div>{showForm ? <div className="transaction-sheet-layer" role="dialog" aria-modal="true" aria-label="Add operating budget"><button className="sheet-scrim" aria-label="Close add budget" onClick={() => setShowForm(false)} /><form className="transaction-sheet add-sheet" onSubmit={(event) => { event.preventDefault(); if (!draftName.trim() || !Number(draftLimit)) { notify("Add a budget name and amount to continue"); return; } setShowForm(false); setDraftName(""); setDraftLimit(""); notify("Operating budget created for August"); }}><button type="button" className="sheet-close" aria-label="Close add budget" onClick={() => setShowForm(false)}><X size={18} /></button><SmallLabel>NEW OPERATING PLAN</SmallLabel><h2>Add a budget</h2><label>Budget name<input autoFocus value={draftName} onChange={(event) => setDraftName(event.target.value)} placeholder="e.g. Travel" /></label><label>Monthly limit<input inputMode="decimal" value={draftLimit} onChange={(event) => setDraftLimit(event.target.value)} placeholder="0" /></label><label>Budget type<select value={kind} onChange={(event) => setKind(event.target.value as BudgetKind)}><option value="category">Cost centre</option><option value="tag">Reporting group</option></select></label><button className="sheet-primary" type="submit"><Plus size={16} /> Create budget</button></form></div> : null}</>;
}

function BudgetDetailScreen({ goBack, navigate, notify }: { goBack: () => void; navigate: (screen: Screen) => void; notify: (message: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [limit, setLimit] = useState("6000");
  return <><AppHeader title="Food & Dining" subtitle="August budget" onBack={goBack} right={<button className="round-control" aria-label="Edit budget" onClick={() => setEditing(true)}><UserRoundPen size={19} /></button>} /><div className="app-scroll feature-screen"><section className="feature-hero budget-detail-hero"><SmallLabel>Monthly budget</SmallLabel><b>₹6,420 <small>of ₹6,000</small></b><ProgressBar value={100} color="coral" /><p><CircleAlert size={16} /> ₹420 over your plan</p></section><section className="card feature-card"><div className="section-heading"><div><SmallLabel>Where it went</SmallLabel><h2>Food activity</h2></div><button className="text-link" onClick={() => navigate("transactions")}>See all <ChevronRight size={15} /></button></div>{[["Swiggy", "Today · Dinner", "420"], ["Zomato", "Aug 17 · Lunch", "690"], ["Starbucks", "Aug 16 · Coffee", "250"], ["Zepto", "Aug 14 · Groceries", "1,180"]].map(([name, meta, value]) => <button className="feature-row" key={name} onClick={() => navigate("transactions")}><MiniIcon icon={ShoppingBag} tone="gold" /><span><b>{name}</b><small>{meta}</small></span><strong>-₹{value}</strong><ChevronRight size={16} /></button>)}</section><section className="card action-note"><Lightbulb size={19} /><span><b>Bring this back on track</b><small>Keep the next four food orders below ₹1,145 total.</small></span><button onClick={() => navigate("fin-ai")}>Ask Fin <ChevronRight size={15} /></button></section></div>{editing ? <div className="transaction-sheet-layer" role="dialog" aria-modal="true" aria-label="Edit food budget"><button className="sheet-scrim" aria-label="Close edit budget" onClick={() => setEditing(false)} /><form className="transaction-sheet add-sheet" onSubmit={(event) => { event.preventDefault(); setEditing(false); notify(`Food & Dining budget updated to ₹${Number(limit).toLocaleString("en-IN")}`); }}><button type="button" className="sheet-close" aria-label="Close edit budget" onClick={() => setEditing(false)}><X size={18} /></button><SmallLabel>Monthly limit</SmallLabel><h2>Edit Food & Dining</h2><label>Budget amount<input inputMode="decimal" value={limit} onChange={(event) => setLimit(event.target.value)} /></label><button className="sheet-primary" type="submit">Save budget</button></form></div> : null}</>;
}

const scoreMetrics: Array<[string, number, string, string, LucideIcon]> = [["Income Stability", 9, "+1 this month", "Consistent salary credits", Landmark], ["Savings Discipline", 10, "+2 this month", "You saved 32% of income", PiggyBank], ["Expense Discipline", 7, "Needs attention", "Food spending moved above plan", ShoppingBag], ["Budget Discipline", 8, "On track", "Most category budgets are healthy", Goal], ["Debt Management", 7, "Stable", "Utilisation is below your threshold", ReceiptText], ["Emergency Fund", 8, "Strong", "You have 3.1 months covered", ShieldCheck], ["Investment Habit", 8, "Consistent", "Monthly SIP is active", LineChart], ["R-Streak Consistency", 9, "+3 this month", "18 reconciliation days", Flame], ["Financial Goals", 8, "Progressing", "Emergency Fund is 68% funded", Target], ["Financial Learning", 8, "Growing", "Four financial check-ins complete", Lightbulb]];

function FinScoreScreen({ goBack, navigate }: { goBack: () => void; navigate: (screen: Screen) => void }) {
  return <><AppHeader title="FinScore" subtitle="Your financial health, explained." onBack={goBack} right={<button className="round-control" aria-label="FinScore details" onClick={() => navigate("finscore-detail")}><Info size={19} /></button>} /><div className="app-scroll feature-screen"><section className="score-detail-hero"><SmallLabel>August 2026</SmallLabel><div className="large-score-ring"><b>82</b><small>out of 100</small></div><h2>Excellent financial health</h2><p>Up 12 points since July through better saving and reconciliation habits.</p><button className="sheet-primary" onClick={() => navigate("finscore-detail")}>See score logic <ChevronRight size={17} /></button></section><section className="card feature-card"><div className="section-heading"><div><SmallLabel>What shapes your score</SmallLabel><h2>10 financial habits</h2></div><span className="micro-badge">40 foundation + 60 performance</span></div><div className="score-metric-list">{scoreMetrics.map(([label, points, status, detail, Icon]) => <button key={label} className="feature-row score-metric" onClick={() => navigate("finscore-detail")}><MiniIcon icon={Icon} tone={label === "Expense Discipline" ? "coral" : "mint"} /><span><b>{label}</b><small>{detail}</small></span><strong>{points}/10<em>{status}</em></strong><ChevronRight size={16} /></button>)}</div></section><section className="card score-guidance"><div><CheckCircle2 size={19} /><span><b>What is helping</b><small>Budget consistency, saving rate, and your R-Streak.</small></span></div><div><CircleAlert size={19} /><span><b>What to improve</b><small>Reduce discretionary food spending next month.</small></span></div><button onClick={() => navigate("budget-detail")}>Open Food budget <ChevronRight size={16} /></button></section></div></>;
}

function FinScoreDetailScreen({ goBack, navigate }: { goBack: () => void; navigate: (screen: Screen) => void }) {
  return <><AppHeader title="How FinScore works" subtitle="Clear, practical, and personal." onBack={goBack} /><div className="app-scroll feature-screen"><section className="card explainer-card"><SmallLabel>Your result</SmallLabel><h2>82 / 100 · Excellent</h2><p>FinScore combines your financial foundations with the habits you are building each month. It is designed to explain what is improving and where attention would help.</p><div className="foundation-grid"><div><b>34</b><span>of 40</span><small>Foundation</small></div><div><b>48</b><span>of 60</span><small>Performance</small></div></div></section><section className="card feature-card"><div className="section-heading"><div><SmallLabel>Score foundations</SmallLabel><h2>40 points available</h2></div></div>{[["Stable income", "8 / 10"], ["Savings & emergency fund", "17 / 20"], ["Healthy debt", "9 / 10"]].map(([label, value]) => <div className="explain-row" key={label}><span>{label}</span><b>{value}</b></div>)}</section><section className="card feature-card"><div className="section-heading"><div><SmallLabel>Monthly performance</SmallLabel><h2>60 points available</h2></div></div><p className="feature-copy">Applicable habits are measured against your own plan. When a metric is not applicable, the related foundation allocation remains with you rather than becoming a penalty.</p><button className="sheet-primary" onClick={() => navigate("r-streak")}>Strengthen my R-Streak <Flame size={16} /></button></section></div></>;
}

function NotificationsScreen({ goBack, navigate }: { goBack: () => void; navigate: (screen: Screen) => void }) {
  const [read, setRead] = useState<string[]>([]);
  const entries: Array<[string, string, string, LucideIcon, Screen]> = [["Needs attention", "Food budget is 92% used.", "Review before your next order", CircleAlert, "budget-detail"], ["Upcoming", "Netflix payment is tomorrow.", "₹649 from HDFC Bank", CalendarDays, "transactions"], ["Insights", "You spent 18% more this week.", "Food and shopping are driving it", Lightbulb, "insight-detail"], ["Success", "You stayed under budget this week.", "Keep the current pace", CheckCircle2, "budgets"]];
  return <><AppHeader title="Notifications" subtitle="Only the financial signals that matter." onBack={goBack} right={<button className="text-link" onClick={() => setRead(entries.map((entry) => entry[1]))}>Mark all read</button>} /><div className="app-scroll feature-screen"><section className="card feature-card notification-list">{entries.map(([group, title, body, Icon, destination]) => <button className={`notice-row ${read.includes(title) ? "read" : ""}`} key={title} onClick={() => { setRead((current) => current.includes(title) ? current : [...current, title]); navigate(destination); }}><span className="notice-icon"><Icon size={18} /></span><span><small>{group}</small><b>{title}</b><em>{body}</em></span>{!read.includes(title) ? <i aria-label="Unread" /> : null}<ChevronRight size={16} /></button>)}</section><p className="screen-footnote">Notifications are grouped by urgency, upcoming events, insight, and progress.</p></div></>;
}

function ReportsScreen({ goBack, navigate }: { goBack: () => void; navigate: (screen: Screen) => void }) {
  const [tab, setTab] = useState<"Position" | "P&L" | "Cash flow">("Position");
  const [period, setPeriod] = useState("August 2026");
  const [showPeriods, setShowPeriods] = useState(false);
  return <><AppHeader title="Executive reports" subtitle="CEO/CFO workspace · financial position, performance, and cash." onBack={goBack} right={<div className="transaction-tool-wrap"><button className="date-selector" onClick={() => setShowPeriods(!showPeriods)}><CalendarDays size={16} /> {period} <ChevronDown size={14} /></button>{showPeriods ? <div className="tool-menu report-period-menu">{["August 2026", "July 2026", "This quarter"].map((value) => <button className={period === value ? "active" : ""} key={value} onClick={() => { setPeriod(value); setShowPeriods(false); }}>{value}</button>)}</div> : null}</div>} /><div className="app-scroll feature-screen"><div className="segmented-control report-tabs">{(["Position", "P&L", "Cash flow"] as const).map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item}</button>)}</div>{tab === "Position" ? <><section className="feature-hero report-hero"><SmallLabel>CAPITAL POSITION</SmallLabel><b>₹2,48,500</b><span>Liquid net worth</span><p><TrendingUp size={16} /> ₹12,450 higher than last month</p></section><section className="card feature-card"><h2>Assets and liabilities</h2>{[["Bank accounts", "2,85,000", "bank-accounts"], ["Investments", "48,500", "investments"], ["Credit cards", "-18,500", "credit-cards"], ["Loans", "-18,000", "loans"]].map(([label, amount, destination]) => <button className="feature-row" key={label} onClick={() => navigate(destination as Screen)}><span><b>{label}</b><small>Updated today</small></span><strong className={amount.startsWith("-") ? "negative" : ""}>₹{amount}</strong><ChevronRight size={16} /></button>)}</section></> : null}{tab === "P&L" ? <><section className="card report-stat-grid"><div><span>Income</span><b className="positive">₹45,000</b></div><div><span>Expenses</span><b className="negative">₹28,450</b></div><div><span>Net saved</span><b>₹16,550</b></div></section><section className="card feature-card"><h2>Cost drivers</h2>{categoryBudgets.slice(0, 3).map((budget) => <button className="feature-row" key={budget.name} onClick={() => navigate("budget-detail")}><span><b>{budget.name}</b><small>August spending</small></span><strong>₹{budget.spent.toLocaleString("en-IN")}</strong><ChevronRight size={16} /></button>)}</section></> : null}{tab === "Cash flow" ? <><section className="card report-stat-grid"><div><span>Inflow</span><b className="positive">₹47,250</b></div><div><span>Outflow</span><b className="negative">₹30,500</b></div><div><span>Closing</span><b>₹2,85,000</b></div></section><section className="card feature-card"><h2>Cash movement</h2><div className="cashflow-bars"><span style={{ height: "55%" }} /><span style={{ height: "78%" }} /><span style={{ height: "46%" }} /><span style={{ height: "92%" }} /><span style={{ height: "61%" }} /></div><button className="sheet-primary" onClick={() => navigate("transactions")}>Open cash ledger <ChevronRight size={16} /></button></section></> : null}</div></>;
}

function ProfileScreen({ goBack, notify }: { goBack: () => void; notify: (message: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Prudhvi Raj");
  const [email, setEmail] = useState("prudhvi@finella.app");
  return <><AppHeader title="Profile" subtitle="Your personal finance space." onBack={goBack} right={<button className="round-control" aria-label="Edit profile" onClick={() => setEditing(!editing)}><UserRoundPen size={19} /></button>} /><div className="app-scroll feature-screen"><section className="profile-identity"><span>P</span><h2>{name}</h2><p>{email}</p><em><CheckCircle2 size={15} /> Profile complete</em></section><section className="card feature-card"><h2>Personal details</h2>{editing ? <form className="profile-form" onSubmit={(event) => { event.preventDefault(); setEditing(false); notify("Profile changes saved"); }}><label>Preferred name<input value={name} onChange={(event) => setName(event.target.value)} /></label><label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><button className="sheet-primary" type="submit">Save profile</button></form> : <><div className="feature-row static-row"><MiniIcon icon={CircleUserRound} tone="mint" /><span><b>{name}</b><small>Preferred name</small></span></div><div className="feature-row static-row"><MiniIcon icon={Send} tone="blue" /><span><b>{email}</b><small>Email address</small></span></div><button className="sheet-primary" onClick={() => setEditing(true)}>Edit profile</button></>}</section><section className="card feature-card"><h2>Financial preferences</h2><div className="feature-row static-row"><MiniIcon icon={Banknote} tone="gold" /><span><b>Indian Rupee (₹)</b><small>Base currency</small></span></div><div className="feature-row static-row"><MiniIcon icon={CalendarDays} tone="mint" /><span><b>Monthly planning</b><small>Budget period starts on the 1st</small></span></div></section></div></>;
}

function LabelsScreen({ type, goBack, notify }: { type: "categories" | "tags"; goBack: () => void; notify: (message: string) => void }) {
  const initial = type === "categories" ? ["Food & Dining", "Shopping", "Transport", "Bills & Utilities", "Entertainment"] : ["Essentials", "Lifestyle", "College", "Subscriptions"];
  const [labels, setLabels] = useState(initial);
  const [draft, setDraft] = useState("");
  const [adding, setAdding] = useState(false);
  const title = type === "categories" ? "Categories" : "Tags";
  return <><AppHeader title={title} subtitle={`Keep your ${title.toLowerCase()} clear and consistent.`} onBack={goBack} right={<button className="round-control" aria-label={`Add ${type.slice(0, -1)}`} onClick={() => setAdding(true)}><Plus size={21} /></button>} /><div className="app-scroll feature-screen"><section className="card feature-card"><div className="section-heading"><div><SmallLabel>Organisation</SmallLabel><h2>Your {title.toLowerCase()}</h2></div><button className="text-link" onClick={() => setAdding(true)}>Add <Plus size={15} /></button></div>{labels.map((label, index) => <div className="feature-row label-row" key={label}><MiniIcon icon={type === "categories" ? Goal : Target} tone={index % 2 ? "gold" : "mint"} /><span><b>{label}</b><small>{type === "categories" ? "Used in your budget and transactions" : "Custom spending context"}</small></span><button aria-label={`Delete ${label}`} className="icon-text-action" onClick={() => { setLabels((current) => current.filter((item) => item !== label)); notify(`${label} removed`); }}><Trash2 size={16} /></button></div>)}</section><section className="card action-note"><Lightbulb size={19} /><span><b>Keep labels simple</b><small>Use categories for where money goes and tags for why it matters.</small></span></section></div>{adding ? <div className="transaction-sheet-layer" role="dialog" aria-modal="true" aria-label={`Add ${type.slice(0, -1)}`}><button className="sheet-scrim" aria-label="Close add label" onClick={() => setAdding(false)} /><form className="transaction-sheet add-sheet" onSubmit={(event) => { event.preventDefault(); if (!draft.trim()) { notify(`Enter a ${type.slice(0, -1)} name`); return; } setLabels((current) => [...current, draft.trim()]); setDraft(""); setAdding(false); notify(`${title.slice(0, -1)} added`); }}><button className="sheet-close" type="button" aria-label="Close add label" onClick={() => setAdding(false)}><X size={18} /></button><SmallLabel>New {type.slice(0, -1)}</SmallLabel><h2>Add {type.slice(0, -1)}</h2><label>Name<input autoFocus value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={type === "categories" ? "e.g. Health" : "e.g. Family"} /></label><button className="sheet-primary" type="submit"><Plus size={16} /> Add {type.slice(0, -1)}</button></form></div> : null}</>;
}

function GoalDetailScreen({ goBack, navigate, notify }: { goBack: () => void; navigate: (screen: Screen) => void; notify: (message: string) => void }) {
  const [contribution, setContribution] = useState("5000");
  return <><AppHeader title="Emergency Fund" subtitle="Your safety cushion." onBack={goBack} right={<button className="round-control" aria-label="Contribute to goal" onClick={() => notify("Contribution form opened")}><Plus size={20} /></button>} /><div className="app-scroll feature-screen"><section className="feature-hero goal-detail-hero"><SmallLabel>Current balance</SmallLabel><b>₹68,000 <small>of ₹1,00,000</small></b><ProgressBar value={68} /><p>₹32,000 to fully fund this goal</p></section><section className="card feature-card"><h2>Build it steadily</h2><p className="feature-copy">At your current saving pace, you can reach this goal in about four months.</p><label className="inline-field">Monthly contribution<input value={contribution} onChange={(event) => setContribution(event.target.value)} inputMode="decimal" /></label><button className="sheet-primary" onClick={() => notify(`₹${Number(contribution).toLocaleString("en-IN")} monthly contribution scheduled`)}>Schedule contribution</button></section><section className="card action-note"><Sparkles size={19} /><span><b>Make this goal easier</b><small>Direct a part of your food budget savings here.</small></span><button onClick={() => navigate("budget-detail")}>Review budget <ChevronRight size={15} /></button></section></div></>;
}

function InsightDetailScreen({ goBack, navigate }: { goBack: () => void; navigate: (screen: Screen) => void }) {
  return <><AppHeader title="Food spending alert" subtitle="A clear next step for August." onBack={goBack} /><div className="app-scroll feature-screen"><section className="insight-problem"><SmallLabel>Problem</SmallLabel><h2>You’re spending too much on food.</h2><p>Food & Dining is 28% above your three-month average.</p></section><section className="card insight-evidence"><SmallLabel>Evidence</SmallLabel><div><span>This month<b>₹6,420</b></span><span>Typical month<b>₹5,340</b></span></div><ProgressBar value={100} color="coral" /></section><section className="card feature-card"><SmallLabel>Impact</SmallLabel><h2>₹1,080 is crowding out your savings plan.</h2><p className="feature-copy">If this pace continues, it will reduce the emergency-fund contribution you planned for month-end.</p></section><section className="card recommendation-card"><SmallLabel>Recommendation</SmallLabel><h2>Set a ₹5,500 food budget next month.</h2><p>That keeps food spending realistic while returning your savings plan to target.</p><button className="sheet-primary" onClick={() => navigate("budget-detail")}>Review Food budget <ChevronRight size={16} /></button><button className="text-link" onClick={() => navigate("fin-ai")}>Ask Fin for a plan <Sparkles size={15} /></button></section></div></>;
}

function ReconcileScreen({ goBack, notify }: { goBack: () => void; notify: (message: string) => void }) {
  const [actual, setActual] = useState("175000");
  const [resolved, setResolved] = useState(false);
  const [pending, setPending] = useState(false);
  const difference = Number(actual || 0) - 175000;
  const isMatch = difference === 0;
  return <><AppHeader title="Daily reconciliation" subtitle="Aug 20 · confirm what is real." onBack={goBack} /><div className="app-scroll feature-screen"><section className="reconcile-status"><SmallLabel>HDFC Bank</SmallLabel><h2>{resolved || isMatch ? "Account reconciled" : pending ? "Marked pending" : "Verify your balance"}</h2><p>{resolved || isMatch ? "Book and actual balance now agree." : pending ? "You can return when you have the bank balance." : "Compare Finella’s book balance with your bank app."}</p></section><section className="card reconcile-balances"><div><span>Book balance</span><b>₹1,75,000</b><small>From recorded transactions</small></div><div><span>Actual balance</span><input value={actual} onChange={(event) => { setActual(event.target.value); setResolved(false); setPending(false); }} inputMode="decimal" aria-label="Actual bank balance" /><small>Enter from bank app</small></div><strong className={isMatch ? "positive" : "negative"}>{isMatch ? "Matched" : `${difference > 0 ? "+" : "-"}₹${Math.abs(difference).toLocaleString("en-IN")} mismatch`}</strong></section>{!isMatch && !resolved && !pending ? <section className="card feature-card"><SmallLabel>Resolve mismatch</SmallLabel><h2>Choose what happened</h2><button className="feature-row" onClick={() => { setActual("175000"); notify("Missing transaction added for review"); }}><MiniIcon icon={ReceiptText} tone="gold" /><span><b>Missing transaction</b><small>Add the payment or income that is absent.</small></span><ChevronRight size={16} /></button><button className="feature-row" onClick={() => { setActual("175000"); setResolved(true); notify("Adjustment created and reconciled"); }}><MiniIcon icon={ArrowDownUp} tone="mint" /><span><b>Create adjustment</b><small>Record a one-off balance correction.</small></span><ChevronRight size={16} /></button><button className="feature-row" onClick={() => { setPending(true); notify("Account marked pending for today"); }}><MiniIcon icon={CalendarDays} tone="blue" /><span><b>Leave pending</b><small>Finish after you confirm the actual balance.</small></span><ChevronRight size={16} /></button></section> : null}<button className="sheet-primary reconcile-confirm" disabled={pending} onClick={() => { if (isMatch || resolved) notify("HDFC Bank reconciled — your R-Streak advanced"); else notify("Enter the exact actual balance to reconcile"); }}><CheckCircle2 size={17} /> Mark as reconciled</button></div></>;
}

function GoalsScreen({ goBack, navigate }: { goBack: () => void; navigate: (screen: Screen) => void }) {
  const goals: Array<[LucideIcon, string, string, string, number, "green" | "gold" | "purple"]> = [[ShieldCheck, "Emergency Fund", "68,000", "1,00,000", 68, "green"], [Banknote, "MacBook Fund", "72,000", "1,20,000", 60, "gold"], [Goal, "Goa Trip", "24,000", "50,000", 48, "purple"]];
  return <><AppHeader title="Goals" subtitle="Give your future a funded plan." onBack={goBack} right={<button className="round-control" aria-label="Add goal" onClick={() => navigate("goal-detail")}><Plus size={21} /></button>} /><div className="app-scroll feature-screen"><section className="feature-hero goals-hero"><SmallLabel>All goals</SmallLabel><b>₹1,64,000</b><span>saved toward ₹2,70,000</span><ProgressBar value={61} /><p>Three goals are moving forward.</p></section><section className="card feature-card">{goals.map(([Icon, title, saved, target, progress, tone]) => <button className="feature-row goal-feature-row" key={title} onClick={() => navigate("goal-detail")}><MiniIcon icon={Icon} tone={tone === "purple" ? "lilac" : tone} /><span><b>{title}</b><small>₹{saved} of ₹{target}</small><ProgressBar value={progress} color={tone} thin /></span><strong>{progress}%</strong><ChevronRight size={16} /></button>)}</section></div></>;
}

const utilityContent: Record<string, { title: string; subtitle: string; icon: LucideIcon; intro: string; actions: Array<[string, string]> }> = {
  "tax-returns": { title: "Tax Returns", subtitle: "Bring tax records together.", icon: ReceiptText, intro: "Your income, eligible expenses, and documents are ready to review.", actions: [["Review tax checklist", "Your August records are 82% complete"], ["Add tax document", "Store an invoice or proof of investment"]] },
  "money-saving": { title: "Money Saving", subtitle: "Small moves, meaningful gains.", icon: PiggyBank, intro: "Your current plan could free up ₹7,240 each month.", actions: [["Reduce food spending", "Potential saving ₹2,400 / month"], ["Review subscriptions", "Potential saving ₹1,847 / month"]] },
  documents: { title: "Documents", subtitle: "Financial records, organised.", icon: WalletCards, intro: "Keep statements, invoices, and tax proofs in one place.", actions: [["Upload a statement", "PDF or image, stored locally in this prototype"], ["View August documents", "3 financial records organised"]] },
  "net-worth": { title: "Net Worth", subtitle: "The fuller view of your money.", icon: Landmark, intro: "Your liquid net worth is ₹2,48,500 this month.", actions: [["Open financial position", "See assets and liabilities"], ["Review investments", "Portfolio value ₹48,500"]] },
  recurring: { title: "Recurring", subtitle: "Stay ahead of repeating payments.", icon: RefreshCw, intro: "Netflix, rent, and phone bill are coming up this month.", actions: [["Review Netflix", "₹649 due tomorrow"], ["Manage rent", "₹18,000 due Aug 25"]] },
  security: { title: "Security & Privacy", subtitle: "Control how Finella protects you.", icon: ShieldCheck, intro: "Your local prototype data is private and protected.", actions: [["Change PIN", "Use a strong personal PIN"], ["Biometric unlock", "Enabled for this device"]] },
  "backup-restore": { title: "Backup & Restore", subtitle: "Keep your records recoverable.", icon: Banknote, intro: "Create an on-device backup of this prototype's finance setup.", actions: [["Create backup", "Capture your current mock finance data"], ["Restore backup", "Choose a previously saved local backup"]] },
  help: { title: "Help & Support", subtitle: "Get unstuck, quickly.", icon: CircleHelp, intro: "Start with a guide or send your question to the Finella team.", actions: [["Reconciliation guide", "Learn how Book and Actual balances work"], ["Contact support", "Describe the help you need"]] },
  feedback: { title: "Share feedback", subtitle: "Help shape Finella.", icon: Lightbulb, intro: "Tell us what feels useful, unclear, or missing.", actions: [["Share product feedback", "Open the feedback form"], ["Report a problem", "Describe what did not work"]] },
  about: { title: "About Finella", subtitle: "Simple, intelligent money clarity.", icon: Info, intro: "Finella 1.0.0 turns financial data into useful decisions.", actions: [["Terms of use", "Read the prototype terms"], ["Privacy approach", "Understand how finance data is treated"]] },
  account: { title: "Account", subtitle: "Manage your Finella account.", icon: WalletCards, intro: "Control your identity, data, and connected experience.", actions: [["Account information", "View personal account details"], ["Delete account", "Open a confirmation path"]] },
  subscription: { title: "Subscription", subtitle: "Manage your Finella plan.", icon: Crown, intro: "You are currently experiencing Premium prototype features.", actions: [["Compare plans", "See Free and Premium features"], ["Manage plan", "Review your current selection"]] },
};

function UtilityScreen({ screen, goBack, navigate, notify }: { screen: keyof typeof utilityContent; goBack: () => void; navigate: (screen: Screen) => void; notify: (message: string) => void }) {
  const content = utilityContent[screen];
  const Icon = content.icon;
  const routeForAction = (action: string): Screen | null => action.includes("Reconciliation") ? "reconcile" : action.includes("financial position") ? "reports" : action.includes("investments") ? "investments" : action.includes("food") ? "budget-detail" : action.includes("Netflix") ? "transactions" : null;
  return <><AppHeader title={content.title} subtitle={content.subtitle} onBack={goBack} /><div className="app-scroll feature-screen"><section className="utility-hero"><MiniIcon icon={Icon} tone="mint" /><h2>{content.intro}</h2></section><section className="card feature-card">{content.actions.map(([title, description]) => <button className="feature-row" key={title} onClick={() => { const route = routeForAction(title); if (route) navigate(route); else notify(`${title} opened`); }}><MiniIcon icon={Icon} tone="mint" /><span><b>{title}</b><small>{description}</small></span><ChevronRight size={16} /></button>)}</section></div></>;
}

function GlobalAddSheet({ onClose, navigate, notify }: { onClose: () => void; navigate: (screen: Screen) => void; notify: (message: string) => void }) {
  const [kind, setKind] = useState<"Expense" | "Income" | "Transfer" | "Budget" | null>(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  if (!kind) return <div className="transaction-sheet-layer" role="dialog" aria-modal="true" aria-label="Create new item"><button className="sheet-scrim" aria-label="Close add menu" onClick={onClose} /><section className="transaction-sheet global-add-menu"><button className="sheet-close" aria-label="Close add menu" onClick={onClose}><X size={18} /></button><SmallLabel>Quick add</SmallLabel><h2>What would you like to add?</h2>{([[ReceiptText, "Expense", "Record a purchase", "gold"], [ArrowDownLeft, "Income", "Record money received", "mint"], [ArrowDownUp, "Transfer", "Move money between accounts", "blue"], [Goal, "Budget", "Plan a spending limit", "lilac"]] as Array<[LucideIcon, "Expense" | "Income" | "Transfer" | "Budget", string, "gold" | "mint" | "blue" | "lilac"]>).map(([Icon, label, detail, tone]) => <button className="feature-row" key={label} onClick={() => setKind(label)}><MiniIcon icon={Icon} tone={tone} /><span><b>Add {label}</b><small>{detail}</small></span><ChevronRight size={16} /></button>)}</section></div>;
  return <div className="transaction-sheet-layer" role="dialog" aria-modal="true" aria-label={`Add ${kind}`}><button className="sheet-scrim" aria-label="Close add form" onClick={onClose} /><form className="transaction-sheet add-sheet" onSubmit={(event) => { event.preventDefault(); if (!title || !amount) { notify("Add a name and amount to continue"); return; } onClose(); navigate(kind === "Budget" ? "budgets" : "transactions"); notify(`${kind} added to your prototype`); }}><button type="button" className="sheet-close" aria-label="Return to add options" onClick={() => setKind(null)}><ArrowLeft size={18} /></button><SmallLabel>Quick add</SmallLabel><h2>Add {kind.toLowerCase()}</h2><label>{kind === "Budget" ? "Budget name" : kind === "Transfer" ? "Transfer name" : "Merchant or source"}<input autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder={kind === "Income" ? "e.g. Freelance payment" : kind === "Budget" ? "e.g. Travel" : "e.g. Coffee shop"} /></label><label>{kind === "Budget" ? "Monthly limit" : "Amount"}<input inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0" /></label><button className="sheet-primary" type="submit"><Plus size={16} /> Add {kind.toLowerCase()}</button></form></div>;
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
    const candidate = pathname.split("?")[0].replace(/^\//, "") as Screen;
    const supported: Screen[] = ["home", "transactions", "fin-ai", "insights", "more", "r-streak", "settings", ...assetScreenIds, "budgets", "budget-detail", "finscore", "finscore-detail", "notifications", "reports", "profile", "categories", "tags", "reconcile", "insight-detail", "goal-detail", "goals", "recurring", "security", "help", "feedback", "about", "tax-returns", "money-saving", "documents", "net-worth", "backup-restore", "account", "subscription"];
    return supported.includes(candidate) ? candidate : "home";
  };
  const screen = screenFromPath(location);
  const backStack = useRef<Screen[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showGlobalAdd, setShowGlobalAdd] = useState(false);
  const navigate = (next: Screen) => {
    if (next === screen) return;
    backStack.current = [...backStack.current, screen];
    setLocation(next === "home" ? "/" : `/${next}`);
  };
  const goBack = () => {
    const destination = backStack.current.pop() ?? "home";
    setLocation(destination === "home" ? "/" : `/${destination}`);
  };
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(null), 2300); };
  return (
    <main className={`prototype-stage ${darkMode ? "phone-dark" : ""}`}>
      <section className="device-scene" aria-label="Finella mobile app emulator">
        <div className="device-shadow" />
        <div className="phone-shell">
          <div className="phone-top"><span className="phone-time">9:41</span><div className="camera-notch" /><span className="phone-status"><i /><i /><i /></span></div>
          <div className="phone-screen">
            <div className="phone-ui-scale">
              <div className="screen-content" key={screen}>
                {screen === "home" && <HomeScreen navigate={navigate} notify={notify} />}
                {screen === "r-streak" && <RStreakScreen goBack={goBack} navigate={navigate} notify={notify} />}
                {screen === "transactions" && <TransactionsScreenV2 goBack={goBack} notify={notify} navigate={navigate} />}
                {screen === "insights" && <InsightsScreen notify={notify} navigate={navigate} />}
                {screen === "more" && <MoreScreen navigate={navigate} notify={notify} />}
                {screen === "settings" && <SettingsScreen goBack={goBack} darkMode={darkMode} setDarkMode={setDarkMode} notify={notify} navigate={navigate} />}
                {screen === "fin-ai" && <FinAIScreen notify={notify} navigate={navigate} />}
                {assetScreenIds.includes(screen as AssetScreen) && <AssetDetailScreen screen={screen as AssetScreen} goBack={goBack} navigate={navigate} />}
                {screen === "budgets" && <BudgetsScreen goBack={goBack} navigate={navigate} notify={notify} />}
                {screen === "budget-detail" && <BudgetDetailScreen goBack={goBack} navigate={navigate} notify={notify} />}
                {screen === "finscore" && <FinScoreScreen goBack={goBack} navigate={navigate} />}
                {screen === "finscore-detail" && <FinScoreDetailScreen goBack={goBack} navigate={navigate} />}
                {screen === "notifications" && <NotificationsScreen goBack={goBack} navigate={navigate} />}
                {screen === "reports" && <ReportsScreen goBack={goBack} navigate={navigate} />}
                {screen === "profile" && <ProfileScreen goBack={goBack} notify={notify} />}
                {screen === "categories" && <LabelsScreen type="categories" goBack={goBack} notify={notify} />}
                {screen === "tags" && <LabelsScreen type="tags" goBack={goBack} notify={notify} />}
                {screen === "reconcile" && <ReconcileScreen goBack={goBack} notify={notify} />}
                {screen === "insight-detail" && <InsightDetailScreen goBack={goBack} navigate={navigate} />}
                {screen === "goal-detail" && <GoalDetailScreen goBack={goBack} navigate={navigate} notify={notify} />}
                {screen === "goals" && <GoalsScreen goBack={goBack} navigate={navigate} />}
                {(["tax-returns", "money-saving", "documents", "net-worth", "recurring", "security", "backup-restore", "help", "feedback", "about", "account", "subscription"] as Array<keyof typeof utilityContent>).includes(screen as keyof typeof utilityContent) && <UtilityScreen screen={screen as keyof typeof utilityContent} goBack={goBack} navigate={navigate} notify={notify} />}
              </div>
              {(["home", "transactions", "fin-ai", "insights", "more"] as Screen[]).includes(screen) ? <BottomDock screen={screen} navigate={navigate} /> : null}
              <button className="global-add-fab" aria-label="Open quick add menu" onClick={() => setShowGlobalAdd(true)}><Plus size={23} /></button>
              {showGlobalAdd ? <GlobalAddSheet onClose={() => setShowGlobalAdd(false)} navigate={navigate} notify={notify} /> : null}
              {toast ? <div className="prototype-toast"><Check size={15} /> {toast}</div> : null}
            </div>
          </div>
          <div className="phone-home-indicator" />
        </div>
      </section>
    </main>
  );
}
