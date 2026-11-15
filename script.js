/* ==========================================================================
   JARVIS AI — Personal Holographic Assistant (Vanilla ES Module)
   100% Static Client-Side Architecture for GitHub Pages + Google Gemini API
   ========================================================================== */

const STORAGE_KEYS = {
  API_KEY: 'jarvis_gemini_api_key',
  SETTINGS: 'jarvis_settings_v1',
  CONVERSATIONS: 'jarvis_conversations_v1',
  ACTIVE_CONV_ID: 'jarvis_active_conv_id_v1',
  NOTES: 'jarvis_notes_v1',
  TASKS: 'jarvis_tasks_v1',
  CALC_HISTORY: 'jarvis_calc_history_v1',
  VOICE_LOG: 'jarvis_voice_log_v1'
};

const DEFAULT_SETTINGS = {
  model: 'gemini-4-hydrogen',
  customModel: '',
  temperature: 0.7,
  maxTokens: 2048,
  language: 'en',
  theme: 'dark',
  voiceURI: '',
  speechRate: 1.0,
  autoSpeakChat: false,
  voiceLang: 'en-US',
  voiceAutoResponse: true,
  voiceContinuous: false,
  voiceMuted: false
};

const I18N = {
  en: {
    systemName: 'JARVIS Interface',
    navGroupCore: 'Core Interface',
    navGroupProductivity: 'Workspace',
    navGroupSystem: 'System',
    navDashboard: 'Dashboard',
    navChat: 'AI Chat',
    navVoice: 'Voice Assistant',
    navTools: 'AI Tools',
    navHistory: 'History',
    navNotes: 'Notes',
    navTasks: 'Tasks',
    navCalculator: 'Calculator',
    navWeather: 'Weather',
    navSearch: 'Web Search',
    navSettings: 'Settings',
    navAbout: 'About JARVIS',
    quickCommands: 'Quick Command',
    installApp: 'Install App',
    labelTime: 'Clock',
    labelAI: 'Gemini API',
    labelMic: 'Microphone',
    offlineNotice: 'Offline Mode — Local notes, tasks, calculator, and cached shell remain available.',
    setupBannerTitle: 'Gemini API Key Required for AI Features',
    setupBannerDesc: 'Enter your Google Gemini API key in Settings to activate AI Chat, Voice Assistant responses, and all 9 AI Tools.',
    configureKey: 'Configure API Key',
    dashCoreTitle: 'JARVIS Holographic Core',
    dashChatTitle: 'Direct Command & Chat',
    dashChatSub: 'English & বাংলা supported',
    quickActionsTitle: 'Quick Actions',
    btnListen: 'Start Voice',
    btnStopSpeaking: 'Mute / Stop',
    btnOpenChat: 'Full Chat',
    kpiSystem: 'System Status',
    kpiAI: 'AI Connection',
    kpiMic: 'Microphone',
    kpiTasks: 'Open Tasks',
    send: 'Send',
    expand: 'Expand',
    qaTime: 'Current Time',
    qaTranslate: 'EN ↔ বাং Translator',
    qaCode: 'Coding Assistant',
    qaNotes: 'Quick Note',
    qaWeather: 'Live Weather',
    qaSettings: 'API & Voice Setup',
    conversations: 'Conversations',
    newChat: 'New',
    autoSpeak: 'Auto-Speak',
    regenerate: 'Regenerate',
    export: 'Export',
    clear: 'Clear',
    jarvisThinking: 'JARVIS is formulating a response...',
    stopGeneration: 'Stop Generation',
    voiceConsoleTitle: 'Holographic Voice Console',
    startListening: 'Start Listening',
    stopListening: 'Stop Listening',
    interruptSpeaking: 'Interrupt Speaking',
    muteVoice: 'Mute Output',
    unmuteVoice: 'Unmute Output',
    voiceSelect: 'Speech Voice',
    speechSpeed: 'Speech Speed',
    autoVoiceResp: 'Automatic Voice Response',
    continuousMode: 'Continuous Conversation',
    voiceLogTitle: 'Voice Interaction Log',
    aiToolsTitle: 'Gemini AI Workbench',
    historyTitle: 'Conversation History'
  },
  bn: {
    systemName: 'জার্ভিস ইন্টারফেস',
    navGroupCore: 'মূল ইন্টারফেস',
    navGroupProductivity: 'ওয়ার্কস্পেস',
    navGroupSystem: 'সিস্টেম',
    navDashboard: 'ড্যাশবোর্ড',
    navChat: 'এআই চ্যাট',
    navVoice: 'ভয়েস অ্যাসিস্ট্যান্ট',
    navTools: 'এআই টুলস',
    navHistory: 'ইতিহাস',
    navNotes: 'নোটস',
    navTasks: 'টাস্কস',
    navCalculator: 'ক্যালকুলেটর',
    navWeather: 'আবহাওয়া',
    navSearch: 'ওয়েব সার্চ',
    navSettings: 'সেটিংস',
    navAbout: 'জার্ভিস সম্পর্কে',
    quickCommands: 'দ্রুত কমান্ড',
    installApp: 'অ্যাপ ইনস্টল',
    labelTime: 'সময়',
    labelAI: 'জেমিনি এপিআই',
    labelMic: 'মাইক্রোফোন',
    offlineNotice: 'অফলাইন মোড — লোকাল নোট, টাস্ক, ক্যালকুলেটর এবং ক্যাশড ইন্টারফেস সচল আছে।',
    setupBannerTitle: 'এআই ফিচারের জন্য জেমিনি এপিআই কী প্রয়োজন',
    setupBannerDesc: 'এআই চ্যাট, ভয়েস উত্তর এবং ৯টি এআই টুল ব্যবহার করতে সেটিংসে আপনার গুগল জেমিনি এপিআই কী যোগ করুন।',
    configureKey: 'এপিআই কী সেটআপ',
    dashCoreTitle: 'জার্ভিস হলোগ্রাফিক কোর',
    dashChatTitle: 'সরাসরি কমান্ড ও চ্যাট',
    dashChatSub: 'বাংলা ও ইংরেজি সমর্থিত',
    quickActionsTitle: 'দ্রুত অ্যাকশন',
    btnListen: 'ভয়েস চালু',
    btnStopSpeaking: 'থামান / মিউট',
    btnOpenChat: 'সম্পূর্ণ চ্যাট',
    kpiSystem: 'সিস্টেম অবস্থা',
    kpiAI: 'এআই সংযোগ',
    kpiMic: 'মাইক্রোফোন',
    kpiTasks: 'বাকি টাস্ক',
    send: 'পাঠান',
    expand: 'বড় করুন',
    qaTime: 'বর্তমান সময়',
    qaTranslate: 'ইংরেজি ↔ বাংলা অনুবাদ',
    qaCode: 'কোডিং অ্যাসিস্ট্যান্ট',
    qaNotes: 'দ্রুত নোট',
    qaWeather: 'লাইভ আবহাওয়া',
    qaSettings: 'এপিআই ও ভয়েস সেটিংস',
    conversations: 'কথোপকথন',
    newChat: 'নতুন',
    autoSpeak: 'অটো-স্পিক',
    regenerate: 'পুনরায় তৈরি',
    export: 'এক্সপোর্ট',
    clear: 'মুছুন',
    jarvisThinking: 'জার্ভিস উত্তর প্রস্তুত করছে...',
    stopGeneration: 'থামান',
    voiceConsoleTitle: 'হলোগ্রাফিক ভয়েস কনসোল',
    startListening: 'কথা বলা শুরু',
    stopListening: 'শোনা বন্ধ করুন',
    interruptSpeaking: 'কথা থামান',
    muteVoice: 'সাউন্ড মিউট',
    unmuteVoice: 'সাউন্ড চালু',
    voiceSelect: 'ভয়েস নির্বাচন',
    speechSpeed: 'কথার গতি',
    autoVoiceResp: 'স্বয়ংক্রিয় ভয়েস উত্তর',
    continuousMode: 'নিরবচ্ছিন্ন কথোপকথন',
    voiceLogTitle: 'ভয়েস কথোপকথন লগ',
    aiToolsTitle: 'জেমিনি এআই ওয়ার্কবেঞ্চ',
    historyTitle: 'কথোপকথনের ইতিহাস'
  }
};

const TOOL_DEFINITIONS = {
  writer: {
    title: 'AI Writer',
    desc: 'Draft structured articles, reports, essays, scripts, and creative prose.',
    opt1Label: 'Style / Tone',
    opt1Options: ['Professional', 'Executive Brief', 'Technical', 'Creative', 'Conversational'],
    opt2Label: 'Output Language',
    opt2Options: ['English', 'Bengali (বাংলা)', 'Bilingual (EN + বাংলা)'],
    placeholder: 'Describe what you want JARVIS to write (topic, audience, key points)...',
    buildPrompt: (input, o1, o2) =>
      `Act as an expert writer. Write a ${o1} piece in ${o2} based on the following request:\n\n${input}`
  },
  translator: {
    title: 'AI Translator (EN ↔ বাংলা)',
    desc: 'Accurate context-aware translation between English, Bengali, and other languages.',
    opt1Label: 'Direction',
    opt1Options: ['Auto-Detect (EN ↔ Bengali)', 'English to Bengali', 'Bengali to English', 'To Spanish', 'To Arabic', 'To Hindi'],
    opt2Label: 'Register',
    opt2Options: ['Natural & Idiomatic', 'Formal / Academic', 'Technical / Software'],
    placeholder: 'Paste text in English or বাংলা to translate...',
    buildPrompt: (input, o1, o2) =>
      `Translate the following text (${o1}) using a ${o2} register. Provide the primary translation clearly, and optionally brief usage notes if idioms appear.\n\nText:\n${input}`
  },
  summarizer: {
    title: 'AI Summarizer',
    desc: 'Distill long documents, notes, or articles into crisp takeaways.',
    opt1Label: 'Format',
    opt1Options: ['Executive Bullet Points', 'Single Paragraph', 'Key Takeaways + Action Items', 'ELI5 Simple Summary'],
    opt2Label: 'Output Language',
    opt2Options: ['Same as Input', 'English', 'Bengali (বাংলা)'],
    placeholder: 'Paste the article, notes, or text you want summarized...',
    buildPrompt: (input, o1, o2) =>
      `Summarize the following content as "${o1}" in language "${o2}". Preserve factual accuracy and omit filler.\n\nContent:\n${input}`
  },
  coding: {
    title: 'AI Coding Assistant',
    desc: 'Generate clean code, debug errors, refactor logic, or explain algorithms.',
    opt1Label: 'Task Type',
    opt1Options: ['Write Clean Code', 'Debug & Fix Error', 'Explain Code Line-by-Line', 'Refactor & Optimize', 'Write Unit Tests'],
    opt2Label: 'Language / Stack',
    opt2Options: ['JavaScript / Web', 'TypeScript', 'Python', 'HTML / CSS', 'SQL', 'C / C++', 'Auto-Detect'],
    placeholder: 'Describe the function you need or paste code/error stack trace...',
    buildPrompt: (input, o1, o2) =>
      `As a senior software engineer, perform "${o1}" for ${o2}. Include clean fenced code blocks and brief explanation of key decisions.\n\nRequest:\n${input}`
  },
  email: {
    title: 'AI Email Writer',
    desc: 'Compose clear, respectful professional or personal emails.',
    opt1Label: 'Tone',
    opt1Options: ['Polite & Professional', 'Formal Executive', 'Friendly Follow-Up', 'Concise Request', 'Apology / Resolution'],
    opt2Label: 'Output Language',
    opt2Options: ['English', 'Bengali (বাংলা)'],
    placeholder: 'Who is the recipient and what is the purpose of the email?',
    buildPrompt: (input, o1, o2) =>
      `Write a complete email (including Subject line) in ${o2} with a "${o1}" tone based on these details:\n\n${input}`
  },
  qa: {
    title: 'AI Question Answering',
    desc: 'Ask complex factual, conceptual, scientific, or technical questions.',
    opt1Label: 'Depth',
    opt1Options: ['Clear & Direct', 'Deep Technical Explanation', 'Step-by-Step Breakdown'],
    opt2Label: 'Output Language',
    opt2Options: ['Same as Question', 'English', 'Bengali (বাংলা)'],
    placeholder: 'Ask any question in English or বাংলা...',
    buildPrompt: (input, o1, o2) =>
      `Answer the following question with depth "${o1}" in language "${o2}". Be accurate, structured, and honest about uncertainties.\n\nQuestion:\n${input}`
  },
  study: {
    title: 'AI Study Assistant',
    desc: 'Learn difficult concepts with analogies, practice quizzes, and flashcards.',
    opt1Label: 'Study Mode',
    opt1Options: ['Explain Simply with Analogy', '5 Practice Quiz Questions', 'Study Guide & Key Terms', 'Flashcards (Q & A)'],
    opt2Label: 'Level',
    opt2Options: ['High School', 'University / Engineering', 'Beginner Friendly'],
    placeholder: 'Enter the topic, chapter, or concept you are studying...',
    buildPrompt: (input, o1, o2) =>
      `Act as a patient tutor at "${o2}" level. Create a "${o1}" for the following topic (respond in the same language as the topic unless specified):\n\n${input}`
  },
  ideas: {
    title: 'AI Idea Generator',
    desc: 'Brainstorm structured project ideas, product concepts, content hooks, or solutions.',
    opt1Label: 'Idea Category',
    opt1Options: ['Software / App Projects', 'Business & Startup', 'Content / YouTube Topics', 'Problem Solving'],
    opt2Label: 'Quantity',
    opt2Options: ['5 Focused Ideas', '10 Diverse Ideas', '3 Deep-Dive Concepts'],
    placeholder: 'Describe your goal, skills, niche, or constraint...',
    buildPrompt: (input, o1, o2) =>
      `Generate ${o2} for "${o1}". For each idea include a clear title, core value proposition, and practical first step.\n\nContext:\n${input}`
  },
  improver: {
    title: 'AI Text Improver',
    desc: 'Fix grammar, tighten clarity, polish phrasing, or adapt tone without changing meaning.',
    opt1Label: 'Improvement Goal',
    opt1Options: ['Fix Grammar & Clarity', 'Make More Concise', 'Make More Professional', 'Expand with Detail'],
    opt2Label: 'Language',
    opt2Options: ['Auto-Detect (EN / বাংলা)', 'English', 'Bengali (বাংলা)'],
    placeholder: 'Paste the draft text you want JARVIS to polish...',
    buildPrompt: (input, o1, o2) =>
      `Improve the following text with goal "${o1}" in ${o2}. Return the improved version first, followed by a brief bullet list of key refinements.\n\nOriginal Text:\n${input}`
  }
};

