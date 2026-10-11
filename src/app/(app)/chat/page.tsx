import type { Metadata } from "next";
import { ChatInterface } from "@/components/chat/chat-interface";
import { AppSidebar } from "@/components/layout/app-sidebar";

export const metadata: Metadata = {
  title: "Chat AI Debugging",
  description:
    "Chat dengan CodeMentor AI untuk analisis error kode dalam Bahasa Indonesia.",
};

export default function ChatPage() {
  return (
    <div className="lg:pl-60">
      <ChatInterface />
    </div>
  );
}