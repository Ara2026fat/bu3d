"use strict";
/* ═══════════ WhatsApp texts ═══════════ */
function orderLink(o){return location.origin+location.pathname+"#o="+b64e(JSON.stringify(o))}
function statusLink(o){return location.origin+location.pathname+"#s="+b64e(JSON.stringify({c:o.code,st:o.stage,p:o.price}))}
function specLines(o){
  var L=[];
  if(o.spec.text)   L.push("• "+t("textOn")+": "+o.spec.text);
  if(o.spec.file)   L.push("• "+t("fileName")+": "+o.spec.file);
  if(o.spec.idea)   L.push("• "+t("idea")+": "+o.spec.idea);
  if(o.spec.material)L.push("• "+t("material")+": "+nm(MATS.filter(function(m){return m.id===o.spec.material})[0]||{ar:"",en:""}));
  if(o.spec.quality) L.push("• "+t("quality")+": "+nm(QUAL.filter(function(m){return m.id===o.spec.quality})[0]||{ar:"",en:""}));
  if(o.spec.infill)  L.push("• "+t("infill")+": "+nm(INFILL.filter(function(m){return m.id===o.spec.infill})[0]||{ar:"",en:""}));
  if(o.spec.color)   L.push("• "+t("color")+": "+nm(COLORS.filter(function(m){return m.id===o.spec.color})[0]||{ar:"",en:""}));
  L.push("• "+t("qty")+": "+num(o.qty));
  if(o.spec.notes)  L.push("• "+t("notes")+": "+o.spec.notes);
  return L;
}
function reqMsg(o){
  return ["*"+(S.cfg.shop||"بُعد")+"* — "+t("orderNo")+" "+o.code,"",o.title,""]
    .concat(specLines(o))
    .concat(["", o.cust.name+" · "+o.cust.phone, o.cust.city+(o.cust.addr?"، "+o.cust.addr:""),
             "", t("statusLink")+": "+orderLink(o)]).join("\n");
}
function quoteMsg(o){
  return ["*"+(S.cfg.shop||"بُعد")+"* — "+t("orderNo")+" "+o.code,"",
    t("price")+": "+money(o.price), nm(STAGES[2]), "", t("statusLink")+": "+statusLink(o)].join("\n");
}
function stageMsg(o){
  var st=STAGES[o.stage]||STAGES[0];
  return ["*"+(S.cfg.shop||"بُعد")+"* — "+t("orderNo")+" "+o.code,"",
    nm(st), nm(st.note), "", t("statusLink")+": "+statusLink(o)].join("\n");
}
function openWa(msg){try{window.open(waLink(msg),"_blank")}catch(e){}}

/* ═══════════ header ═══════════ */
function bar(){
  var items=[["shop","cube"],["order","file"],["track","list"]];
  return '<div class="crown">'+
    '<button class="blogo" data-a="tab" data-v="shop"><img src="'+LOGO+'" alt="'+esc(S.cfg.shop)+'"></button>'+
    '<div class="tabs">'+items.map(function(x){
      return '<button class="tab'+(S.tab===x[0]?" on":"")+'" data-a="tab" data-v="'+x[0]+'"><span>'+t(x[0])+'</span></button>'}).join("")+'</div>'+
    '<button class="act" data-a="sheet" data-v="settings" aria-label="'+t("settings")+'">'+ico("gear",21)+'</button>'+
  '</div>';
}

/* ═══════════ shop ═══════════ */
function shopList(){
  var l=S.products.filter(function(p){return S.cat==="all"||p.cat===S.cat});
  var q=S.q.trim().toLowerCase();
  if(q)l=l.filter(function(p){return ((p.ar||"")+(p.en||"")+(p.nAr||"")+(p.nEn||"")).toLowerCase().indexOf(q)>-1});
  return l;
}
function vShopFilters(){
  return '<div class="filters">'+
   '<div style="position:relative">'+
    '<span style="position:absolute;top:11px;inset-inline-start:13px;color:var(--dim)">'+ico("search",16)+'</span>'+
    '<input id="q" class="input" data-f="q" style="padding-inline-start:40px;padding-top:10px;padding-bottom:10px" placeholder="'+t("search")+'" value="'+esc(S.q)+'"></div>'+
   '<div class="cats" style="margin-top:10px">'+
    '<button class="chip'+(S.cat==="all"?" on":"")+'" data-a="cat" data-v="all">'+t("all")+'</button>'+
    CATS.map(function(c){return '<button class="chip'+(S.cat===c.id?" on":"")+'" data-a="cat" data-v="'+c.id+'">'+nm(c)+'</button>'}).join("")+
   '</div></div>';
}
function pcard(p){
  var src=mainImg(p.id), out=!!p.out;
  return '<div class="card" '+(out?'':'data-a="open" data-id="'+p.id+'"')+' style="padding:7px;cursor:pointer;position:relative;opacity:'+(out?".55":"1")+'">'+
   (out?'<span class="pill" style="position:absolute;top:11px;inset-inline-start:11px;z-index:2">'+t("soldOut")+'</span>'
     :(p.hot?'<span class="pill" style="position:absolute;top:11px;inset-inline-start:11px;z-index:2">★</span>':''))+
   '<div class="media">'+(src?'<img src="'+src+'" loading="lazy" decoding="async" alt="">':art(p.art||"cube",46))+'</div>'+
   '<div style="padding:7px 3px 1px">'+
    '<div style="font-size:11px;font-weight:700;line-height:1.35;height:30px;overflow:hidden">'+esc(nm(p))+'</div>'+
    '<div style="font-size:11px;font-weight:900;color:var(--acc);margin-top:4px">'+
      (p.price>0?money(p.price):t("quoted"))+'</div></div></div>';
}
function vShop(){
  var l=shopList();
  return l.length?'<div class="gridp">'+l.map(pcard).join("")+'</div>'
   :'<div class="glass" style="padding:26px;text-align:center"><div class="dim">'+t("none")+'</div></div>';
}

