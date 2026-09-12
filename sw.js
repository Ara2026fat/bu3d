/* بُعد — offline shell, self-updating (no version numbers to edit) */
const SHELL='bu3d-shell', MEDIA='bu3d-media';
const CORE=['./','./index.html','./app.js','./catalog.js','./manifest.webmanifest',
 './logo.webp','./mark.webp','./icon-192.png','./icon-512.png','./maskable-512.png','./apple-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL).then(c=>Promise.allSettled(CORE.map(u=>c.add(u)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==SHELL&&x!==MEDIA).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const q=e.request; if(q.method!=='GET')return;
  const u=new URL(q.url); if(u.origin!==location.origin)return;
  if(/\.(webp|png|jpg|jpeg|svg|ico)$/i.test(u.pathname)){
    e.respondWith(caches.open(MEDIA).then(c=>c.match(q).then(hit=>hit||fetch(q).then(r=>{if(r&&r.status===200)c.put(q,r.clone());return r}))));
    return;
  }
  e.respondWith(fetch(q).then(r=>{if(r&&r.status===200){const cp=r.clone();caches.open(SHELL).then(c=>c.put(q,cp))}return r})
    .catch(()=>caches.match(q).then(hit=>hit||caches.match('./index.html'))));
});
