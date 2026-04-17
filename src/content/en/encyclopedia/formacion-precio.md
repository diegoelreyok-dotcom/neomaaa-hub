# How the market price is formed

> [!INFO]
> This document explains how every price a trader sees on MT5 is built. After reading it you'll understand why there are two prices (bid and ask), why the spread widens at certain moments, what happens when there's slippage, and why NEOMAAA can offer different conditions depending on the account type.

The price of an instrument is not a magic number falling from a central board. It is the result of thousands of buy and sell orders clashing with each other, in real time, across multiple liquidity pools distributed around the world. If you understand how it is built, you understand 80% of the questions a customer may ask support.

## Bid, Ask and Spread

On any pair or instrument there are always **two simultaneous prices**:

<div className="neo-compare">
<div className="neo-compare-col neo-compare-col--pro"><div className="neo-compare-title">Bid (sell price)</div><ul><li>The price at which the market is willing to <strong>buy from you</strong></li><li>If you want to <strong>sell</strong>, you do it at the bid</li><li>It is always the lower of the pair</li></ul></div>
<div className="neo-compare-col neo-compare-col--con"><div className="neo-compare-title">Ask / Offer (buy price)</div><ul><li>The price at which the market is willing to <strong>sell to you</strong></li><li>If you want to <strong>buy</strong>, you do it at the ask</li><li>It is always the higher of the pair</li></ul></div>
</div>

The difference between the two is called the **spread**, and it is the first form of cost any trader pays.

<div className="neo-formula">Spread = Ask − Bid (measured in pips)</div>

### Numerical example — EUR/USD

Let's say your platform shows:

| Side | Price |
|------|--------|
| Bid  | 1.08542 |
| Ask  | 1.08545 |

The spread is `1.08545 - 1.08542 = 0.00003` → **0.3 pips**.

If you open a **buy** position (BUY) of 1 lot (100,000 EUR):

<div className="neo-step-list">
<div className="neo-step" data-num="1" data-title="Entry at the ask"><div>You enter at the ask → 1.08545</div></div>
<div className="neo-step" data-num="2" data-title="Instant valuation"><div>The moment you opened it, your position is already worth the bid → 1.08542</div></div>
<div className="neo-step" data-num="3" data-title="Initial loss"><div>You are down 3 points = 0.3 pips = <strong>USD 3</strong></div></div>
</div>

That is why every position is "born" in the red: you are paying the spread on entry. To be in profit the price has to move **in your favor** by more than the spread cost.

<div className="neo-formula">Spread cost = pips × value per pip × lots</div>

## What is liquidity and why it matters

Liquidity is, simply, **how many people are willing to buy and sell at a given moment**, and with how much volume. When many participants are active (banks, funds, market makers, retail), the order book is full of orders at every price level: the spread is minimal and you can move large sizes without affecting the price.

When liquidity drops, the opposite happens: there are few orders, price levels become thin, and any reasonably sized order "pushes" the price several points.

Analogy: liquidity is the **water in a pool**. If the pool is full (lots of liquidity), you can throw a stone and it barely makes ripples. If it's almost empty (low liquidity), the same stone makes a huge noise and splashes water everywhere.

### Typical low-liquidity moments

| Moment | Why |
|---------|---------|
| NY close (21:00 GMT) | The US session ends, Asia hasn't kicked in yet |
| Asian session on European pairs | EUR/GBP, for example, barely trades in the European early morning |
| US or UK bank holidays | Half of global volume disappears |
| First minutes of Sunday open | Asian desks are just starting |
| 30 seconds before a high-impact news release | Market makers pull orders to avoid getting run over |

In all these moments, the spread **widens** (goes from 0.3 pips to 2, 5 or even 20 pips in extreme cases), and market-order execution may come with slippage.

## Market Makers, ECN and STP — three execution models

### Market Maker (Dealing Desk)

The broker **is the counterparty** of the client. When you buy, the broker "sells" to you from its own book. If you win, the broker loses (and vice versa). It quotes its own prices, usually has wider fixed spreads, and earns from the spread + client losses.

Typical problem: conflict of interest. If 80% of clients lose (which is real), the broker wins 80% of the time it trades against them.

### ECN (Electronic Communication Network)

The broker **directly connects** the client to a global liquidity pool: banks, funds, other brokers, other traders. The price the client sees is the best bid/ask available in that aggregated pool. The broker doesn't take the other side: it only charges a **fixed commission per lot** (e.g. USD 3.5 per side per lot).

Advantages: ultra-tight spreads (0.0–0.2 pips on majors), no conflict of interest, transparency.
Downsides: the commission can matter for scalpers, and in very low-liquidity moments the spread does widen (because what you see is the real market).

