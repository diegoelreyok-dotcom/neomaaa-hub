# MQL5 Copy Trading Guide — Step by step for influencers and communities

> Comprehensive tutorial to set up copy trading via MQL5 Signals on NEOMAAA Markets accounts. Covers the full flow: signal provider (influencer), follower (audience), and sales agent accompanying onboarding.

---

## Introduction

### What you'll learn

This guide takes you from zero to having a working copy trading system with NEOMAAA + MQL5 Signals. By the end you'll be able to:

- **If you're an influencer/trader:** publish your strategy as a paid signal and monetize your community.
- **If you're a follower:** subscribe to a signal provider and automatically copy their trades in your NEOMAAA account.
- **If you're a NEOMAAA sales agent:** guide influencers through the full onboarding, even if you're not a trader.

### Who this guide is for

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div><strong>NEOMAAA sales team</strong> — use it as a reference manual to teach influencers, communities, and traders with an audience how to set up their signal. You don't need to be a trader to understand the flow.</div></div>
<div class="neo-step" data-num="2"><div><strong>Signal providers</strong> — the trader/influencer who wants to publish their strategy. Follow Part 1 step by step.</div></div>
<div class="neo-step" data-num="3"><div><strong>Followers</strong> — the client who wants to copy a signal provider. Follow Part 2 step by step.</div></div>
<div class="neo-step" data-num="4"><div><strong>Internal NEOMAAA team</strong> — support, compliance, marketing. To understand the full flow and answer questions.</div></div>
</div>

### What this guide is NOT

NEOMAAA does NOT have its own copy trading system. There is no "copy button" in the broker's portal. All copy trading goes through **MQL5 Signals**, MetaQuotes' official marketplace (the creators of MetaTrader 5), which is natively integrated into the MT5 platform.

This is an advantage, not a limitation. Here's why.

### Advantages of MQL5 Signals vs proprietary systems

| Feature | MQL5 Signals | Proprietary broker system |
|---------|--------------|---------------------------|
| Reputation | Millions of traders worldwide use it | Depends on the broker |
| Transparency | Public and verifiable track record | Closed to the broker |
| Ranking | Global ranking compared against thousands of signals | Only within the broker |
| Reviews | Public reviews from followers | Limited |
| Payments | Automatic via PayPal, Wire, WebMoney, card | Depends on the broker |
| Extra broker commission | None — MQL5 is independent | Yes, the broker charges additional spread |
| Portability | Works with any MT5 broker | Only with that broker |

> [!INFO]
> MQL5 Signals is the industry standard. Top traders worldwide publish there. For NEOMAAA it's ideal because it lends credibility to any influencer who publishes their signal: it's not us saying it's good — it's MetaTrader's official marketplace showing the stats.

---

## How it works in summary

There are three actors and one platform:

- **Signal provider:** the trader who publishes their public strategy. In our case, an influencer/trader with a NEOMAAA account.
- **Follower:** the client who pays a monthly subscription to copy the provider's trades.
- **MQL5 Signals:** the MetaQuotes marketplace that connects provider with followers.
- **MT5 (MetaTrader 5):** the platform where both sides execute trades.

### Flow diagram

```
[Signal Provider]              [MQL5 Signals]              [Followers]
   NEOMAAA Account   →    Public Marketplace    →    Subscribe
   Trade normally    →    Ranking + stats       →    Automatic copy
   Receive fees      ←    Pay $X per month      ←    Pay subscription
```

The provider trades normally in their NEOMAAA account. MQL5 takes their trades in real time and replicates them proportionally in followers' accounts. The follower pays a monthly subscription to the provider (MQL5 keeps ~25% as platform fee).

---

## PART 1 — FOR THE SIGNAL PROVIDER (the influencer/trader)

This part is for the trader who wants to publish their strategy. If you're a sales agent, use this section to onboard an influencer step by step.

### Step 1: Have a real NEOMAAA account with real trading

**Critical prerequisite:** MQL5 Signals only accepts REAL accounts with trading history. Demo accounts are not accepted.

