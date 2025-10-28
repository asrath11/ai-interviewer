"use client";
import React from "react";
import { CondensedMessages } from "@/components/CondensedMessages";

export function Messages({ messages }: { messages: any[] }) {
  return <CondensedMessages messages={messages} />;
}