### STP (Straight-Through Processing)

The broker receives the client's order and **forwards** it directly to one or more liquidity providers. There's no dealing desk or manual intervention. The broker earns through a small **markup** on the LP spread (e.g. the LP offers 0.1 pips, the broker shows 0.5 pips to the client).

In practice, STP and ECN blend together — many brokers call themselves "hybrid ECN/STP" because they aggregate liquidity from multiple LPs (ECN behavior) and route it automatically (STP behavior). **NEOMAAA operates under this hybrid ECN/STP model.**

## Slippage: positive and negative

Slippage is the difference between the price at which you **requested** to execute an order and the price at which it was **actually** executed.

### Negative slippage (against the trader)

> [!EXAMPLE]
> You request to buy EUR/USD at market when the ask is at 1.08545. Between the moment you hit "Buy" and when the order reached the LP, the price jumped to 1.08560. You are filled there.
> **Negative slippage = 15 points = USD 15 extra cost on 1 lot.**

Typically occurs on:
- Stop-loss orders during violent moves
- Execution during high-impact news
- Weekend gaps

> [!WARNING]
> Negative slippage during high-volatility events is not a broker bug: it is how the real market works when liquidity disappears for seconds. Support must know how to explain this without getting defensive.

### Positive slippage (in favor of the trader)

The price improves between the moment you sent the order and the fill. It happens less often but it happens, and an honest broker passes it on in full to the client (NEOMAAA has a symmetric slippage policy: the client receives positive slippage when it occurs).

## Market gap

> [!DANGER]
> The weekend gap is the hardest risk to explain to a retail client. Stops are NOT executed at the set price: they execute at the first available price on Monday.

Forex closes from Friday 22:00 GMT to Sunday 22:00 GMT. During those 48 hours, **the world keeps moving**: an election happens, an attack, a country default — and on Monday the price opens at a very different level from Friday's close.

> [!EXAMPLE]
> EUR/USD closes Friday at 1.0850. On Sunday, a surprise electoral result in France. Monday opens at 1.0720.
> There is a "gap" of 130 pips.
> If a client had a stop loss at 1.0830, **it was NOT filled at 1.0830**: it was filled at the first available price on Monday — that is, 1.0720. The client lost 110 **extra** pips they didn't anticipate.

This is one of the hardest risks to explain to a retail client and it is support's responsibility to know how to explain it without getting defensive: it was a market event, not a broker error.

## Depth of Market (DOM)

The DOM (Depth of Market) is a view that shows, for each price level above the ask and below the bid, how much volume is pending for execution.

An institutional trader doesn't just look at bid/ask: they look at the full "ladder". If they see that at ask 1.08545 there are 2 million EUR, but at 1.08550 there are 50 million, they know there's a wall of offer there. That tells them where the price is likely to stall, and where there's likely to be a stop "sweep".

The typical retail trader doesn't have this info (MT5 does show partial DOM but few use it). Understanding that it **exists** is important to contextualize why the price moves the way it does.

## Why NEOMAAA can offer tighter spreads on certain accounts

The spreads a client sees are not fixed: they depend on the account type and the cost model they choose.

| Account | Typical EUR/USD spread | Commission | Logic |
|--------|----------------------|----------|--------|
| Standard | from 1.2 pips | USD 0 | Cost is baked into the spread |
| Raw / ECN | from 0.0 pips | [DATA: ask Pepe/Dealing — e.g. USD 3.5/side/lot] | Spread is the LP's, broker charges separately |

### Example: 1 lot EUR/USD round trip

**Standard account:**
- Average spread ~1.2 pips on entry = USD 12
- No commission
- **Total round-trip cost: ~USD 12**

**Raw account:**
- Average spread ~0.1 pips = USD 1
- Commission [DATA: ask Pepe/Dealing] — assuming USD 7 round trip
- **Total round-trip cost: ~USD 8**

For scalpers and high-frequency traders, the Raw account is cheaper. For swing traders who trade a few times a day, Standard may be simpler. Knowing this difference is key so sales and support can guide the client toward the right product.

## What support absolutely must know

> [!TIP]
> - Spread = difference between bid and ask. Measured in pips. It's the first cost of the trade.
> - Low liquidity → spread widens. It's the market, not the broker "making things up".
> - Slippage on news or on stops during strong moves is normal. It's not a bug.
> - Weekend gaps can fill stops far from the original level. The client must know this before trading.
> - Raw/ECN has low spreads + commission; Standard has higher spreads + zero commission. They are two ways of charging the same thing, with different advantages depending on the style.