/* ==========================================================================
   Application State
   ========================================================================== */
const state = {
  currentPage: 'dashboard',
  apiKey: '',
  connectionStatus: 'unconfigured', // unconfigured | connected | error
  settings: { ...DEFAULT_SETTINGS },
  conversations: [],
  activeConvId: null,
  notes: [],
  tasks: [],
  taskFilter: 'all',
  calcExpr: '',
  calcResult: '0',
  calcHistory: [],
  voiceLog: [],
  activeTool: 'writer',
  toolOutputText: '',
  isGenerating: false,
  abortController: null,
  isListening: false,
  isSpeaking: false,
  recognition: null,
  voices: [],
  deferredInstallPrompt: null,
  pendingConfirmAction: null,
  audioCtx: null,
  analyser: null,
  micStream: null,
  visualizerRaf: null
};

/* ==========================================================================
   Safe Storage Helpers
   ========================================================================== */
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    showToast('Browser storage quota exceeded; some data could not be saved.', 'err');
    console.error(err);
  }
}

function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

/* ==========================================================================
   DOM Helpers & Toast / Modal
   ========================================================================== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function showToast(message, type = 'info') {
  const container = $('#toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => {
    el.remove();
  }, 3600);
}

function openConfirmModal(title, message, onConfirm, confirmLabel = 'Confirm') {
  $('#confirm-modal-title').textContent = title;
  $('#confirm-modal-message').textContent = message;
  $('#confirm-modal-ok').textContent = confirmLabel;
  state.pendingConfirmAction = onConfirm;
  $('#confirm-modal').classList.remove('hidden');
  $('#confirm-modal-ok').focus();
}

function closeConfirmModal() {
  $('#confirm-modal').classList.add('hidden');
  state.pendingConfirmAction = null;
}

function confirmExternalOpen(url, label) {
  openConfirmModal(
    'Open External Website?',
    `JARVIS is requesting confirmation before opening ${label}:\n${url}`,
    () => {
      const win = window.open(url, '_blank', 'noopener,noreferrer');
      if (!win) {
        showToast('Pop-up blocked by browser. Please allow pop-ups to open external links.', 'err');
      }
    },
    'Open Link'
  );
}

/* ==========================================================================
   Safe Mathematical Expression Parser (No eval / Function)
   ========================================================================== */
function evaluateMathExpression(rawInput) {
  const cleaned = String(rawInput)
    .toLowerCase()
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/\bpi\b/g, String(Math.PI))
    .replace(/\be\b/g, String(Math.E))
    .replace(/\s+/g, '');

  if (!cleaned) throw new Error('Empty expression');
  if (!/^[0-9+\-*/^().%a-z]+$/.test(cleaned)) {
    throw new Error('Invalid characters in expression');
  }

  // Tokenize
  const tokens = [];
  let i = 0;
  while (i < cleaned.length) {
    const ch = cleaned[i];
    if (/[0-9.]/.test(ch)) {
      let numStr = '';
      while (i < cleaned.length && /[0-9.]/.test(cleaned[i])) {
        numStr += cleaned[i++];
      }
      const val = Number(numStr);
      if (!Number.isFinite(val)) throw new Error('Invalid number');
      tokens.push({ type: 'num', val });
      continue;
    }
    if (/[a-z]/.test(ch)) {
      let fn = '';
      while (i < cleaned.length && /[a-z]/.test(cleaned[i])) {
        fn += cleaned[i++];
      }
      if (!['sin', 'cos', 'tan', 'sqrt', 'abs', 'log', 'ln'].includes(fn)) {
        throw new Error(`Unsupported function: ${fn}`);
      }
      tokens.push({ type: 'fn', val: fn });
      continue;
    }
    if ('+-*/^()%'.includes(ch)) {
      tokens.push({ type: 'op', val: ch });
      i++;
      continue;
    }
    throw new Error(`Unexpected token: ${ch}`);
  }

  let pos = 0;
  const peek = () => tokens[pos];
  const consume = () => tokens[pos++];

  function parseExpression() {
    let left = parseTerm();
    while (peek() && peek().type === 'op' && (peek().val === '+' || peek().val === '-')) {
      const op = consume().val;
      const right = parseTerm();
      left = op === '+' ? left + right : left - right;
    }
    return left;
  }

  function parseTerm() {
    let left = parsePower();
    while (peek() && peek().type === 'op' && (peek().val === '*' || peek().val === '/' || peek().val === '%')) {
      const op = consume().val;
      const right = parsePower();
      if (op === '*') left *= right;
      else if (op === '/') {
        if (right === 0) throw new Error('Division by zero');
        left /= right;
      } else {
        left %= right;
      }
    }
    return left;
  }

  function parsePower() {
    let base = parseUnary();
    if (peek() && peek().type === 'op' && peek().val === '^') {
      consume();
      const exp = parsePower();
      base = Math.pow(base, exp);
    }
    return base;
  }

  function parseUnary() {
    if (peek() && peek().type === 'op' && (peek().val === '+' || peek().val === '-')) {
      const op = consume().val;
      const val = parseUnary();
      return op === '-' ? -val : val;
    }
    return parsePrimary();
  }

  function parsePrimary() {
    const tok = peek();
    if (!tok) throw new Error('Unexpected end of expression');
    if (tok.type === 'num') {
      consume();
      return tok.val;
    }
    if (tok.type === 'fn') {
      const fn = consume().val;
      if (!peek() || peek().val !== '(') throw new Error(`Expected '(' after ${fn}`);
      consume();
      const arg = parseExpression();
      if (!peek() || peek().val !== ')') throw new Error('Missing closing parenthesis');
      consume();
      if (fn === 'sin') return Math.sin(arg);
      if (fn === 'cos') return Math.cos(arg);
      if (fn === 'tan') return Math.tan(arg);
      if (fn === 'sqrt') {
        if (arg < 0) throw new Error('Square root of negative number');
        return Math.sqrt(arg);
      }
      if (fn === 'abs') return Math.abs(arg);
      if (fn === 'log') return Math.log10(arg);
      if (fn === 'ln') return Math.log(arg);
    }
    if (tok.type === 'op' && tok.val === '(') {
      consume();
      const val = parseExpression();
      if (!peek() || peek().val !== ')') throw new Error('Missing closing parenthesis');
      consume();
      return val;
    }
    throw new Error('Malformed expression');
  }

  const result = parseExpression();
  if (pos !== tokens.length || !Number.isFinite(result)) {
    throw new Error('Invalid expression syntax');
  }
  return Math.round(result * 1e10) / 1e10;
}

/* ==========================================================================
   Safe Markdown + Code Block Renderer
   ========================================================================== */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderMarkdown(markdownText) {
  const source = String(markdownText || '');
  const codeBlocks = [];

  // Extract fenced code blocks safely
  const withoutCode = source.replace(/```([a-zA-Z0-9_+-]*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push({
      lang: lang ? escapeHTML(lang) : 'code',
      code: escapeHTML(code.replace(/\n$/, ''))
    });
    return `@@JARVIS_CODE_BLOCK_${idx}@@`;
  });

  let html = escapeHTML(withoutCode);

  // Headings
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  // Blockquotes
  html = html.replace(/^&gt;\s+(.+)$/gm, '<blockquote>$1</blockquote>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Bold & Italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Links (strict http/https only)
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Lists
  html = html.replace(/^\s*[-*]\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)(?![\s\S]*<li>)/g, '<ul>$1</ul>');

  // Paragraphs & line breaks
  const blocks = html.split(/\n{2,}/).map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (/^<(h[1-4]|ul|ol|blockquote)/.test(trimmed) || /^@@JARVIS_CODE_BLOCK_\d+@@$/.test(trimmed)) {
      return trimmed;
    }
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  });

  html = blocks.join('\n');

  // Restore code blocks with Copy button
  html = html.replace(/@@JARVIS_CODE_BLOCK_(\d+)@@/g, (_, idxStr) => {
    const item = codeBlocks[Number(idxStr)];
    if (!item) return '';
    return `
      <div class="code-block-wrap">
        <div class="code-block-header">
          <span>${item.lang}</span>
          <button type="button" class="code-copy-btn">Copy</button>
        </div>
        <pre><code>${item.code}</code></pre>
      </div>
    `;
  });

  return html;
}

/* ==========================================================================
   Google Gemini REST API Client (Browser-Direct via User API Key)
   ========================================================================== */
function getActiveModelId() {
  if (state.settings.model === 'custom' && state.settings.customModel.trim()) {
    return state.settings.customModel.trim();
  }
  return state.settings.model || 'gemini-4-hydrogen';
}

function buildJarvisSystemInstruction() {
  const langPref =
    state.settings.language === 'bn'
      ? 'The user prefers Bengali (বাংলা), though respond naturally in whichever language (English or Bengali) they address you in.'
      : 'Respond naturally in English or Bengali (বাংলা) matching the user\'s message language.';
  return [
    'You are JARVIS, a composed, intelligent, respectful personal AI assistant inspired by Tony Stark\'s JARVIS.',
    'Address the user respectfully (e.g., politely as "Sir/Ma\'am" sparingly when appropriate, without overdoing roleplay).',
    'You excel at technical engineering, programming, explaining complex topics simply, productivity, and bilingual English/Bengali communication.',
    langPref,
    `Keep answers well-structured and sized appropriately (target max tokens budget: ${state.settings.maxTokens}).`,
    'Never pretend you have control over the user\'s local operating system, hardware settings, or desktop applications; if asked to control device hardware, clearly state browser limitations.'
  ].join(' ');
}

function buildGenerationConfig(modelId) {
  const cfg = {
    maxOutputTokens: Number(state.settings.maxTokens) || 2048
  };
  // Gemini 4 series omits legacy sampling parameters (temperature, topP, topK)
  const isGemini4 = modelId.startsWith('gemini-4-');
  if (!isGemini4) {
    cfg.temperature = Number(state.settings.temperature ?? 0.7);
  }
  return cfg;
}

function classifyGeminiError(status, errBody) {
  const apiMsg = errBody?.error?.message || '';
  const apiStatus = errBody?.error?.status || '';

  if (status === 400 && /api[_ ]?key/i.test(apiMsg)) {
    return 'Invalid Gemini API key. Please check your key in Settings.';
  }
  if (status === 403 || apiStatus === 'PERMISSION_DENIED') {
    return `Permission denied (403): ${apiMsg || 'Verify your API key and API restrictions in Google AI Studio.'}`;
  }
  if (status === 429 || apiStatus === 'RESOURCE_EXHAUSTED') {
    return 'Quota or rate limit exceeded (429). Try switching to gemini-3.1-flash-lite or wait a moment before retrying.';
  }
  if (status === 404 || apiStatus === 'NOT_FOUND') {
    return `Model "${getActiveModelId()}" was not found or is unsupported for your key (404). Select another model in Settings.`;
  }
  if (status >= 500) {
    return `Gemini service temporarily unavailable (${status}). Please try again shortly.`;
  }
  return apiMsg || `Gemini API request failed (HTTP ${status}).`;
}

async function callGeminiStream({ contents, systemInstruction, onChunk, signal }) {
  if (!state.apiKey) {
    throw new Error('MISSING_API_KEY');
  }
  if (!navigator.onLine) {
    throw new Error('You appear to be offline. Connect to the internet to query Gemini AI.');
  }

  const modelId = getActiveModelId();
  const payload = {
    contents,
    systemInstruction: {
      parts: [{ text: systemInstruction || buildJarvisSystemInstruction() }]
    },
    generationConfig: buildGenerationConfig(modelId)
  };

  const streamUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    modelId
  )}:streamGenerateContent?alt=sse`;

  let response;
  try {
    response = await fetch(streamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': state.apiKey
      },
      body: JSON.stringify(payload),
      signal
    });
  } catch (networkErr) {
    if (networkErr.name === 'AbortError') throw networkErr;
    throw new Error('Network error reaching Gemini API. Check your internet connection or CORS/firewall settings.');
  }

  if (!response.ok) {
    let errJson = null;
    try {
      errJson = await response.json();
    } catch {
      // ignore
    }
    if (response.status === 400 || response.status === 403) {
      state.connectionStatus = 'error';
      updateConnectionUI();
    }
    throw new Error(classifyGeminiError(response.status, errJson));
  }

  state.connectionStatus = 'connected';
  updateConnectionUI();

  if (!response.body) {
    // Fallback to non-streaming if readable stream unavailable
    return callGeminiOnce({ contents, systemInstruction, signal });
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const jsonStr = trimmed.slice(5).trim();
      if (!jsonStr || jsonStr === '[DONE]') continue;

      try {
        const parsed = JSON.parse(jsonStr);
        const parts = parsed?.candidates?.[0]?.content?.parts || [];
        for (const p of parts) {
          if (typeof p.text === 'string' && p.text.length > 0) {
            fullText += p.text;
            if (onChunk) onChunk(fullText, p.text);
          }
        }
      } catch {
        // Ignore partial chunk JSON boundaries
      }
    }
  }

  if (!fullText.trim()) {
    throw new Error('Gemini returned an empty response. Try rephrasing your prompt.');
  }

  return fullText;
}

