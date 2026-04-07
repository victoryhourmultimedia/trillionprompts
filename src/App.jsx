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
          `You write world-class AI prompts. Write the FULL prompt for the given title. You MUST write it entirely in ${langName}. Every single word must be in ${langName}. Translate input placeholders like [topic] or [industry] into ${langName} as well. 200-350 words. Return ONLY the prompt text, nothing else. Do not write in English unless ${langName} is English.`,
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
export default App;