/* ═══════════ order tab ═══════════ */
function vOrder(){
  var ways=[["prod","cube","wProd","wProdD"],["file","file","wFile","wFileD"],["idea","bulb","wIdea","wIdeaD"]];
  return '<div>'+
   '<div class="glass" style="padding:16px;display:flex;gap:14px;align-items:center">'+
    '<img src="'+LOGO+'" style="width:64px;flex-shrink:0" alt="">'+
    '<div><div class="disp" style="font-size:17px">'+t("orderWays")+'</div>'+
    '<div class="dim" style="font-size:12px;margin-top:4px;line-height:1.7">'+esc(S.cfg.shop)+' · '+esc(S.cfg.city)+'</div></div></div>'+
   '<div style="display:grid;gap:10px;margin-top:12px">'+ways.map(function(w){
     return '<button class="card row" data-a="req" data-v="'+w[0]+'" style="padding:15px;width:100%;text-align:start;cursor:pointer;gap:13px">'+
      '<div class="orb" style="width:44px;height:44px">'+ico(w[1],21)+'</div>'+
      '<div style="flex:1"><div style="font-size:14px;font-weight:900">'+t(w[2])+'</div>'+
      '<div class="dim" style="font-size:12px;margin-top:3px;line-height:1.7">'+t(w[3])+'</div></div>'+
      '<span style="'+(S.lang==="ar"?"transform:rotate(180deg)":"")+';opacity:.4">'+ico("chev",16)+'</span></button>'}).join("")+'</div>'+
   (waNum()?'':'<div class="card" style="padding:13px;margin-top:12px;font-size:12px" class="dim">'+t("noWa")+'</div>')+
  '</div>';
}

/* ═══════════ request sheet ═══════════ */
function chipRow(list,act,cur){
  return '<div class="hs">'+list.map(function(x){
    return '<button class="chip'+(cur===x.id?" on":"")+'" data-a="'+act+'" data-v="'+x.id+'">'+nm(x)+'</button>'}).join("")+'</div>';
}
function shReq(){
  var r=S.req; if(!r)return "";
  var p=r.pid?prod(r.pid):null;
  var ok=(r.cust.name||"").trim().length>1 && (r.cust.phone||"").trim().length>=8;
  var mat=MATS.filter(function(m){return m.id===r.spec.material})[0];
  return '<div class="handle"></div>'+
   '<div class="between" style="margin-bottom:12px"><h3 class="disp" style="font-size:19px">'+
     (p?esc(nm(p)):t(r.kind==="file"?"wFile":"wIdea"))+'</h3>'+
    '<button class="act" style="width:38px;height:38px" data-a="close">'+ico("x",16)+'</button></div>'+
   (p?'<div class="card row" style="padding:10px;margin-bottom:12px">'+
      '<div style="width:56px;height:56px;border-radius:12px;overflow:hidden;display:grid;place-items:center;background:var(--soft)">'+
      (mainImg(p.id)?'<img src="'+mainImg(p.id)+'" style="width:100%;height:100%;object-fit:cover">':art(p.art||"cube",34))+'</div>'+
      '<div style="flex:1"><div class="dim" style="font-size:12px;line-height:1.7">'+esc(note(p)||"")+'</div>'+
      '<div style="font-size:13px;font-weight:900;color:var(--acc);margin-top:4px">'+(p.price>0?money(p.price):t("quoted"))+'</div></div></div>':'')+
   (r.kind==="file"?'<div style="margin-bottom:11px"><span class="lbl">'+t("fileName")+'</span>'+
     '<input id="rf" class="input" data-r="file" placeholder="my-model.stl" value="'+esc(r.spec.file||"")+'">'+
     '<div class="dim" style="font-size:11px;margin-top:6px;line-height:1.7">'+t("fileHint")+'</div></div>':'')+
   (r.kind==="idea"?'<div style="margin-bottom:11px"><span class="lbl">'+t("idea")+'</span>'+
     '<textarea id="ri" class="input" data-r="idea" rows="3" style="resize:none" placeholder="'+t("ideaPh")+'">'+esc(r.spec.idea||"")+'</textarea></div>':'')+
   ((!p||(p.opts||[]).indexOf("text")>-1)?'<div style="margin-bottom:11px"><span class="lbl">'+t("textOn")+' ('+t("optional")+')</span>'+
     '<input id="rt" class="input" data-r="text" value="'+esc(r.spec.text||"")+'"></div>':'')+
   '<span class="lbl">'+t("material")+'</span>'+chipRow(MATS,"rmat",r.spec.material)+
   (mat?'<div class="dim" style="font-size:11px;margin:6px 0 12px;line-height:1.7">'+nm(mat.note)+'</div>':'')+
   (r.kind!=="prod"?'<span class="lbl" style="margin-top:8px">'+t("quality")+'</span>'+chipRow(QUAL,"rqual",r.spec.quality)+
     '<span class="lbl" style="margin-top:12px">'+t("infill")+'</span>'+chipRow(INFILL,"rinf",r.spec.infill):'')+
   '<span class="lbl" style="margin-top:12px">'+t("color")+'</span>'+
   '<div class="row" style="gap:9px;flex-wrap:wrap">'+COLORS.map(function(c){
     return '<button class="dotc'+(r.spec.color===c.id?" on":"")+'" data-a="rcol" data-v="'+c.id+'" style="background:'+c.hex+'" aria-label="'+nm(c)+'"></button>'}).join("")+'</div>'+
   '<div class="row" style="gap:12px;margin-top:14px">'+
    '<div><span class="lbl">'+t("qty")+'</span><div class="row" style="gap:9px">'+
     '<button class="act" style="width:36px;height:36px" data-a="rqty" data-v="-1">'+ico("minus",15)+'</button>'+
     '<b style="font-size:16px;min-width:22px;text-align:center">'+num(r.qty)+'</b>'+
     '<button class="act" style="width:36px;height:36px" data-a="rqty" data-v="1">'+ico("plus",15)+'</button></div></div>'+
    '<div style="flex:1"><span class="lbl">'+t("notes")+' ('+t("optional")+')</span>'+
     '<input id="rn" class="input" data-r="notes" value="'+esc(r.spec.notes||"")+'"></div></div>'+
   '<div class="rule">'+t("sMe")+'</div>'+
   '<div style="display:grid;gap:10px">'+
    '<div class="row" style="gap:10px">'+
     '<div style="flex:1"><span class="lbl">'+t("name")+'</span><input id="cn" class="input" data-c="name" value="'+esc(r.cust.name||"")+'"></div>'+
     '<div style="flex:1"><span class="lbl">'+t("phone")+'</span><input id="cp" class="input" data-c="phone" inputmode="tel" value="'+esc(r.cust.phone||"")+'"></div></div>'+
    '<div class="row" style="gap:10px">'+
     '<div style="flex:1"><span class="lbl">'+t("city")+'</span><input id="cc" class="input" data-c="city" value="'+esc(r.cust.city||"")+'"></div>'+
     '<div style="flex:1"><span class="lbl">'+t("addr")+'</span><input id="ca" class="input" data-c="addr" value="'+esc(r.cust.addr||"")+'"></div></div>'+
    (ok?'':'<div class="dim" style="font-size:11.5px">'+t("required")+'</div>')+
    '<button class="btn p" data-a="rsend" '+(ok?"":"disabled")+'>'+ico("wa",17)+t("send")+'</button>'+
    '<div class="dim" style="font-size:11px;text-align:center;line-height:1.8">'+t("sendHint")+'</div></div>';
}