Before starting with MQL5:

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>Open your account at NEOMAAA Markets (any type: Cent, Standard, Raw, Institutional). Standard or Raw is most common for professional signal providers.</div></div>
<div class="neo-step" data-num="2"><div>Complete KYC (upload ID + proof of address). Wait for approval (24-72h typical).</div></div>
<div class="neo-step" data-num="3"><div>Deposit at least $100 USD. Recommended $500+ to give credibility to the signal (small balances generate distrust in followers).</div></div>
<div class="neo-step" data-num="4"><div>Trade at least 10 closed real trades before publishing. MQL5 requires a minimum history to verify you're an active trader, not an empty account.</div></div>
<div class="neo-step" data-num="5"><div>Ideally: have 2-4 weeks of positive track record before publishing. Signals published on day 1 without history get 0 followers.</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDING**: Active NEOMAAA account in the client portal, showing balance, KYC approved status, and MT5 credentials. Censor the real account number.
> Suggested location: `/public/assets/copytrading/01-cuenta-neomaaa-activa.png`

### Step 2: Create an account at MQL5.community

MQL5.community is MetaQuotes' social network/marketplace. It's separate from the broker. You need an account there to publish signals.

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>Go to <strong>https://www.mql5.com</strong></div></div>
<div class="neo-step" data-num="2"><div>Click "Sign up" (top right corner).</div></div>
<div class="neo-step" data-num="3"><div>Complete the data:
<ul>
<li><strong>Username</strong> — public, pick something brandable (e.g. "ProTraderFX" or your artist name). It can't be easily changed later.</li>
<li><strong>Email</strong> — use the same one as with NEOMAAA if possible.</li>
<li><strong>Password</strong> — strong, 12+ characters.</li>
<li><strong>Country</strong> — your country of residence.</li>
<li>Accept terms.</li>
</ul>
</div></div>
<div class="neo-step" data-num="4"><div>Confirm the email by clicking the link you receive.</div></div>
<div class="neo-step" data-num="5"><div>Complete your profile: photo, short bio, social networks. Followers review the profile before subscribing, so this step is not optional.</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDING**: MQL5.com sign up page with the registration form visible.
> Suggested location: `/public/assets/copytrading/02-mql5-signup.png`

> [!TIP]
> The username is your brand on MQL5. Think it through: ideally aligned with your Instagram/YouTube/TikTok handle so your community recognizes you.

### Step 3: Register your NEOMAAA MT5 account with MQL5

This is the most technical step. You'll link your NEOMAAA account to your MQL5 account so the marketplace can read your history and replicate your trades.

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>On <strong>mql5.com</strong>, logged in with your account, go to <strong>"My Account" → "Trading Accounts"</strong> (or in some versions it appears as "Signals" → "Add Account").</div></div>
<div class="neo-step" data-num="2"><div>Click "Add Account" or "Register Account".</div></div>
<div class="neo-step" data-num="3"><div>Enter your NEOMAAA account data:
<ul>
<li><strong>Broker:</strong> search "NEOMAAA" in the search field. It will appear as "NEOMAAA Markets" or "NEOMAAA-Live". Select that one.</li>
<li><strong>Server:</strong> the MT5 server assigned when you opened the account (e.g. "NEOMAAA-Live-01" or "NEOMAAA-Real-02"). You'll find it in the welcome email or the client portal.</li>
<li><strong>Account number:</strong> your MT5 account number (e.g. 8123456).</li>
<li><strong>Investor password:</strong> the "investor" password of your account. <strong>NOT the master.</strong></li>
</ul>
</div></div>
<div class="neo-step" data-num="4"><div>Click "Submit". MQL5 attempts to connect to your account in read mode and verify the history.</div></div>
<div class="neo-step" data-num="5"><div>Verification can take from a few minutes up to 24 hours. You'll receive an email when it's ready.</div></div>
</div>

> [!WARNING]
> Use the **INVESTOR password**, NOT the master. The investor only allows read access to the trading history — MQL5 cannot trade on your behalf, only verify what you did. If you enter the master by mistake, change the master password immediately for security.

> [!INFO]
> 📸 **SCREENSHOT PENDING**: "Add Trading Account" form in MQL5 with the broker, server, account number, investor password fields visible (with fictitious data).
> Suggested location: `/public/assets/copytrading/03-mql5-add-account.png`

**Where do I find the investor password for my NEOMAAA account?**

In the NEOMAAA client portal: "My Accounts" → click the MT5 account → "Change password" → there are two options: Master password and Investor password. If you never set one up, it lets you generate a new one.

### Step 4: Create your signal

