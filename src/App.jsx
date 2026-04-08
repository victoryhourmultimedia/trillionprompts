import { useState, useEffect, useRef } from "react";

// ── 25 LANGUAGES ─────────────────────────────────────────────────────────────
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
  en:{ headline:"Unlimited", sub:"AI Prompts.", tagline:"The world's largest prompt archive — indexed, rated, and ready to deploy.", searchPH:"Search Unlimited prompts…", searchBtn:"SEARCH", searching:"SEARCHING…", featured:"FEATURED FROM THE ARCHIVE", results:"RESULTS FOR", memberSince:"MEMBER SINCE", welcomeBack:"WELCOME BACK", unlimited:"UNLIMITED ACCESS", joinAcademy:"JOIN VICTORY HOUR ACADEMY", signOut:"SIGN OUT", createAcc:"CREATE FREE ACCOUNT →", signInBtn:"SIGN IN →", nameLabel:"FULL NAME", emailLabel:"EMAIL ADDRESS", passLabel:"PASSWORD", createTab:"CREATE ACCOUNT", loginTab:"SIGN IN", freeAccess:"Free access to Unlimited prompts.", noLimits:"Create your free account. No credit card. No limits.", welcomeBack2:"Welcome back to the", archive:"archive.", alreadyHave:"Already have an account?", newHere:"New here?", hunger:"♥ 10% OF ALL PROCEEDS FIGHTS WORLD HUNGER", deeperTitle:"Go deeper with AI training", deeperSub:"built for builders.", deeperBody:"Courses, community, and tools inside Victory Hour Academy. Free to join — just like PromptVault.", joinFree:"JOIN FREE →", copyPrompt:"COPY PROMPT", copied:"✓ COPIED", retrieving:"RETRIEVING FROM THE ARCHIVE…", viewFull:"VIEW FULL PROMPT →", of:"OF", tagline2:"Clarity. Strategy. Action." },
  fr:{ headline:"Un Trillion", sub:"de Prompts IA.", tagline:"La plus grande archive de prompts — indexée, notée, prête à l'emploi.", searchPH:"Chercher parmi un trillion de prompts…", searchBtn:"CHERCHER", searching:"RECHERCHE…", featured:"SÉLECTION DE L'ARCHIVE", results:"RÉSULTATS POUR", memberSince:"MEMBRE DEPUIS", welcomeBack:"BIENVENUE", unlimited:"ACCÈS ILLIMITÉ", joinAcademy:"REJOINDRE VICTORY HOUR ACADEMY", signOut:"SE DÉCONNECTER", createAcc:"CRÉER UN COMPTE GRATUIT →", signInBtn:"SE CONNECTER →", nameLabel:"NOM COMPLET", emailLabel:"ADRESSE EMAIL", passLabel:"MOT DE PASSE", createTab:"CRÉER UN COMPTE", loginTab:"CONNEXION", freeAccess:"Accès gratuit à un trillion de prompts.", noLimits:"Créez votre compte gratuit. Sans carte. Sans limites.", welcomeBack2:"Bon retour dans l'", archive:"archive.", alreadyHave:"Déjà un compte?", newHere:"Nouveau ici?", hunger:"♥ 10% DES REVENUS LUTTE CONTRE LA FAIM", deeperTitle:"Approfondissez votre formation IA", deeperSub:"faite pour les créateurs.", deeperBody:"Cours, communauté et outils dans Victory Hour Academy. Gratuit comme PromptVault.", joinFree:"REJOINDRE →", copyPrompt:"COPIER", copied:"✓ COPIÉ", retrieving:"RÉCUPÉRATION…", viewFull:"VOIR LE PROMPT COMPLET →", of:"SUR", tagline2:"Clarté. Stratégie. Action." },
  ar:{ headline:"تريليون", sub:"موجّه للذكاء الاصطناعي.", tagline:"أكبر أرشيف للموجّهات في العالم — مفهرس، مُقيّم، جاهز للاستخدام.", searchPH:"ابحث في تريليون موجّه…", searchBtn:"بحث", searching:"جارٍ البحث…", featured:"مختارات من الأرشيف", results:"نتائج لـ", memberSince:"عضو منذ", welcomeBack:"مرحباً بعودتك", unlimited:"وصول غير محدود", joinAcademy:"انضم لـ Victory Hour Academy", signOut:"تسجيل الخروج", createAcc:"إنشاء حساب مجاني →", signInBtn:"تسجيل الدخول →", nameLabel:"الاسم الكامل", emailLabel:"البريد الإلكتروني", passLabel:"كلمة المرور", createTab:"إنشاء حساب", loginTab:"تسجيل الدخول", freeAccess:"وصول مجاني لتريليون موجّه.", noLimits:"أنشئ حسابك المجاني. بدون بطاقة. بدون حدود.", welcomeBack2:"مرحباً بعودتك إلى", archive:"الأرشيف.", alreadyHave:"لديك حساب؟", newHere:"هنا لأول مرة؟", hunger:"♥ ١٠٪ من العائدات لمحاربة الجوع", deeperTitle:"تعمّق في تدريب الذكاء الاصطناعي", deeperSub:"مصمّم للبنّائين.", deeperBody:"دورات ومجتمع وأدوات داخل Victory Hour Academy. مجاني مثل PromptVault.", joinFree:"انضم مجاناً →", copyPrompt:"نسخ", copied:"✓ تم النسخ", retrieving:"جارٍ الاسترداد…", viewFull:"عرض الموجّه الكامل →", of:"من", tagline2:"وضوح. استراتيجية. عمل." },
  es:{ headline:"Un Billón", sub:"de Prompts de IA.", tagline:"El archivo de prompts más grande del mundo — indexado, valorado, listo para usar.", searchPH:"Buscar entre un billón de prompts…", searchBtn:"BUSCAR", searching:"BUSCANDO…", featured:"DESTACADOS DEL ARCHIVO", results:"RESULTADOS PARA", memberSince:"MIEMBRO DESDE", welcomeBack:"BIENVENIDO", unlimited:"ACCESO ILIMITADO", joinAcademy:"ÚNETE A VICTORY HOUR ACADEMY", signOut:"CERRAR SESIÓN", createAcc:"CREAR CUENTA GRATIS →", signInBtn:"INICIAR SESIÓN →", nameLabel:"NOMBRE COMPLETO", emailLabel:"CORREO ELECTRÓNICO", passLabel:"CONTRASEÑA", createTab:"CREAR CUENTA", loginTab:"INICIAR SESIÓN", freeAccess:"Acceso gratuito a un billón de prompts.", noLimits:"Crea tu cuenta gratis. Sin tarjeta. Sin límites.", welcomeBack2:"Bienvenido de nuevo al", archive:"archivo.", alreadyHave:"¿Ya tienes cuenta?", newHere:"¿Nuevo aquí?", hunger:"♥ EL 10% LUCHA CONTRA EL HAMBRE", deeperTitle:"Profundiza en formación IA", deeperSub:"hecha para creadores.", deeperBody:"Cursos, comunidad y herramientas en Victory Hour Academy. Gratis como PromptVault.", joinFree:"UNIRSE GRATIS →", copyPrompt:"COPIAR", copied:"✓ COPIADO", retrieving:"RECUPERANDO…", viewFull:"VER PROMPT COMPLETO →", of:"DE", tagline2:"Claridad. Estrategia. Acción." },
  pt:{ headline:"Um Trilhão", sub:"de Prompts de IA.", tagline:"O maior arquivo de prompts do mundo — indexado, avaliado, pronto para usar.", searchPH:"Pesquisar em um trilhão de prompts…", searchBtn:"PESQUISAR", searching:"PESQUISANDO…", featured:"DESTAQUES DO ARQUIVO", results:"RESULTADOS PARA", memberSince:"MEMBRO DESDE", welcomeBack:"BEM-VINDO", unlimited:"ACESSO ILIMITADO", joinAcademy:"ENTRAR NA VICTORY HOUR ACADEMY", signOut:"SAIR", createAcc:"CRIAR CONTA GRÁTIS →", signInBtn:"ENTRAR →", nameLabel:"NOME COMPLETO", emailLabel:"EMAIL", passLabel:"SENHA", createTab:"CRIAR CONTA", loginTab:"ENTRAR", freeAccess:"Acesso gratuito a um trilhão de prompts.", noLimits:"Crie sua conta grátis. Sem cartão. Sem limites.", welcomeBack2:"Bem-vindo de volta ao", archive:"arquivo.", alreadyHave:"Já tem conta?", newHere:"Novo aqui?", hunger:"♥ 10% DA RECEITA COMBATE A FOME", deeperTitle:"Aprofunde-se no treinamento de IA", deeperSub:"feito para criadores.", deeperBody:"Cursos, comunidade e ferramentas na Victory Hour Academy. Grátis como PromptVault.", joinFree:"ENTRAR GRÁTIS →", copyPrompt:"COPIAR", copied:"✓ COPIADO", retrieving:"RECUPERANDO…", viewFull:"VER PROMPT COMPLETO →", of:"DE", tagline2:"Clareza. Estratégia. Ação." },
  de:{ headline:"Eine Billion", sub:"KI-Prompts.", tagline:"Das weltweit größte Prompt-Archiv — indexiert, bewertet, einsatzbereit.", searchPH:"Eine Billion Prompts durchsuchen…", searchBtn:"SUCHEN", searching:"SUCHE…", featured:"HIGHLIGHTS AUS DEM ARCHIV", results:"ERGEBNISSE FÜR", memberSince:"MITGLIED SEIT", welcomeBack:"WILLKOMMEN ZURÜCK", unlimited:"UNBEGRENZTER ZUGANG", joinAcademy:"VICTORY HOUR ACADEMY BEITRETEN", signOut:"ABMELDEN", createAcc:"KONTO ERSTELLEN →", signInBtn:"ANMELDEN →", nameLabel:"VOLLSTÄNDIGER NAME", emailLabel:"E-MAIL", passLabel:"PASSWORT", createTab:"KONTO ERSTELLEN", loginTab:"ANMELDEN", freeAccess:"Kostenloser Zugang zu einer Billion Prompts.", noLimits:"Kostenloses Konto. Keine Karte. Keine Limits.", welcomeBack2:"Willkommen zurück im", archive:"Archiv.", alreadyHave:"Bereits ein Konto?", newHere:"Neu hier?", hunger:"♥ 10% DER EINNAHMEN BEKÄMPFEN HUNGER", deeperTitle:"KI-Training vertiefen", deeperSub:"für Macher gemacht.", deeperBody:"Kurse, Community und Tools in der Victory Hour Academy. Kostenlos wie PromptVault.", joinFree:"KOSTENLOS BEITRETEN →", copyPrompt:"KOPIEREN", copied:"✓ KOPIERT", retrieving:"AUS ARCHIV ABRUFEN…", viewFull:"VOLLSTÄNDIGEN PROMPT →", of:"VON", tagline2:"Klarheit. Strategie. Aktion." },
  it:{ headline:"Un Trilione", sub:"di Prompt IA.", tagline:"Il più grande archivio di prompt al mondo — indicizzato, valutato, pronto all'uso.", searchPH:"Cerca tra un trilione di prompt…", searchBtn:"CERCA", searching:"RICERCA…", featured:"IN EVIDENZA DALL'ARCHIVIO", results:"RISULTATI PER", memberSince:"MEMBRO DAL", welcomeBack:"BENTORNATO", unlimited:"ACCESSO ILLIMITATO", joinAcademy:"UNISCITI A VICTORY HOUR ACADEMY", signOut:"ESCI", createAcc:"CREA ACCOUNT GRATUITO →", signInBtn:"ACCEDI →", nameLabel:"NOME COMPLETO", emailLabel:"EMAIL", passLabel:"PASSWORD", createTab:"CREA ACCOUNT", loginTab:"ACCEDI", freeAccess:"Accesso gratuito a un trilione di prompt.", noLimits:"Crea il tuo account. Nessuna carta. Nessun limite.", welcomeBack2:"Bentornato nell'", archive:"archivio.", alreadyHave:"Hai già un account?", newHere:"Sei nuovo?", hunger:"♥ IL 10% DEI RICAVI COMBATTE LA FAME", deeperTitle:"Approfondisci la formazione IA", deeperSub:"pensata per i creatori.", deeperBody:"Corsi, community e strumenti nella Victory Hour Academy. Gratis come PromptVault.", joinFree:"UNISCITI GRATIS →", copyPrompt:"COPIA", copied:"✓ COPIATO", retrieving:"RECUPERO…", viewFull:"PROMPT COMPLETO →", of:"DI", tagline2:"Chiarezza. Strategia. Azione." },
  zh:{ headline:"一万亿", sub:"AI 提示词。", tagline:"全球最大提示词档案库 — 已索引、已评级、随时可用。", searchPH:"搜索一万亿条提示词…", searchBtn:"搜索", searching:"搜索中…", featured:"档案库精选", results:"搜索结果：", memberSince:"加入日期", welcomeBack:"欢迎回来", unlimited:"无限制访问", joinAcademy:"加入 Victory Hour Academy", signOut:"退出", createAcc:"免费注册 →", signInBtn:"登录 →", nameLabel:"全名", emailLabel:"邮箱", passLabel:"密码", createTab:"创建账户", loginTab:"登录", freeAccess:"免费访问一万亿条提示词。", noLimits:"免费注册，无需信用卡，无限制。", welcomeBack2:"欢迎回到", archive:"档案库。", alreadyHave:"已有账户？", newHere:"第一次来？", hunger:"♥ 所有收入的10%用于对抗世界饥饿", deeperTitle:"深入学习AI训练", deeperSub:"为创作者而生。", deeperBody:"Victory Hour Academy提供课程、社区和工具。免费加入。", joinFree:"免费加入 →", copyPrompt:"复制", copied:"✓ 已复制", retrieving:"检索中…", viewFull:"查看完整提示词 →", of:"共", tagline2:"清晰。策略。行动。" },
  ja:{ headline:"1兆件の", sub:"AIプロンプト。", tagline:"世界最大のプロンプトアーカイブ — インデックス化、評価済み、すぐに使える。", searchPH:"1兆件のプロンプトを検索…", searchBtn:"検索", searching:"検索中…", featured:"アーカイブのおすすめ", results:"検索結果：", memberSince:"登録日", welcomeBack:"おかえりなさい", unlimited:"無制限アクセス", joinAcademy:"Victory Hour Academyに参加", signOut:"ログアウト", createAcc:"無料アカウント作成 →", signInBtn:"ログイン →", nameLabel:"氏名", emailLabel:"メールアドレス", passLabel:"パスワード", createTab:"アカウント作成", loginTab:"ログイン", freeAccess:"1兆件のプロンプトに無料アクセス。", noLimits:"無料アカウントを作成。カード不要。", welcomeBack2:"アーカイブへ", archive:"ようこそ。", alreadyHave:"アカウントをお持ちですか？", newHere:"初めてですか？", hunger:"♥ 収益の10%が世界の飢餓と戦います", deeperTitle:"AIトレーニングをさらに深く", deeperSub:"クリエイターのために。", deeperBody:"Victory Hour Academyでコース、コミュニティ、ツールを。無料。", joinFree:"無料で参加 →", copyPrompt:"コピー", copied:"✓ コピー済み", retrieving:"取得中…", viewFull:"完全なプロンプトを表示 →", of:"件中", tagline2:"明確。戦略。行動。" },
  ko:{ headline:"1조 개의", sub:"AI 프롬프트.", tagline:"세계 최대의 프롬프트 아카이브 — 색인화, 평가 완료, 바로 사용 가능.", searchPH:"1조 개의 프롬프트 검색…", searchBtn:"검색", searching:"검색 중…", featured:"아카이브 추천", results:"검색 결과:", memberSince:"가입일", welcomeBack:"환영합니다", unlimited:"무제한 액세스", joinAcademy:"Victory Hour Academy 가입", signOut:"로그아웃", createAcc:"무료 계정 만들기 →", signInBtn:"로그인 →", nameLabel:"이름", emailLabel:"이메일", passLabel:"비밀번호", createTab:"계정 만들기", loginTab:"로그인", freeAccess:"1조 개의 프롬프트에 무료 액세스.", noLimits:"무료 계정을 만드세요. 카드 불필요.", welcomeBack2:"아카이브로", archive:"돌아오신 것을 환영합니다.", alreadyHave:"이미 계정이 있으신가요?", newHere:"처음이신가요?", hunger:"♥ 모든 수익의 10%는 세계 기아 퇴치에", deeperTitle:"AI 교육을 더 깊이", deeperSub:"크리에이터를 위해.", deeperBody:"Victory Hour Academy에서 강좌, 커뮤니티, 도구를. 무료.", joinFree:"무료로 가입 →", copyPrompt:"복사", copied:"✓ 복사됨", retrieving:"가져오는 중…", viewFull:"전체 프롬프트 보기 →", of:"중", tagline2:"명확함. 전략. 실행." },
  ru:{ headline:"Один Триллион", sub:"ИИ-Промптов.", tagline:"Крупнейший архив промптов — индексированный, оценённый, готовый к применению.", searchPH:"Поиск по триллиону промптов…", searchBtn:"ПОИСК", searching:"ПОИСК…", featured:"ИЗБРАННОЕ ИЗ АРХИВА", results:"РЕЗУЛЬТАТЫ ПО", memberSince:"УЧАСТНИК С", welcomeBack:"С ВОЗВРАЩЕНИЕМ", unlimited:"БЕЗЛИМИТНЫЙ ДОСТУП", joinAcademy:"ПРИСОЕДИНИТЬСЯ К VICTORY HOUR ACADEMY", signOut:"ВЫЙТИ", createAcc:"СОЗДАТЬ АККАУНТ →", signInBtn:"ВОЙТИ →", nameLabel:"ПОЛНОЕ ИМЯ", emailLabel:"EMAIL", passLabel:"ПАРОЛЬ", createTab:"СОЗДАТЬ АККАУНТ", loginTab:"ВОЙТИ", freeAccess:"Бесплатный доступ к триллиону промптов.", noLimits:"Создайте аккаунт. Без карты. Без ограничений.", welcomeBack2:"Добро пожаловать обратно в", archive:"архив.", alreadyHave:"Уже есть аккаунт?", newHere:"Новичок?", hunger:"♥ 10% ДОХОДОВ — НА БОРЬБУ С ГОЛОДОМ", deeperTitle:"Углубитесь в обучение ИИ", deeperSub:"созданное для творцов.", deeperBody:"Курсы, сообщество и инструменты в Victory Hour Academy. Бесплатно.", joinFree:"ПРИСОЕДИНИТЬСЯ →", copyPrompt:"КОПИРОВАТЬ", copied:"✓ СКОПИРОВАНО", retrieving:"ПОЛУЧЕНИЕ…", viewFull:"ПОЛНЫЙ ПРОМПТ →", of:"ИЗ", tagline2:"Ясность. Стратегия. Действие." },
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
  { id:1,  category:"business",     title:"Cold Email Closer",         uses:"2.4M", rating:4.9, tags:["sales","outreach","B2B"],           preview:"Write a cold email that opens with a specific pain point relevant to [industry], positions [product] as the obvious solution, and closes with a low-friction CTA..." },
  { id:2,  category:"creative",     title:"Villain With Empathy",      uses:"1.8M", rating:4.8, tags:["fiction","character","story"],       preview:"Write a scene from the villain's perspective where the reader completely understands — and almost agrees with — their worldview..." },
  { id:3,  category:"marketing",    title:"Hook Formula Machine",      uses:"3.1M", rating:5.0, tags:["copywriting","social","viral"],      preview:"Generate 10 scroll-stopping hooks for [topic] using proven structures: curiosity gap, bold claim, counterintuitive truth, surprising statistic..." },
  { id:4,  category:"coding",       title:"Debug Like a Senior",       uses:"1.2M", rating:4.7, tags:["debugging","review","engineering"],  preview:"Act as a senior software engineer doing a code review. First identify the bugs, then explain WHY each is a problem, then rewrite the fix..." },
  { id:5,  category:"education",    title:"Feynman Explainer",         uses:"2.9M", rating:4.9, tags:["learning","simplify","teaching"],    preview:"Explain [complex concept] as if you're Richard Feynman teaching a curious 12-year-old. Use one memorable analogy and one surprising fact..." },
  { id:6,  category:"productivity", title:"Weekly Brain Dump Sorter",  uses:"890K", rating:4.6, tags:["GTD","organization","clarity"],      preview:"I'm going to dump everything on my mind. Categorize into: urgent tasks, important-not-urgent, ideas to explore, delegate, let go..." },
  { id:7,  category:"ai-tools",     title:"Prompt Refiner Pro",        uses:"4.2M", rating:5.0, tags:["meta","prompting","optimization"],   preview:"I'm going to give you a weak prompt. Analyze it for missing context, vague instructions, unclear output format. Then rewrite it as world-class..." },
  { id:8,  category:"business",     title:"Investor Pitch Surgeon",    uses:"567K", rating:4.8, tags:["fundraising","pitch","startup"],     preview:"Review my pitch as a skeptical Series A investor. For each slide, tell me what question it raises that it doesn't answer, and what's missing..." },
  { id:9,  category:"creative",     title:"First Line Magnet",         uses:"1.5M", rating:4.7, tags:["opening lines","fiction","hooks"],   preview:"Write 20 first sentences for a story about [theme]. Each must create an immediate question that makes the reader HAVE to read the next line..." },
  { id:10, category:"marketing",    title:"Testimonial Goldminer",     uses:"722K", rating:4.5, tags:["social proof","conversion","copy"],  preview:"Here are my raw customer reviews: [paste]. Extract the most emotionally resonant phrases, identify the core transformation described..." },
  { id:11, category:"coding",       title:"Architecture Advisor",      uses:"934K", rating:4.8, tags:["system design","scalability","plan"],preview:"I'm building [describe app]. Help me think through: the data model, key technical risks, right tech stack before I write a single line of code..." },
  { id:12, category:"education",    title:"Socratic Challenger",       uses:"1.1M", rating:4.9, tags:["critical thinking","philosophy"],    preview:"I believe [statement]. Challenge this belief Socratically. Don't tell me I'm wrong — ask questions that reveal the assumptions beneath my position..." },
];