/* ═══════════ tracking ═══════════ */
function pipe(o,compact){
  var list=compact?STAGES.slice(Math.max(0,o.stage-1),o.stage+2):STAGES;
  return '<div class="pipe">'+list.map(function(st){
    var done=st.id<=o.stage, now=st.id===o.stage;
    return '<div class="step'+(done?" done":"")+(now?" now":"")+'">'+
     '<div class="dot">'+(done?ico("check",15):num(st.id+1))+'</div>'+
     '<div style="flex:1"><div class="stitle">'+nm(st)+'</div>'+
     (now?'<div class="snote">'+nm(st.note)+'</div>':'')+'</div></div>'}).join("")+'</div>';
}
function ocard(o){
  var st=STAGES[o.stage]||STAGES[0];
  return '<div class="card" data-a="oopen" data-id="'+o.code+'" style="padding:14px;cursor:pointer">'+
   '<div class="between"><b style="font-size:13.5px">'+esc(o.title)+'</b>'+
    '<span class="dim" style="font-size:11.5px">'+esc(o.code)+'</span></div>'+
   '<div class="row" style="gap:8px;margin-top:9px">'+
    '<span class="pill">'+nm(st)+'</span>'+
    '<span style="font-size:12.5px;font-weight:900;color:var(--acc)">'+(o.price>0?money(o.price):t("pending"))+'</span>'+
    '<span class="dim" style="font-size:11px;margin-inline-start:auto">'+esc(o.date)+'</span></div>'+
   '<div class="row" style="gap:4px;margin-top:11px">'+STAGES.map(function(s){
     return '<div style="flex:1;height:4px;border-radius:4px;background:'+(s.id<=o.stage?"linear-gradient(90deg,var(--a1),var(--a2))":"var(--sline)")+'"></div>'}).join("")+'</div></div>';
}
function vTrack(){
  if(!S.orders.length)return '<div class="glass" style="padding:30px;text-align:center">'+
    '<div style="display:flex;justify-content:center">'+art("box",64)+'</div>'+
    '<div class="disp" style="font-size:17px;margin-top:12px">'+t("noOrders")+'</div>'+
    '<div class="dim" style="font-size:12.5px;margin-top:7px;line-height:1.8">'+t("noOrdersD")+'</div>'+
    '<button class="btn p" style="margin-top:16px" data-a="tab" data-v="order">'+t("order")+'</button></div>';
  return '<div style="display:grid;gap:10px">'+S.orders.map(ocard).join("")+'</div>';
}
function shOrder(){
  var o=findOrder(S.sheet.id); if(!o)return "";
  return '<div class="handle"></div>'+
   '<div class="between" style="margin-bottom:6px">'+
    '<h3 class="disp" style="font-size:19px">'+esc(o.title)+'</h3>'+
    '<button class="act" style="width:38px;height:38px" data-a="close">'+ico("x",16)+'</button></div>'+
   '<div class="eyebrow">'+t("orderNo")+' '+esc(o.code)+' · '+esc(o.date)+'</div>'+
   '<div class="glass between" style="padding:14px;margin-top:12px">'+
    '<div><div class="dim" style="font-size:11.5px">'+t("price")+'</div>'+
     '<div class="disp" style="font-size:21px;margin-top:2px">'+(o.price>0?money(o.price):t("pending"))+'</div></div>'+
    (o.price>0&&o.stage===2?'<button class="btn p sm" data-a="oapprove" data-id="'+o.code+'">'+ico("check",15)+t("approve")+'</button>':'')+
   '</div>'+
   '<div class="card" style="padding:14px;margin-top:10px;font-size:12.5px;line-height:2">'+
     specLines(o).map(esc).join("<br>")+'</div>'+
   '<div class="rule">'+t("stageNow")+'</div>'+ pipe(o) +
   '<button class="btn g full" style="margin-top:12px" data-a="oask" data-id="'+o.code+'">'+ico("wa",16)+t("askUpdate")+'</button>'+
   (isOwner()?'<div class="rule">'+t("wsOrders")+'</div>'+ownerControls(o):'');
}
function ownerControls(o){
  return '<div class="card" style="padding:14px;display:grid;gap:10px">'+
   '<div class="row" style="gap:10px">'+
    '<div style="flex:1"><span class="lbl">'+t("setPrice")+'</span>'+
     '<input id="opx" class="input" data-p="'+o.code+'" inputmode="numeric" value="'+esc(o.price||"")+'"></div>'+
    '<button class="btn p sm" style="align-self:flex-end" data-a="oquote" data-id="'+o.code+'">'+t("sendQuote")+'</button></div>'+
   '<div class="row" style="gap:8px">'+
    '<button class="btn g sm" style="flex:1" data-a="ostage" data-id="'+o.code+'" data-v="-1">−</button>'+
    '<button class="btn p sm" style="flex:2" data-a="ostage" data-id="'+o.code+'" data-v="1">'+t("nextStage")+'</button></div>'+
   '<div class="row" style="gap:8px">'+
    '<button class="btn g sm" style="flex:1" data-a="onotify" data-id="'+o.code+'">'+ico("wa",14)+t("tellClient")+'</button>'+
    '<button class="btn g sm" style="flex:1" data-a="olink" data-id="'+o.code+'">'+ico("link",14)+t("statusLink")+'</button></div>'+
   '<button class="btn g sm" data-a="odel" data-id="'+o.code+'">'+ico("trash",14)+t("del")+'</button></div>';
}

/* ═══════════ settings ═══════════ */
var OWNER_ONLY=["shop","items","data"];
var MENU=[["contact","wa","sContact"],["look","palette","sLook"],["me","user","sMe"],["guide","star","sGuide"],
          ["shop","gear","sShop"],["items","box","sItems"],["data","dl","sData"]];
var THEMES=[{id:"tech",ar:"أزرق تقني",en:"Tech blue",g:"linear-gradient(135deg,#3C5A85,#CFE0F2)"},
 {id:"steel",ar:"جرافيت",en:"Graphite",g:"linear-gradient(135deg,#4A5462,#D8DEE6)"},
 {id:"teal",ar:"فيروزي",en:"Teal",g:"linear-gradient(135deg,#1F7A6E,#C8E7E1)"},
 {id:"royal",ar:"أزرق ملكي",en:"Royal",g:"linear-gradient(135deg,#3A4C9E,#D2DAF6)"},
 {id:"sand",ar:"رملي",en:"Sand",g:"linear-gradient(135deg,#8A6A3C,#E8DAC4)"}];