async function callGeminiOnce({ contents, systemInstruction, signal }) {
  const modelId = getActiveModelId();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelId)}:generateContent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': state.apiKey
    },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: systemInstruction || buildJarvisSystemInstruction() }]
      },
      generationConfig: buildGenerationConfig(modelId)
    }),
    signal
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => null);
    throw new Error(classifyGeminiError(res.status, errJson));
  }

  const data = await res.json();
  const text = (data?.candidates?.[0]?.content?.parts || [])
    .map((p) => p.text || '')
    .join('')
    .trim();

  if (!text) throw new Error('Gemini returned an empty response.');
  state.connectionStatus = 'connected';
  updateConnectionUI();
  return text;
}

async function testGeminiConnection() {
  const keyInput = $('#settings-api-key').value.trim();
  const keyToTest = keyInput || state.apiKey;
  const resultEl = $('#api-test-result');

  if (!keyToTest) {
    resultEl.className = 'api-test-result err';
    resultEl.textContent = 'Please paste a Gemini API key first.';
    resultEl.classList.remove('hidden');
    return;
  }

  resultEl.className = 'api-test-result';
  resultEl.textContent = `Testing connection with ${getActiveModelId()}...`;
  resultEl.classList.remove('hidden');

  try {
    const modelId = getActiveModelId();
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelId)}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': keyToTest
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'Reply with OK.' }] }],
          generationConfig: { maxOutputTokens: 32 }
        })
      }
    );

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      throw new Error(classifyGeminiError(res.status, errJson));
    }

    state.connectionStatus = 'connected';
    updateConnectionUI();
    resultEl.className = 'api-test-result ok';
    resultEl.textContent = `Connection verified with model "${modelId}". JARVIS AI is ready.`;
    showToast('Gemini API connection verified.', 'ok');
  } catch (err) {
    state.connectionStatus = 'error';
    updateConnectionUI();
    resultEl.className = 'api-test-result err';
    resultEl.textContent = err.message;
    showToast(err.message, 'err');
  }
}

/* ==========================================================================
   Smart Assistant Command Processor (Safe Browser Actions)
   ========================================================================== */
function tryProcessLocalCommand(rawText) {
  const text = rawText.trim();
  const lower = text.toLowerCase();
  const isBangla = /[\u0980-\u09FF]/.test(text) || state.settings.language === 'bn';

  // 1. Greeting
  if (/^(hello|hi|hey)\s*jarvis[!.]*$/i.test(lower) || /^হ্যালো\s*জার্ভিস[!।]*$/.test(text)) {
    return {
      handled: true,
      reply: isBangla
        ? 'হ্যালো! আমি জার্ভিস। আপনার কাজের জন্য প্রস্তুত আছি। আজ আপনাকে কীভাবে সাহায্য করতে পারি?'
        : 'Hello! JARVIS online and at your service. How may I assist you today?'
    };
  }

  // 2. Time
  if (/^(what time is it|current time|tell me the time)\??$/i.test(lower) || /(কয়টা বাজে|সময় কত)/.test(text)) {
    const now = new Date();
    const formatted = now.toLocaleTimeString(isBangla ? 'bn-BD' : undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    return {
      handled: true,
      reply: isBangla ? `এখন স্থানীয় সময় ${formatted}।` : `The current local time is ${formatted}.`
    };
  }

  // 3. Date
  if (/^(what is today'?s date|what'?s the date|today'?s date)\??$/i.test(lower) || /(আজকের তারিখ|আজ কী বার)/.test(text)) {
    const now = new Date();
    const formatted = now.toLocaleDateString(isBangla ? 'bn-BD' : undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return {
      handled: true,
      reply: isBangla ? `আজ ${formatted}।` : `Today's date is ${formatted}.`
    };
  }

  // 4. Open External Sites (Always requires confirmation!)
  const openMatch = lower.match(/^open\s+(google|youtube|gmail|github|wikipedia)\.?$/i);
  if (openMatch) {
    const siteMap = {
      google: 'https://www.google.com',
      youtube: 'https://www.youtube.com',
      gmail: 'https://mail.google.com',
      github: 'https://github.com',
      wikipedia: 'https://www.wikipedia.org'
    };
    const siteName = openMatch[1].toLowerCase();
    const targetUrl = siteMap[siteName];
    confirmExternalOpen(targetUrl, siteName.charAt(0).toUpperCase() + siteName.slice(1));
    return {
      handled: true,
      reply: `Confirmation requested to open ${siteName} in a new browser tab.`
    };
  }

  // 5. Search Google
  const searchMatch = text.match(/^(?:search google(?: for)?|google)\s+(.+)$/i);
  if (searchMatch) {
    const query = searchMatch[1].trim();
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    confirmExternalOpen(url, `Google Search for "${query}"`);
    return {
      handled: true,
      reply: `Confirmation requested to search Google for "${query}".`
    };
  }

  // 6. Safe Calculation
  const calcMatch = text.match(/^(?:calculate|compute|calc)\s+(.+)$/i);
  if (calcMatch) {
    try {
      const expr = calcMatch[1].trim();
      const val = evaluateMathExpression(expr);
      recordCalculation(expr, String(val));
      return {
        handled: true,
        reply: `**Calculation Result:** \`${expr}\` = **${val}**`
      };
    } catch {
      // Fall through to Gemini if natural language math
    }
  }

  // 7. Change Theme
  if (/^(change theme|toggle theme|switch theme|dark mode|light mode)\.?$/i.test(lower)) {
    const nextTheme = lower.includes('light') ? 'light' : lower.includes('dark') ? 'dark' : state.settings.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    return {
      handled: true,
      reply: `Interface theme switched to **${nextTheme === 'dark' ? 'JARVIS Blue Holographic (Dark)' : 'Aerospace Lab (Light)'}**.`
    };
  }

  // 8. Clear Conversation
  if (/^(clear conversation|clear chat)\.?$/i.test(lower)) {
    openConfirmModal(
      'Clear Current Conversation?',
      'This will remove all messages in the active chat session.',
      () => clearActiveConversation(),
      'Clear Chat'
    );
    return {
      handled: true,
      reply: 'Confirmation dialog opened to clear the current conversation.'
    };
  }

  // 9. Turn on Voice Mode
  if (/^(turn on voice mode|start voice mode|open voice assistant|voice mode)\.?$/i.test(lower)) {
    navigateTo('voice');
    if (!state.isListening) {
      setTimeout(() => toggleVoiceListening(), 150);
    }
    return {
      handled: true,
      reply: 'Switched to Voice Assistant console and activating microphone.'
    };
  }

  // 10. Honest Hardware / OS Sandbox Check
  if (/(turn (on|off) (wi-?fi|bluetooth)|set brightness|shut ?down (computer|pc|laptop)|open (photoshop|vscode|word|terminal))/i.test(lower)) {
    return {
      handled: true,
      reply:
        'Because JARVIS AI runs inside a standard web browser sandbox, it cannot access or modify operating system hardware (Wi-Fi, Bluetooth, screen brightness) or launch desktop applications directly. I can, however, assist with web tools, calculations, notes, tasks, and Gemini AI queries.'
    };
  }

  // 11. Joke fallback when API key isn't configured or offline
  if (/^(tell me a joke|joke)\.?$/i.test(lower) && (!state.apiKey || !navigator.onLine)) {
    const jokes = [
      'Why do programmers prefer dark mode? Because light attracts bugs.',
      'There are 10 types of people in the world: those who understand binary, and those who do not.',
      'A SQL query walks into a bar, walks up to two tables, and asks: "May I join you?"'
    ];
    return {
      handled: true,
      reply: jokes[Math.floor(Math.random() * jokes.length)]
    };
  }

  return { handled: false };
}

/* ==========================================================================
   Conversations & AI Chat
   ========================================================================== */
function getActiveConversation() {
  let conv = state.conversations.find((c) => c.id === state.activeConvId);
  if (!conv) {
    conv = createConversationObject();
    state.conversations.unshift(conv);
    state.activeConvId = conv.id;
    persistConversations();
  }
  return conv;
}

function createConversationObject(title = 'New Conversation') {
  return {
    id: uid('conv'),
    title,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: [
      {
        id: uid('msg'),
        role: 'assistant',
        text: 'JARVIS online. Ask a technical question, request Bengali or English assistance, or type a smart command.',
        timestamp: Date.now()
      }
    ]
  };
}

function persistConversations() {
  saveJSON(STORAGE_KEYS.CONVERSATIONS, state.conversations);
  saveJSON(STORAGE_KEYS.ACTIVE_CONV_ID, state.activeConvId);
}

function createNewConversation() {
  const conv = createConversationObject();
  state.conversations.unshift(conv);
  state.activeConvId = conv.id;
  persistConversations();
  renderChatSessions();
  renderActiveChat();
  renderHistoryPage();
}

function deleteConversation(convId) {
  openConfirmModal(
    'Delete Conversation?',
    'This conversation will be permanently removed from local browser storage.',
    () => {
      state.conversations = state.conversations.filter((c) => c.id !== convId);
      if (state.activeConvId === convId) {
        state.activeConvId = state.conversations[0]?.id || null;
      }
      if (state.conversations.length === 0) {
        const fresh = createConversationObject();
        state.conversations.push(fresh);
        state.activeConvId = fresh.id;
      }
      persistConversations();
      renderChatSessions();
      renderActiveChat();
      renderHistoryPage();
      showToast('Conversation deleted.', 'ok');
    },
    'Delete'
  );
}

function clearActiveConversation() {
  const conv = getActiveConversation();
  conv.messages = [
    {
      id: uid('msg'),
      role: 'assistant',
      text: 'Conversation cleared. Ready for your next instruction.',
      timestamp: Date.now()
    }
  ];
  conv.title = 'New Conversation';
  conv.updatedAt = Date.now();
  persistConversations();
  renderChatSessions();
  renderActiveChat();
  renderHistoryPage();
  showToast('Conversation cleared.', 'ok');
}

function renderChatSessions() {
  const list = $('#chat-sessions-list');
  if (!list) return;
  list.innerHTML = '';

  for (const conv of state.conversations) {
    const btn = document.createElement('div');
    btn.className = `session-item ${conv.id === state.activeConvId ? 'active' : ''}`;
    btn.setAttribute('role', 'button');
    btn.tabIndex = 0;

    const textWrap = document.createElement('div');
    textWrap.className = 'session-item-text';

    const title = document.createElement('span');
    title.className = 'session-item-title';
    title.textContent = conv.title;

    const meta = document.createElement('span');
    meta.className = 'session-item-meta tabular-nums';
    meta.textContent = `${conv.messages.length} msgs · ${new Date(conv.updatedAt).toLocaleDateString()}`;

    textWrap.appendChild(title);
    textWrap.appendChild(meta);

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'session-delete-btn';
    delBtn.title = 'Delete conversation';
    delBtn.setAttribute('aria-label', `Delete ${conv.title}`);
    delBtn.textContent = '×';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteConversation(conv.id);
    });

    btn.appendChild(textWrap);
    btn.appendChild(delBtn);

    btn.addEventListener('click', () => {
      state.activeConvId = conv.id;
      persistConversations();
      renderChatSessions();
      renderActiveChat();
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });

    list.appendChild(btn);
  }
}

function createMessageElement(msg) {
  const wrap = document.createElement('div');
  wrap.className = `chat-msg ${msg.role}`;
  wrap.dataset.msgId = msg.id;

  const bubble = document.createElement('div');
  bubble.className = 'chat-msg-bubble markdown-body';
  if (msg.role === 'user') {
    bubble.textContent = msg.text;
  } else {
    bubble.innerHTML = renderMarkdown(msg.text);
  }

  const meta = document.createElement('div');
  meta.className = 'chat-msg-meta';

  const timeSpan = document.createElement('span');
  timeSpan.className = 'tabular-nums';
  timeSpan.textContent = `${msg.role === 'user' ? 'You' : 'JARVIS'} · ${new Date(msg.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })}`;
  meta.appendChild(timeSpan);

  if (msg.role === 'assistant') {
    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'msg-action-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', () => copyText(msg.text, copyBtn));

    const speakBtn = document.createElement('button');
    speakBtn.type = 'button';
    speakBtn.className = 'msg-action-btn';
    speakBtn.textContent = 'Speak';
    speakBtn.addEventListener('click', () => speakText(msg.text));

    meta.appendChild(copyBtn);
    meta.appendChild(speakBtn);
  }

  wrap.appendChild(bubble);
  wrap.appendChild(meta);
  return wrap;
}

