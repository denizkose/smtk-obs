import { spawn } from "bun";

const server = Bun.serve({
    port: 8080,
    fetch(req, server) {
        if (server.upgrade(req)) {
            return;
        }
        return new Response("WebSocket upgrade failed", { status: 500 });
    },
    websocket: {
        open(ws) {
            console.log("Client connected");
            ws.subscribe("keys");
        },
        message(_ws, _message) {
        },
        close(ws) {
            console.log("Client disconnected");
            ws.unsubscribe("keys");
        },
    },
});

console.log(`WebSocket server started on ws://localhost:${server.port}`);

const smtk = spawn(["sudo", "stdbuf", "-oL", "showmethekey-cli"], {
    stdout: "pipe",
    stderr: "inherit",
});

const reader = smtk.stdout.getReader();
const decoder = new TextDecoder();
let buffer = "";

async function processStream() {
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split('\n');

            buffer = lines.pop() || "";

            for (const line of lines) {
                if (line.trim() === "") continue;

                try {
                    const parsed = JSON.parse(line);
                    server.publish("keys", JSON.stringify(parsed));
                } catch (e) {
                    console.error("Error parsing line:", e);
                }
            }
        }
    } catch (err) {
        console.error("Error reading stream:", err);
    }
}

processStream();