function setBack(key){
  var chev=S.lang==="ar"?'style="transform:rotate(180deg)"':"";
  return '<button class="card row" data-a="settab" data-v="" style="padding:11px 14px;width:100%;cursor:pointer;text-align:start;margin-bottom:14px">'+
   '<span '+chev+'>'+ico("chev",16,"var(--acc)")+'</span><span style="flex:1;font-size:14px;font-weight:900">'+t(key)+'</span></button>';
}
function shSettings(){
  var c=S.cfg, tab=S.setTab||"", b="";
  if(!tab){
    var menu=MENU.filter(function(m){return isOwner()||OWNER_ONLY.indexOf(m[0])<0});
    return '<div class="handle"></div><div class="between" style="margin-bottom:14px">'+
      '<h3 class="disp" style="font-size:19px">'+t("settings")+'</h3>'+
      '<button class="act" style="width:38px;height:38px" data-a="close">'+ico("x",16)+'</button></div>'+
     (isOwner()?'<div class="card row" style="padding:11px 14px;margin-bottom:12px">'+ico("gear",17,"var(--acc)")+
       '<span style="flex:1;font-size:12.5px;font-weight:700">'+t("ownerOn")+'</span>'+
       '<button class="btn g sm" data-a="ownerout">'+t("ownerExit")+'</button></div>':'')+
     '<div class="grid2" style="gap:10px">'+menu.map(function(m){
       return '<button class="card" data-a="settab" data-v="'+m[0]+'" style="padding:16px 10px;cursor:pointer;text-align:center">'+
        ico(m[1],23,"var(--acc)")+'<div style="font-size:12.5px;font-weight:700;margin-top:8px">'+t(m[2])+'</div></button>'}).join("")+'</div>'+
     (isOwner()?'':'<button class="btn g sm" style="width:100%;margin-top:14px" data-a="settab" data-v="owner">'+ico("gear",14)+t("ownerEnter")+'</button>')+
     (PWA.standalone?'':installBlock())+
     '<div class="rule">'+esc(c.shop||"بُعد")+'</div>'+
     '<div class="dim" style="font-size:11px;text-align:center;line-height:1.9">'+t("rights")+'</div>';
  }
  if(OWNER_ONLY.indexOf(tab)>-1&&!isOwner()){S.setTab="";return shSettings()}
  if(tab==="contact"){
    b='<div class="card" style="padding:16px;text-align:center">'+ico("wa",26,"var(--acc)")+
      '<div style="font-size:13.5px;font-weight:900;margin-top:8px">'+esc(c.shop)+'</div>'+
      '<div class="dim" style="font-size:12px;margin-top:5px">'+esc(c.city)+'</div>'+
      '<div style="display:grid;gap:9px;margin-top:14px">'+
       (waNum()?'<a class="btn p" href="'+waLink("")+'" target="_blank" rel="noopener">'+ico("wa",16)+t("waBtn")+'</a>':
        '<div class="dim" style="font-size:12px">'+t("noWa")+'</div>')+
       '<a class="btn g" href="'+esc(c.insta)+'" target="_blank" rel="noopener">'+ico("ig",16)+t("igBtn")+'</a></div>'+
      (waNum()?'<div class="dim" style="font-size:12px;margin-top:12px;direction:ltr">+'+esc(waNum())+'</div>':'')+'</div>';
  }else if(tab==="look"){
    b='<div class="grid2" style="gap:6px">'+THEMES.map(function(th){
      return '<button class="swatch'+(c.theme===th.id?" on":"")+'" data-a="theme" data-v="'+th.id+'">'+
       '<i style="background:'+th.g+'"></i><span>'+nm(th)+'</span></button>'}).join("")+'</div>'+
     '<div class="rule">'+t("language")+'</div>'+
     '<div class="row" style="gap:8px">'+
      '<button class="chip'+(c.mode==="light"?" on":"")+'" data-a="mode" data-v="light">'+t("lightM")+'</button>'+
      '<button class="chip'+(c.mode==="dark"?" on":"")+'" data-a="mode" data-v="dark">'+t("darkM")+'</button>'+
      '<button class="chip'+(S.lang==="ar"?" on":"")+'" data-a="lang" data-v="ar">العربية</button>'+
      '<button class="chip'+(S.lang==="en"?" on":"")+'" data-a="lang" data-v="en">English</button></div>';
  }else if(tab==="me"){
    b='<div class="card" style="padding:14px;display:grid;gap:11px">'+
      '<div><span class="lbl">'+t("name")+'</span><input id="mn" class="input" data-k="name" value="'+esc(c.name)+'"></div>'+
      '<div><span class="lbl">'+t("phone")+'</span><input id="mp" class="input" data-k="phone" inputmode="tel" value="'+esc(c.phone)+'"></div>'+
      '<div><span class="lbl">'+t("city")+'</span><input id="mc" class="input" data-k="city" value="'+esc(c.city)+'"></div></div>';
  }else if(tab==="guide"){
    b=guideBody();
  }else if(tab==="shop"){
    b='<div class="card" style="padding:14px;display:grid;gap:11px">'+
      '<div><span class="lbl">'+t("shopName")+'</span><input id="sn" class="input" data-k="shop" value="'+esc(c.shop)+'"></div>'+
      '<div><span class="lbl">'+t("waNum")+'</span><input id="sw" class="input" data-k="whats" inputmode="tel" placeholder="'+t("waNumPh")+'" value="'+esc(c.whats)+'"></div>'+
      '<div><span class="lbl">'+t("insta")+'</span><input id="si" class="input" data-k="insta" value="'+esc(c.insta)+'"></div></div>'+
     '<button class="btn p full" style="margin-top:10px" data-a="sheet" data-v="ws">'+ico("list",15)+t("wsOrders")+' ('+num(S.orders.length)+')</button>'+
     '<button class="btn g sm" style="width:100%;margin-top:8px" data-a="settab" data-v="pin">'+t("changePin")+'</button>';
  }else if(tab==="items"){
    b='<button class="btn p full" data-a="pnew">'+ico("plus",15)+t("addProduct")+'</button>'+
     '<div style="display:grid;gap:8px;margin-top:12px">'+S.products.map(function(p){
       return '<div class="card row" style="padding:10px">'+
        '<div style="width:44px;height:44px;border-radius:10px;overflow:hidden;display:grid;place-items:center;background:var(--soft)">'+
        (mainImg(p.id)?'<img src="'+mainImg(p.id)+'" style="width:100%;height:100%;object-fit:cover">':art(p.art||"cube",26))+'</div>'+
        '<div style="flex:1;min-width:0"><div style="font-size:12.5px;font-weight:700">'+esc(nm(p))+'</div>'+
         '<div class="dim" style="font-size:11px">'+(p.price>0?money(p.price):t("quoted"))+'</div></div>'+
        '<button class="act" style="width:34px;height:34px" data-a="pedit" data-id="'+p.id+'">'+ico("gear",15)+'</button></div>'}).join("")+'</div>';
  }else if(tab==="owner"){
    b='<div class="card" style="padding:16px;text-align:center">'+ico("gear",26,"var(--acc)")+
      '<div style="font-size:13.5px;font-weight:900;margin-top:8px">'+t("ownerEnter")+'</div>'+
      '<div class="dim" style="font-size:12px;margin-top:6px;line-height:1.8">'+t("ownerHint")+'</div>'+
      '<input id="pin" class="input" data-x="pin" inputmode="numeric" maxlength="8" style="margin-top:14px;text-align:center;letter-spacing:.4em;font-size:18px" placeholder="••••">'+
      (S.pinBad?'<div style="font-size:12px;color:var(--acc);margin-top:8px;font-weight:700">'+t("ownerBad")+'</div>':'')+
      '<button class="btn p full" style="margin-top:12px" data-a="ownerin">'+t("ownerOpen")+'</button></div>';
  }else if(tab==="pin"){
    b='<div class="card" style="padding:16px">'+
      '<span class="lbl">'+t("newPin")+'</span>'+
      '<input id="np" class="input" data-x="newpin" inputmode="numeric" maxlength="8" style="text-align:center;letter-spacing:.4em;font-size:18px">'+
      '<button class="btn p full" style="margin-top:12px" data-a="pinsave">'+t("save")+'</button>'+
      '<div class="dim" style="font-size:11px;margin-top:10px;line-height:1.8">'+t("pinNote")+'</div></div>';
  }else{
    b='<div class="row" style="gap:8px;flex-wrap:wrap">'+
      '<button class="btn g sm" data-a="export">'+ico("dl",14)+t("exportD")+'</button>'+
      '<button class="btn g sm" data-a="import">'+ico("ul",14)+t("importD")+'</button>'+
      '<button class="btn g sm" data-a="resetall">'+t("resetD")+'</button></div>';
  }
  var key={contact:"sContact",look:"sLook",me:"sMe",guide:"sGuide",shop:"sShop",items:"sItems",data:"sData",
    owner:"ownerEnter",pin:"newPin"}[tab];
  return '<div class="handle"></div><div class="between" style="margin-bottom:14px">'+
    '<h3 class="disp" style="font-size:19px">'+t("settings")+'</h3>'+
    '<button class="act" style="width:38px;height:38px" data-a="close">'+ico("x",16)+'</button></div>'+
   setBack(key)+'<div>'+b+'</div>';
}
function guideBody(){
  var who=S.guideWho||"cust";
  var steps=who==="cust"?[["cube","gc1","gc1d"],["wa","gc2","gc2d"],["clock","gc3","gc3d"],["list","gc4","gc4d"]]
                        :[["wa","go1","go1d"],["star","go2","go2d"],["list","go3","go3d"],["box","go4","go4d"]];
  return '<div class="row" style="gap:8px">'+
    '<button class="chip'+(who==="cust"?" on":"")+'" data-a="gwho" data-v="cust">'+t("track")+'</button>'+
    '<button class="chip'+(who==="own"?" on":"")+'" data-a="gwho" data-v="own">'+t("sShop")+'</button></div>'+
   '<div style="display:grid;gap:9px;margin-top:12px">'+steps.map(function(s,i){
     return '<div class="card row" style="padding:13px;align-items:flex-start;gap:12px">'+
      '<div class="orb" style="width:32px;height:32px;font-size:13px">'+num(i+1)+'</div>'+
      '<div style="flex:1"><div style="font-size:13px;font-weight:900">'+t(s[1])+'</div>'+
      '<div class="dim" style="font-size:12px;margin-top:4px;line-height:1.8">'+t(s[2])+'</div></div></div>'}).join("")+'</div>';
}
function shWs(){
  return '<div class="handle"></div><div class="between" style="margin-bottom:14px">'+
   '<h3 class="disp" style="font-size:19px">'+t("wsOrders")+'</h3>'+
   '<button class="act" style="width:38px;height:38px" data-a="close">'+ico("x",16)+'</button></div>'+
   (S.orders.length?'<div style="display:grid;gap:10px">'+S.orders.map(ocard).join("")+'</div>'
    :'<div class="dim" style="text-align:center;padding:26px 0;font-size:13px">'+t("noOrders")+'</div>');
}

