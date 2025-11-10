import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.METALPRICE_API_KEY;
    if (!apiKey) throw new Error("Missing METALPRICE_API_KEY in environment");

    const res = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=INR&currencies=XAU`
    );

    if (!res.ok) throw new Error(`API request failed: ${res.status}`);

    const data = await res.json();

    if (!data.success || !data.rates?.XAU) {
      throw new Error("Invalid data received from API");
    }

    // Convert INR → XAU to XAU → INR
    const goldPerOunceInINR = 1 / data.rates.XAU;
    const goldRatePerGram = goldPerOunceInINR / 31.1035;
    const goldRate22K = goldRatePerGram * (22 / 24);

    return NextResponse.json({
      success: true,
      rate24K: goldRatePerGram.toFixed(2),
      rate22K: goldRate22K.toFixed(2),
      timestamp: new Date(data.timestamp * 1000).toLocaleString(),
    });
  } catch (err) {
    console.error("Gold rate error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
    