Once your account is verified in MQL5, you can publish your signal.

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>Go to <strong>"My Account" → "Signals" → "My Signals"</strong> (or in the top menu: Services → Signals → Create).</div></div>
<div class="neo-step" data-num="2"><div>Click "Create Signal" or "Publish Signal".</div></div>
<div class="neo-step" data-num="3"><div>Select the NEOMAAA account you registered in Step 3.</div></div>
<div class="neo-step" data-num="4"><div>Complete the full form:
<ul>
<li><strong>Signal Name</strong> — the public name of your signal. Example: "NEOMAAA Scalper Pro" or "Diego's Gold Strategy". Maximum ~50 characters.</li>
<li><strong>Description</strong> — your strategy description. Write 3-5 paragraphs including: general strategy, trading hours, favorite pairs, expected drawdown, management style. This is key for conversion.</li>
<li><strong>Price per month</strong> — monthly subscription price. Typical range: $30-500 USD. You can start at $0 (free) to gain followers quickly, then raise it.</li>
<li><strong>Trading style</strong> — pick: Scalping / Day Trading / Swing / Positional. Be honest: if you say swing and run scalping, followers will cancel.</li>
<li><strong>Instruments</strong> — what you trade (EURUSD, XAUUSD, US30, BTCUSD, etc.). List the main ones.</li>
<li><strong>Leverage</strong> — the leverage of your NEOMAAA account. Important so followers adjust theirs.</li>
</ul>
</div></div>
<div class="neo-step" data-num="5"><div>Upload a cover image. Recommended: professional logo or avatar with good quality. It's the first thing followers see.</div></div>
<div class="neo-step" data-num="6"><div>Review all fields and click "Publish".</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDING**: Full "Create Signal" form in MQL5 with all fields filled (name, description, price, instruments, leverage).
> Suggested location: `/public/assets/copytrading/04-mql5-create-signal.png`

> [!TIP]
> Recommended pricing strategy: publish the signal **free for the first 30-60 days** to accumulate followers and reviews. When you have 50+ active subscribers and 4+ stars, raise the price to $50-100/month. When you have 200+ subscribers, raise to $150-250/month. MQL5's top signal providers charge $300-500/month because they already have reputation.

### Step 5: Promotion to your community

Once the signal is published, your public URL looks like this:

`https://www.mql5.com/en/signals/[your-numeric-id]`

This link is gold. It's what you share with your audience.

**Promotion checklist:**

- Share the link on Instagram (pinned stories + bio).
- Link in YouTube, TikTok, Twitter/X bios.
- Post on your Telegram channel with the step by step.
- Create a pinned post in your community: "How to subscribe to my signal".
- If you have a podcast (like Traders Hub), mention it in every episode.