function renderActiveChat() {
  const conv = getActiveConversation();
  $('#chat-active-title').textContent = conv.title;
  $('#chat-active-meta').textContent = `${conv.messages.length} messages`;

  const chatContainer = $('#chat-messages');
  const dashContainer = $('#dash-chat-messages');

  chatContainer.innerHTML = '';
  dashContainer.innerHTML = '';

  for (const msg of conv.messages) {
    chatContainer.appendChild(createMessageElement(msg));
  }

  // Show last 6 messages on dashboard mini-chat
  for (const msg of conv.messages.slice(-6)) {
    dashContainer.appendChild(createMessageElement(msg));
  }

  chatContainer.scrollTop = chatContainer.scrollHeight;
  dashContainer.scrollTop = dashContainer.scrollHeight;
}

async function sendChatMessage(rawText, options = { speakReply: false }) {
  const text = rawText.trim();
  if (!text || state.isGenerating) return;

  const conv = getActiveConversation();

  // Set title from first user message
  const hasUserMsg = conv.messages.some((m) => m.role === 'user');
  if (!hasUserMsg) {
    conv.title = text.slice(0, 42) + (text.length > 42 ? '…' : '');
  }

  const userMsg = {
    id: uid('msg'),
    role: 'user',
    text,
    timestamp: Date.now()
  };
  conv.messages.push(userMsg);
  conv.updatedAt = Date.now();
  persistConversations();
  renderChatSessions();
  renderActiveChat();

  // 1. Check Smart Local Commands first
  const localCmd = tryProcessLocalCommand(text);
  if (localCmd.handled) {
    const botMsg = {
      id: uid('msg'),
      role: 'assistant',
      text: localCmd.reply,
      timestamp: Date.now()
    };
    conv.messages.push(botMsg);
    conv.updatedAt = Date.now();
    persistConversations();
    renderActiveChat();
    if (options.speakReply || state.settings.autoSpeakChat) {
      speakText(localCmd.reply);
    }
    return localCmd.reply;
  }

  // 2. Check API Key
  if (!state.apiKey) {
    const setupText =
      'Gemini API key is not configured yet. Please open **Settings**, paste your Gemini API key, save it, and test the connection.';
    conv.messages.push({
      id: uid('msg'),
      role: 'assistant',
      text: setupText,
      timestamp: Date.now()
    });
    persistConversations();
    renderActiveChat();
    showToast('Please configure your Gemini API key in Settings.', 'err');
    return setupText;
  }

  // 3. Stream response from Gemini
  const assistantMsg = {
    id: uid('msg'),
    role: 'assistant',
    text: '',
    timestamp: Date.now()
  };
  conv.messages.push(assistantMsg);

  setCoreState('thinking');
  state.isGenerating = true;
  state.abortController = new AbortController();
  $('#chat-loading-bar').classList.remove('hidden');
  $('#chat-send-btn').disabled = true;

  renderActiveChat();

  // Build Gemini multi-turn contents (exclude empty placeholder & initial welcome if needed)
  const historyContents = conv.messages
    .slice(0, -1)
    .slice(-16)
    .map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

  try {
    const finalReply = await callGeminiStream({
      contents: historyContents,
      signal: state.abortController.signal,
      onChunk: (accumulated) => {
        assistantMsg.text = accumulated;
        updateStreamingMessageDOM(assistantMsg.id, accumulated);
      }
    });

    assistantMsg.text = finalReply;
    conv.updatedAt = Date.now();
    persistConversations();
    renderActiveChat();
    renderHistoryPage();

    if (options.speakReply || state.settings.autoSpeakChat) {
      speakText(finalReply);
    }
    return finalReply;
  } catch (err) {
    if (err.name === 'AbortError') {
      if (!assistantMsg.text) {
        assistantMsg.text = '_Generation stopped by user._';
      }
      persistConversations();
      renderActiveChat();
    } else {
      assistantMsg.text = `**Error:** ${err.message}`;
      persistConversations();
      renderActiveChat();
      showToast(err.message, 'err');
    }
  } finally {
    state.isGenerating = false;
    state.abortController = null;
    $('#chat-loading-bar').classList.add('hidden');
    $('#chat-send-btn').disabled = false;
    if (!state.isSpeaking && !state.isListening) {
      setCoreState('idle');
    }
  }
}

function updateStreamingMessageDOM(msgId, text) {
  const nodes = $$(`[data-msg-id="${msgId}"] .chat-msg-bubble`);
  const rendered = renderMarkdown(text);
  for (const node of nodes) {
    node.innerHTML = rendered;
  }
  const chatMessages = $('#chat-messages');
  const dashMessages = $('#dash-chat-messages');
  chatMessages.scrollTop = chatMessages.scrollHeight;
  dashMessages.scrollTop = dashMessages.scrollHeight;
}

function stopGeneration() {
  if (state.abortController) {
    state.abortController.abort();
  }
}

async function regenerateLastResponse() {
  if (state.isGenerating) return;
  const conv = getActiveConversation();
  const lastUserIdx = [...conv.messages].reverse().findIndex((m) => m.role === 'user');
  if (lastUserIdx === -1) {
    showToast('No user message found to regenerate.', 'info');
    return;
  }
  const actualIdx = conv.messages.length - 1 - lastUserIdx;
  const lastUserText = conv.messages[actualIdx].text;
  conv.messages = conv.messages.slice(0, actualIdx);
  persistConversations();
  await sendChatMessage(lastUserText);
}

function exportConversationMarkdown(conv) {
  const lines = [`# ${conv.title}`, `Exported: ${new Date().toLocaleString()}`, ''];
  for (const m of conv.messages) {
    lines.push(`### ${m.role === 'user' ? 'User' : 'JARVIS'} (${new Date(m.timestamp).toLocaleString()})`);
    lines.push(m.text);
    lines.push('');
  }
  downloadFile(`${conv.title.replace(/[^a-z0-9]+/gi, '_') || 'jarvis_chat'}.md`, lines.join('\n'), 'text/markdown');
}

/* ==========================================================================
   Voice Assistant (Web Speech API STT & TTS + Visualizer)
   ========================================================================== */
function setCoreState(newState) {
  const labels = {
    idle: 'STANDBY',
    listening: 'LISTENING',
    thinking: 'PROCESSING',
    speaking: 'SPEAKING'
  };
  const cores = ['#dash-core-btn', '#voice-core-btn'];
  for (const sel of cores) {
    const el = $(sel);
    if (el) el.dataset.state = newState;
  }
  const wave = $('#dash-sound-wave');
  if (wave) wave.dataset.active = String(newState !== 'idle');

  const stateText = $('#dash-state-text');
  if (stateText) stateText.textContent = labels[newState] || 'STANDBY';

  const subtitle = $('#dash-core-subtitle');
  if (subtitle) {
    if (newState === 'listening') subtitle.textContent = 'Listening to your microphone...';
    else if (newState === 'thinking') subtitle.textContent = 'Querying Gemini AI...';
    else if (newState === 'speaking') subtitle.textContent = 'Delivering voice response...';
    else subtitle.textContent = 'Ready for voice or text command';
  }
}

function updateMicStatusUI(statusText, isActive = false) {
  const headerMic = $('#header-mic-status');
  const dashMic = $('#dash-mic-status');
  for (const el of [headerMic, dashMic]) {
    if (!el) continue;
    el.textContent = statusText;
    el.classList.toggle('status-text-ok', isActive);
  }
  const chatMic = $('#chat-mic-btn');
  if (chatMic) chatMic.classList.toggle('listening', isActive);
  const listenBtn = $('#voice-toggle-listen-btn');
  if (listenBtn) {
    listenBtn.querySelector('span').textContent = isActive
      ? I18N[state.settings.language].stopListening
      : I18N[state.settings.language].startListening;
  }
}

function populateVoices() {
  if (!('speechSynthesis' in window)) return;
  const allVoices = window.speechSynthesis.getVoices();
  state.voices = allVoices;

  const selects = ['#voice-select', '#settings-voice'];
  for (const sel of selects) {
    const el = $(sel);
    if (!el) continue;
    const prev = state.settings.voiceURI;
    el.innerHTML = '';

    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = allVoices.length ? 'Auto-Select (Match Language)' : 'Default Browser Voice';
    el.appendChild(defaultOpt);

    // Prioritize English and Bengali voices first
    const sorted = [...allVoices].sort((a, b) => {
      const aPri = /^(en|bn)/i.test(a.lang) ? 0 : 1;
      const bPri = /^(en|bn)/i.test(b.lang) ? 0 : 1;
      return aPri - bPri || a.name.localeCompare(b.name);
    });

    for (const v of sorted) {
      const opt = document.createElement('option');
      opt.value = v.voiceURI;
      opt.textContent = `${v.name} (${v.lang})`;
      if (v.voiceURI === prev) opt.selected = true;
      el.appendChild(opt);
    }
  }
}

function stripMarkdownForSpeech(text) {
  return String(text)
    .replace(/```[\s\S]*?```/g, ' Code block omitted. ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_#>~-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function speakText(rawText, onEndCallback = null) {
  if (state.settings.voiceMuted) {
    if (onEndCallback) onEndCallback();
    return;
  }
  if (!('speechSynthesis' in window)) {
    showToast('Text-to-Speech is not supported in this browser.', 'err');
    if (onEndCallback) onEndCallback();
    return;
  }

  window.speechSynthesis.cancel();
  const cleanText = stripMarkdownForSpeech(rawText);
  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = Number(state.settings.speechRate) || 1.0;

  const hasBengali = /[\u0980-\u09FF]/.test(cleanText);
  if (state.settings.voiceURI && !hasBengali) {
    const chosen = state.voices.find((v) => v.voiceURI === state.settings.voiceURI);
    if (chosen) utterance.voice = chosen;
  } else if (hasBengali) {
    const bnVoice = state.voices.find((v) => /^bn/i.test(v.lang));
    if (bnVoice) utterance.voice = bnVoice;
    utterance.lang = 'bn-BD';
  } else {
    const enVoice = state.voices.find((v) => /^en/i.test(v.lang));
    if (enVoice) utterance.voice = enVoice;
    utterance.lang = 'en-US';
  }

  utterance.onstart = () => {
    state.isSpeaking = true;
    setCoreState('speaking');
  };

  utterance.onend = () => {
    state.isSpeaking = false;
    if (!state.isListening) setCoreState('idle');
    if (onEndCallback) onEndCallback();
  };

  utterance.onerror = () => {
    state.isSpeaking = false;
    if (!state.isListening) setCoreState('idle');
    if (onEndCallback) onEndCallback();
  };

  window.speechSynthesis.speak(utterance);
}

function interruptSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  state.isSpeaking = false;
  if (!state.isListening) setCoreState('idle');
}