const STATS_VALS = { ar:["1,000,000,000,000","847+","4.2 مليون","4.8 ★"], default:["Unlimited","25","8","Free"] };
const STAT_LABELS = {
  en:["AI Prompts","Languages","Categories","Always"],
  fr:["Prompts Indexés","Catégories","Membres","Note Moyenne"],
  ar:["الموجّهات المفهرسة","الفئات","الأعضاء","متوسط التقييم"],
  es:["Prompts Indexados","Categorías","Miembros","Valoración"],
  pt:["Prompts Indexados","Categorias","Membros","Avaliação"],
  de:["Prompts Indexiert","Kategorien","Mitglieder","Ø Bewertung"],
  it:["Prompt Indicizzati","Categorie","Membri","Valutazione"],
  zh:["已索引提示词","分类","会员","平均评分"],
  ja:["プロンプト数","カテゴリー","会員数","平均評価"],
  ko:["프롬프트 수","카테고리","회원","평균 평점"],
  ru:["Промптов","Категории","Участников","Ср. Оценка"],
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

function GoldCorners() {
  return <>{[[{top:"14px",left:"14px"},{borderTop:`2px solid ${C.gold}`,borderLeft:`2px solid ${C.gold}`}],[{top:"14px",right:"14px"},{borderTop:`2px solid ${C.gold}`,borderRight:`2px solid ${C.gold}`}],[{bottom:"14px",left:"14px"},{borderBottom:`2px solid ${C.gold}`,borderLeft:`2px solid ${C.gold}`}],[{bottom:"14px",right:"14px"},{borderBottom:`2px solid ${C.gold}`,borderRight:`2px solid ${C.gold}`}]].map(([pos,borders],i)=><div key={i} style={{position:"absolute",width:"18px",height:"18px",...pos,...borders}}/>)}</>;
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
        <div style={{position:"absolute",top:"calc(100% + 6px)",right:0,background:"#0D1828",border:`1px solid ${C.goldDim}`,width:"195px",maxHeight:"340px",overflowY:"auto",animation:"fadeUp 0.18s ease",boxShadow:"0 20px 60px rgba(0,0,0,0.6)"}}>
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

function AuthField({ label, value, onChange, placeholder, type="text", onEnter }) {
  return (
    <div>
      <div style={{fontSize:"9px",letterSpacing:"0.22em",color:"rgba(201,168,76,0.55)",marginBottom:"6px"}}>{label}</div>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} onKeyDown={e=>e.key==="Enter"&&onEnter?.()} placeholder={placeholder}
        style={{width:"100%",padding:"12px 15px",background:"rgba(8,14,26,0.8)",border:`1px solid ${C.goldDim}`,outline:"none",color:C.text,fontSize:"13px",fontFamily:"'Georgia',serif",boxSizing:"border-box"}}
        onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.goldDim}/>
    </div>
  );
}

