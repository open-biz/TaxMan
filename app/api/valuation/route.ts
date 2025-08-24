import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { averageMonthlyNetProfit, monetization, businessCreatedAt } = await request.json();

    if (!averageMonthlyNetProfit) {
      return NextResponse.json(
        { error: 'Average monthly net profit is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.EMPIRE_FLIPPERS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Empire Flippers API key not configured' },
        { status: 500 }
      );
    }

    const params = new URLSearchParams({
      average_monthly_net_profit: averageMonthlyNetProfit.toString(),
    });

    if (monetization) {
      params.append('monetization', monetization);
    }

    if (businessCreatedAt) {
      params.append('business_created_at', businessCreatedAt);
    }

    const apiUrl = `https://api.empireflippers.com/api/v1/partner-toolkit/valuation-tool/valuation?${params.toString()}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Empire-Flippers-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Empire Flippers API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log('Empire Flippers API Response:', JSON.stringify(data, null, 2));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching valuation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch valuation' },
      { status: 500 }
    );
  }
}