function initSpeechCompatibilityUI() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const hasTTS = 'speechSynthesis' in window;
  const statusEl = $('#voice-compat-status');
  if (!statusEl) return;

  if (SpeechRec && hasTTS) {
    statusEl.textContent = 'Web Speech API ready (Speech-to-Text & Text-to-Speech supported).';
  } else if (hasTTS) {
    statusEl.textContent = 'Text-to-Speech ready. Speech-to-Text requires Chrome, Edge, or Safari.';
  } else {
    statusEl.textContent = 'Limited voice support in this browser.';
  }
}

function appendVoiceLog(role, text) {
  state.voiceLog.push({
    id: uid('vlog'),
    role,
    text,
    timestamp: Date.now()
  });
  if (state.voiceLog.length > 50) state.voiceLog.shift();
  saveJSON(STORAGE_KEYS.VOICE_LOG, state.voiceLog);
  renderVoiceLog();
}

function renderVoiceLog() {
  const container = $('#voice-transcript-log');
  if (!container) return;
  container.innerHTML = '';
  if (state.voiceLog.length === 0) {
    container.innerHTML = '<p class="empty-hint">Spoken commands and JARVIS voice responses will appear here.</p>';
    return;
  }
  for (const item of state.voiceLog) {
    container.appendChild(createMessageElement(item));
  }
  container.scrollTop = container.scrollHeight;
}

function startVoiceVisualizer() {
  const canvas = $('#voice-visualizer');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let phase = 0;

  function draw() {
    state.visualizerRaf = requestAnimationFrame(draw);
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const bars = 40;
    const barW = (w - 32) / bars;
    phase += 0.08;

    let freqData = null;
    if (state.analyser && state.isListening) {
      freqData = new Uint8Array(state.analyser.frequencyBinCount);
      state.analyser.getByteFrequencyData(freqData);
    }

    for (let i = 0; i < bars; i++) {
      let amplitude = 4;
      if (freqData) {
        const val = freqData[i % freqData.length] || 0;
        amplitude = Math.max(4, (val / 255) * (h - 16));
      } else if (state.isSpeaking || state.isListening) {
        amplitude = 10 + Math.abs(Math.sin(phase + i * 0.35)) * (h * 0.55);
      } else {
        amplitude = 4 + Math.abs(Math.sin(phase * 0.4 + i * 0.25)) * 4;
      }

      const x = 16 + i * barW;
      const y = (h - amplitude) / 2;
      ctx.fillStyle = state.isListening ? '#34d399' : '#00d8ff';
      ctx.fillRect(x, y, Math.max(3, barW - 4), amplitude);
    }
  }

  if (!state.visualizerRaf) draw();
}

async function attachMicAnalyser() {
  try {
    if (!navigator.mediaDevices?.getUserMedia) return;
    if (!state.micStream) {
      state.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const src = state.audioCtx.createMediaStreamSource(state.micStream);
      state.analyser = state.audioCtx.createAnalyser();
      state.analyser.fftSize = 128;
      src.connect(state.analyser);
    }
  } catch {
    // Visualizer smoothly falls back to synthetic wave if mic stream denied for analyser
  }
}

function toggleVoiceListening(targetInputSelector = null) {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    showToast('Speech Recognition is not supported in this browser. Try Chrome or Edge.', 'err');
    return;
  }

  if (state.isListening && state.recognition) {
    state.recognition.stop();
    return;
  }

  interruptSpeaking();

  const rec = new SpeechRec();
  rec.lang = state.settings.voiceLang || 'en-US';
  rec.interimResults = true;
  rec.continuous = false;

  let finalTranscript = '';

  rec.onstart = () => {
    state.isListening = true;
    state.recognition = rec;
    setCoreState('listening');
    updateMicStatusUI('Listening', true);
    const caption = $('#voice-live-caption');
    if (caption) caption.textContent = `Listening (${rec.lang})...`;
    attachMicAnalyser();
  };

  rec.onresult = (event) => {
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const piece = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += piece;
      } else {
        interim += piece;
      }
    }
    const display = (finalTranscript || interim).trim();
    const caption = $('#voice-live-caption');
    if (caption && display) caption.textContent = `"${display}"`;

    if (targetInputSelector && display) {
      const inputEl = $(targetInputSelector);
      if (inputEl) inputEl.value = display;
    }
  };

  rec.onerror = (event) => {
    state.isListening = false;
    setCoreState('idle');
    updateMicStatusUI('Standby', false);
    if (event.error !== 'aborted' && event.error !== 'no-speech') {
      showToast(`Microphone error: ${event.error}`, 'err');
    }
  };

  rec.onend = async () => {
    state.isListening = false;
    state.recognition = null;
    updateMicStatusUI('Standby', false);
    if (!state.isSpeaking && !state.isGenerating) setCoreState('idle');

    const spoken = finalTranscript.trim();
    if (!spoken) return;

    // If dictating into Chat Composer, don't auto-send unless user presses Send
    if (targetInputSelector) {
      $(targetInputSelector)?.focus();
      return;
    }

    appendVoiceLog('user', spoken);
    const reply = await sendChatMessage(spoken, { speakReply: false });
    if (reply) {
      appendVoiceLog('assistant', reply);
      if (state.settings.voiceAutoResponse) {
        speakText(reply, () => {
          if (state.settings.voiceContinuous && state.currentPage === 'voice') {
            setTimeout(() => toggleVoiceListening(), 350);
          }
        });
      }
    }
  };

  try {
    rec.start();
  } catch (err) {
    showToast(`Could not start microphone: ${err.message}`, 'err');
  }
}

/* ==========================================================================
   AI Tools Workbench
   ========================================================================== */
function selectTool(toolKey) {
  const def = TOOL_DEFINITIONS[toolKey];
  if (!def) return;
  state.activeTool = toolKey;

  $$('.tool-tab').forEach((btn) => btn.classList.toggle('active', btn.dataset.tool === toolKey));
  $('#tool-active-title').textContent = def.title;
  $('#tool-active-desc').textContent = def.desc;
  $('#tool-opt1-label').textContent = def.opt1Label;
  $('#tool-opt2-label').textContent = def.opt2Label;
  $('#tool-input').placeholder = def.placeholder;

  const sel1 = $('#tool-opt1-select');
  sel1.innerHTML = '';
  for (const opt of def.opt1Options) {
    const o = document.createElement('option');
    o.value = opt;
    o.textContent = opt;
    sel1.appendChild(o);
  }

  const sel2 = $('#tool-opt2-select');
  sel2.innerHTML = '';
  for (const opt of def.opt2Options) {
    const o = document.createElement('option');
    o.value = opt;
    o.textContent = opt;
    sel2.appendChild(o);
  }
}

async function runActiveTool(e) {
  e.preventDefault();
  const input = $('#tool-input').value.trim();
  if (!input) return;

  if (!state.apiKey) {
    showToast('Please configure your Gemini API key in Settings first.', 'err');
    $('#tool-output').innerHTML =
      '<p class="status-text-err">Gemini API key is missing. Go to Settings to add and test your key.</p>';
    return;
  }

  const def = TOOL_DEFINITIONS[state.activeTool];
  const opt1 = $('#tool-opt1-select').value;
  const opt2 = $('#tool-opt2-select').value;
  const prompt = def.buildPrompt(input, opt1, opt2);

  state.abortController = new AbortController();
  $('#tool-run-btn').disabled = true;
  $('#tool-stop-btn').classList.remove('hidden');
  $('#tool-output').innerHTML = '<p class="empty-hint">Generating with Gemini AI...</p>';

  try {
    const result = await callGeminiStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      signal: state.abortController.signal,
      onChunk: (acc) => {
        state.toolOutputText = acc;
        $('#tool-output').innerHTML = renderMarkdown(acc);
      }
    });
    state.toolOutputText = result;
    $('#tool-output').innerHTML = renderMarkdown(result);
  } catch (err) {
    if (err.name !== 'AbortError') {
      $('#tool-output').innerHTML = `<p class="status-text-err">${escapeHTML(err.message)}</p>`;
      showToast(err.message, 'err');
    }
  } finally {
    $('#tool-run-btn').disabled = false;
    $('#tool-stop-btn').classList.add('hidden');
    state.abortController = null;
  }
}

/* ==========================================================================
   Notes & Tasks Managers
   ========================================================================== */
function renderNotes(filterText = '') {
  const list = $('#notes-list');
  const query = filterText.trim().toLowerCase();
  const filtered = state.notes.filter(
    (n) =>
      !query ||
      n.title.toLowerCase().includes(query) ||
      n.body.toLowerCase().includes(query) ||
      (n.tag || '').toLowerCase().includes(query)
  );

  $('#notes-count-label').textContent = `${state.notes.length} notes`;
  const dashNotes = $('#dash-notes-count');
  if (dashNotes) dashNotes.textContent = `${state.notes.length} saved notes`;

  list.innerHTML = '';
  if (filtered.length === 0) {
    list.innerHTML = '<p class="empty-hint">No notes match your view. Create a note using the form.</p>';
    return;
  }

  for (const note of filtered) {
    const card = document.createElement('article');
    card.className = 'note-card';
    card.innerHTML = `
      <div class="note-card-header">
        <div>
          <h3 class="note-card-title">${escapeHTML(note.title)}</h3>
          <div class="note-card-meta">${escapeHTML(note.tag || 'General')} · ${new Date(note.updatedAt).toLocaleDateString()}</div>
        </div>
      </div>
      <div class="note-card-body">${escapeHTML(note.body)}</div>
      <div class="note-card-actions">
        <button type="button" class="btn btn-ghost btn-sm" data-note-action="edit">Edit</button>
        <button type="button" class="btn btn-ghost btn-sm" data-note-action="copy">Copy</button>
        <button type="button" class="btn btn-ghost btn-sm" data-note-action="speak">Speak</button>
        <button type="button" class="btn btn-ghost btn-sm" data-note-action="ask">Ask AI</button>
        <button type="button" class="btn btn-danger-ghost btn-sm" data-note-action="delete">Delete</button>
      </div>
    `;

    card.querySelector('[data-note-action="edit"]').addEventListener('click', () => {
      $('#note-edit-id').value = note.id;
      $('#note-title-input').value = note.title;
      $('#note-tag-input').value = note.tag || '';
      $('#note-body-input').value = note.body;
      $('#note-editor-heading').textContent = 'Edit Note';
      $('#note-reset-btn').classList.remove('hidden');
    });

    card.querySelector('[data-note-action="copy"]').addEventListener('click', (e) => {
      copyText(`${note.title}\n\n${note.body}`, e.currentTarget);
    });

    card.querySelector('[data-note-action="speak"]').addEventListener('click', () => {
      speakText(`${note.title}. ${note.body}`);
    });

    card.querySelector('[data-note-action="ask"]').addEventListener('click', () => {
      navigateTo('chat');
      $('#chat-input').value = `Regarding my note "${note.title}":\n${note.body}\n\nPlease help me with: `;
      $('#chat-input').focus();
    });

    card.querySelector('[data-note-action="delete"]').addEventListener('click', () => {
      openConfirmModal(
        'Delete Note?',
        `Delete note "${note.title}"?`,
        () => {
          state.notes = state.notes.filter((n) => n.id !== note.id);
          saveJSON(STORAGE_KEYS.NOTES, state.notes);
          renderNotes($('#notes-search').value);
          showToast('Note deleted.', 'ok');
        },
        'Delete'
      );
    });

    list.appendChild(card);
  }
}

