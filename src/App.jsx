import { useState, useEffect, useRef } from "react";

const LANGUAGES = [
  { code:"en", label:"English",    flag:"🇺🇸" },
  { code:"fr", label:"Français",   flag:"🇫🇷" },
  { code:"ar", label:"العربية",    flag:"🇸🇦", rtl:true },
  { code:"es", label:"Español",    flag:"🇪🇸" },
  { code:"pt", label:"Português",  flag:"🇧🇷" },
  { code:"de", label:"Deutsch",    flag:"🇩🇪" },
  { code:"it", label:"Italiano",   flag:"🇮🇹" },
  { code:"zh", label:"中文",        flag:"🇨🇳" },
  { code:"ja", label:"日本語",      flag:"🇯🇵" },
  { code:"ko", label:"한국어",      flag:"🇰🇷" },
  { code:"ru", label:"Русский",    flag:"🇷🇺" },
  { code:"hi", label:"हिन्दी",     flag:"🇮🇳" },
  { code:"tr", label:"Türkçe",     flag:"🇹🇷" },
  { code:"nl", label:"Nederlands", flag:"🇳🇱" },
  { code:"pl", label:"Polski",     flag:"🇵🇱" },
  { code:"sv", label:"Svenska",    flag:"🇸🇪" },
  { code:"id", label:"Indonesia",  flag:"🇮🇩" },
  { code:"vi", label:"Tiếng Việt", flag:"🇻🇳" },
  { code:"th", label:"ภาษาไทย",    flag:"🇹🇭" },
  { code:"fa", label:"فارسی",      flag:"🇮🇷", rtl:true },
  { code:"uk", label:"Українська", flag:"🇺🇦" },
  { code:"ro", label:"Română",     flag:"🇷🇴" },
  { code:"ms", label:"Melayu",     flag:"🇲🇾" },
  { code:"sw", label:"Kiswahili",  flag:"🇰🇪" },
  { code:"bn", label:"বাংলা",      flag:"🇧🇩" },
];

