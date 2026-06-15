const YAHOO_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
};

export interface Quote {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

export interface HistoryPoint {
  date: string;
  close: number;
}

/** Fetches a real-time(ish) quote from Yahoo Finance. Returns null on any failure. */
export async function getQuote(symbol: string): Promise<Quote | null> {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=5d`,
      { headers: YAHOO_HEADERS, next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const result = data?.chart?.result?.[0];
    const meta = result?.meta;
    if (!meta || typeof meta.regularMarketPrice !== "number") return null;

    const price = meta.regularMarketPrice;
    const previousClose = meta.chartPreviousClose ?? meta.previousClose ?? price;

    return {
      symbol,
      name: meta.longName ?? meta.shortName ?? symbol,
      price,
      changePercent: previousClose ? ((price - previousClose) / previousClose) * 100 : 0,
    };
  } catch {
    return null;
  }
}

/** Fetches quotes for multiple symbols in parallel. Missing/failed symbols are omitted. */
export async function getQuotes(symbols: string[]): Promise<Map<string, Quote>> {
  const results = await Promise.all(symbols.map(getQuote));
  const map = new Map<string, Quote>();
  results.forEach((quote, index) => {
    if (quote) map.set(symbols[index], quote);
  });
  return map;
}

/** Fetches daily closing prices for a symbol over the given range (e.g. "1mo"). */
export async function getHistory(symbol: string, range = "1mo"): Promise<HistoryPoint[]> {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=${range}`,
      { headers: YAHOO_HEADERS, next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const result = data?.chart?.result?.[0];
    const timestamps: number[] = result?.timestamp ?? [];
    const closes: (number | null)[] = result?.indicators?.quote?.[0]?.close ?? [];

    return timestamps
      .map((timestamp, index) => ({
        date: new Date(timestamp * 1000).toISOString().slice(0, 10),
        close: closes[index],
      }))
      .filter((point): point is HistoryPoint => typeof point.close === "number");
  } catch {
    return [];
  }
}
