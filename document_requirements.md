# Document-derived Finella Prototype Requirements

## Product system

Finella is a personal-accounting and finance-habit product. Its primary product promises are accurate records, reconciliation, visible financial health, and daily consistency. The app therefore needs to make transaction management, account reconciliation, FinScore explanations, actionable insights, and Fin AI part of one connected journey.

## Core screens and required flows

| Area | Required screens | Essential prototype interactions |
|---|---|---|
| Home | Dashboard, FinScore detail, notifications, global add menu | Profile and Settings, open score, open notifications, open R-Streak, open asset/budget/transaction previews, global add choices |
| Transactions | List, detail, add/edit/delete, category assignment | Sort, filter, search, category and tag management, add income/expense/transfer, confirm deletion |
| Budgets | Budget overview, category detail, tag detail, budget form | Switch Category/Tag views, open budget, add/edit budget, warning states and progress |
| R-Streak | Calendar, daily reconciliation, mismatch resolution | Numeric dates, pick date, verify account balance, reconcile/pending/adjustment paths, update streak state |
| FinScore | Score overview, category contribution detail | Explain foundation/performance score, applicable status, positive/negative factors, recommendations |
| Insights | Insight feed, detail, recommended action | Open insight evidence, take a recommended budget/Fin AI action |
| Fin AI | Assistant chat | Prompt chips, send a message, contextual response, route to relevant finance action |
| Notifications | Grouped notification inbox, notification detail | Filter/read items, open source action, mark read |
| More and Settings | Account, reports, categories/tags, security/preferences | Open all listed settings rows, toggle preferences, back navigation |
| Reports | Financial-position, P&L, cash-flow views | Change report period, inspect account/category details |

## FinScore implementation presentation

The FinScore is presented as a 0–100 score consisting of a 40-point foundation plus up to 60 performance points. The prototype must make category-level contribution visible and explain that a non-applicable metric retains its foundation allocation rather than being penalised. Categories are Income Stability, Savings Discipline, Expense Discipline, Budget Discipline, Debt Management, Emergency Fund, Investment Habit, R-Streak Consistency, Financial Goals, and Financial Learning.

## Reconciliation rules to express in the prototype

Daily reconciliation covers active bank, credit card, cash, and optional wallet/UPI accounts; loans are monthly, and investments are optionally monthly. A reconciliation compares Book Balance with Actual Balance. Matched accounts become Reconciled; mismatches offer Missing Transaction, Create Adjustment, or Leave Pending. A date is green when fully reconciled, yellow when partially reconciled, red when missed, and grey when future. Completing all daily accounts increments the R-Streak.

## Completion standard

Every visible button, card, tab, dropdown, icon control, form, and sheet must produce a relevant state change, navigation event, or documented feedback. R-Streak dates must render numerically in both Home and the full R-Streak calendar.