function AuthScreen({ onAuth, lang }) {
  const [mode,setMode]=useState("signup");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const dir=isRTL(lang)?"rtl":"ltr";

  function getUsers(){try{return JSON.parse(localStorage.getItem("pv_users")||"{}");}catch{return{};}}
  function saveUsers(u){localStorage.setItem("pv_users",JSON.stringify(u));}

  function handleSubmit(){
    if(!email.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setError("Enter a valid email.");return;}
    if(!password||password.length<6){setError("Password must be at least 6 characters.");return;}
    if(mode==="signup"&&!name.trim()){setError("Name is required.");return;}
    setLoading(true);setError("");
    setTimeout(()=>{
      const users=getUsers();const key=email.toLowerCase().trim();
      if(mode==="signup"){
        if(users[key]){setError("Account exists. Try signing in.");setLoading(false);return;}
        const user={name:name.trim(),email:key,password,joined:new Date().toISOString()};
        users[key]=user;saveUsers(users);localStorage.setItem("pv_session",JSON.stringify(user));onAuth(user);
      }else{
        const user=users[key];
        if(!user||user.password!==password){setError("Incorrect email or password.");setLoading(false);return;}
        localStorage.setItem("pv_session",JSON.stringify(user));onAuth(user);
      }
      setLoading(false);
    },600);
  }

  return (
    <div dir={dir} style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px",fontFamily:"'Georgia',serif",position:"relative",overflow:"hidden"}}>
      <div style={{position:"fixed",top:"-20%",left:"50%",transform:"translateX(-50%)",width:"70vw",height:"60vh",background:"radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 68%)",pointerEvents:"none"}}/>
      {/* Language picker on auth screen */}
      <div style={{position:"absolute",top:"20px",right:"20px"}}><LangPicker lang={lang} setLang={()=>{}}/></div>
      <div style={{marginBottom:"36px"}}><VHLogo size="lg"/></div>
      <div style={{width:"100%",maxWidth:"460px",background:"#0C1828",border:`1px solid ${C.goldDim}`,padding:"44px 40px",position:"relative"}}>
        <GoldCorners/>
        <div style={{display:"flex",marginBottom:"32px",borderBottom:`1px solid ${C.goldDim}`}}>
          {["signup","login"].map(m=>(
            <button key={m} onClick={()=>{setMode(m);setError("");}} style={{flex:1,paddingBottom:"13px",background:"none",border:"none",borderBottom:mode===m?`2px solid ${C.gold}`:"2px solid transparent",color:mode===m?C.gold:C.muted,fontSize:"10px",letterSpacing:"0.2em",cursor:"pointer",fontFamily:"'Georgia',serif",transition:"all 0.2s",marginBottom:"-1px"}}>
              {m==="signup"?t(lang,"createTab"):t(lang,"loginTab")}
            </button>
          ))}
        </div>
        <div style={{marginBottom:"6px",fontSize:"19px",fontWeight:"400",color:C.text,lineHeight:1.35}}>
          {mode==="signup"
            ?<><span style={{color:C.gold,fontStyle:"italic"}}>{t(lang,"freeAccess").split(" ")[0]}</span> {t(lang,"freeAccess").split(" ").slice(1).join(" ")}</>
            :<>{t(lang,"welcomeBack2")} <span style={{color:C.gold,fontStyle:"italic"}}>{t(lang,"archive")}</span></>}
        </div>
        <p style={{fontSize:"12px",color:C.muted,marginBottom:"26px",lineHeight:"1.7"}}>{mode==="signup"?t(lang,"noLimits"):""}</p>
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          {mode==="signup"&&<AuthField label={t(lang,"nameLabel")} value={name} onChange={setName} placeholder="Your Name"/>}
          <AuthField label={t(lang,"emailLabel")} value={email} onChange={setEmail} placeholder="you@example.com" type="email"/>
          <AuthField label={t(lang,"passLabel")} value={password} onChange={setPassword} placeholder="Min. 6 characters" type="password" onEnter={handleSubmit}/>
        </div>
        {error&&<div style={{marginTop:"13px",padding:"10px 14px",background:"rgba(220,60,60,0.08)",border:"1px solid rgba(220,60,60,0.22)",fontSize:"12px",color:"#E07070"}}>{error}</div>}
        <button onClick={handleSubmit} disabled={loading} style={{width:"100%",marginTop:"20px",padding:"15px",background:loading?"rgba(201,168,76,0.4)":C.gold,border:"none",cursor:loading?"default":"pointer",color:C.navy,fontSize:"11px",letterSpacing:"0.2em",fontFamily:"'Georgia',serif"}}>
          {loading?"…":mode==="signup"?t(lang,"createAcc"):t(lang,"signInBtn")}
        </button>
        <div style={{marginTop:"16px",textAlign:"center",fontSize:"11px",color:C.muted}}>
          {mode==="signup"?t(lang,"alreadyHave"):t(lang,"newHere")}{" "}
          <span onClick={()=>{setMode(mode==="signup"?"login":"signup");setError("");}} style={{color:C.gold,cursor:"pointer"}}>
            {mode==="signup"?t(lang,"loginTab"):t(lang,"createTab")}
          </span>
        </div>
        <div style={{marginTop:"22px",paddingTop:"16px",borderTop:`1px solid ${C.goldDim}`,textAlign:"center",fontSize:"9px",letterSpacing:"0.15em",color:"rgba(201,168,76,0.4)"}}>
          {t(lang,"hunger")}
        </div>
      </div>
      <div style={{marginTop:"18px",fontSize:"10px",color:"rgba(232,224,208,0.18)",letterSpacing:"0.1em"}}>
        © 2025 VICTORY HOUR MULTIMEDIA INC. · {t(lang,"tagline2")}
      </div>
    </div>
  );
}

