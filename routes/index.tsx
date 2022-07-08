/** @jsx h */
import { h } from "preact";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req, _ctx) {
    return Response.redirect(`https://discord.com/api/oauth2/authorize?client_id=994689091226583081&scope=applications.commands`)
  },
};

export default function Home() {
  return (
    <div>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p>
        Welcome to `fresh`.
      </p>
    </div>
  );
}