const UI = {
  en:{ headline:"Unlimited", sub:"AI Prompts.", tagline:"Unlimited AI prompts generated on demand — search anything, in any language.", searchPH:"Search unlimited AI prompts…", searchBtn:"SEARCH", searching:"SEARCHING…", featured:"AI-GENERATED PROMPTS", results:"RESULTS FOR", hunger:"♥ 10% OF ALL PROCEEDS FIGHTS WORLD HUNGER", deeperTitle:"Go deeper with AI training", deeperSub:"built for builders.", deeperBody:"Victory Hour Academy is coming soon. AI courses, community, and tools — all under one roof.", joinFree:"COMING SOON", copyPrompt:"COPY PROMPT", copied:"✓ COPIED", retrieving:"RETRIEVING FROM THE ARCHIVE…", viewFull:"VIEW FULL PROMPT →", of:"OF", tagline2:"Clarity. Strategy. Action." },
  fr:{ headline:"Illimité", sub:"Prompts IA.", tagline:"Des prompts IA illimités générés à la demande — cherchez n'importe quoi, dans n'importe quelle langue.", searchPH:"Chercher des prompts illimités…", searchBtn:"CHERCHER", searching:"RECHERCHE…", featured:"PROMPTS GÉNÉRÉS PAR IA", results:"RÉSULTATS POUR", hunger:"♥ 10% DES REVENUS LUTTE CONTRE LA FAIM", deeperTitle:"Approfondissez votre formation IA", deeperSub:"faite pour les créateurs.", deeperBody:"Victory Hour Academy arrive bientôt.", joinFree:"BIENTÔT", copyPrompt:"COPIER", copied:"✓ COPIÉ", retrieving:"RÉCUPÉRATION…", viewFull:"VOIR LE PROMPT COMPLET →", of:"SUR", tagline2:"Clarté. Stratégie. Action." },
  ar:{ headline:"غير محدود", sub:"موجّهات الذكاء الاصطناعي.", tagline:"موجّهات ذكاء اصطناعي غير محدودة — ابحث عن أي شيء بأي لغة.", searchPH:"ابحث في موجّهات غير محدودة…", searchBtn:"بحث", searching:"جارٍ البحث…", featured:"موجّهات مُنشأة بالذكاء الاصطناعي", results:"نتائج لـ", hunger:"♥ ١٠٪ من العائدات لمحاربة الجوع", deeperTitle:"تعمّق في تدريب الذكاء الاصطناعي", deeperSub:"مصمّم للبنّائين.", deeperBody:"Victory Hour Academy قادم قريباً.", joinFree:"قريباً", copyPrompt:"نسخ", copied:"✓ تم النسخ", retrieving:"جارٍ الاسترداد…", viewFull:"عرض الموجّه الكامل →", of:"من", tagline2:"وضوح. استراتيجية. عمل." },
  es:{ headline:"Ilimitado", sub:"Prompts de IA.", tagline:"Prompts de IA ilimitados generados al instante — busca cualquier cosa, en cualquier idioma.", searchPH:"Buscar prompts ilimitados…", searchBtn:"BUSCAR", searching:"BUSCANDO…", featured:"PROMPTS GENERADOS POR IA", results:"RESULTADOS PARA", hunger:"♥ EL 10% LUCHA CONTRA EL HAMBRE", deeperTitle:"Profundiza en formación IA", deeperSub:"hecha para creadores.", deeperBody:"Victory Hour Academy llega pronto.", joinFree:"PRÓXIMAMENTE", copyPrompt:"COPIAR", copied:"✓ COPIADO", retrieving:"RECUPERANDO…", viewFull:"VER PROMPT COMPLETO →", of:"DE", tagline2:"Claridad. Estrategia. Acción." },
  pt:{ headline:"Ilimitado", sub:"Prompts de IA.", tagline:"Prompts de IA ilimitados gerados na hora — pesquise qualquer coisa, em qualquer idioma.", searchPH:"Pesquisar prompts ilimitados…", searchBtn:"PESQUISAR", searching:"PESQUISANDO…", featured:"PROMPTS GERADOS POR IA", results:"RESULTADOS PARA", hunger:"♥ 10% DA RECEITA COMBATE A FOME", deeperTitle:"Aprofunde-se no treinamento de IA", deeperSub:"feito para criadores.", deeperBody:"Victory Hour Academy em breve.", joinFree:"EM BREVE", copyPrompt:"COPIAR", copied:"✓ COPIADO", retrieving:"RECUPERANDO…", viewFull:"VER PROMPT COMPLETO →", of:"DE", tagline2:"Clareza. Estratégia. Ação." },
  de:{ headline:"Unbegrenzt", sub:"KI-Prompts.", tagline:"Unbegrenzte KI-Prompts auf Abruf — suche alles, in jeder Sprache.", searchPH:"Unbegrenzte Prompts suchen…", searchBtn:"SUCHEN", searching:"SUCHE…", featured:"KI-GENERIERTE PROMPTS", results:"ERGEBNISSE FÜR", hunger:"♥ 10% DER EINNAHMEN BEKÄMPFEN HUNGER", deeperTitle:"KI-Training vertiefen", deeperSub:"für Macher gemacht.", deeperBody:"Victory Hour Academy kommt bald.", joinFree:"DEMNÄCHST", copyPrompt:"KOPIEREN", copied:"✓ KOPIERT", retrieving:"ABRUFEN…", viewFull:"VOLLSTÄNDIGEN PROMPT →", of:"VON", tagline2:"Klarheit. Strategie. Aktion." },
  it:{ headline:"Illimitato", sub:"Prompt IA.", tagline:"Prompt IA illimitati generati su richiesta — cerca qualsiasi cosa, in qualsiasi lingua.", searchPH:"Cerca prompt illimitati…", searchBtn:"CERCA", searching:"RICERCA…", featured:"PROMPT GENERATI DA IA", results:"RISULTATI PER", hunger:"♥ IL 10% DEI RICAVI COMBATTE LA FAME", deeperTitle:"Approfondisci la formazione IA", deeperSub:"pensata per i creatori.", deeperBody:"Victory Hour Academy in arrivo.", joinFree:"PRESTO", copyPrompt:"COPIA", copied:"✓ COPIATO", retrieving:"RECUPERO…", viewFull:"PROMPT COMPLETO →", of:"DI", tagline2:"Chiarezza. Strategia. Azione." },
  zh:{ headline:"无限", sub:"AI 提示词。", tagline:"无限AI提示词按需生成 — 用任何语言搜索任何内容。", searchPH:"搜索无限AI提示词…", searchBtn:"搜索", searching:"搜索中…", featured:"AI生成的提示词", results:"搜索结果：", hunger:"♥ 所有收入的10%用于对抗世界饥饿", deeperTitle:"深入学习AI训练", deeperSub:"为创作者而生。", deeperBody:"Victory Hour Academy即将推出。", joinFree:"即将推出", copyPrompt:"复制", copied:"✓ 已复制", retrieving:"检索中…", viewFull:"查看完整提示词 →", of:"共", tagline2:"清晰。策略。行动。" },
  ja:{ headline:"無制限の", sub:"AIプロンプト。", tagline:"無制限のAIプロンプトをオンデマンドで生成 — どんな言語でも何でも検索。", searchPH:"無制限のプロンプトを検索…", searchBtn:"検索", searching:"検索中…", featured:"AI生成プロンプト", results:"検索結果：", hunger:"♥ 収益の10%が世界の飢餓と戦います", deeperTitle:"AIトレーニングをさらに深く", deeperSub:"クリエイターのために。", deeperBody:"Victory Hour Academy 近日公開。", joinFree:"近日公開", copyPrompt:"コピー", copied:"✓ コピー済み", retrieving:"取得中…", viewFull:"完全なプロンプトを表示 →", of:"件中", tagline2:"明確。戦略。行動。" },
  ko:{ headline:"무제한", sub:"AI 프롬프트.", tagline:"무제한 AI 프롬프트를 즉시 생성 — 어떤 언어로도 무엇이든 검색하세요.", searchPH:"무제한 프롬프트 검색…", searchBtn:"검색", searching:"검색 중…", featured:"AI 생성 프롬프트", results:"검색 결과:", hunger:"♥ 모든 수익의 10%는 세계 기아 퇴치에", deeperTitle:"AI 교육을 더 깊이", deeperSub:"크리에이터를 위해.", deeperBody:"Victory Hour Academy 곧 출시.", joinFree:"출시 예정", copyPrompt:"복사", copied:"✓ 복사됨", retrieving:"가져오는 중…", viewFull:"전체 프롬프트 보기 →", of:"중", tagline2:"명확함. 전략. 실행." },
  ru:{ headline:"Безлимитные", sub:"ИИ-Промпты.", tagline:"Безлимитные ИИ-промпты по запросу — ищите что угодно на любом языке.", searchPH:"Поиск безлимитных промптов…", searchBtn:"ПОИСК", searching:"ПОИСК…", featured:"ПРОМПТЫ ОТ ИИ", results:"РЕЗУЛЬТАТЫ ПО", hunger:"♥ 10% ДОХОДОВ — НА БОРЬБУ С ГОЛОДОМ", deeperTitle:"Углубитесь в обучение ИИ", deeperSub:"созданное для творцов.", deeperBody:"Victory Hour Academy скоро.", joinFree:"СКОРО", copyPrompt:"КОПИРОВАТЬ", copied:"✓ СКОПИРОВАНО", retrieving:"ПОЛУЧЕНИЕ…", viewFull:"ПОЛНЫЙ ПРОМПТ →", of:"ИЗ", tagline2:"Ясность. Стратегия. Действие." },
};

