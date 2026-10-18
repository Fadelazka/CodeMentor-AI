import * as vscode from "vscode";

/**
 * CodeMentor AI - Ekstensi VS Code (v0.2.1)
 *
 * Mode LIVE: panel chat memanggil API CodeMentor AI di Vercel
 * (POST /api/chat) dan menampilkan field "explanation" dari responsnya.
 * Kode dari editor aktif otomatis dikirim sebagai konteks analisis.
 */
/**
 * ID view: HARUS sama persis dengan `contributes.views` (dan `activationEvents`)
 * di package.json. Kalau tidak sama, VS Code menampilkan:
 * "There is no data provider registered that can provide view data."
 */
const VIEW_ID = "codementor-sidebar";

/**
 * Origin API CodeMentor AI (produksi Vercel) + endpoint chat.
 * Origin ini dipakai juga di CSP webview (`connect-src`) agar `fetch` diizinkan.
 * Ubah di sini bila ingin mengarah ke server lokal (mis. http://localhost:3000)
 * dan tambahkan origin tersebut pada CSP di bawah.
 */
const API_ORIGIN = "https://code-mentor-ai-zeta-three.vercel.app";
const API_URL = `${API_ORIGIN}/api/chat`;

/**
 * Petakan languageId VS Code -> bahasa yang didukung API /api/chat.
 * API hanya menerima: python, javascript, java, cpp, php.
 */
function mapLanguage(languageId: string | undefined): string {
  switch ((languageId ?? "").toLowerCase()) {
    case "javascript":
    case "javascriptreact":
    case "typescript":
    case "typescriptreact":
      return "javascript";
    case "java":
      return "java";
    case "c":
    case "cpp":
    case "c++":
      return "cpp";
    case "php":
      return "php";
    default:
      return "python";
  }
}

export function activate(context: vscode.ExtensionContext): void {
  const provider = new CodeMentorViewProvider(context.extensionUri);

  const registration = vscode.window.registerWebviewViewProvider(
    CodeMentorViewProvider.viewType,
    provider,
    { webviewOptions: { retainContextWhenHidden: true } }
  );

  // Jaring pengaman + jalur diagnostik:
  // Command Palette -> "CodeMentor AI: Buka Panel Chat".
  // Kalau command ini bisa membuka panel chat, artinya ekstensi SUDAH aktif
  // dan masalahnya ada di sisi Activity Bar / ikon, bukan di registrasi provider.
  const openChat = vscode.commands.registerCommand("codementor-ai.focusChat", () =>
    vscode.commands.executeCommand("workbench.view.extension.codementor-container")
  );

  context.subscriptions.push(registration, openChat);

  // Jejak diagnostik: Help > Toggle Developer Tools > Console,
  // atau View > Output > pilih "Extension Host".
  console.log(`[CodeMentor AI] activate() dipanggil. Provider terdaftar untuk view: ${CodeMentorViewProvider.viewType}`);
}

export function deactivate(): void {
  // Tidak ada resource global yang perlu dibersihkan: semua disposable diurus
  // VS Code atau dilepas saat view di-dispose (lihat resolveWebviewView).
}

class CodeMentorViewProvider implements vscode.WebviewViewProvider {
  /**
   * Id ini WAJIB sama dengan `contributes.views` di package.json.
   * Catatan: `vscode.WebviewViewProvider` adalah sebuah *interface*, sehingga
   * yang benar adalah `implements` (bukan `extends`). Di JavaScript keduanya
   * tidak menghasilkan kode apa pun, jadi ini bukan penyebab error runtime.
   */
  public static readonly viewType = VIEW_ID;

  private view?: vscode.WebviewView;

  constructor(private readonly extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView): void {
    this.view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };

    try {
      webviewView.webview.html = this.getHtml(webviewView.webview);
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      console.error("[CodeMentor AI] Gagal merender webview:", error);
      webviewView.webview.html =
        '<!DOCTYPE html><html lang="id"><body style="font-family:sans-serif;padding:14px;background:#0b0b14;color:#e8e8f0">' +
        "<h3>CodeMentor AI gagal memuat panel</h3>" +
        '<pre style="white-space:pre-wrap;font-size:12px">' +
        detail +
        "</pre></body></html>";
    }

