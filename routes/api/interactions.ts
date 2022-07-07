import {
    json,
    validateRequest,
} from "https://deno.land/x/sift@0.5.0/mod.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    async POST(_req: Request) {
        const { error } = await validateRequest(_req, {
            POST: {
                headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"],
            },
        });
        if (error) {
            return json({ error: error.message }, { status: error.status });
        }

        const text = JSON.parse(await _req.text())
        const { type = 0, data = { options: [] } } = text;

        console.log(type, _req);
        if (type === 1) return json({ type: 1 });
        if (type === 2) {
            const { value } = data.options.find((option) => option.name === "name");
            return json({
                // Type 4 responds with the below message retaining the user's
                // input at the top.
                type: 4,
                data: {
                    content: `Hello, ${value}!`,
                },
            });
        }

        return json({ error: "bad request" }, { status: 400 });
    },
};