**Important:** your audience needs to do TWO steps to copy:

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>Open account at NEOMAAA Markets (ideally with your IB code if you're an affiliate).</div></div>
<div class="neo-step" data-num="2"><div>Subscribe to your signal on MQL5 from their MT5.</div></div>
</div>

**Recommended onboarding kit** to give your community:

- NEOMAAA registration link (with your referral if you're an IB)
- Link to your signal on MQL5
- 5-minute video tutorial (or this guide)
- Telegram support channel where you answer questions

> [!INFO]
> If you're a NEOMAAA IB in addition to signal provider, you earn **twice** for the same client:
> 1. Affiliate commission for each client who opens an account using your code (broker revenue share, typically 30-60%).
> 2. MQL5 Signals monthly subscription for each follower who copies your strategy.
>
> It's the most profitable combo. That's why we push so hard the "influencer + IB + signal provider" model for our partner communities.

### Step 6: View stats and get paid

In your MQL5 dashboard you'll see in real time:

- **Active subscribers** — how many are copying you right now.
- **Monthly revenue** — how much you'll get paid this month (after MQL5's fee).
- **Reviews** — follower rating (1-5 stars + comments).
- **Global ranking** — position vs other signals worldwide.
- **Growth %** — historical account growth.
- **Max drawdown** — worst historical drawdown.
- **Sharpe ratio** — risk-adjusted return metric.

**Payments:**

- MQL5 pays monthly. Usually between day 5 and 10 of the following month.
- Methods: PayPal, Wire Transfer, WebMoney, bank card.
- MQL5 retains ~20-30% commission (varies by plan and seniority).
- Minimum payout: $10 USD (if you don't reach it, it accumulates to the next month).

> [!INFO]
> 📸 **SCREENSHOT PENDING**: Signal provider dashboard in MQL5 showing active subscribers, monthly revenue, ranking, and growth chart.
> Suggested location: `/public/assets/copytrading/05-mql5-dashboard-provider.png`

---

## PART 2 — FOR THE FOLLOWER (the community that wants to copy)

This part is for the client/follower who wants to copy a signal provider. If you're a sales agent, use this section to onboard followers arriving referred by an influencer.

### Step 1: Open account at NEOMAAA

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>Register at the official NEOMAAA Markets portal (the link your signal provider shared, ideally with their IB code).</div></div>
<div class="neo-step" data-num="2"><div>Complete personal data: name, email, country, phone.</div></div>
<div class="neo-step" data-num="3"><div>Complete KYC: upload ID (national ID, passport, or license) + proof of address (utility bill, bank statement, no more than 3 months old).</div></div>
<div class="neo-step" data-num="4"><div>Wait for approval. Typical: 24-72 hours. If it takes longer, contact support.</div></div>
<div class="neo-step" data-num="5"><div>Choose the account type based on your profile:
<ul>
<li><strong>Cent</strong> — to start with little capital ($5-50). Not recommended for serious copy trading.</li>
<li><strong>Standard</strong> — ideal for copy trading. Competitive spreads, minimum $50.</li>
<li><strong>Raw</strong> — near-zero spreads + commission per lot. Ideal if the signal provider is a scalper.</li>
<li><strong>Institutional</strong> — for large accounts ($10K+).</li>
</ul>
</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDING**: NEOMAAA Markets registration portal, signup screen with visible fields.
> Suggested location: `/public/assets/copytrading/06-neomaaa-signup.png`

### Step 2: Deposit funds

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>In the NEOMAAA client portal, go to "Deposit".</div></div>
<div class="neo-step" data-num="2"><div>Choose payment method:
<ul>
<li><strong>PIX</strong> (Brazil) — instant.</li>
<li><strong>Crypto USDT</strong> (TRC20 or ERC20) — 15-30 min.</li>
<li><strong>Credit/debit card</strong> — instant but with fees.</li>
<li><strong>International bank transfer</strong> — 1-3 days.</li>
<li><strong>Local LATAM transfer</strong> — depends on country.</li>
</ul>
</div></div>
<div class="neo-step" data-num="3"><div>Enter amount. Minimums per account type:
<ul>
<li>Cent: $5</li>
<li>Standard: $50</li>
<li>Raw: $500</li>
<li>Institutional: $10,000</li>
</ul>
</div></div>
<div class="neo-step" data-num="4"><div>Confirm and wait for crediting.</div></div>
</div>

> [!TIP]
> Recommendation for copy trading: deposit **at least $500-1000 USD**. With less, proportionality with the signal provider's balance is too skewed and some trades can't be copied due to lack of margin. If the provider has $10,000 and you have $100, a 1-lot trade would equal 0.01 lots for you — too small.

### Step 3: Install MetaTrader 5

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>In the NEOMAAA portal, "Platforms" or "Downloads" section, download MT5 for your operating system (Windows, Mac, Android, iOS).</div></div>
<div class="neo-step" data-num="2"><div>Install and open MetaTrader 5.</div></div>
<div class="neo-step" data-num="3"><div>On the first screen: "File" → "Login to Trade Account".</div></div>
<div class="neo-step" data-num="4"><div>Enter:
<ul>
<li><strong>Login:</strong> your MT5 account number (given to you when opening the account).</li>
<li><strong>Password:</strong> your master password.</li>
<li><strong>Server:</strong> the server assigned to you (e.g. "NEOMAAA-Live-01"). If it doesn't appear in the list, type it manually.</li>
</ul>
</div></div>
<div class="neo-step" data-num="5"><div>Verify the account connected: in the bottom right corner "Connected" and the correct balance should appear.</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDING**: "Login to Trade Account" window in MT5 with login/password/server fields filled (fictitious data).
> Suggested location: `/public/assets/copytrading/07-mt5-login.png`

### Step 4: Connect MT5 to MQL5 Community

MT5 and MQL5.community are two different things. MT5 is the trading platform. MQL5.community is the marketplace. To copy signals, you have to connect both.

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>In MT5, go to <strong>"Tools" → "Options"</strong> (or Ctrl+O).</div></div>
<div class="neo-step" data-num="2"><div>Click the <strong>"Community"</strong> tab.</div></div>
<div class="neo-step" data-num="3"><div>Enter your <strong>Login</strong> (MQL5.community username) and <strong>Password</strong>.</div></div>
<div class="neo-step" data-num="4"><div>Click "OK".</div></div>
<div class="neo-step" data-num="5"><div>If you don't have an MQL5 account yet, create one at https://mql5.com (same step as Step 2 of Part 1 but now as a follower).</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDING**: "Options" window in MT5 with "Community" tab active, showing the Login and Password fields for MQL5.
> Suggested location: `/public/assets/copytrading/08-mt5-options-community.png`

### Step 5: Find the signal you want to copy

There are two ways to reach a signal:

**Method A — From the direct link of the signal provider (recommended):**

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>Your influencer/signal provider shares their public link (e.g. https://www.mql5.com/en/signals/2345678).</div></div>
<div class="neo-step" data-num="2"><div>Open the link in any browser.</div></div>
<div class="neo-step" data-num="3"><div>Click "Subscribe" on the signal page.</div></div>
<div class="neo-step" data-num="4"><div>MQL5 prompts you to log in (with the same account you connected in MT5).</div></div>
</div>

**Method B — Search inside MT5:**

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>In MT5: <strong>"View" → "Signals"</strong> (or Ctrl+L).</div></div>
<div class="neo-step" data-num="2"><div>The Signals window opens with the full marketplace list.</div></div>
<div class="neo-step" data-num="3"><div>Search by the signal provider's name using the search bar.</div></div>
<div class="neo-step" data-num="4"><div>Click the signal to see full details.</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDING**: "Signals" window in MT5 showing the signals list with search, filters, and a selected signal with details (growth, drawdown, subscribers).
> Suggested location: `/public/assets/copytrading/09-mt5-signals-tab.png`

### Step 6: Review the signal before subscribing

**Before clicking Subscribe, review these 6 metrics:**

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div><strong>Maximum historical drawdown</strong> — how much the provider's account dropped at its worst. Rule: no more than what you can psychologically handle. If your tolerance is 20% and the signal has 60% drawdown, it's not for you.</div></div>
<div class="neo-step" data-num="2"><div><strong>Growth %</strong> — historical growth. Beware of very high numbers with little age (200% growth in 2 months = red flag).</div></div>
<div class="neo-step" data-num="3"><div><strong>Age</strong> — preferably more than 6 months. New signals don't have enough data to be reliable.</div></div>
<div class="neo-step" data-num="4"><div><strong>Active subscribers</strong> — more than 10 subscribers is some social validation. More than 50 is a good sign.</div></div>
<div class="neo-step" data-num="5"><div><strong>Reviews</strong> — read the negative reviews, not just the positive. Negative reviews tell you real problems (unexpected drawdowns, strategy changes, etc.).</div></div>
<div class="neo-step" data-num="6"><div><strong>Trading style match</strong> — if the signal is scalping (5-min trades), your MT5 has to be connected with low latency. If it's swing (days-long trades), it matters less. Choose based on your availability.</div></div>
</div>

> [!WARNING]
> Past returns do NOT guarantee future results. A signal with 200% growth may have 50% drawdown tomorrow. Never invest what you cannot afford to lose. Forex/CFD trading carries high risk: 70-80% of retail traders lose money.

### Step 7: Subscribe and configure copy

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>On the signal page, click <strong>"Subscribe"</strong>.</div></div>
<div class="neo-step" data-num="2"><div>Select target account: your NEOMAAA account (the one you connected in Step 3).</div></div>
<div class="neo-step" data-num="3"><div>Pay the monthly subscription (if the signal isn't free). MQL5 asks for payment method: card, PayPal, or MQL5 balance.</div></div>
<div class="neo-step" data-num="4"><div>Configure <strong>Risk Settings</strong>:
<ul>
<li><strong>Copy ratio</strong> — proportional to your balance vs the provider's balance. MQL5 calculates it automatically, but you can adjust it. Default is usually 1:1 proportional.</li>
<li><strong>Max risk (% equity)</strong> — the maximum % of your account at risk per trade. Default 95%. Recommended to lower to 50-70%.</li>
<li><strong>Deviation (slippage)</strong> — maximum slippage allowed in pips. Default 10. If latency is high, raise it.</li>
<li><strong>Stop Loss / Take Profit limits</strong> — custom limits if you want to be more conservative than the provider.</li>
<li><strong>Copy Stop Loss / Copy Take Profit</strong> — whether you want the provider's SL/TP copied or to manage them yourself.</li>
</ul>
</div></div>
<div class="neo-step" data-num="5"><div>Click "Start" or "Subscribe" to activate the subscription.</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDING**: Risk Settings configuration screen when subscribing to a signal (MQL5 Copy settings with deviation, max risk sliders, etc.).
> Suggested location: `/public/assets/copytrading/10-mql5-risk-settings.png`

> [!TIP]
> Start with **low risk** the first 2-4 weeks (e.g. 30-50% max equity). Observe how the signal performs with your real capital. If results are consistent with what the provider promises, raise to 50-70%. **Never set 100%** — always leave free margin for fluctuations.

### Step 8: Monitor

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>In MT5, "Trade" tab, you'll see the trades copying automatically. Each trade opened by the provider opens in your account within seconds.</div></div>
<div class="neo-step" data-num="2"><div>Review performance weekly: profit/loss, current drawdown, open trades.</div></div>
<div class="neo-step" data-num="3"><div>If drawdown exceeds your tolerance → deactivate copy and reassess. You can pause without canceling the subscription.</div></div>
<div class="neo-step" data-num="4"><div>The subscription auto-renews every month. To cancel: MQL5 dashboard → "My Subscriptions" → "Unsubscribe".</div></div>
<div class="neo-step" data-num="5"><div>If you cancel, OPEN trades remain active until you manually close them. New trades from the provider won't be copied.</div></div>
</div>

---

## PART 3 — SALES GUIDE: HOW TO EXPLAIN THIS TO AN INFLUENCER

This section is specific to the NEOMAAA sales team. Use it when you have an influencer/trader with an audience who could be a signal provider.

### Pitch for influencers and communities

**Base script (adaptable to the influencer):**

> "You have a community of [XXX] followers who trust you for trading. With NEOMAAA + MQL5 Signals, you can monetize in two complementary ways:
>
> **1. As a signal provider on MQL5:** publish your strategy, your community subscribes, you charge between $50 and $500 per month per follower. Your community wins if you win. It's transparent: the history is public.
>
> **2. As a NEOMAAA IB:** for each follower who opens an account using your affiliate code, you earn recurring commission (30-60% of the revenue the broker generates with that client, for life).
>
> The combo gives you income from both sides: MQL5 subscription + IB commissions. With 50 followers at $100/month subscription that's $5,000/month passive. Add IB commissions and you can make $8,000-12,000/month recurring."

<div className="neo-stat-grid">
<div className="neo-stat" data-value="$50-500" data-label="MQL5 subscription/month"></div>
<div className="neo-stat" data-value="30-60%" data-label="IB revenue share"></div>
<div className="neo-stat" data-value="$5K/month" data-label="50 followers at $100"></div>
<div className="neo-stat" data-value="$8-12K" data-label="MQL5 + IB combo"></div>
</div>

### What the influencer CAN promise

- "You can subscribe to my strategy on MQL5."
- "I'll teach you how to set up your account and copy my trades."
- "Full transparency: my history is public on MQL5, everyone can see it."
- "NEOMAAA is the broker I use myself with my own real capital."
- "If I win, you win. If I lose, you lose. I'm in the same boat as you."

### What they CANNOT promise (forbidden by compliance)

> [!DANGER]
> The following phrases are prohibited. If the influencer uses them publicly, they lose their MQL5 signal AND their NEOMAAA account, and expose the broker to regulatory complaints.

- **"You'll earn $X per month for sure"**
- **"I never lose"**
- **"Guaranteed returns"**
- **"Zero risk"**
- **"You'll double your account"**
- **"Infallible system"**

> [!WARNING]
> These promises violate MQL5 and NEOMAAA compliance. If an influencer says them publicly (reels, posts, videos), they can:
> 1. Get their signal banned on MQL5 (lose all the work).
> 2. Have their NEOMAAA account closed for terms violation.
> 3. Generate regulatory complaints affecting the whole broker.
>
> Part of our job as sales is to educate the influencer on what they can and cannot say. If we don't, we lose the account and the community.

### Mandatory disclaimers

The influencer must include in all public promotion (posts, reels, descriptions, videos):

- "Trading involves high risk. 70-80% of retail traders lose money."
- "Past returns do not guarantee future results."
- "NEOMAAA Markets operates under Anjouan license L15968/N."
- "This communication does not constitute financial advice."

### Sales FAQ — what the influencer will ask you

**"Do I have to pay anything to NEOMAAA?"**

No. MQL5 Signals is a service independent of MetaQuotes, not the broker. NEOMAAA only provides the account you trade with. MQL5 retains approximately 25% of subscriptions as platform fee. You receive the remaining 75% directly from MQL5.

**"How much can I charge for subscription?"**

Typical MQL5 range: $30-500 USD per month. Top world signals charge $200-500. Our recommendation: **start free for the first 30-60 days**, then raise to $50-100. When you have 100+ active subscribers and solid reviews, raise to $150-250.

**"Can I have multiple accounts and signals at once?"**

Yes. You can have several NEOMAAA accounts (scalping in one, swing in another, gold in another), each with its own MQL5 signal. Some top signal providers run 3-5 parallel signals to segment their audience.

**"What if I lose a lot and followers complain?"**

MQL5 does not guarantee results. By subscribing, followers accept terms where they assume all risk. Your legal responsibility is to trade honestly and not promise what you can't deliver. Reputationally: if you lose a lot, followers cancel, your ranking drops, and it's hard to recover. That's why **risk management is key**.

**"How many followers do I need for it to be worth it?"**

Simple math:
- 10 followers × $50/month = $500/month
- 50 followers × $100/month = $5,000/month
- 200 followers × $150/month = $30,000/month
- 500 followers × $200/month = $100,000/month

Scalable with your audience. MQL5 top providers generate $20-100K USD/month in subscriptions alone.

**"Can I charge outside MQL5 too?"**

Yes: IB commission for each follower who opens an account at NEOMAAA using your code. That's additional and independent of the MQL5 subscription. You can also sell courses, mentorships, etc., but those are separate.

**"What if my account blows up (I lose everything)?"**

Your signal on MQL5 gets flagged with "Drawdown > 100%". Followers auto-cancel. Your reputation on MQL5 is damaged and very hard to recover (creating a new signal starts from zero and followers search your history). Hence: **never risk more than 1-2% per trade**, diversify, and use stop losses.

**"Can I change strategy without warning?"**

Technically yes, but followers notice and cancel if they see inconsistency with what you promised. Better to be transparent: if you're going to switch from scalping to swing, announce it in the description and your community.

### How to close the sale with the influencer — 4-week process

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div><strong>Week 1 — Pitch and prep.</strong> Show them this guide (forward the link). Answer questions. Help them decide account type and initial deposit amount. If they're also an IB, set up their affiliate code.</div></div>
<div class="neo-step" data-num="2"><div><strong>Week 2 — NEOMAAA onboarding.</strong> You walk them through opening account, completing KYC, depositing, and installing MT5. Help with the first warm-up trades to build history.</div></div>
<div class="neo-step" data-num="3"><div><strong>Week 3 — MQL5 setup.</strong> MQL5 account creation, linking with their NEOMAAA account, publishing the first signal. Help with description copy, pricing, cover image selection.</div></div>
<div class="neo-step" data-num="4"><div><strong>Week 4 — Launch.</strong> Help them build the onboarding kit for their community (posts, reels, link in bio). If it fits NEOMAAA branding, share their signal on our official channels. Weekly follow-up for the first 3 months.</div></div>
</div>

### Known success cases (global examples)

Top MQL5 signals generate revenue from $20,000 to $100,000+ USD per month. These are public cases checkable in the marketplace:

- [DATA: add 2-3 real examples of successful signals with their MQL5 links — recommended to search at https://www.mql5.com/en/signals/mt5/list/rating and pick 3 top performers to cite as reference]

These examples serve to show the influencer that the model works at scale, not just theory.

---

## PART 4 — COMMON TECHNICAL QUESTIONS

These are the questions followers and influencers will ask during setup. Short answers to use in support chat.

**"The provider has leverage 1:500 and I have 1:200 — can I copy?"**

Yes, but your real risk will be higher because your margin is more restrictive. MQL5 calculates copy ratio considering the differences. Review risk settings carefully when subscribing — some trades may not copy due to margin. If you can, match the provider's leverage.

**"Can I copy only some trades?"**

Yes. In MQL5 risk settings you can filter: by instrument (e.g. only EURUSD), by hours (e.g. only morning), by order type (e.g. only buy). Configurable when subscribing and editable later.

**"Does copy trading work with MT4 or only MT5?"**

NEOMAAA Markets only offers MT5. MQL5 Signals works on both systems, but since NEOMAAA only has MT5, it's not a problem. MT5 is the modern and recommended version.

**"What if I close the PC? Do I have to leave MT5 open?"**

MQL5 Signals **does not require your PC to be on**. Once you subscribe and configure, MQL5 executes on its servers (virtual server). Your PC can be off or your MT5 closed — trades copy into your broker account anyway.

> [!INFO]
> For copy trading without your PC on, MQL5 offers optional **Virtual Hosting** (VPS) for ~$10-15/month. Recommended if you want maximum low latency, but not strictly necessary for most strategies.

**"If the signal provider closes their account, what happens to my trades?"**

Already OPEN trades remain active until you manually close them (or until they hit their SL/TP). New provider trades don't copy because they no longer publish. Your subscription auto-cancels and you're no longer charged.

**"Is there a signals ranking?"**

Yes. MQL5 has a global ranking by several metrics: growth, drawdown, age, subscribers, Sharpe ratio. URL: https://www.mql5.com/en/signals

**"Can I be a signal provider and follower at the same time?"**

Yes. You can have one account publishing a signal (you're a provider) and another account (or the same) copying other signals (you're a follower). There's no conflict.

**"What latency is there between the provider's trade and my copy?"**

Typical: 0.5-3 seconds. Depends on:
- Your internet connection latency.
- Distance from your MT5 server to MQL5's.
- Whether you use VPS or not.

For intraday scalping it can be a problem. For day trading and swing, irrelevant.

**"Is MQL5 Signals legal in my country?"**

In most LATAM and European countries, yes. Copy trading is regulated similarly to your own trading — you are responsible for your trades. Some countries (US, Canada) have specific restrictions. If in doubt, consult a local lawyer.

**"Can I withdraw my trading profits if I'm copying signals?"**

Yes. Trading profits are yours regardless of whether they came from manual or copied trades. Withdraw normally from the NEOMAAA portal.

---

## Official resources

- **MQL5 Signals marketplace:** https://www.mql5.com/en/signals
- **Top MT5 signals ranking:** https://www.mql5.com/en/signals/mt5/list/rating
- **MQL5 Docs and Signals articles:** https://www.mql5.com/en/articles/category/signals
- **MT5 Download:** from NEOMAAA Markets portal (Platforms section)
- **NEOMAAA Markets broker:** [DATA: official link to public portal]
- **MQL5 Signals terms and conditions:** https://www.mql5.com/en/signals/info/agreement

## Support

If your influencer or follower has technical questions during setup:

- **NEOMAAA Support:** support@neomaaa.com (24h response)
- **MQL5 Support:** https://www.mql5.com/en/support
- **Internal sales team chat:** NEOMAAA Telegram (to escalate complex cases to Pepe).

---

## Signal provider checklist (first month)

Use this checklist when onboarding a new influencer as signal provider. Mark it in the CRM as milestones.

- [ ] NEOMAAA account opened and KYC approved
- [ ] Initial deposit made (minimum $500 recommended)
- [ ] 10+ closed real trades for track record
- [ ] 2-4 weeks of history with documented results
- [ ] MQL5.community account created and email confirmed
- [ ] Full MQL5 profile (photo, bio, social networks)
- [ ] NEOMAAA MT5 account linked in MQL5 (with investor password)
- [ ] Successful MQL5 account verification (confirmation email received)
- [ ] Signal created with name, description, pricing defined
- [ ] Cover image uploaded (professional logo)
- [ ] Signal published and public URL generated
- [ ] Onboarding kit prepared for the community
- [ ] First 5 subscribers onboarded successfully
- [ ] Weekly performance review scheduled
- [ ] Compliance disclaimers included in all public promotion

## Follower checklist (first subscription)

- [ ] NEOMAAA account opened and KYC approved
- [ ] Initial deposit made (minimum $500 recommended for copy trading)
- [ ] MT5 installed and account logged in correctly
- [ ] MQL5.community account created
- [ ] MT5 connected to MQL5 (Tools → Options → Community)
- [ ] Provider signal reviewed (drawdown, growth, age, reviews)
- [ ] Risk settings configured (max risk, deviation, SL/TP limits)
- [ ] Active subscription and first trade copied successfully
- [ ] Weekly performance review plan defined

---

*Last updated: April 2026. If MQL5 changes the interface or process, update this guide. Maintenance owner: NEOMAAA sales team + Pepe (technical review).*