function PromptCard({ prompt, onClick, delay, lang }) {
  const [hovered,setHovered]=useState(false);
  return (
    <div onClick={onClick} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{background:hovered?"rgba(18,28,46,1)":C.card,padding:"26px",cursor:"pointer",transition:"all 0.22s",borderLeft:`2px solid ${hovered?C.gold:"transparent"}`,animation:`fadeUp 0.45s ease ${delay}ms both`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
        <span style={{fontSize:"9px",letterSpacing:"0.2em",color:"rgba(201,168,76,0.6)",padding:"3px 8px",border:`1px solid ${C.goldDim}`}}>{prompt.category?.toUpperCase()}</span>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:"12px",color:C.gold}}>★ {prompt.rating}</div>
          <div style={{fontSize:"9px",color:"rgba(232,224,208,0.28)"}}>{prompt.uses} uses</div>
        </div>
      </div>
      <h3 style={{fontSize:"16px",fontWeight:"400",color:hovered?C.text:"#D4C49A",marginBottom:"9px",lineHeight:"1.3",fontFamily:"'Georgia',serif",transition:"color 0.2s"}}>{prompt.title}</h3>
      <p style={{fontSize:"12px",color:C.muted,lineHeight:"1.7",marginBottom:"14px"}}>{prompt.preview?.slice(0,105)}…</p>
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
          `You write world-class AI prompts. Write the FULL prompt for the given title and preview. Make it detailed, powerful, with clear instructions and placeholders in [brackets]. 200-350 words. Write in ${langName}. Return ONLY the prompt text.`,
          `Title: ${prompt.title}\nPreview: ${prompt.preview}\nCategory: ${prompt.category}`
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
        <div style={{fontSize:"10px",letterSpacing:"0.2em",color:C.gold,marginBottom:"9px"}}>{prompt.category?.toUpperCase()} · {prompt.uses} USES · ★ {prompt.rating}</div>
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
  const [user,setUser]=useState(null);
  const [authChecked,setAuthChecked]=useState(false);
  const [query,setQuery]=useState("");
  const [activeCategory,setActiveCategory]=useState("all");
  const [results,setResults]=useState([]);
  const [loading,setLoading]=useState(false);
  const [hasSearched,setHasSearched]=useState(false);
  const [selectedPrompt,setSelectedPrompt]=useState(null);
  const [showAccount,setShowAccount]=useState(false);

  useEffect(()=>{
    try{const s=localStorage.getItem("pv_session");if(s)setUser(JSON.parse(s));}catch{}
    try{const l=localStorage.getItem("pv_lang");if(l)setLang(l);}catch{}
    setAuthChecked(true);
  },[]);

  function changeLang(l){setLang(l);localStorage.setItem("pv_lang",l);}
  function logout(){localStorage.removeItem("pv_session");setUser(null);setShowAccount(false);setHasSearched(false);setResults([]);setQuery("");}

  async function doSearch(){
    if(!query.trim())return;
    setLoading(true);setHasSearched(true);setResults([]);
    const langName=LANGUAGES.find(l=>l.code===lang)?.label||"English";
    try{
      const raw=await callClaude(
        `You are the curator of PromptVault — the world's largest prompt library with 1 trillion prompts. Return exactly 9 relevant prompt entries as a raw JSON array. Each: title, category (business/creative/marketing/coding/education/productivity/ai-tools), uses (like "1.2M"), rating (4.5-5.0), tags (3 items), preview (~110 chars). Write ALL text in ${langName}. Return ONLY the JSON array, no backticks.`,
        `Search: "${query}". Category: ${activeCategory}.`
      );
      setResults(JSON.parse(raw.trim()).map((p,i)=>({...p,id:`ai-${i}`})));
    }catch{setResults(SEED_PROMPTS.filter(p=>activeCategory==="all"||p.category===activeCategory).slice(0,9));}
    setLoading(false);
  }

  const dir=isRTL(lang)?"rtl":"ltr";
  const displayPrompts=hasSearched?results:SEED_PROMPTS.filter(p=>activeCategory==="all"||p.category===activeCategory);

  if(!authChecked)return null;
  if(!user)return <AuthScreen onAuth={u=>setUser(u)} lang={lang}/>;

  return (
    <div dir={dir} style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Georgia',serif",position:"relative",overflowX:"hidden"}}>
      <div style={{position:"fixed",top:"-15%",left:"50%",transform:"translateX(-50%)",width:"70vw",height:"55vh",background:"radial-gradient(ellipse, rgba(201,168,76,0.055) 0%, transparent 68%)",pointerEvents:"none",zIndex:0}}/>

      {/* HEADER */}
      <header style={{borderBottom:`1px solid rgba(201,168,76,0.12)`,padding:"0 36px",display:"flex",alignItems:"center",justifyContent:"space-between",height:"66px",background:"rgba(8,14,26,0.95)",backdropFilter:"blur(18px)",position:"sticky",top:0,zIndex:100}}>
        <VHLogo/>
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <LangPicker lang={lang} setLang={changeLang}/>
          <div style={{position:"relative"}}>
            <button onClick={()=>setShowAccount(v=>!v)} style={{display:"flex",alignItems:"center",gap:"9px",background:"rgba(201,168,76,0.07)",border:`1px solid ${C.goldDim}`,padding:"7px 14px",cursor:"pointer",fontFamily:"'Georgia',serif"}}>
              <div style={{width:"24px",height:"24px",borderRadius:"50%",background:`linear-gradient(135deg, ${C.gold}, #8a6a1e)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:"bold",color:C.navy}}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span style={{fontSize:"11px",letterSpacing:"0.1em",color:C.gold}}>{user.name.split(" ")[0]}</span>
              <span style={{fontSize:"9px",color:C.muted}}>▾</span>
            </button>
            {showAccount&&(
              <div style={{position:"absolute",top:"calc(100% + 8px)",right:0,background:"#0D1828",border:`1px solid ${C.goldDim}`,minWidth:"220px",zIndex:200,animation:"fadeUp 0.18s ease"}}>
                <div style={{padding:"15px 17px",borderBottom:`1px solid ${C.goldDim}`}}>
                  <div style={{fontSize:"13px",color:C.text,marginBottom:"2px"}}>{user.name}</div>
                  <div style={{fontSize:"10px",color:C.muted}}>{user.email}</div>
                  <div style={{fontSize:"9px",color:"rgba(201,168,76,0.4)",marginTop:"5px",letterSpacing:"0.09em"}}>{t(lang,"memberSince")} {new Date(user.joined).toLocaleDateString("en-US",{month:"short",year:"numeric"}).toUpperCase()}</div>
                </div>
                <div style={{padding:"6px"}}>
                  <a href="https://skool.com/victoryhour" target="_blank" rel="noopener noreferrer" style={{display:"block",padding:"9px 13px",fontSize:"11px",color:C.gold,textDecoration:"none",letterSpacing:"0.09em"}}>↗ {t(lang,"joinAcademy")}</a>
                  <button onClick={logout} style={{display:"block",width:"100%",textAlign:"left",padding:"9px 13px",background:"none",border:"none",fontSize:"11px",color:C.muted,cursor:"pointer",letterSpacing:"0.09em"}}>{t(lang,"signOut")}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main style={{maxWidth:"1200px",margin:"0 auto",padding:"52px 36px 80px",position:"relative",zIndex:1}}>
        {/* HERO */}
        <div style={{textAlign:"center",marginBottom:"48px"}}>
          <div style={{display:"inline-block",fontSize:"10px",letterSpacing:"0.26em",color:C.gold,marginBottom:"18px",padding:"5px 15px",border:`1px solid rgba(201,168,76,0.2)`}}>
            {t(lang,"welcomeBack")}, {user.name.split(" ")[0].toUpperCase()} · {t(lang,"unlimited")}
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
            {loading?t(lang,"searching"):`${displayPrompts.length} ${t(lang,"of")} 1,000,000,000,000`}
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

        {/* ACADEMY BANNER */}
        <div style={{marginTop:"56px",border:`1px solid rgba(201,168,76,0.18)`,padding:"40px 36px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"24px",background:"rgba(11,29,58,0.35)",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,right:0,width:"250px",height:"100%",background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.03))",pointerEvents:"none"}}/>
          <div>
            <div style={{fontSize:"10px",letterSpacing:"0.24em",color:C.gold,marginBottom:"9px"}}>VICTORY HOUR ACADEMY</div>
            <h3 style={{fontSize:"21px",fontWeight:"400",fontFamily:"'Georgia',serif",color:C.text,lineHeight:"1.3",marginBottom:"7px"}}>
              {t(lang,"deeperTitle")}<br/><span style={{fontStyle:"italic",color:C.gold}}>{t(lang,"deeperSub")}</span>
            </h3>
            <p style={{fontSize:"13px",color:C.muted,lineHeight:"1.7",maxWidth:"380px"}}>{t(lang,"deeperBody")}</p>
          </div>
          <a href="https://skool.com/victoryhour" target="_blank" rel="noopener noreferrer"
            style={{padding:"15px 32px",background:C.gold,color:C.navy,textDecoration:"none",fontSize:"11px",letterSpacing:"0.18em",fontFamily:"'Georgia',serif",whiteSpace:"nowrap",flexShrink:0,transition:"opacity 0.2s"}}
            onMouseEnter={e=>e.target.style.opacity="0.85"} onMouseLeave={e=>e.target.style.opacity="1"}>
            {t(lang,"joinFree")}
          </a>
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
      {showAccount&&<div onClick={()=>setShowAccount(false)} style={{position:"fixed",inset:0,zIndex:99}}/>}

      <style>{`
        @keyframes pulse{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:rgba(201,168,76,0.2);}
        input::placeholder{color:rgba(232,224,208,0.25);}
      `}</style>
    </div>
  );
}