/* ═══════════ product editing + photo ═══════════ */
function shPEdit(){
  var e=S.edit, isNew=!prod(e.id);
  return '<div class="handle"></div><div class="between" style="margin-bottom:14px">'+
   '<h3 class="disp" style="font-size:19px">'+t(isNew?"addProduct":"editProduct")+'</h3>'+
   '<button class="act" style="width:38px;height:38px" data-a="settab" data-v="items">'+ico("x",16)+'</button></div>'+
   '<div class="row" style="gap:10px">'+
    '<div style="flex:1"><span class="lbl">'+t("nameAr")+'</span><input id="ea" class="input" data-e="ar" value="'+esc(e.ar||"")+'"></div>'+
    '<div style="flex:1"><span class="lbl">'+t("nameEn")+'</span><input id="ee" class="input" data-e="en" value="'+esc(e.en||"")+'"></div></div>'+
   '<div style="margin-top:10px"><span class="lbl">'+t("descAr")+'</span><input id="ed" class="input" data-e="nAr" value="'+esc(e.nAr||"")+'"></div>'+
   '<div class="row" style="gap:10px;margin-top:10px">'+
    '<div style="flex:1"><span class="lbl">'+t("priceL")+'</span><input id="ep" class="input" data-e="price" inputmode="numeric" value="'+esc(e.price||0)+'"></div>'+
    '<div style="flex:1"><span class="lbl">'+t("category")+'</span>'+
     '<div class="hs" style="margin-top:4px">'+CATS.map(function(c){
       return '<button class="chip'+(e.cat===c.id?" on":"")+'" data-a="ecat" data-v="'+c.id+'">'+nm(c)+'</button>'}).join("")+'</div></div></div>'+
   '<div class="row" style="gap:8px;margin-top:12px">'+
    '<button class="chip'+(e.hot?" on":"")+'" data-a="ehot">'+t("featured")+'</button>'+
    '<button class="chip'+(e.out?" on":"")+'" data-a="eout">'+t("soldOut")+'</button></div>'+
   '<div class="rule">'+t("photo")+'</div>'+
   '<div class="media" style="max-width:150px;margin:0 auto">'+
     (mainImg(e.id)?'<img src="'+mainImg(e.id)+'">':art(e.art||"cube",50))+'</div>'+
   '<div class="drop" id="drop" style="margin-top:12px">'+ico("img",22,"var(--acc)")+
     '<div style="font-size:12.5px;margin-top:6px">'+t("dropHint")+'</div></div>'+
   '<input type="file" id="filein" accept="image/*" class="hide">'+
   (S.images[e.id]!==undefined?'<button class="btn g sm" style="width:100%;margin-top:10px" data-a="imgrestore" data-id="'+e.id+'">'+t("restoreImg")+'</button>':'')+
   '<div class="row" style="gap:8px;margin-top:16px">'+
    (isNew?'':'<button class="btn g" style="flex:1" data-a="pdel" data-id="'+e.id+'">'+ico("trash",15)+t("del")+'</button>')+
    '<button class="btn p" style="flex:2" data-a="psave">'+ico("check",16)+t("save")+'</button></div>';
}
function sl(id,label,v,mn,mx,st,u){
  return '<div style="margin-top:11px"><div class="between" style="font-size:11.5px"><span class="dim">'+label+'</span>'+
   '<span id="lbl-'+id+'">'+(u==="×"?Number(v).toFixed(2):Math.round(v))+u+'</span></div>'+
   '<input type="range" class="range" id="sl-'+id+'" min="'+mn+'" max="'+mx+'" step="'+st+'" value="'+v+'"></div>';
}
function shEditor(){
  var e=S.editor;
  return '<div class="handle"></div><div class="between" style="margin-bottom:12px">'+
   '<h3 class="disp" style="font-size:19px">'+t("enhance")+'</h3>'+
   '<button class="act" style="width:38px;height:38px" data-a="editback">'+ico("x",16)+'</button></div>'+
   '<canvas id="cv" class="cv"></canvas>'+
   '<div class="dim" style="font-size:11px;text-align:center;margin-top:7px">'+t("dragMove")+'</div>'+
   sl("zoom",t("zoom"),e.zoom,1,3,.01,"×")+sl("bright",t("bright"),e.b,60,150,1,"%")+
   sl("contrast",t("contrast"),e.c,60,160,1,"%")+sl("sat",t("sat"),e.s,0,200,1,"%")+
   sl("quality",t("qualityS"),Math.round(e.q*100),40,95,1,"%")+
   '<div class="row" style="gap:8px;margin-top:14px">'+
    '<button class="btn g" style="flex:1" data-a="editreset">'+t("reset")+'</button>'+
    '<button class="btn p" style="flex:2" data-a="editsave">'+ico("check",16)+t("saveImg")+'</button></div>';
}

