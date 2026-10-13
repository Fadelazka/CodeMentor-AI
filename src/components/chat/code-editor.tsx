"use client";

import { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { oneDark } from "@codemirror/theme-one-dark";
import { useTheme } from "@/components/providers/theme-provider";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  height?: string;
  readOnly?: boolean;
}

export function CodeEditor({ value, onChange, language, height = "320px", readOnly }: CodeEditorProps) {
  const { theme } = useTheme();

  const extension = useMemo(() => {
    switch (language) {
      case "python":
        return [python()];
      case "javascript":
        return [javascript({ jsx: true, typescript: false })];
      case "java":
        return [java()];
      case "cpp":
        return [cpp()];
      case "php":
        return [php()];
      default:
        return [python()];
    }
  }, [language]);

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extension}
      theme={theme === "dark" ? oneDark : "light"}
      height={height}
      readOnly={readOnly}
      placeholder="Tempel atau tulis kode Anda di sini..."
      className="overflow-hidden rounded-sm border border-border text-sm"
      style={{ fontSize: "var(--editor-font-size, 14px)", background: "var(--editor-bg)", color: "var(--editor-text)" }}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        foldGutter: true,
        autocompletion: true,
        bracketMatching: true,
        closeBrackets: true,
      }}
    />
  );
}