function renderTasks() {
  const list = $('#tasks-list');
  const activeCount = state.tasks.filter((t) => !t.completed).length;
  const completedCount = state.tasks.length - activeCount;

  $('#tasks-summary-label').textContent = `${activeCount} active · ${completedCount} completed`;
  const dashTasks = $('#dash-open-tasks');
  if (dashTasks) dashTasks.textContent = String(activeCount);

  const filtered = state.tasks.filter((t) => {
    if (state.taskFilter === 'active') return !t.completed;
    if (state.taskFilter === 'completed') return t.completed;
    if (state.taskFilter === 'high') return t.priority === 'high' && !t.completed;
    return true;
  });

  list.innerHTML = '';
  if (filtered.length === 0) {
    list.innerHTML = '<p class="empty-hint">No tasks in this filter.</p>';
    return;
  }

  for (const task of filtered) {
    const row = document.createElement('div');
    row.className = `task-item ${task.completed ? 'completed' : ''}`;

    const prioClass = task.priority === 'high' ? 'status-text-err' : task.priority === 'medium' ? 'status-text-warn' : 'status-text-ok';

    row.innerHTML = `
      <div class="task-item-left">
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task complete" />
        <div>
          <div class="task-title">${escapeHTML(task.title)}</div>
          <div class="task-meta">
            <span class="${prioClass}">${task.priority.toUpperCase()} priority</span>
            ${task.dueDate ? ` · Due ${escapeHTML(task.dueDate)}` : ''}
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-danger-ghost btn-sm">Delete</button>
    `;

    row.querySelector('.task-checkbox').addEventListener('change', (e) => {
      task.completed = e.target.checked;
      saveJSON(STORAGE_KEYS.TASKS, state.tasks);
      renderTasks();
    });

    row.querySelector('button').addEventListener('click', () => {
      state.tasks = state.tasks.filter((t) => t.id !== task.id);
      saveJSON(STORAGE_KEYS.TASKS, state.tasks);
      renderTasks();
    });

    list.appendChild(row);
  }
}

/* ==========================================================================
   History Page
   ========================================================================== */
function renderHistoryPage(query = '') {
  const container = $('#history-list');
  if (!container) return;
  const q = query.trim().toLowerCase();

  const matches = state.conversations.filter(
    (c) =>
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.messages.some((m) => m.text.toLowerCase().includes(q))
  );

  container.innerHTML = '';
  if (matches.length === 0) {
    container.innerHTML = '<p class="empty-hint">No saved conversations match your search.</p>';
    return;
  }

  for (const conv of matches) {
    const card = document.createElement('div');
    card.className = 'history-card';
    card.innerHTML = `
      <div class="history-card-info">
        <h3 class="history-card-title">${escapeHTML(conv.title)}</h3>
        <div class="history-card-meta tabular-nums">
          ${conv.messages.length} messages · Updated ${new Date(conv.updatedAt).toLocaleString()}
        </div>
      </div>
      <div class="btn-row">
        <button type="button" class="btn btn-primary btn-sm" data-hist="open">Open in Chat</button>
        <button type="button" class="btn btn-secondary btn-sm" data-hist="export">Export MD</button>
        <button type="button" class="btn btn-danger-ghost btn-sm" data-hist="delete">Delete</button>
      </div>
    `;

    card.querySelector('[data-hist="open"]').addEventListener('click', () => {
      state.activeConvId = conv.id;
      persistConversations();
      renderChatSessions();
      renderActiveChat();
      navigateTo('chat');
    });

    card.querySelector('[data-hist="export"]').addEventListener('click', () => {
      exportConversationMarkdown(conv);
    });

    card.querySelector('[data-hist="delete"]').addEventListener('click', () => {
      deleteConversation(conv.id);
    });

    container.appendChild(card);
  }
}

/* ==========================================================================
   Calculator
   ========================================================================== */
function recordCalculation(expr, res) {
  state.calcHistory.unshift({ expr, res, time: Date.now() });
  if (state.calcHistory.length > 30) state.calcHistory.pop();
  saveJSON(STORAGE_KEYS.CALC_HISTORY, state.calcHistory);
  renderCalcHistory();
}

function renderCalcHistory() {
  const list = $('#calc-history-list');
  if (!list) return;
  list.innerHTML = '';
  if (state.calcHistory.length === 0) {
    list.innerHTML = '<p class="empty-hint">Evaluated expressions will appear here.</p>';
    return;
  }
  for (const item of state.calcHistory) {
    const row = document.createElement('div');
    row.className = 'calc-history-item';
    row.innerHTML = `<span>${escapeHTML(item.expr)}</span><strong>= ${escapeHTML(item.res)}</strong>`;
    row.addEventListener('click', () => {
      state.calcExpr = item.expr;
      state.calcResult = item.res;
      $('#calc-expression').textContent = state.calcExpr;
      $('#calc-result').textContent = state.calcResult;
    });
    list.appendChild(row);
  }
}

function handleCalcKey(val) {
  if (val === 'AC') {
    state.calcExpr = '';
    state.calcResult = '0';
  } else if (val === 'DEL') {
    state.calcExpr = state.calcExpr.slice(0, -1);
  } else if (val === '=') {
    if (!state.calcExpr) return;
    try {
      const res = evaluateMathExpression(state.calcExpr);
      state.calcResult = String(res);
      recordCalculation(state.calcExpr, state.calcResult);
      state.calcExpr = state.calcResult;
    } catch (err) {
      state.calcResult = err.message;
    }
  } else {
    state.calcExpr += val;
  }

  $('#calc-expression').textContent = state.calcExpr || '0';
  $('#calc-result').textContent = state.calcResult;
}

/* ==========================================================================
   Live Weather (Open-Meteo Free API)
   ========================================================================== */
function describeWeatherCode(code) {
  const map = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing Rime Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    61: 'Light Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    71: 'Light Snow',
    80: 'Rain Showers',
    95: 'Thunderstorm'
  };
  return map[code] || `Weather Code ${code}`;
}

async function fetchWeatherByCoords(lat, lon, locationLabel) {
  const container = $('#weather-content');
  container.innerHTML = '<p class="empty-hint">Retrieving live atmospheric telemetry...</p>';

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather service error');
    const data = await res.json();
    const cur = data.current;
    const daily = data.daily;

    container.innerHTML = `
      <div class="panel-header wrap-header">
        <div>
          <h3 class="panel-title">${escapeHTML(locationLabel)}</h3>
          <p class="panel-subtitle">${escapeHTML(describeWeatherCode(cur.weather_code))} · Timezone: ${escapeHTML(data.timezone)}</p>
        </div>
        <button type="button" id="weather-ask-jarvis" class="btn btn-secondary btn-sm">Ask JARVIS for Briefing</button>
      </div>
      <div class="weather-hero">
        <div class="weather-stat">
          <div class="weather-stat-label">Temperature</div>
          <div class="weather-stat-value tabular-nums">${cur.temperature_2m}°C</div>
        </div>
        <div class="weather-stat">
          <div class="weather-stat-label">Feels Like</div>
          <div class="weather-stat-value tabular-nums">${cur.apparent_temperature}°C</div>
        </div>
        <div class="weather-stat">
          <div class="weather-stat-label">Humidity</div>
          <div class="weather-stat-value tabular-nums">${cur.relative_humidity_2m}%</div>
        </div>
        <div class="weather-stat">
          <div class="weather-stat-label">Wind Speed</div>
          <div class="weather-stat-value tabular-nums">${cur.wind_speed_10m} km/h</div>
        </div>
      </div>
      <div class="forecast-grid">
        ${daily.time
          .slice(0, 5)
          .map(
            (day, i) => `
          <div class="forecast-day">
            <div class="weather-stat-label tabular-nums">${escapeHTML(day)}</div>
            <div style="font-weight:600;margin:4px 0;">${escapeHTML(describeWeatherCode(daily.weather_code[i]))}</div>
            <div class="font-mono tabular-nums">${daily.temperature_2m_min[i]}° / ${daily.temperature_2m_max[i]}°C</div>
          </div>
        `
          )
          .join('')}
      </div>
    `;

    $('#weather-ask-jarvis').addEventListener('click', () => {
      navigateTo('chat');
      sendChatMessage(
        `Give me a concise JARVIS weather briefing and practical advice for ${locationLabel}: currently ${cur.temperature_2m}°C (feels like ${cur.apparent_temperature}°C), ${describeWeatherCode(
          cur.weather_code
        )}, humidity ${cur.relative_humidity_2m}%, wind ${cur.wind_speed_10m} km/h.`
      );
    });
  } catch (err) {
    container.innerHTML = `<p class="status-text-err">Unable to load weather telemetry: ${escapeHTML(err.message)}</p>`;
  }
}

async function lookupWeatherCity(city) {
  const container = $('#weather-content');
  container.innerHTML = `<p class="empty-hint">Locating "${escapeHTML(city)}"...</p>`;
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    if (!res.ok) throw new Error('Geocoding failed');
    const data = await res.json();
    const place = data?.results?.[0];
    if (!place) {
      container.innerHTML = `<p class="status-text-warn">No matching city found for "${escapeHTML(city)}".</p>`;
      return;
    }
    const label = [place.name, place.admin1, place.country].filter(Boolean).join(', ');
    await fetchWeatherByCoords(place.latitude, place.longitude, label);
  } catch (err) {
    container.innerHTML = `<p class="status-text-err">Weather lookup error: ${escapeHTML(err.message)}</p>`;
  }
}

/* ==========================================================================
   Web Search & Knowledge Summary
   ========================================================================== */
async function runWikiKnowledgeSearch(query) {
  const resultsEl = $('#web-search-results');
  resultsEl.innerHTML = `<p class="empty-hint">Searching knowledge summary for "${escapeHTML(query)}"...</p>`;

  const wikiLang = state.settings.language === 'bn' ? 'bn' : 'en';
  try {
    const searchUrl = `https://${wikiLang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      query
    )}&format=json&origin=*&srlimit=3`;
    const res = await fetch(searchUrl);
    if (!res.ok) throw new Error('Knowledge API unreachable');
    const data = await res.json();
    const hits = data?.query?.search || [];

    if (hits.length === 0) {
      resultsEl.innerHTML = `<p class="empty-hint">No instant Wikipedia summary found for "${escapeHTML(
        query
      )}". Try launching Google or asking JARVIS AI above.</p>`;
      return;
    }

    const topTitle = hits[0].title;
    const sumRes = await fetch(
      `https://${wikiLang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topTitle)}`
    );
    const summary = sumRes.ok ? await sumRes.json() : null;

    resultsEl.innerHTML = `
      <h3 class="panel-title">${escapeHTML(summary?.title || topTitle)}</h3>
      <p style="margin:8px 0;color:var(--text-secondary);">${escapeHTML(
        summary?.extract || hits[0].snippet.replace(/<[^>]+>/g, '')
      )}</p>
      <div class="btn-row" style="margin-top:12px;">
        <button type="button" id="wiki-open-btn" class="btn btn-secondary btn-sm">Open Full Article</button>
        <button type="button" id="wiki-ask-btn" class="btn btn-primary btn-sm">Summarize with JARVIS</button>
      </div>
    `;

    const articleUrl =
      summary?.content_urls?.desktop?.page ||
      `https://${wikiLang}.wikipedia.org/wiki/${encodeURIComponent(topTitle)}`;

    $('#wiki-open-btn').addEventListener('click', () => confirmExternalOpen(articleUrl, 'Wikipedia'));
    $('#wiki-ask-btn').addEventListener('click', () => {
      navigateTo('chat');
      sendChatMessage(`Explain "${topTitle}" clearly based on this topic and key context.`);
    });
  } catch (err) {
    resultsEl.innerHTML = `<p class="status-text-err">Search error: ${escapeHTML(err.message)}</p>`;
  }
}

/* ==========================================================================
   Navigation, Theme, Language, Clock & Connection UI
   ========================================================================== */
function navigateTo(pageKey) {
  state.currentPage = pageKey;

  $$('.page').forEach((sec) => sec.classList.toggle('active', sec.dataset.page === pageKey));
  $$('.nav-item').forEach((btn) => btn.classList.toggle('active', btn.dataset.nav === pageKey));
  $$('.mob-nav-btn').forEach((btn) => btn.classList.toggle('active', btn.dataset.nav === pageKey));

  const titleKeyMap = {
    dashboard: 'navDashboard',
    chat: 'navChat',
    voice: 'navVoice',
    tools: 'navTools',
    history: 'navHistory',
    notes: 'navNotes',
    tasks: 'navTasks',
    calculator: 'navCalculator',
    weather: 'navWeather',
    search: 'navSearch',
    settings: 'navSettings',
    about: 'navAbout'
  };
  const dict = I18N[state.settings.language] || I18N.en;
  $('#page-title').textContent = dict[titleKeyMap[pageKey]] || 'JARVIS AI';

  // Close mobile sidebar drawer
  $('#sidebar').classList.remove('open');
  $('#sidebar-backdrop').classList.add('hidden');
}

function applyTheme(theme) {
  state.settings.theme = theme === 'light' ? 'light' : 'dark';
  const isLight = state.settings.theme === 'light';
  document.documentElement.classList.toggle('light', isLight);
  document.documentElement.classList.toggle('dark', !isLight);

  $('#theme-icon-sun').classList.toggle('hidden', !isLight);
  $('#theme-icon-moon').classList.toggle('hidden', isLight);
  $('#meta-theme-color').setAttribute('content', isLight ? '#eef5fc' : '#040814');

  const sel = $('#settings-theme');
  if (sel) sel.value = state.settings.theme;
  saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
}

