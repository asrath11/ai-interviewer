// Minimal typings for Edge runtime WebSocketPair (e.g., Vercel Edge / Cloudflare Workers)
interface WebSocketPair {
  0: WebSocket;
  1: WebSocket;
}

declare var WebSocketPair: {
  new (): WebSocketPair;
};