const t = (lang, key) => UI[lang]?.[key] ?? UI.en[key];
const isRTL = (lang) => LANGUAGES.find(l => l.code===lang)?.rtl || false;

const CATEGORIES = [
  { id:"all",          label:"All Prompts",    icon:"◈" },
  { id:"business",     label:"Business",       icon:"⬡" },
  { id:"creative",     label:"Creative",       icon:"◇" },
  { id:"marketing",    label:"Marketing",      icon:"△" },
  { id:"coding",       label:"Coding",         icon:"⬢" },
  { id:"education",    label:"Education",      icon:"○" },
  { id:"productivity", label:"Productivity",   icon:"◻" },
  { id:"ai-tools",     label:"AI & Automation",icon:"✦" },
];

const SEED_PROMPTS = [
  { id:1,  category:"business",     title:"Cold Email Closer",         tags:["sales","outreach","B2B"],           preview:"Write a cold email that opens with a specific pain point relevant to [industry], positions [product] as the obvious solution, and closes with a low-friction CTA..." },
  { id:2,  category:"creative",     title:"Villain With Empathy",      tags:["fiction","character","story"],       preview:"Write a scene from the villain's perspective where the reader completely understands — and almost agrees with — their worldview..." },
  { id:3,  category:"marketing",    title:"Hook Formula Machine",      tags:["copywriting","social","viral"],      preview:"Generate 10 scroll-stopping hooks for [topic] using proven structures: curiosity gap, bold claim, counterintuitive truth, surprising statistic..." },
  { id:4,  category:"coding",       title:"Debug Like a Senior",       tags:["debugging","review","engineering"],  preview:"Act as a senior software engineer doing a code review. First identify the bugs, then explain WHY each is a problem, then rewrite the fix..." },
  { id:5,  category:"education",    title:"Feynman Explainer",         tags:["learning","simplify","teaching"],    preview:"Explain [complex concept] as if you're Richard Feynman teaching a curious 12-year-old. Use one memorable analogy and one surprising fact..." },
  { id:6,  category:"productivity", title:"Weekly Brain Dump Sorter",  tags:["GTD","organization","clarity"],      preview:"I'm going to dump everything on my mind. Categorize into: urgent tasks, important-not-urgent, ideas to explore, delegate, let go..." },
  { id:7,  category:"ai-tools",     title:"Prompt Refiner Pro",        tags:["meta","prompting","optimization"],   preview:"I'm going to give you a weak prompt. Analyze it for missing context, vague instructions, unclear output format. Then rewrite it as world-class..." },
  { id:8,  category:"business",     title:"Investor Pitch Surgeon",    tags:["fundraising","pitch","startup"],     preview:"Review my pitch as a skeptical Series A investor. For each slide, tell me what question it raises that it doesn't answer, and what's missing..." },
  { id:9,  category:"creative",     title:"First Line Magnet",         tags:["opening lines","fiction","hooks"],   preview:"Write 20 first sentences for a story about [theme]. Each must create an immediate question that makes the reader HAVE to read the next line..." },
  { id:10, category:"marketing",    title:"Testimonial Goldminer",     tags:["social proof","conversion","copy"],  preview:"Here are my raw customer reviews: [paste]. Extract the most emotionally resonant phrases, identify the core transformation described..." },
  { id:11, category:"coding",       title:"Architecture Advisor",      tags:["system design","scalability","plan"],preview:"I'm building [describe app]. Help me think through: the data model, key technical risks, right tech stack before I write a single line of code..." },
  { id:12, category:"education",    title:"Socratic Challenger",       tags:["critical thinking","philosophy"],    preview:"I believe [statement]. Challenge this belief Socratically. Don't tell me I'm wrong — ask questions that reveal the assumptions beneath my position..." },
];

