(function () {
  function esc(v) { return String(v == null ? "" : v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function date(v) { try { return new Intl.DateTimeFormat(undefined,{dateStyle:"medium"}).format(new Date(v)); } catch(e) { return v || ""; } }
  function render(root, data, days) {
    var cutoff = Date.now() - days * 86400000;
    var rows = (data.entries || []).filter(function(e){ return new Date(e.date).getTime() >= cutoff; });
    var limit = Number(root.dataset.limit || 0);
    if (limit) rows = rows.slice(0, limit);
    var controls = limit ? "" : '<div class="tec-whats-new-controls">' + [7,30,90].map(function(n){
      return '<button type="button" data-days="'+n+'" aria-pressed="'+(n===days)+'">Last '+n+' days</button>';
    }).join("") + '</div>';
    var list = rows.length ? '<div class="tec-whats-new-list">' + rows.map(function(e){
      return '<article class="tec-whats-new-entry"><div class="tec-whats-new-entry__title"><a href="'+esc(e.url)+'">'+esc(e.title)+'</a></div><div class="tec-whats-new-entry__meta">'+esc(date(e.date))+'</div><p class="tec-whats-new-entry__summary">'+esc(e.summary)+'</p></article>';
    }).join("") + '</div>' : '<div class="tec-whats-new-empty">No wiki page updates were found in this timeframe.</div>';
    root.innerHTML = controls + list;
    root.querySelectorAll("[data-days]").forEach(function(b){ b.addEventListener("click",function(){ render(root,data,Number(b.dataset.days)); }); });
  }
  function init() {
    var roots = document.querySelectorAll(".tec-whats-new-app:not([data-initialized])");
    if (!roots.length) return;
    roots.forEach(function(r){r.dataset.initialized="1";});
    fetch("/assets/data/whats-new.json",{cache:"no-cache"}).then(function(r){if(!r.ok)throw new Error();return r.json();}).then(function(data){
      roots.forEach(function(root){render(root,data,Number(root.dataset.days||30));});
    }).catch(function(){roots.forEach(function(root){root.innerHTML='<div class="tec-whats-new-error">Recent wiki changes could not be loaded right now.</div>';});});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
  document.addEventListener("DOMContentSwitch",init);
})();
