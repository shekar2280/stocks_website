import {serve} from "inngest/next";
import {inngest} from "@/lib/inngest/client";
import { sendDailyNewsSummary, sendLowerAlertEmail, sendSignUpEmail, sendUpperAlertEmail } from "@/lib/inngest/function";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [sendSignUpEmail, sendDailyNewsSummary, sendUpperAlertEmail, sendLowerAlertEmail],
})