const STATS_VALS = { ar:["غير محدود","25","8","مجاني"], zh:["无限","25","8","免费"], ja:["無制限","25","8","無料"], ko:["무제한","25","8","무료"], ru:["Безлимитно","25","8","Бесплатно"], fr:["Illimité","25","8","Gratuit"], es:["Ilimitado","25","8","Gratis"], pt:["Ilimitado","25","8","Grátis"], de:["Unbegrenzt","25","8","Kostenlos"], it:["Illimitato","25","8","Gratis"], default:["Unlimited","25","8","Free"] };
const STAT_LABELS = {
  en:["AI Prompts","Languages","Categories","Always"],
  fr:["Prompts IA","Langues","Catégories","Toujours"],
  ar:["موجّهات الذكاء الاصطناعي","اللغات","الفئات","دائماً"],
  es:["Prompts de IA","Idiomas","Categorías","Siempre"],
  pt:["Prompts de IA","Idiomas","Categorias","Sempre"],
  de:["KI-Prompts","Sprachen","Kategorien","Immer"],
  it:["Prompt IA","Lingue","Categorie","Sempre"],
  zh:["AI提示词","语言","分类","永远"],
  ja:["AIプロンプト","言語","カテゴリー","いつでも"],
  ko:["AI 프롬프트","언어","카테고리","항상"],
  ru:["ИИ-Промпты","Языки","Категории","Всегда"],
};
const getStatLabel = (lang,i) => (STAT_LABELS[lang]??STAT_LABELS.en)[i];
const getStatVals  = (lang)   => STATS_VALS[lang]??STATS_VALS.default;

async function callClaude(system, userMsg) {
  const res = await fetch("https://claude-proxy.victoryhourdream.workers.dev/v1/messages", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system, messages:[{role:"user",content:userMsg}] }),
  });
  return (await res.json()).content?.[0]?.text || "";
}

const C = { gold:"#C9A84C", goldDim:"rgba(201,168,76,0.18)", navy:"#0B1D3A", bg:"#080E1A", card:"#0C1525", text:"#E8E0D0", muted:"rgba(232,224,208,0.42)" };

function VHLogo({ size="md" }) {
  const s=size==="lg"?44:30, fs=size==="lg"?"15px":"12px", fs2=size==="lg"?"10px":"8px";
  return (
    <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
      <div style={{position:"relative",width:s,height:s,flexShrink:0}}>
        <div style={{position:"absolute",inset:0,border:`2px solid ${C.gold}`,transform:"rotate(45deg)"}}/>
        <div style={{position:"absolute",inset:s/4+"px",background:C.gold,transform:"rotate(45deg)"}}/>
      </div>
      <div>
        <div style={{fontSize:fs,letterSpacing:"0.22em",color:C.gold,fontFamily:"'Georgia',serif",lineHeight:1}}>VICTORY HOUR</div>
        <div style={{fontSize:fs2,letterSpacing:"0.16em",color:"rgba(201,168,76,0.45)",fontFamily:"'Georgia',serif"}}>PROMPTVAULT™</div>
      </div>
    </div>
  );
}

