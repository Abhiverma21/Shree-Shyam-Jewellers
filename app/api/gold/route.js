// app/api/goldrate/route.js
import { NextResponse } from "next/server";

const GOLDAPI_URL = process.env.GOLD_API_ENDPOINT || "https://www.goldapi.io/api/XAU/INR";
const GOLDAPI_KEY = process.env.GOLD_API_KEY;

function round(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export async function GET() {
  try {
    const res = await fetch(GOLDAPI_URL, {
      headers: {
        "x-access-token": GOLDAPI_KEY,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const raw = await res.json();

    // Log the raw response server-side for debugging (check terminal)
    console.log("GOLD API RAW RESPONSE:", raw);

    // 1) Priority: if provider already gives gram price for 24k use it
    // Common field: price_gram_24k or price_gram_24k_inr etc.
    let priceGram24k = null;
    if (raw.price_gram_24k) priceGram24k = Number(raw.price_gram_24k);
    if (!priceGram24k && raw.price_gram) priceGram24k = Number(raw.price_gram); // some apis
    if (!priceGram24k && raw.price) priceGram24k = Number(raw.price); // fallback

    // 2) If API provides price per ounce, convert: ounce -> gram (1 troy oz = 31.1034768 g)
    // Some responses include 'price_per_oz' / 'price_per_ounce' (maybe in INR or USD)
    if (!priceGram24k) {
      const ozField = raw.price_per_ounce || raw.price_per_oz || raw.price_ounce || raw.price_per_oz_inr;
      if (ozField) {
        // assume ozField is already in INR per troy ounce
        const oz = Number(ozField);
        priceGram24k = oz / 31.1034768;
      }
    }

    // 3) Some Indian sources return per 10 grams — detect and handle:
    // If field name explicitly says per_10g or if value seems ~10x expected, we'll compute.
    let pricePer10g = null;
    if (raw.price_per_10g) pricePer10g = Number(raw.price_per_10g);
    // If provider returned something that appears 10x a gram price, keep both for inspection.

    // 4) If still missing, attempt to use USD/oz raw field + forex conversion (best effort)
    // Many providers return USD/oz; convert to INR using forex endpoint (optional)
    if (!priceGram24k) {
      // try to detect USD oz price in fields like 'price_ounce' or 'price_per_ounce_usd'
      const usdOunce = raw.price_ounce_usd || raw.price_per_ounce_usd || raw.price_usd;
      if (usdOunce) {
        // fetch INR rate quickly (free open API)
        const fxRes = await fetch("https://open.er-api.com/v6/latest/USD");
        const fx = await fxRes.json();
        const inrRate = fx?.rates?.INR;
        if (inrRate) {
          priceGram24k = (Number(usdOunce) * inrRate) / 31.1034768;
        }
      }
    }

    // Final safety: if pricePer10g exists and priceGram24k still null, use that /10
    if (!priceGram24k && pricePer10g) {
      priceGram24k = Number(pricePer10g) / 10;
    }

    // Prepare derived values (if priceGram24k found)
    const result = {
      raw,
      derived: {},
    };

    if (priceGram24k) {
      const g = Number(priceGram24k);
      result.derived.price_per_gram_24k = round(g);
      result.derived.price_per_10g_24k = round(g * 10);
      result.derived.price_per_ounce_24k = round(g * 31.1034768);
      result.derived.price_per_kg_24k = round(g * 1000);
    } else {
      result.derived.error = "Could not detect price per gram from API response. See raw response above.";
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Error in /api/goldrate:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
