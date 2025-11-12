import { inngest } from "@/lib/inngest/client";

export async function POST(req: Request) {
  const body = await req.json();
  const {type} = body;

  const eventName = type === "lower" ? "app/stock.lower_alert" : "app/stock.upper_alert";

  await inngest.send({
    name: eventName,
    data: body,
  });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}