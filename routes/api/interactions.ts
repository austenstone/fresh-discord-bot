import {
    json,
    validateRequest,
} from "https://deno.land/x/sift@0.5.0/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { verifySignature, installCommands } from "../../discord.ts";

installCommands([
    {
        "name": "hello",
        "description": "Greet a person",
        "options": [{
            "name": "name",
            "description": "The name of the person",
            "type": 3,
            "required": true
        }]
    }
])

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

        const { valid, body } = await verifySignature(_req);
        if (!valid) {
            console.log('invalid request');
            return json(
                { error: "Invalid request" },
                {
                    status: 401,
                }
            );
        }

        const jsonBody = JSON.parse(body)
        const { type = 0, data = { options: [] } } = jsonBody;

        console.log(type, _req);
        if (type === 1) return json({ type: 1 });
        if (type === 2) {
            console.log(data)
            const { value } = data.options.find((option) => option.name === "name");
            return json({
                type: 4,
                data: {
                    content: `Hello, ${value}!`,
                },
            });
        }

        return json({ error: "bad request" }, { status: 400 });
    },
};