    // Sinkronkan kode editor aktif -> webview (dipakai sebagai konteks ke API).
    const editorWatchers = [
      vscode.window.onDidChangeTextEditorSelection(() => this.postEditorContext()),
      vscode.window.onDidChangeActiveTextEditor(() => this.postEditorContext()),
    ];
    const messageWatcher = webviewView.webview.onDidReceiveMessage((message: unknown) => {
      if (message && (message as { type?: string }).type === "ready") {
        this.postEditorContext();
      }
    });

    webviewView.onDidDispose(() => {
      editorWatchers.forEach((watcher) => watcher.dispose());
      messageWatcher.dispose();
    });

    this.postEditorContext();
  }

  /**
   * Kirim kode (seleksi bila ada, kalau tidak seluruh file) + bahasa ke webview.
   * Dipanggil saat panel dibuka dan setiap kali seleksi/file aktif berubah.
   */
  private postEditorContext(): void {
    const editor = vscode.window.activeTextEditor;
    let code = "";
    let language = "python";
    let fromSelection = false;

    if (editor) {
      const selection = editor.document.getText(editor.selection);
      fromSelection = selection.trim().length > 0;
      code = fromSelection ? selection : editor.document.getText();
      language = mapLanguage(editor.document.languageId);
    }

    // Batasi ukuran agar payload tetap wajar.
    const trimmed = code.length > 8000 ? code.slice(0, 8000) : code;

    void this.view?.webview.postMessage({
      type: "editorContext",
      code: trimmed,
      language,
      lines: trimmed ? trimmed.split(/\r?\n/).length : 0,
      fromSelection,
    });
  }

  private getHtml(webview: vscode.Webview): string {
    const nonce = getNonce();

    // Catatan: inline script & style perlu diizinkan lewat CSP di bawah.
    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}'; connect-src ${API_ORIGIN};"
  />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CodeMentor AI</title>
  <style>
    :root {
      --bg: #0b0b14;
      --panel: #12121f;
      --elev: #181828;
      --border: rgba(255, 255, 255, 0.08);
      --border-strong: rgba(255, 255, 255, 0.16);
      --text: #e8e8f0;
      --muted: #8b8ba7;
      --violet: #7c4dff;
      --cyan: #00e5ff;
      --pink: #ff3b6b;
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      height: 100%;
      margin: 0;
      padding: 0;
    }

    body {
      display: flex;
      flex-direction: column;
      background: radial-gradient(120% 80% at 100% 0%, rgba(124, 77, 255, 0.12), transparent 60%),
        radial-gradient(120% 80% at 0% 100%, rgba(0, 229, 255, 0.08), transparent 60%), var(--bg);
      color: var(--text);
      font-family: var(--vscode-font-family, -apple-system, "Segoe UI", Roboto, sans-serif);
      font-size: 13px;
      overflow: hidden;
    }

    /* ---------- Header ---------- */
    .cm-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 10px 12px;
      border-bottom: 1px solid var(--border);
      background: rgba(18, 18, 31, 0.72);
      backdrop-filter: blur(6px);
      flex-shrink: 0;
    }

    .cm-brand {
      display: flex;
      align-items: center;
      gap: 9px;
      min-width: 0;
    }

    .cm-logo {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      flex-shrink: 0;
      border-radius: 8px;
      background: linear-gradient(135deg, var(--violet), var(--cyan));
      color: #071018;
      font-family: var(--vscode-editor-font-family, monospace);
      font-weight: 700;
      font-size: 12px;
      letter-spacing: -0.5px;
    }

    .cm-title {
      font-weight: 600;
      font-size: 13px;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .cm-sub {
      font-size: 10px;
      color: var(--muted);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .cm-badge {
      flex-shrink: 0;
      padding: 3px 8px;
      border-radius: 999px;
      border: 1px solid rgba(255, 59, 107, 0.35);
      background: rgba(255, 59, 107, 0.12);
      color: #ff7c9c;
      font-size: 9.5px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    /* ---------- Chat ---------- */
    .cm-chat {
      flex: 1;
      overflow-y: auto;
      padding: 14px 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scrollbar-width: thin;
    }

    .cm-chat::-webkit-scrollbar {
      width: 8px;
    }

    .cm-chat::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 999px;
    }

    .cm-row {
      display: flex;
      animation: cm-in 0.22s ease-out;
    }

    .cm-row.cm-left {
      justify-content: flex-start;
    }

    .cm-row.cm-right {
      justify-content: flex-end;
    }

    @keyframes cm-in {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .cm-bubble {
      max-width: 86%;
      padding: 9px 12px;
      border-radius: 14px;
      font-size: 12.5px;
      line-height: 1.6;
      white-space: pre-wrap;
      word-break: break-word;
      overflow-wrap: anywhere;
    }

    .cm-bubble.cm-user {
      background: linear-gradient(135deg, #7c4dff, #4a2fd6);
      color: #ffffff;
      border-bottom-right-radius: 4px;
      box-shadow: 0 6px 18px -10px rgba(124, 77, 255, 0.9);
    }

    .cm-bubble.cm-ai {
      background: var(--elev);
      border: 1px solid var(--border);
      border-bottom-left-radius: 4px;
      color: var(--text);
    }

    .cm-bubble code,
    .cm-bubble .cm-code {
      font-family: var(--vscode-editor-font-family, monospace);
      font-size: 11.5px;
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 1px 5px;
    }

    /* Animasi loading (titik-titik) */
    .cm-dots {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 0;
    }

    .cm-dots span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--cyan);
      opacity: 0.35;
      animation: cm-bounce 1.2s infinite ease-in-out;
    }

    .cm-dots span:nth-child(2) {
      animation-delay: 0.15s;
      background: var(--violet);
    }

    .cm-dots span:nth-child(3) {
      animation-delay: 0.3s;
      background: var(--pink);
    }

    @keyframes cm-bounce {
      0%,
      60%,
      100% {
        transform: translateY(0);
        opacity: 0.35;
      }
      30% {
        transform: translateY(-4px);
        opacity: 1;
      }
    }

    .cm-typing-label {
      margin-left: 6px;
      font-size: 10.5px;
      color: var(--muted);
    }

    /* ---------- Input ---------- */
    .cm-inputbar {
      flex-shrink: 0;
      display: flex;
      align-items: flex-end;
      gap: 8px;
      padding: 10px 12px 12px;
      border-top: 1px solid var(--border);
      background: rgba(18, 18, 31, 0.72);
      backdrop-filter: blur(6px);
    }

    #cm-input {
      flex: 1;
      min-height: 36px;
      max-height: 120px;
      padding: 9px 11px;
      resize: none;
      border-radius: 10px;
      border: 1px solid var(--border-strong);
      background: #16162a;
      color: var(--text);
      font-family: inherit;
      font-size: 12.5px;
      line-height: 1.45;
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    #cm-input::placeholder {
      color: #6b6b85;
    }

    #cm-input:focus {
      border-color: rgba(124, 77, 255, 0.75);
      box-shadow: 0 0 0 3px rgba(124, 77, 255, 0.16);
    }

    #cm-send {
      flex-shrink: 0;
      height: 36px;
      padding: 0 15px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      color: #06121a;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 700;
      background: linear-gradient(135deg, var(--violet), var(--cyan));
      transition: filter 0.15s ease, opacity 0.15s ease;
    }

    #cm-send:hover:not(:disabled) {
      filter: brightness(1.08);
    }

    #cm-send:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ---------- Toolbar (konteks editor + bahasa) ---------- */
    .cm-toolbar {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 7px 12px 0;
      font-size: 10px;
      color: var(--muted);
    }

    .cm-toolbar .cm-context {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    #cm-lang {
      flex-shrink: 0;
      padding: 3px 6px;
      border-radius: 7px;
      border: 1px solid var(--border-strong);
      background: #16162a;
      color: var(--text);
      font-family: inherit;
      font-size: 10.5px;
      outline: none;
    }

    /* ---------- Isi balasan AI ---------- */
    .cm-bubble .cm-h {
      margin: 0 0 4px;
      font-weight: 700;
      font-size: 12.5px;
      color: #b39dff;
    }

    .cm-bubble .cm-p {
      margin: 0 0 8px;
    }

    .cm-bubble .cm-p:last-child {
      margin-bottom: 0;
    }

    .cm-bubble .cm-code-block {
      margin: 8px 0;
      padding: 9px 10px;
      border-radius: 9px;
      border: 1px solid var(--border);
      background: #0d0d1a;
      font-family: var(--vscode-editor-font-family, monospace);
      font-size: 11.5px;
      line-height: 1.55;
      overflow-x: auto;
    }

    .cm-bubble .cm-meta {
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px dashed var(--border);
      font-size: 10px;
      color: var(--muted);
    }

    .cm-badge.cm-live {
      border-color: rgba(0, 229, 255, 0.4);
      background: rgba(0, 229, 255, 0.12);
      color: #6ff0ff;
    }
  </style>