function applyLanguage(lang) {
  state.settings.language = lang === 'bn' ? 'bn' : 'en';
  const dict = I18N[state.settings.language];

  $$('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });

  const langBtn = $('#lang-toggle-btn');
  if (langBtn) {
    langBtn.textContent = state.settings.language === 'bn' ? 'বাংলা / EN' : 'EN / বাং';
  }

  const sel = $('#settings-language');
  if (sel) sel.value = state.settings.language;

  saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
  navigateTo(state.currentPage);
}

function updateConnectionUI() {
  const hasKey = Boolean(state.apiKey);
  $('#api-setup-banner').classList.toggle('hidden', hasKey);

  const labelMap = {
    unconfigured: { text: 'Not Configured', cls: 'status-text-warn' },
    configured: { text: 'Key Saved', cls: 'status-text-ok' },
    connected: { text: 'Connected', cls: 'status-text-ok' },
    error: { text: 'Auth / API Error', cls: 'status-text-err' }
  };

  const info = hasKey
    ? labelMap[state.connectionStatus] || labelMap.configured
    : labelMap.unconfigured;

  for (const id of ['#header-ai-status', '#dash-ai-status', '#settings-conn-badge']) {
    const el = $(id);
    if (!el) continue;
    el.textContent = info.text;
    el.className = el.className.replace(/status-text-\w+/g, '').trim() + ' ' + info.cls;
  }

  const dashModel = $('#dash-model-label');
  if (dashModel) dashModel.textContent = `Model: ${getActiveModelId()}`;
}

function updateClock() {
  const now = new Date();
  const locale = state.settings.language === 'bn' ? 'bn-BD' : undefined;
  $('#header-clock').textContent = now.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const dashDate = $('#dash-date');
  if (dashDate) {
    dashDate.textContent = now.toLocaleDateString(locale, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}

/* ==========================================================================
   Utilities
   ========================================================================== */
async function copyText(text, btnEl = null) {
  try {
    await navigator.clipboard.writeText(text);
    if (btnEl) {
      const prev = btnEl.textContent;
      btnEl.textContent = 'Copied!';
      setTimeout(() => {
        btnEl.textContent = prev;
      }, 1500);
    } else {
      showToast('Copied to clipboard.', 'ok');
    }
  } catch {
    showToast('Clipboard permission unavailable.', 'err');
  }
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ==========================================================================
   PWA Service Worker & Install Flow
   ========================================================================== */
function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch((err) => {
      console.warn('Service worker registration skipped:', err);
    });
  }

  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  const installBtn = $('#pwa-install-btn');
  const installLabel = $('#pwa-install-label');
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  if (isStandalone) {
    installBtn.classList.add('hidden');
    return;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    state.deferredInstallPrompt = e;
    installBtn.classList.remove('hidden');
  });

  window.addEventListener('appinstalled', () => {
    state.deferredInstallPrompt = null;
    installBtn.classList.add('hidden');
    showToast('JARVIS AI installed as an app.', 'ok');
  });

  if (isIOS) {
    installLabel.textContent = 'Install on iOS';
    installBtn.classList.remove('hidden');
  }

  installBtn.addEventListener('click', async () => {
    if (state.deferredInstallPrompt) {
      await state.deferredInstallPrompt.prompt();
      const choice = await state.deferredInstallPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        installBtn.classList.add('hidden');
      }
      state.deferredInstallPrompt = null;
    } else if (isIOS) {
      $('#ios-install-modal').classList.remove('hidden');
    }
  });
}

/* ==========================================================================
   Settings Hydration & Event Wiring
   ========================================================================== */
function hydrateSettingsUI() {
  const s = state.settings;
  $('#settings-api-key').value = state.apiKey;
  $('#settings-model').value = s.model;
  $('#settings-custom-model').value = s.customModel || '';
  $('#settings-custom-model-wrap').classList.toggle('hidden', s.model !== 'custom');

  $('#settings-temperature').value = String(s.temperature);
  $('#settings-temp-val').textContent = String(s.temperature);

  $('#settings-max-tokens').value = String(s.maxTokens);
  $('#settings-max-tokens-val').textContent = String(s.maxTokens);

  $('#settings-language').value = s.language;
  $('#settings-theme').value = s.theme;
  $('#settings-speech-rate').value = String(s.speechRate);
  $('#settings-speech-rate-val').textContent = `${s.speechRate}x`;
  $('#settings-autospeak').checked = Boolean(s.autoSpeakChat);

  $('#chat-autospeak-toggle').checked = Boolean(s.autoSpeakChat);
  $('#voice-speed-range').value = String(s.speechRate);
  $('#voice-speed-val').textContent = `${s.speechRate}x`;
  $('#voice-autoresponse-toggle').checked = Boolean(s.voiceAutoResponse);
  $('#voice-continuous-toggle').checked = Boolean(s.voiceContinuous);

  $$('[data-voice-lang]').forEach((b) => b.classList.toggle('active', b.dataset.voiceLang === s.voiceLang));
  $('#voice-mute-btn span').textContent = s.voiceMuted
    ? I18N[s.language].unmuteVoice
    : I18N[s.language].muteVoice;
}