/* ═══════════ PWA ═══════════ */
var PWA={evt:null,waiting:null,standalone:false};
function isIOS(){return /iPad|iPhone|iPod/.test(navigator.userAgent)}
function installBlock(){
  var can=!!PWA.evt;
  if(PWA.standalone)return '<div class="card row" style="padding:12px;margin-top:12px">'+ico("check",16,"var(--acc)")+
    '<span style="font-size:12.5px;font-weight:700">'+t("installed")+'</span></div>';
  return '<div class="card" style="padding:13px;margin-top:12px">'+
   '<div class="row" style="gap:9px">'+ico("dl",17,"var(--acc)")+
    '<div style="flex:1"><div style="font-size:13px;font-weight:900">'+t("install")+'</div>'+
    '<div class="dim" style="font-size:11.5px;margin-top:2px">'+t("installD")+'</div></div>'+
    (can?'<button class="btn p sm" data-a="install">'+t("installNow")+'</button>':'')+'</div>'+
   (!can&&isIOS()?'<div class="dim" style="font-size:11.5px;margin-top:9px;line-height:1.7">'+t("iosInstall")+'</div>':'')+'</div>';
}
function installBanner(){
  if(PWA.standalone||!PWA.evt)return "";
  if(S.cfg.installAsk&&Date.now()-S.cfg.installAsk<2592e5)return "";
  return '<div class="ibar"><img src="'+MARK+'" style="width:32px" alt="">'+
   '<div style="flex:1"><div style="font-size:13px;font-weight:900">'+t("install")+'</div>'+
   '<div class="dim" style="font-size:11px">'+t("installD")+'</div></div>'+
   '<button class="btn p sm" data-a="install">'+t("installNow")+'</button>'+
   '<button class="act" style="width:30px;height:30px" data-a="installlater">'+ico("x",14)+'</button></div>';
}
function initPWA(){
  try{PWA.standalone=(window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches)||navigator.standalone===true}catch(e){}
  window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();PWA.evt=e;render()});
  window.addEventListener("appinstalled",function(){PWA.evt=null;PWA.standalone=true;render()});
  if(navigator.serviceWorker&&String(location.protocol).indexOf("http")===0){
    navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).catch(function(){});
    try{navigator.serviceWorker.getRegistration().then(function(r){if(r)r.update()})}catch(e){}
    var reloading=false;
    navigator.serviceWorker.addEventListener("controllerchange",function(){if(reloading)return;reloading=true;location.reload()});
  }
}
/* incoming links: an order from the customer, or a status update from the workshop */
function readHash(){
  var h=String(location.hash||"");
  var mo=h.match(/#o=(.+)$/), ms=h.match(/#s=(.+)$/);
  try{
    if(mo){var o=JSON.parse(b64d(mo[1]));
      if(o&&o.code&&!findOrder(o.code)){S.orders.unshift(o);persist()}
      if(o&&o.code){S.tab="track";S.sheet={type:"order",id:o.code}}}
    else if(ms){var u=JSON.parse(b64d(ms[1])),f=findOrder(u.c);
      if(f){f.stage=u.st;if(u.p)f.price=u.p;persist()}
      else{S.orders.unshift({code:u.c,title:t("orderNo")+" "+u.c,kind:"prod",spec:{},qty:1,
        price:u.p||0,stage:u.st||0,date:new Date().toISOString().slice(0,10),cust:{}});persist()}
      S.tab="track";S.sheet={type:"order",id:u.c}}
  }catch(e){}
  if(mo||ms){try{history.replaceState(null,"",location.pathname)}catch(e){}}
}

/* ═══════════ render ═══════════ */
var app=document.getElementById("app");
function sheetView(){
  if(!S.sheet)return "";
  var b="";
  switch(S.sheet.type){
    case "req":b=shReq();break; case "order":b=shOrder();break; case "settings":b=shSettings();break;
    case "ws":b=shWs();break; case "pedit":b=shPEdit();break; case "editor":b=shEditor();break;
    default:return "";
  }
  return '<div class="ov" data-a="ovclose"><div class="sheet" data-stop="1">'+b+'</div></div>';
}
function render(){
  document.body.setAttribute("dir",S.lang==="ar"?"rtl":"ltr");
  document.body.setAttribute("data-theme",S.cfg.theme);
  document.body.setAttribute("data-mode",S.cfg.mode);
  document.documentElement.lang=S.lang;
  var a=document.activeElement,fid=a&&a.id,pos=null;try{pos=a&&a.selectionStart}catch(e){}
  var stage=S.tab==="shop"?vShop():S.tab==="order"?vOrder():vTrack();
  var body=S.tab==="shop"
    ? vShopFilters()+'<div class="plist" id="stage">'+stage+'</div>'
    : '<div class="stage" id="stage">'+stage+'</div>';
  app.innerHTML='<div class="app">'+bar()+body+'</div>'+installBanner()+
    (S.toast?'<div class="toast"><div>'+esc(S.toast)+'</div></div>':'')+sheetView();
  if(fid){var el=document.getElementById(fid);if(el){el.focus();try{el.setSelectionRange(pos,pos)}catch(e){}}}
  try{document.documentElement.style.setProperty("--wmImg","url('"+MARK+"')")}catch(e){}
  post();
}
function post(){
  var d=document.getElementById("drop"),f=document.getElementById("filein");
  if(d&&f){d.onclick=function(){f.click()};f.onchange=function(){if(f.files[0])loadFile(f.files[0])}}
  if(S.sheet&&S.sheet.type==="editor")initEditor();
}

/* ═══════════ image editor ═══════════ */
function loadFile(file){
  if(!file.type||file.type.indexOf("image/")!==0)return;
  var fr=new FileReader();
  fr.onload=function(){var im=new Image();
    im.onload=function(){S.editor={img:im,target:S.edit.id,zoom:1,ox:0,oy:0,b:100,c:100,s:100,q:.82};
      S.sheet={type:"editor"};render()};im.src=fr.result};
  fr.readAsDataURL(file);
}
var CV,CTX,DW;
function initEditor(){
  CV=document.getElementById("cv");if(!CV)return;
  var r=window.devicePixelRatio||1;DW=CV.clientWidth||320;
  CV.width=DW*r;CV.height=DW*r;CV.style.height=DW+"px";
  CTX=CV.getContext("2d");CTX.setTransform(r,0,0,r,0,0);
  draw();
  [["zoom","zoom"],["bright","b"],["contrast","c"],["sat","s"],["quality","q"]].forEach(function(m){
    var el=document.getElementById("sl-"+m[0]);if(!el)return;
    el.oninput=function(){var v=parseFloat(el.value);S.editor[m[1]]=m[1]==="q"?v/100:v;
      var L=document.getElementById("lbl-"+m[0]);if(L)L.textContent=(m[0]==="zoom"?v.toFixed(2)+"×":Math.round(v)+"%");draw()}});
  var down=false,sx,sy,ox,oy;
  CV.onpointerdown=function(e){down=true;CV.setPointerCapture(e.pointerId);sx=e.clientX;sy=e.clientY;ox=S.editor.ox;oy=S.editor.oy};
  CV.onpointermove=function(e){if(!down)return;S.editor.ox=ox+(e.clientX-sx);S.editor.oy=oy+(e.clientY-sy);draw()};
  CV.onpointerup=CV.onpointercancel=function(){down=false};
}
function paint(ctx,W,sc){
  var e=S.editor,im=e.img;
  ctx.save();ctx.clearRect(0,0,W,W);ctx.fillStyle="#fff";ctx.fillRect(0,0,W,W);
  ctx.filter="brightness("+e.b+"%) contrast("+e.c+"%) saturate("+e.s+"%)";
  var cov=Math.max(W/im.width,W/im.height),k=cov*e.zoom,w=im.width*k,h=im.height*k;
  ctx.drawImage(im,(W-w)/2+e.ox*sc,(W-h)/2+e.oy*sc,w,h);ctx.restore();
}
function draw(){if(CTX)paint(CTX,DW,1)}
function exportURL(){
  var W=800,c=document.createElement("canvas");c.width=W;c.height=W;
  paint(c.getContext("2d"),W,W/DW);
  var webp=(function(){var x=document.createElement("canvas");x.width=x.height=1;
    return x.toDataURL("image/webp").indexOf("data:image/webp")===0})();
  return c.toDataURL(webp?"image/webp":"image/jpeg",S.editor.q);
}

/* ═══════════ events ═══════════ */
document.addEventListener("click",function(ev){
  var el=ev.target.closest("[data-a]");if(!el)return;
  var a=el.getAttribute("data-a"),v=el.getAttribute("data-v"),id=el.getAttribute("data-id");
  if(a==="ovclose"){if(ev.target.closest("[data-stop]"))return;S.sheet=null;render();return}
  switch(a){
    case "tab":S.tab=v;S.sheet=null;render();break;
    case "cat":S.cat=v;render();break;
    case "lang":S.lang=v;persist();render();break;
    case "theme":S.cfg.theme=v;persist();render();break;
    case "mode":S.cfg.mode=v;persist();render();break;
    case "sheet":if(!v)break;S.sheet={type:v};if(v==="settings")S.setTab="";render();break;
    case "close":S.sheet=null;render();break;
    case "settab":S.setTab=v;render();break;
    case "gwho":S.guideWho=v;render();break;
    /* request */
    case "open":{var p=prod(id);S.req={kind:"prod",pid:id,qty:1,
      spec:{material:"pla",quality:"std",infill:"30",color:"white",text:"",notes:""},
      cust:{name:S.cfg.name,phone:S.cfg.phone,city:S.cfg.city,addr:""}};
      S.sheet={type:"req"};render();break}
    case "req":{S.req={kind:v==="prod"?"prod":v,pid:null,qty:1,
      spec:{material:"pla",quality:"std",infill:"30",color:"white",text:"",file:"",idea:"",notes:""},
      cust:{name:S.cfg.name,phone:S.cfg.phone,city:S.cfg.city,addr:""}};
      if(v==="prod"){S.sheet=null;S.tab="shop";render();break}
      S.sheet={type:"req"};render();break}
    case "rmat":S.req.spec.material=v;render();break;
    case "rqual":S.req.spec.quality=v;render();break;
    case "rinf":S.req.spec.infill=v;render();break;
    case "rcol":S.req.spec.color=v;render();break;
    case "rqty":S.req.qty=Math.max(1,S.req.qty+parseInt(v,10));render();break;
    case "rsend":{var r=S.req,p2=r.pid?prod(r.pid):null;
      var o={code:code(),kind:r.kind,title:p2?nm(p2):t(r.kind==="file"?"wFile":"wIdea"),
        spec:r.spec,qty:r.qty,price:p2&&p2.price>0?p2.price*r.qty:0,stage:0,
        date:new Date().toISOString().slice(0,10),cust:r.cust};
      S.orders.unshift(o);
      S.cfg.name=r.cust.name;S.cfg.phone=r.cust.phone;S.cfg.city=r.cust.city;persist();
      openWa(reqMsg(o));S.sheet=null;S.tab="track";toast(t("created"));break}
    /* tracking */
    case "oopen":S.sheet={type:"order",id:id};render();break;
    case "oask":{var o1=findOrder(id);if(o1)openWa("*"+S.cfg.shop+"* — "+t("orderNo")+" "+o1.code+"\n"+t("askUpdate"));break}
    case "oapprove":{var o2=findOrder(id);if(o2){o2.stage=3;persist();
      openWa("*"+S.cfg.shop+"* — "+t("orderNo")+" "+o2.code+"\n"+t("approved")+" ✓ "+money(o2.price));render()}break}
    /* workshop */
    case "oquote":{var o3=findOrder(id);if(o3){o3.stage=2;persist();openWa(quoteMsg(o3));render()}break}
    case "ostage":{var o4=findOrder(id);if(o4){o4.stage=Math.max(0,Math.min(STAGES.length-1,o4.stage+parseInt(v,10)));persist();render()}break}
    case "onotify":{var o5=findOrder(id);if(o5)openWa(stageMsg(o5));break}
    case "olink":{var o6=findOrder(id);if(o6){try{navigator.clipboard.writeText(statusLink(o6));toast(t("linkCopied"))}catch(e){}}break}
    case "odel":{S.orders=S.orders.filter(function(x){return x.code!==id});persist();S.sheet=null;render();break}
    /* owner mode */
    case "ownerin":{if((S.pinTry||"")===String(S.cfg.pin)){S.cfg.ownerOn=true;S.pinBad=false;S.pinTry="";S.setTab="";persist();toast(t("ownerOn"))}
      else{S.pinBad=true;render()}break}
    case "ownerout":S.cfg.ownerOn=false;S.setTab="";persist();render();break;
    case "pinsave":{var np=(S.newPin||"").trim();if(np.length>=4){S.cfg.pin=np;S.newPin="";S.setTab="shop";persist();toast(t("saved"))}break}
    /* products */
    case "pnew":S.edit={id:"u"+Date.now(),cat:CATS[0]?CATS[0].id:"names",ar:"",en:"",nAr:"",nEn:"",price:0,
      unit:"piece",art:"cube",img:"",hot:0,out:0,opts:["text","color"]};S.sheet={type:"pedit"};render();break;
    case "pedit":S.edit=Object.assign({},prod(id));S.sheet={type:"pedit"};render();break;
    case "ecat":S.edit.cat=v;render();break;
    case "ehot":S.edit.hot=S.edit.hot?0:1;render();break;
    case "eout":S.edit.out=S.edit.out?0:1;render();break;
    case "psave":{var e2=S.edit;if(!e2.ar&&!e2.en)break;
      if(!e2.ar)e2.ar=e2.en;if(!e2.en)e2.en=e2.ar;e2.price=Number(e2.price)||0;
      var ix=-1;S.products.forEach(function(x,k){if(x.id===e2.id)ix=k});
      if(ix>-1)S.products[ix]=e2;else S.products.push(e2);
      persist();S.edit=null;S.sheet={type:"settings"};S.setTab="items";toast(t("saved"));render();break}
    case "pdel":{S.products=S.products.filter(function(x){return x.id!==id});idbDel(id);delete S.images[id];
      persist();S.edit=null;S.sheet={type:"settings"};S.setTab="items";render();break}
    case "imgrestore":{delete S.images[id];idbDel(id);render();break}
    case "editback":S.sheet={type:"pedit"};S.editor=null;render();break;
    case "editreset":S.editor.zoom=1;S.editor.ox=0;S.editor.oy=0;S.editor.b=100;S.editor.c=100;S.editor.s=100;S.editor.q=.82;render();break;
    case "editsave":{var data=exportURL(),tid=S.editor.target;setImgs(tid,[data]);S.editor=null;S.sheet={type:"pedit"};toast(t("saved"));render();break}
    /* data */
    case "export":{var blob=new Blob([JSON.stringify({v:1,cfg:S.cfg,products:S.products,orders:S.orders,images:S.images})],{type:"application/json"});
      var l=document.createElement("a");l.href=URL.createObjectURL(blob);l.download="bu3d-data.json";l.click();break}
    case "import":{var inp=document.createElement("input");inp.type="file";inp.accept="application/json";
      inp.onchange=function(){var f2=inp.files[0];if(!f2)return;var fr=new FileReader();
        fr.onload=function(){try{var o7=JSON.parse(fr.result);
          if(o7.cfg)S.cfg=Object.assign({},DEF,o7.cfg);
          if(o7.products)S.products=o7.products;
          if(o7.orders)S.orders=o7.orders;
          if(o7.images){S.images=o7.images;Object.keys(o7.images).forEach(function(k){idbSet(k,o7.images[k])})}
          persist();toast(t("saved"));render()}catch(e){}};
        fr.readAsText(f2)};inp.click();break}
    case "resetall":if(confirm(t("confirmReset"))){Object.keys(S.images).forEach(function(k){idbDel(k)});
      S.images={};S.orders=[];S.products=JSON.parse(JSON.stringify(PRODUCTS));S.cfg=Object.assign({},DEF);
      persist();S.sheet=null;render()}break;
    case "install":if(PWA.evt){PWA.evt.prompt();PWA.evt.userChoice.then(function(){PWA.evt=null;S.cfg.installAsk=Date.now();persist();render()})}break;
    case "installlater":S.cfg.installAsk=Date.now();persist();render();break;
  }
});
document.addEventListener("input",function(ev){
  var el=ev.target,v=el.value;
  var f=el.getAttribute("data-f"); if(f==="q"){S.q=v;render();return}
  var r=el.getAttribute("data-r"); if(r&&S.req){S.req.spec[r]=v;return}
  var c=el.getAttribute("data-c");
  if(c&&S.req){S.req.cust[c]=v;
    var b=document.querySelector('[data-a="rsend"]');
    if(b){var ok=(S.req.cust.name||"").trim().length>1&&(S.req.cust.phone||"").trim().length>=8;
      if(ok)b.removeAttribute("disabled");else b.setAttribute("disabled","")}
    return}
  var k=el.getAttribute("data-k"); if(k){S.cfg[k]=v;persist();return}
  var e=el.getAttribute("data-e"); if(e&&S.edit){S.edit[e]=v;return}
  var p=el.getAttribute("data-p"); if(p){var o=findOrder(p);if(o){o.price=Number(v)||0;persist()}return}
  var x=el.getAttribute("data-x");
  if(x==="pin"){S.pinTry=v;S.pinBad=false;return}
  if(x==="newpin"){S.newPin=v;return}
});
window.addEventListener("resize",function(){if(S.sheet&&S.sheet.type==="editor")initEditor()});

/* ═══════════ boot ═══════════ */
initPWA();
readHash();
render();
idbAll().then(function(o){if(o&&Object.keys(o).length){S.images=o;render()}});