</head>
<body>
  <header class="cm-header">
    <div class="cm-brand">
      <span class="cm-logo">&lt;/&gt;</span>
      <div>
        <div class="cm-title">CodeMentor AI</div>
        <div class="cm-sub">Asisten Debugging</div>
      </div>
    </div>
    <span class="cm-badge cm-live">Live</span>
  </header>

  <main id="cm-chat" class="cm-chat" aria-live="polite"></main>

  <div class="cm-toolbar">
    <span id="cm-context" class="cm-context">Konteks: memuat editor...</span>
    <select id="cm-lang" title="Bahasa yang dikirim ke API">
      <option value="auto">auto</option>
      <option value="python">python</option>
      <option value="javascript">javascript</option>
      <option value="java">java</option>
      <option value="cpp">cpp</option>
      <option value="php">php</option>
    </select>
  </div>

  <form id="cm-form" class="cm-inputbar">
    <textarea
      id="cm-input"
      rows="1"
      placeholder="Tempel kode atau tanya error di sini..."
      aria-label="Tulis pesan"
    ></textarea>
    <button id="cm-send" type="submit" title="Kirim pesan">Kirim</button>
  </form>

  <script nonce="${nonce}">
    (function () {
      var chat = document.getElementById("cm-chat");
      var form = document.getElementById("cm-form");
      var input = document.getElementById("cm-input");
      var send = document.getElementById("cm-send");
      var langSelect = document.getElementById("cm-lang");
      var contextLabel = document.getElementById("cm-context");

      // Backtick ditulis lewat kode karakter supaya tidak bentrok dengan
      // template literal TypeScript yang membungkus skrip ini.
      var BT = String.fromCharCode(96);

      // Konteks editor (dikirim ekstensi lewat postMessage).
      var editorCode = "";
      var editorLang = "python";

      // Endpoint API CodeMentor AI.
      // PENTING: skrip webview berjalan di halaman sendiri, jadi variabel
      // extension host (API_URL di TypeScript) TIDAK bisa diakses langsung.
      // Nilai di bawah di-inject saat HTML dibuat, dari konstanta API_URL.
      var API_URL = "${API_URL}";

      function scrollToBottom() {
        chat.scrollTop = chat.scrollHeight;
      }

      function addBubble(text, who) {
        var row = document.createElement("div");
        row.className = "cm-row " + (who === "user" ? "cm-right" : "cm-left");

        var bubble = document.createElement("div");
        bubble.className = "cm-bubble " + (who === "user" ? "cm-user" : "cm-ai");
        bubble.textContent = text;

        row.appendChild(bubble);
        chat.appendChild(row);
        scrollToBottom();
        return row;
      }

      function addLoading() {
        var row = document.createElement("div");
        row.className = "cm-row cm-left";

        var bubble = document.createElement("div");
        bubble.className = "cm-bubble cm-ai";

        var dots = document.createElement("span");
        dots.className = "cm-dots";
        dots.innerHTML = "<span></span><span></span><span></span>";

        var label = document.createElement("span");
        label.className = "cm-typing-label";
        label.textContent = "CodeMentor sedang menulis...";

        bubble.appendChild(dots);
        bubble.appendChild(label);
        row.appendChild(bubble);
        chat.appendChild(row);
        scrollToBottom();
        return row;
      }

      function setBusy(busy) {
        send.disabled = busy;
        input.disabled = busy;
        if (langSelect) langSelect.disabled = busy;
      }

      function updateContext(lines, fromSelection) {
        if (!contextLabel) return;
        if (lines > 0) {
          contextLabel.textContent =
            "Konteks: " + editorLang + " - " + lines + " baris" + (fromSelection ? " (seleksi)" : " (file aktif)");
        } else {
          contextLabel.textContent = "Konteks: tidak ada file aktif - kirim kodenya lewat chat.";
        }
      }

      // Render ringan (heading, tebal, inline code, blok kode) TANPA innerHTML.
      function inline(parent, text) {
        var parts = String(text).split(/(\\*\\*[^*]+\\*\\*|\\u0060[^\\u0060]+\\u0060)/g);
        for (var i = 0; i < parts.length; i++) {
          var piece = parts[i];
          if (!piece) continue;
          if (piece.length > 4 && piece.slice(0, 2) === "**" && piece.slice(-2) === "**") {
            var strong = document.createElement("strong");
            strong.textContent = piece.slice(2, -2);
            parent.appendChild(strong);
          } else if (piece.length > 2 && piece.charAt(0) === BT && piece.charAt(piece.length - 1) === BT) {
            var code = document.createElement("code");
            code.textContent = piece.slice(1, -1);
            parent.appendChild(code);
          } else {
            parent.appendChild(document.createTextNode(piece));
          }
        }
      }

      function renderRich(bubble, text) {
        var lines = String(text).split(/\\r?\\n/);
        var fence = BT + BT + BT;
        var para = null;
        var codeBlock = null;
        var inCode = false;

        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];

          if (line.trim().indexOf(fence) === 0) {
            if (inCode) {
              inCode = false;
              codeBlock = null;
            } else {
              inCode = true;
              para = null;
              codeBlock = document.createElement("pre");
              codeBlock.className = "cm-code-block";
              bubble.appendChild(codeBlock);
            }
            continue;
          }

          if (inCode) {
            if (codeBlock) {
              codeBlock.textContent += (codeBlock.textContent ? "\\n" : "") + line;
            }
            continue;
          }

          if (!line.trim()) {
            para = null;
            continue;
          }

          var heading = line.match(/^(#{1,6})\\s+(.*)$/);
          if (heading) {
            para = null;
            var head = document.createElement("div");
            head.className = "cm-h";
            inline(head, heading[2]);
            bubble.appendChild(head);
            continue;
          }

          if (!para) {
            para = document.createElement("p");
            para.className = "cm-p";
            bubble.appendChild(para);
          } else {
            para.appendChild(document.createElement("br"));
          }
          inline(para, line);
        }
      }

      function appendMeta(parent, data) {
        var bits = [];
        if (data.detectedErrorCode) bits.push(data.detectedErrorCode);
        if (typeof data.responseTimeMs === "number") bits.push((data.responseTimeMs / 1000).toFixed(1) + " dtk");
        if (typeof data.confidence === "number") bits.push("akurasi " + data.confidence + "%");
        if (data.mock) bits.push("PERINGATAN: mode knowledge base (GROQ_API_KEY belum aktif)");
        if (!bits.length) return;

        var meta = document.createElement("div");
        meta.className = "cm-meta";
        meta.textContent = bits.join(" | ");
        parent.appendChild(meta);
      }

      function handleSend() {
        var text = input.value.trim();
        if (!text) return;

        // Kode dari editor dipakai sebagai konteks; kalau tidak ada, pakai yang diketik user.
        var sourceCode = editorCode && editorCode.trim() ? editorCode : text;
        var language = langSelect && langSelect.value !== "auto" ? langSelect.value : editorLang || "python";

        addBubble(text, "user");
        input.value = "";
        input.style.height = "auto";
        setBusy(true);

        var loading = addLoading();
        var controller = new AbortController();
        var timer = window.setTimeout(function () {
          controller.abort();
        }, 60000);

        fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sourceCode: sourceCode,
            language: language,
            errorMessage: text,
            aiDetailLevel: "medium",
            saveHistory: false,
          }),
          signal: controller.signal,
        })
          .then(function (response) {
            return response.json().then(
              function (data) {
                return { ok: response.ok, status: response.status, data: data };
              },
              function () {
                return { ok: response.ok, status: response.status, data: null };
              }
            );
          })
          .then(function (result) {
            loading.remove();
            setBusy(false);

            var data = result.data || {};
            if (!result.ok) {
              addBubble(
                "CodeMentor AI gagal memproses permintaan.\\n\\n" +
                  (data.error || "HTTP " + result.status) +
                  "\\n\\nPastikan kode terisi dan bahasanya didukung: python, javascript, java, cpp, php.",
                "ai"
              );
              return;
            }

            if (!data.explanation) {
              addBubble("CodeMentor AI tidak mengembalikan penjelasan. Silakan coba lagi.", "ai");
              return;
            }

            var row = addBubble("", "ai");
            var bubble = row.querySelector(".cm-bubble");
            if (bubble) {
              bubble.textContent = "";
              renderRich(bubble, data.explanation);
              appendMeta(bubble, data);
            }
          })
          .catch(function (error) {
            loading.remove();
            setBusy(false);
            console.error("[CodeMentor AI] fetch gagal:", error);
            var reason =
              error && error.name === "AbortError"
                ? "Permintaan melebihi 60 detik."
                : (error && error.message) || String(error);
            addBubble(
              "Tidak bisa menghubungi server CodeMentor AI.\\n\\n" +
                reason +
                "\\n\\nPeriksa koneksi internet, lalu coba lagi.",
              "ai"
            );
          })
          .then(function () {
            window.clearTimeout(timer);
            input.focus();
          });
      }

      form.addEventListener("submit", function (event) {
        event.preventDefault();
        handleSend();
      });

      input.addEventListener("input", function () {
        input.style.height = "auto";
        input.style.height = Math.min(input.scrollHeight, 120) + "px";
      });

      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          if (typeof form.requestSubmit === "function") {
            form.requestSubmit();
          } else {
            handleSend();
          }
        }
      });

      // Konteks editor dari ekstensi (dikirim saat panel dibuka / seleksi berubah).
      window.addEventListener("message", function (event) {
        var msg = event.data || {};
        if (msg.type === "editorContext") {
          editorCode = msg.code || "";
          editorLang = msg.language || "python";
          updateContext(msg.lines || 0, !!msg.fromSelection);
        }
      });

      addBubble(
        "Selamat datang di CodeMentor AI (mode live)!\\n\\nBuka file kode kamu, tempel pesan error di kolom bawah, lalu tekan Kirim.\\nKode dari editor aktif otomatis dikirim sebagai konteks analisis.",
        "ai"
      );

      input.focus();

      // Beri tahu ekstensi bahwa webview siap -> minta konteks editor.
      try {
        if (typeof acquireVsCodeApi === "function") {
          var vscodeApi = acquireVsCodeApi();
          vscodeApi.postMessage({ type: "ready" });
        }
      } catch (error) {
        console.warn("[CodeMentor AI] acquireVsCodeApi tidak tersedia:", error);
      }
    })();
  </script>
</body>
</html>`;
  }
}

function getNonce(): string {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
