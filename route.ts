let latestData = null;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Private-Network": "true",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request) {
  const body = await request.json();

  latestData = {
    ...body,
    receivedAt: new Date().toISOString(),
  };

  console.log("✅ Received extension data:", latestData);

  return Response.json(
    { success: true, data: latestData },
    { headers: corsHeaders }
  );
}

export async function GET() {
  return Response.json(latestData, {
    headers: corsHeaders,
  });
}