function LangPicker({ lang, setLang }) {
  const [open,setOpen]=useState(false);
  const current=LANGUAGES.find(l=>l.code===lang);
  const ref=useRef(null);
  useEffect(()=>{
    function h(e){if(ref.current&&!ref.current.contains(e.target))setOpen(false);}
    document.addEventListener("mousedown",h); return()=>document.removeEventListener("mousedown",h);
  },[]);
  return (
    <div ref={ref} style={{position:"relative",zIndex:200}}>
      <button onClick={()=>setOpen(v=>!v)} style={{display:"flex",alignItems:"center",gap:"7px",background:"rgba(201,168,76,0.07)",border:`1px solid ${C.goldDim}`,padding:"7px 12px",cursor:"pointer",fontFamily:"'Georgia',serif"}}>
        <span style={{fontSize:"16px"}}>{current.flag}</span>
        <span style={{fontSize:"10px",letterSpacing:"0.12em",color:C.gold}}>{current.code.toUpperCase()}</span>
        <span style={{fontSize:"9px",color:C.muted}}>{open?"▴":"▾"}</span>
      </button>
      {open&&(
        <div style={{position:"absolute",top:"calc(100% + 6px)",right:0,background:"#0D1828",border:`1px solid ${C.goldDim}`,width:"195px",maxHeight:"340px",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.6)"}}>
          {LANGUAGES.map(l=>(
            <button key={l.code} onClick={()=>{setLang(l.code);setOpen(false);}}
              style={{display:"flex",alignItems:"center",gap:"10px",width:"100%",padding:"10px 14px",background:l.code===lang?"rgba(201,168,76,0.1)":"transparent",border:"none",cursor:"pointer",borderLeft:l.code===lang?`2px solid ${C.gold}`:"2px solid transparent"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,76,0.07)"}
              onMouseLeave={e=>e.currentTarget.style.background=l.code===lang?"rgba(201,168,76,0.1)":"transparent"}>
              <span style={{fontSize:"16px"}}>{l.flag}</span>
              <span style={{fontSize:"12px",color:C.text,fontFamily:"'Georgia',serif"}}>{l.label}</span>
              {l.code===lang&&<span style={{marginLeft:"auto",color:C.gold,fontSize:"10px"}}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PromptCard({ prompt, onClick, delay, lang }) {
  const [hovered,setHovered]=useState(false);
  return (
    <div onClick={onClick} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{background:hovered?"rgba(18,28,46,1)":C.card,padding:"26px",cursor:"pointer",transition:"all 0.22s",borderLeft:`2px solid ${hovered?C.gold:"transparent"}`,animation:`fadeUp 0.45s ease ${delay}ms both`}}>
      <div style={{marginBottom:"12px"}}>
        <span style={{fontSize:"9px",letterSpacing:"0.2em",color:"rgba(201,168,76,0.6)",padding:"3px 8px",border:`1px solid ${C.goldDim}`}}>{prompt.category?.toUpperCase()}</span>
      </div>
      <h3 style={{fontSize:"16px",fontWeight:"400",color:hovered?C.text:"#D4C49A",marginBottom:"9px",lineHeight:"1.3",fontFamily:"'Georgia',serif",transition:"color 0.2s"}}>{prompt.title}</h3>
      <p style={{fontSize:"12px",color:C.muted,lineHeight:"1.7",marginBottom:"14px"}}>{prompt.preview?.slice(0,108)}…</p>
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
        {prompt.tags?.map(tag=><span key={tag} style={{fontSize:"9px",letterSpacing:"0.1em",color:"rgba(201,168,76,0.45)"}}>#{tag}</span>)}
      </div>
      {hovered&&<div style={{marginTop:"13px",paddingTop:"11px",borderTop:`1px solid rgba(201,168,76,0.1)`,fontSize:"10px",letterSpacing:"0.17em",color:C.gold}}>{t(lang,"viewFull")}</div>}
    </div>
  );
}

function PromptModal({ prompt, onClose, lang }) {
  const [fullPrompt,setFullPrompt]=useState("");
  const [generating,setGenerating]=useState(true);
  const [copied,setCopied]=useState(false);
  const dir=isRTL(lang)?"rtl":"ltr";
  useEffect(()=>{
    (async()=>{
      try{
        const langName=LANGUAGES.find(l=>l.code===lang)?.label||"English";
        const text=await callClaude(
          `You write world-class AI prompts. Write the FULL prompt for the given title. You MUST write it entirely in ${langName}. Every single word must be in ${langName}. Translate input placeholders like [topic] or [industry] into ${langName} as well. 200-350 words. Return ONLY the prompt text, nothing else.`,
          `Title: ${prompt.title}\nCategory: ${prompt.category}\nWrite the complete prompt entirely in ${langName}.`
        );
        setFullPrompt(text);
      }catch{setFullPrompt(prompt.preview);}
      setGenerating(false);
    })();
  },[prompt,lang]);
  function copy(){navigator.clipboard.writeText(fullPrompt);setCopied(true);setTimeout(()=>setCopied(false),2000);}
  return (
    <div dir={dir} onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:"fixed",inset:0,background:"rgba(4,8,16,0.93)",zIndex:150,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px",backdropFilter:"blur(8px)"}}>
      <div style={{maxWidth:"740px",width:"100%",background:"#0D1828",border:`1px solid ${C.goldDim}`,padding:"44px",position:"relative",maxHeight:"82vh",overflowY:"auto"}}>
        <button onClick={onClose} style={{position:"absolute",top:"16px",right:"18px",background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:"18px"}}>✕</button>
        <div style={{fontSize:"10px",letterSpacing:"0.2em",color:C.gold,marginBottom:"9px"}}>{prompt.category?.toUpperCase()}</div>
        <h2 style={{fontSize:"24px",fontWeight:"400",fontFamily:"'Georgia',serif",color:C.text,marginBottom:"20px"}}>{prompt.title}</h2>
        <div style={{background:"rgba(201,168,76,0.03)",border:`1px solid rgba(201,168,76,0.09)`,padding:"20px",marginBottom:"20px",minHeight:"110px",fontSize:"13px",lineHeight:"1.9",color:generating?"rgba(232,224,208,0.3)":"rgba(232,224,208,0.88)",fontFamily:"'Courier New',monospace"}}>
          {generating?<span style={{letterSpacing:"0.25em",fontSize:"10px"}}>{t(lang,"retrieving")}</span>:fullPrompt}
        </div>
        <div style={{display:"flex",gap:"12px",flexWrap:"wrap",alignItems:"center"}}>
          <button onClick={copy} disabled={generating} style={{padding:"11px 24px",background:copied?"rgba(201,168,76,0.15)":C.gold,border:"none",cursor:"pointer",color:copied?C.gold:C.navy,fontSize:"11px",letterSpacing:"0.18em",fontFamily:"'Georgia',serif",transition:"all 0.2s"}}>
            {copied?t(lang,"copied"):t(lang,"copyPrompt")}
          </button>
          {prompt.tags?.map(tag=><span key={tag} style={{padding:"9px 12px",border:`1px solid rgba(201,168,76,0.12)`,fontSize:"9px",letterSpacing:"0.12em",color:"rgba(232,224,208,0.28)"}}>#{tag}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang,setLang]=useState("en");
  const [query,setQuery]=useState("");
  const [activeCategory,setActiveCategory]=useState("all");
  const [results,setResults]=useState([]);
  const [loading,setLoading]=useState(false);
  const [hasSearched,setHasSearched]=useState(false);
  const [selectedPrompt,setSelectedPrompt]=useState(null);

  useEffect(()=>{
    try{const l=localStorage.getItem("pv_lang");if(l)setLang(l);}catch{}
  },[]);

  function changeLang(l){setLang(l);localStorage.setItem("pv_lang",l);}

  async function doSearch(){
    if(!query.trim())return;
    setLoading(true);setHasSearched(true);setResults([]);
    const langName=LANGUAGES.find(l=>l.code===lang)?.label||"English";
    try{
      const raw=await callClaude(
        `You are the curator of PromptVault — a prompt generator tool. Return exactly 9 relevant prompt entries as a raw JSON array. Each: title, category (business/creative/marketing/coding/education/productivity/ai-tools), tags (3 items), preview (~110 chars). Write ALL text in ${langName}. Return ONLY the JSON array, no backticks.`,
        `Search: "${query}". Category: ${activeCategory}.`
      );
      setResults(JSON.parse(raw.trim()).map((p,i)=>({...p,id:`ai-${i}`})));
    }catch{setResults(SEED_PROMPTS.filter(p=>activeCategory==="all"||p.category===activeCategory).slice(0,9));}
    setLoading(false);
  }

  const dir=isRTL(lang)?"rtl":"ltr";
  const displayPrompts=hasSearched?results:SEED_PROMPTS.filter(p=>activeCategory==="all"||p.category===activeCategory);

  return (
    <div dir={dir} style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Georgia',serif",position:"relative",overflowX:"hidden"}}>
      <div style={{position:"fixed",top:"-15%",left:"50%",transform:"translateX(-50%)",width:"70vw",height:"55vh",background:"radial-gradient(ellipse, rgba(201,168,76,0.055) 0%, transparent 68%)",pointerEvents:"none",zIndex:0}}/>

      {/* HEADER */}
      <header style={{borderBottom:`1px solid rgba(201,168,76,0.12)`,padding:"0 36px",display:"flex",alignItems:"center",justifyContent:"space-between",height:"66px",background:"rgba(8,14,26,0.95)",backdropFilter:"blur(18px)",position:"sticky",top:0,zIndex:100}}>
        <VHLogo/>
        <LangPicker lang={lang} setLang={changeLang}/>
      </header>

      <main style={{maxWidth:"1200px",margin:"0 auto",padding:"52px 36px 80px",position:"relative",zIndex:1}}>

        {/* HERO */}
        <div style={{textAlign:"center",marginBottom:"48px"}}>
          <div style={{display:"inline-block",fontSize:"10px",letterSpacing:"0.26em",color:C.gold,marginBottom:"18px",padding:"5px 15px",border:`1px solid rgba(201,168,76,0.2)`}}>
            VICTORY HOUR MULTIMEDIA · FREE TOOL · NO SIGNUP REQUIRED
          </div>
          <h1 style={{fontSize:"clamp(38px,7vw,84px)",fontWeight:"400",lineHeight:"1.0",color:C.text,margin:"0 0 14px",letterSpacing:"-0.025em"}}>
            {t(lang,"headline")}<br/><span style={{color:C.gold,fontStyle:"italic"}}>{t(lang,"sub")}</span>
          </h1>
          <p style={{fontSize:"15px",color:C.muted,maxWidth:"420px",margin:"0 auto 34px",lineHeight:"1.85"}}>{t(lang,"tagline")}</p>
          <div style={{display:"flex",maxWidth:"680px",margin:"0 auto",border:`1px solid rgba(201,168,76,0.28)`,background:"rgba(18,26,42,0.85)",backdropFilter:"blur(10px)"}}>
            <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSearch()} placeholder={t(lang,"searchPH")}
              style={{flex:1,padding:"17px 20px",background:"transparent",border:"none",outline:"none",color:C.text,fontSize:"14px",fontFamily:"'Georgia',serif"}}/>
            <button onClick={doSearch} disabled={loading} style={{padding:"17px 28px",background:loading?"rgba(201,168,76,0.3)":C.gold,border:"none",cursor:"pointer",color:C.navy,fontSize:"11px",letterSpacing:"0.18em",fontFamily:"'Georgia',serif",transition:"all 0.2s",whiteSpace:"nowrap"}}>
              {loading?t(lang,"searching"):t(lang,"searchBtn")}
            </button>
          </div>
          <div style={{marginTop:"14px",fontSize:"11px",color:"rgba(201,168,76,0.4)",letterSpacing:"0.1em"}}>
            ⓘ No account needed · No email collected · Completely free
          </div>
        </div>

        {/* STATS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1px",background:"rgba(201,168,76,0.07)",border:`1px solid rgba(201,168,76,0.07)`,marginBottom:"44px"}}>
          {getStatVals(lang).map((val,i)=>(
            <div key={i} style={{padding:"22px 16px",background:C.bg,textAlign:"center"}}>
              <div style={{fontSize:"18px",color:C.gold,marginBottom:"5px"}}>{val}</div>
              <div style={{fontSize:"9px",letterSpacing:"0.18em",color:"rgba(232,224,208,0.28)"}}>{getStatLabel(lang,i)}</div>
            </div>
          ))}
        </div>

        {/* CATEGORIES */}
        <div style={{display:"flex",gap:"7px",flexWrap:"wrap",marginBottom:"28px"}}>
          {CATEGORIES.map(cat=>(
            <button key={cat.id} onClick={()=>{setActiveCategory(cat.id);setHasSearched(false);}}
              style={{padding:"6px 15px",background:activeCategory===cat.id?C.gold:"transparent",border:`1px solid ${activeCategory===cat.id?C.gold:C.goldDim}`,color:activeCategory===cat.id?C.navy:C.muted,cursor:"pointer",fontSize:"10px",letterSpacing:"0.12em",fontFamily:"'Georgia',serif",transition:"all 0.2s"}}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* LABEL */}
        <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"22px"}}>
          <span style={{fontSize:"9px",letterSpacing:"0.26em",color:"rgba(201,168,76,0.5)",whiteSpace:"nowrap"}}>
            {hasSearched?`${t(lang,"results")} "${query.toUpperCase()}"`:t(lang,"featured")}
          </span>
          <div style={{flex:1,height:"1px",background:"rgba(201,168,76,0.07)"}}/>
          <span style={{fontSize:"9px",letterSpacing:"0.13em",color:"rgba(232,224,208,0.18)",whiteSpace:"nowrap"}}>
            {loading?t(lang,"searching"):`${displayPrompts.length} ${t(lang,"of")} UNLIMITED`}
          </span>
        </div>

        {/* GRID */}
        {loading?(
          <div style={{textAlign:"center",padding:"80px 0",color:"rgba(201,168,76,0.4)"}}>
            <div style={{fontSize:"10px",letterSpacing:"0.26em",marginBottom:"20px"}}>{t(lang,"searching")}</div>
            <div style={{display:"flex",justifyContent:"center",gap:"7px"}}>
              {[0,1,2].map(i=><div key={i} style={{width:"7px",height:"7px",background:C.gold,borderRadius:"50%",animation:`pulse 1.1s ease-in-out ${i*0.2}s infinite`}}/>)}
            </div>
          </div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:"1px",background:"rgba(201,168,76,0.06)"}}>
            {displayPrompts.map((prompt,i)=>(
              <PromptCard key={prompt.id??i} prompt={prompt} delay={i*50} lang={lang} onClick={()=>setSelectedPrompt(prompt)}/>
            ))}
          </div>
        )}

        {/* ECOSYSTEM */}
        <div style={{marginTop:"56px",marginBottom:"56px"}}>
          <div style={{textAlign:"center",marginBottom:"36px"}}>
            <div style={{fontSize:"10px",letterSpacing:"0.3em",color:C.gold,marginBottom:"10px"}}>VICTORY HOUR ECOSYSTEM</div>
            <h2 style={{fontSize:"28px",fontWeight:"400",fontFamily:"'Georgia',serif",color:C.text,margin:"0 0 10px"}}>
              Tools Built for <span style={{color:C.gold,fontStyle:"italic"}}>Builders.</span>
            </h2>
            <p style={{fontSize:"13px",color:C.muted,maxWidth:"400px",margin:"0 auto",lineHeight:"1.7"}}>
              Everything you need to build, automate, and grow — under one roof.
            </p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"1px",background:"rgba(201,168,76,0.07)"}}>
            {[
              {icon:"📧",name:"Claude Vibe Guide",desc:"Master Claude AI from scratch",url:"https://victoryhour.gumroad.com/l/uayuj"},
              {icon:"⚖️",name:"ComplianceForge™",desc:"AI-powered regulatory compliance",url:"https://nhp-comply.pages.dev"},
              {icon:"📞",name:"VictoryReception AI",desc:"AI voicemail in any language",url:"https://victoryreception.com"},
              {icon:"🎯",name:"Niche Hunter AI",desc:"Find your perfect profitable niche",url:"https://victoryhour.gumroad.com/l/nichehunter"},
              {icon:"🌐",name:"AI Website Mastery™",desc:"Build faster, safer websites with Claude & Cloudflare",url:"https://victoryhour.gumroad.com/l/eczzcc"},
              {icon:"📊",name:"Claude + Excel Revolution™",desc:"Upgrade your spreadsheet workflow with Claude AI",url:"https://victoryhour.gumroad.com/l/peesqk"},
              {icon:"🧘",name:"Break the Cycle",desc:"Emotional control and behavioral mastery",url:"https://victoryhour.gumroad.com/l/znipe"},
              {icon:"🎬",name:"Claudize It™",desc:"Build a cinematic AI ad with Claude",url:"https://victoryhour.gumroad.com/l/vxhvu"},
              {icon:"📖",name:"Victory Hour Claude Vibe Guide",desc:"The complete guide to mastering Claude AI",url:"https://victoryhour.gumroad.com/l/uayuj"},
              {icon:"🛍️",name:"Etsy Marketing Scripts",desc:"100 done-for-you marketing scripts for Etsy sellers",url:"https://victoryhour.gumroad.com/l/pshvb"},
            ].map((p,i)=>(
              <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                style={{display:"block",padding:"28px 24px",background:C.card,textDecoration:"none",transition:"all 0.22s",borderLeft:"2px solid transparent"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(18,28,46,1)";e.currentTarget.style.borderLeft=`2px solid ${C.gold}`;}}
                onMouseLeave={e=>{e.currentTarget.style.background=C.card;e.currentTarget.style.borderLeft="2px solid transparent";}}>
                <div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div>
                <div style={{fontSize:"13px",fontWeight:"400",color:C.text,fontFamily:"'Georgia',serif",marginBottom:"8px"}}>{p.name}</div>
                <div style={{fontSize:"11px",color:C.muted,lineHeight:"1.6",marginBottom:"14px"}}>{p.desc}</div>
                <div style={{fontSize:"10px",letterSpacing:"0.15em",color:C.gold}}>GET IT →</div>
              </a>
            ))}
          </div>
        </div>

        {/* ACADEMY BANNER */}
        <div style={{border:`1px solid rgba(201,168,76,0.18)`,padding:"40px 36px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"24px",background:"rgba(11,29,58,0.35)",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,right:0,width:"250px",height:"100%",background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.03))",pointerEvents:"none"}}/>
          <div>
            <div style={{fontSize:"10px",letterSpacing:"0.24em",color:C.gold,marginBottom:"9px"}}>VICTORY HOUR ACADEMY</div>
            <h3 style={{fontSize:"21px",fontWeight:"400",fontFamily:"'Georgia',serif",color:C.text,lineHeight:"1.3",marginBottom:"7px"}}>
              {t(lang,"deeperTitle")}<br/><span style={{fontStyle:"italic",color:C.gold}}>{t(lang,"deeperSub")}</span>
            </h3>
            <p style={{fontSize:"13px",color:C.muted,lineHeight:"1.7",maxWidth:"380px"}}>{t(lang,"deeperBody")}</p>
          </div>
          <div style={{padding:"15px 32px",background:"rgba(201,168,76,0.15)",border:`1px solid ${C.gold}`,color:C.gold,fontSize:"11px",letterSpacing:"0.18em",fontFamily:"'Georgia',serif",whiteSpace:"nowrap",flexShrink:0}}>
            {t(lang,"joinFree")}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{borderTop:`1px solid rgba(201,168,76,0.09)`,padding:"26px 36px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"14px",background:"rgba(8,14,26,0.95)",position:"relative",zIndex:1}}>
        <VHLogo/>
        <div style={{fontSize:"9px",letterSpacing:"0.16em",color:"rgba(201,168,76,0.5)",padding:"5px 12px",border:`1px solid rgba(201,168,76,0.12)`}}>{t(lang,"hunger")}</div>
        <div style={{fontSize:"10px",color:"rgba(232,224,208,0.18)",letterSpacing:"0.1em",textAlign:"right"}}>
          © 2025 VICTORY HOUR MULTIMEDIA INC.<br/><span style={{color:"rgba(201,168,76,0.3)"}}>{t(lang,"tagline2")}</span>
        </div>
      </footer>

      {selectedPrompt&&<PromptModal prompt={selectedPrompt} onClose={()=>setSelectedPrompt(null)} lang={lang}/>}

      <style>{`
        @keyframes pulse{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#080E1A;}
        ::-webkit-scrollbar-thumb{background:rgba(201,168,76,0.2);}
        input::placeholder{color:rgba(232,224,208,0.25);}
      `}</style>
    </div>
  );
}