function bindEvents() {
  // Navigation
  document.addEventListener('click', (e) => {
    const navTrigger = e.target.closest('[data-nav]');
    if (navTrigger) {
      e.preventDefault();
      navigateTo(navTrigger.dataset.nav);
      if (navTrigger.dataset.toolPreset) {
        selectTool(navTrigger.dataset.toolPreset);
      }
      return;
    }

    // Delegated Copy button for markdown code blocks
    if (e.target.classList.contains('code-copy-btn')) {
      const codeEl = e.target.closest('.code-block-wrap')?.querySelector('code');
      if (codeEl) copyText(codeEl.textContent, e.target);
    }
  });

  // Mobile sidebar drawer
  $('#open-sidebar-btn').addEventListener('click', () => {
    $('#sidebar').classList.add('open');
    $('#sidebar-backdrop').classList.remove('hidden');
  });
  $('#close-sidebar-btn').addEventListener('click', () => {
    $('#sidebar').classList.remove('open');
    $('#sidebar-backdrop').classList.add('hidden');
  });
  $('#sidebar-backdrop').addEventListener('click', () => {
    $('#sidebar').classList.remove('open');
    $('#sidebar-backdrop').classList.add('hidden');
  });

  // Header controls
  $('#theme-toggle-btn').addEventListener('click', () => {
    applyTheme(state.settings.theme === 'dark' ? 'light' : 'dark');
  });
  $('#lang-toggle-btn').addEventListener('click', () => {
    applyLanguage(state.settings.language === 'en' ? 'bn' : 'en');
  });
  $('#fullscreen-toggle-btn').addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {
        showToast('Fullscreen unavailable in this viewport.', 'info');
      });
    } else {
      document.exitFullscreen?.();
    }
  });

  // Dashboard Core & Controls
  $('#dash-core-btn').addEventListener('click', () => toggleVoiceListening());
  $('#dash-mic-btn').addEventListener('click', () => toggleVoiceListening());
  $('#dash-stop-speech-btn').addEventListener('click', () => {
    interruptSpeaking();
    stopGeneration();
  });

  $('#dash-chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#dash-chat-input');
    const val = input.value;
    if (!val.trim()) return;
    input.value = '';
    sendChatMessage(val);
  });

  $$('[data-quick-cmd]').forEach((btn) => {
    btn.addEventListener('click', () => {
      sendChatMessage(btn.dataset.quickCmd);
    });
  });

  // Chat Page Controls
  $('#chat-new-btn').addEventListener('click', createNewConversation);
  $('#chat-clear-btn').addEventListener('click', () => {
    openConfirmModal(
      'Clear Current Conversation?',
      'All messages in this thread will be cleared.',
      clearActiveConversation,
      'Clear'
    );
  });
  $('#chat-export-btn').addEventListener('click', () => exportConversationMarkdown(getActiveConversation()));
  $('#chat-regenerate-btn').addEventListener('click', regenerateLastResponse);
  $('#chat-stop-btn').addEventListener('click', stopGeneration);
  $('#chat-mic-btn').addEventListener('click', () => toggleVoiceListening('#chat-input'));

  $('#chat-autospeak-toggle').addEventListener('change', (e) => {
    state.settings.autoSpeakChat = e.target.checked;
    $('#settings-autospeak').checked = e.target.checked;
    saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
  });

  $('#chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#chat-input');
    const val = input.value;
    if (!val.trim()) return;
    input.value = '';
    input.style.height = 'auto';
    sendChatMessage(val);
  });

  $('#chat-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      $('#chat-form').requestSubmit();
    }
  });
  $('#chat-input').addEventListener('input', (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
  });

  // Voice Assistant Page
  $('#voice-core-btn').addEventListener('click', () => toggleVoiceListening());
  $('#voice-toggle-listen-btn').addEventListener('click', () => toggleVoiceListening());
  $('#voice-interrupt-btn').addEventListener('click', interruptSpeaking);
  $('#voice-mute-btn').addEventListener('click', () => {
    state.settings.voiceMuted = !state.settings.voiceMuted;
    if (state.settings.voiceMuted) interruptSpeaking();
    saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
    hydrateSettingsUI();
  });

  $$('[data-voice-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.settings.voiceLang = btn.dataset.voiceLang;
      saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
      hydrateSettingsUI();
    });
  });

  $('#voice-select').addEventListener('change', (e) => {
    state.settings.voiceURI = e.target.value;
    $('#settings-voice').value = e.target.value;
    saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
  });

  $('#voice-speed-range').addEventListener('input', (e) => {
    const val = Number(e.target.value);
    state.settings.speechRate = val;
    $('#voice-speed-val').textContent = `${val}x`;
    $('#settings-speech-rate').value = String(val);
    $('#settings-speech-rate-val').textContent = `${val}x`;
    saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
  });

  $('#voice-autoresponse-toggle').addEventListener('change', (e) => {
    state.settings.voiceAutoResponse = e.target.checked;
    saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
  });

  $('#voice-continuous-toggle').addEventListener('change', (e) => {
    state.settings.voiceContinuous = e.target.checked;
    saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
  });

  $('#voice-clear-log-btn').addEventListener('click', () => {
    state.voiceLog = [];
    saveJSON(STORAGE_KEYS.VOICE_LOG, []);
    renderVoiceLog();
  });

  // AI Tools Page
  $$('.tool-tab').forEach((btn) => {
    btn.addEventListener('click', () => selectTool(btn.dataset.tool));
  });
  $('#tool-form').addEventListener('submit', runActiveTool);
  $('#tool-stop-btn').addEventListener('click', stopGeneration);
  $('#tool-clear-btn').addEventListener('click', () => {
    $('#tool-input').value = '';
    state.toolOutputText = '';
    $('#tool-output').innerHTML = '<p class="empty-hint">Configure your prompt above and select "Run AI Tool".</p>';
  });
  $('#tool-copy-btn').addEventListener('click', (e) => {
    if (state.toolOutputText) copyText(state.toolOutputText, e.currentTarget);
  });
  $('#tool-speak-btn').addEventListener('click', () => {
    if (state.toolOutputText) speakText(state.toolOutputText);
  });
  $('#tool-save-note-btn').addEventListener('click', () => {
    if (!state.toolOutputText) {
      showToast('Generate tool output first before saving to Notes.', 'info');
      return;
    }
    state.notes.unshift({
      id: uid('note'),
      title: `${TOOL_DEFINITIONS[state.activeTool].title} Output`,
      tag: 'AI Tool',
      body: state.toolOutputText,
      updatedAt: Date.now()
    });
    saveJSON(STORAGE_KEYS.NOTES, state.notes);
    renderNotes($('#notes-search').value);
    showToast('Saved output to Notes.', 'ok');
  });

  // History Page
  $('#history-search').addEventListener('input', (e) => renderHistoryPage(e.target.value));
  $('#history-export-all-btn').addEventListener('click', () => {
    downloadFile('jarvis_conversations.json', JSON.stringify(state.conversations, null, 2), 'application/json');
  });
  $('#history-clear-all-btn').addEventListener('click', () => {
    openConfirmModal(
      'Clear All Chat History?',
      'This deletes every saved conversation from browser localStorage.',
      () => {
        const fresh = createConversationObject();
        state.conversations = [fresh];
        state.activeConvId = fresh.id;
        persistConversations();
        renderChatSessions();
        renderActiveChat();
        renderHistoryPage();
        showToast('All conversation history cleared.', 'ok');
      },
      'Clear All'
    );
  });

  // Notes Page
  $('#note-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = $('#note-edit-id').value;
    const title = $('#note-title-input').value.trim();
    const tag = $('#note-tag-input').value.trim();
    const body = $('#note-body-input').value.trim();
    if (!title || !body) return;

    if (editId) {
      const existing = state.notes.find((n) => n.id === editId);
      if (existing) {
        existing.title = title;
        existing.tag = tag;
        existing.body = body;
        existing.updatedAt = Date.now();
      }
      showToast('Note updated.', 'ok');
    } else {
      state.notes.unshift({ id: uid('note'), title, tag, body, updatedAt: Date.now() });
      showToast('Note saved.', 'ok');
    }

    saveJSON(STORAGE_KEYS.NOTES, state.notes);
    $('#note-form').reset();
    $('#note-edit-id').value = '';
    $('#note-editor-heading').textContent = 'Create Note';
    $('#note-reset-btn').classList.add('hidden');
    renderNotes($('#notes-search').value);
  });

  $('#note-reset-btn').addEventListener('click', () => {
    $('#note-form').reset();
    $('#note-edit-id').value = '';
    $('#note-editor-heading').textContent = 'Create Note';
    $('#note-reset-btn').classList.add('hidden');
  });

  $('#notes-search').addEventListener('input', (e) => renderNotes(e.target.value));

  // Tasks Page
  $('#task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = $('#task-title-input').value.trim();
    const priority = $('#task-priority-input').value;
    const dueDate = $('#task-due-input').value;
    if (!title) return;

    state.tasks.unshift({
      id: uid('task'),
      title,
      priority,
      dueDate,
      completed: false,
      createdAt: Date.now()
    });
    saveJSON(STORAGE_KEYS.TASKS, state.tasks);
    $('#task-form').reset();
    renderTasks();
    showToast('Task added.', 'ok');
  });

  $$('#task-filter-group [data-task-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.taskFilter = btn.dataset.taskFilter;
      $$('#task-filter-group [data-task-filter]').forEach((b) =>
        b.classList.toggle('active', b.dataset.taskFilter === state.taskFilter)
      );
      renderTasks();
    });
  });

  $('#tasks-clear-completed-btn').addEventListener('click', () => {
    state.tasks = state.tasks.filter((t) => !t.completed);
    saveJSON(STORAGE_KEYS.TASKS, state.tasks);
    renderTasks();
  });

  // Calculator Page
  $('#calc-keypad').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-calc]');
    if (btn) handleCalcKey(btn.dataset.calc);
  });
  $('#calc-manual-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const expr = $('#calc-manual-input').value.trim();
    if (!expr) return;
    state.calcExpr = expr;
    handleCalcKey('=');
  });
  $('#calc-clear-history-btn').addEventListener('click', () => {
    state.calcHistory = [];
    saveJSON(STORAGE_KEYS.CALC_HISTORY, []);
    renderCalcHistory();
  });

  // Weather Page
  $('#weather-search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const city = $('#weather-city-input').value.trim();
    if (city) lookupWeatherCity(city);
  });
  $('#weather-geo-btn').addEventListener('click', () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported in this browser.', 'err');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude, 'Your Current Location');
      },
      () => {
        showToast('Location permission denied or unavailable.', 'err');
      }
    );
  });

  // Web Search Page
  $('#web-search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const q = $('#web-search-input').value.trim();
    if (q) runWikiKnowledgeSearch(q);
  });

  $$('[data-search-engine]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const q = $('#web-search-input').value.trim();
      if (!q) {
        showToast('Enter a search query first.', 'info');
        return;
      }
      const engines = {
        google: `https://www.google.com/search?q=${encodeURIComponent(q)}`,
        duckduckgo: `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
        youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
        github: `https://github.com/search?q=${encodeURIComponent(q)}`
      };
      confirmExternalOpen(engines[btn.dataset.searchEngine], btn.dataset.searchEngine);
    });
  });

  $('#search-ask-jarvis-btn').addEventListener('click', () => {
    const q = $('#web-search-input').value.trim();
    if (!q) {
      showToast('Enter a topic first.', 'info');
      return;
    }
    navigateTo('chat');
    sendChatMessage(`Provide a clear, comprehensive explanation and breakdown of: ${q}`);
  });

  // Settings Page
  $('#toggle-key-visibility-btn').addEventListener('click', () => {
    const input = $('#settings-api-key');
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    $('#toggle-key-visibility-btn').textContent = isPassword ? 'Hide' : 'Show';
  });

  $('#api-key-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const key = $('#settings-api-key').value.trim();
    if (!key) {
      showToast('Enter a valid Gemini API key before saving.', 'err');
      return;
    }
    state.apiKey = key;
    state.connectionStatus = 'configured';
    localStorage.setItem(STORAGE_KEYS.API_KEY, key);
    updateConnectionUI();
    showToast('Gemini API key saved locally in browser storage.', 'ok');
  });

  $('#remove-api-key-btn').addEventListener('click', () => {
    openConfirmModal(
      'Remove Saved API Key?',
      'This deletes your Gemini API key from this browser\'s localStorage.',
      () => {
        state.apiKey = '';
        state.connectionStatus = 'unconfigured';
        localStorage.removeItem(STORAGE_KEYS.API_KEY);
        $('#settings-api-key').value = '';
        $('#api-test-result').classList.add('hidden');
        updateConnectionUI();
        showToast('API key removed from browser.', 'ok');
      },
      'Remove Key'
    );
  });

  $('#test-api-key-btn').addEventListener('click', testGeminiConnection);

  $('#settings-model').addEventListener('change', (e) => {
    state.settings.model = e.target.value;
    $('#settings-custom-model-wrap').classList.toggle('hidden', e.target.value !== 'custom');
    saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
    updateConnectionUI();
  });

  $('#settings-custom-model').addEventListener('input', (e) => {
    state.settings.customModel = e.target.value.trim();
    saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
    updateConnectionUI();
  });

  $('#settings-temperature').addEventListener('input', (e) => {
    state.settings.temperature = Number(e.target.value);
    $('#settings-temp-val').textContent = e.target.value;
    saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
  });

  $('#settings-max-tokens').addEventListener('input', (e) => {
    state.settings.maxTokens = Number(e.target.value);
    $('#settings-max-tokens-val').textContent = e.target.value;
    saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
  });

  $('#settings-language').addEventListener('change', (e) => applyLanguage(e.target.value));
  $('#settings-theme').addEventListener('change', (e) => applyTheme(e.target.value));

  $('#settings-voice').addEventListener('change', (e) => {
    state.settings.voiceURI = e.target.value;
    $('#voice-select').value = e.target.value;
    saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
  });

  $('#settings-speech-rate').addEventListener('input', (e) => {
    const val = Number(e.target.value);
    state.settings.speechRate = val;
    $('#settings-speech-rate-val').textContent = `${val}x`;
    $('#voice-speed-range').value = String(val);
    $('#voice-speed-val').textContent = `${val}x`;
    saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
  });

  $('#settings-autospeak').addEventListener('change', (e) => {
    state.settings.autoSpeakChat = e.target.checked;
    $('#chat-autospeak-toggle').checked = e.target.checked;
    saveJSON(STORAGE_KEYS.SETTINGS, state.settings);
  });

  $('#request-notifications-btn').addEventListener('click', async () => {
    if (!('Notification' in window)) {
      showToast('Browser notifications are not supported on this device.', 'err');
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      new Notification('JARVIS AI Notifications Enabled', {
        body: 'JARVIS can now alert you when permitted.',
        icon: './assets/logo.png'
      });
      showToast('Notifications enabled.', 'ok');
    } else {
      showToast(`Notification permission: ${perm}.`, 'info');
    }
  });

  $('#export-all-data-btn').addEventListener('click', () => {
    const bundle = {
      exportedAt: new Date().toISOString(),
      settings: state.settings,
      conversations: state.conversations,
      notes: state.notes,
      tasks: state.tasks,
      calcHistory: state.calcHistory
    };
    downloadFile('jarvis_local_backup.json', JSON.stringify(bundle, null, 2), 'application/json');
  });

  $('#clear-all-data-btn').addEventListener('click', () => {
    openConfirmModal(
      'Erase All Local Data?',
      'This deletes your saved API key, conversations, notes, tasks, and preferences from this browser.',
      () => {
        Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
        state.apiKey = '';
        state.connectionStatus = 'unconfigured';
        state.settings = { ...DEFAULT_SETTINGS };
        const fresh = createConversationObject();
        state.conversations = [fresh];
        state.activeConvId = fresh.id;
        state.notes = [];
        state.tasks = [];
        state.calcHistory = [];
        state.voiceLog = [];
        applyTheme('dark');
        applyLanguage('en');
        hydrateSettingsUI();
        updateConnectionUI();
        renderChatSessions();
        renderActiveChat();
        renderHistoryPage();
        renderNotes();
        renderTasks();
        renderCalcHistory();
        renderVoiceLog();
        showToast('All local browser data cleared.', 'ok');
      },
      'Erase Everything'
    );
  });

  // Modals & Command Palette
  $('#confirm-modal-cancel').addEventListener('click', closeConfirmModal);
  $('#confirm-modal-ok').addEventListener('click', () => {
    const fn = state.pendingConfirmAction;
    closeConfirmModal();
    if (fn) fn();
  });

  $('#ios-modal-close').addEventListener('click', () => {
    $('#ios-install-modal').classList.add('hidden');
  });

  $('#command-palette-trigger').addEventListener('click', () => {
    $('#command-modal').classList.remove('hidden');
    $('#cmd-palette-input').focus();
  });
  $('#cmd-modal-close').addEventListener('click', () => {
    $('#command-modal').classList.add('hidden');
  });
  $('#cmd-palette-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const val = $('#cmd-palette-input').value.trim();
    if (!val) return;
    $('#cmd-palette-input').value = '';
    $('#command-modal').classList.add('hidden');
    navigateTo('chat');
    sendChatMessage(val);
  });
  $$('[data-palette-cmd]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $('#command-modal').classList.add('hidden');
      sendChatMessage(btn.dataset.paletteCmd);
    });
  });

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      $('#command-modal').classList.remove('hidden');
      $('#cmd-palette-input').focus();
      return;
    }
    if (e.key === 'Escape') {
      closeConfirmModal();
      $('#command-modal').classList.add('hidden');
      $('#ios-install-modal').classList.add('hidden');
      stopGeneration();
      return;
    }
    if (e.altKey) {
      if (e.key === '1') navigateTo('dashboard');
      else if (e.key === '2') navigateTo('chat');
      else if (e.key === '3') navigateTo('voice');
      else if (e.key === '0') navigateTo('settings');
      else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleVoiceListening();
      }
    }
  });

  // Online / Offline Connectivity Banner
  const updateOfflineBanner = () => {
    $('#offline-banner').classList.toggle('hidden', navigator.onLine);
  };
  window.addEventListener('online', updateOfflineBanner);
  window.addEventListener('offline', updateOfflineBanner);
  updateOfflineBanner();
}

/* ==========================================================================
   Initialization
   ========================================================================== */
function bootstrap() {
  state.apiKey = localStorage.getItem(STORAGE_KEYS.API_KEY) || '';
  state.connectionStatus = state.apiKey ? 'configured' : 'unconfigured';
  state.settings = { ...DEFAULT_SETTINGS, ...loadJSON(STORAGE_KEYS.SETTINGS, {}) };
  state.conversations = loadJSON(STORAGE_KEYS.CONVERSATIONS, []);
  state.activeConvId = loadJSON(STORAGE_KEYS.ACTIVE_CONV_ID, null);
  state.notes = loadJSON(STORAGE_KEYS.NOTES, []);
  state.tasks = loadJSON(STORAGE_KEYS.TASKS, []);
  state.calcHistory = loadJSON(STORAGE_KEYS.CALC_HISTORY, []);
  state.voiceLog = loadJSON(STORAGE_KEYS.VOICE_LOG, []);

  if (state.conversations.length === 0) {
    const initial = createConversationObject();
    state.conversations.push(initial);
    state.activeConvId = initial.id;
    persistConversations();
  }

  applyTheme(state.settings.theme);
  applyLanguage(state.settings.language);
  hydrateSettingsUI();
  updateConnectionUI();

  selectTool('writer');
  renderChatSessions();
  renderActiveChat();
  renderHistoryPage();
  renderNotes();
  renderTasks();
  renderCalcHistory();
  renderVoiceLog();

  initSpeechCompatibilityUI();
  populateVoices();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }

  updateClock();
  setInterval(updateClock, 1000);

  startVoiceVisualizer();
  initPWA();
  bindEvents();
}

document.addEventListener('DOMContentLoaded', bootstrap);
