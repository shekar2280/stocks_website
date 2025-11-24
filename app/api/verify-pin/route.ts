import pinsModels from "@/database/models/pins.models";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const body = await req.json();
    const { symbol, side, pin, userEmail } = body;

    const record = await pinsModels.findOne({ userEmail, symbol, side });
    if (!record)
        return new Response(JSON.stringify({ success: false }), { status: 400 });

    const ok = await bcrypt.compare(pin, record.hash);
    if (!ok)
        return new Response(JSON.stringify({ success: false }), { status: 401 });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
