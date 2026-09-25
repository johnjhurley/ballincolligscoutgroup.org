document.querySelector('.menu-toggle')?.addEventListener('click',()=>document.querySelector('.nav').classList.toggle('open'));
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.calendar tr[data-type]').forEach(r=>r.style.display=(f==='all'||r.dataset.type===f)?'table-row':'none')}));

// Sections dropdown: click/tap support, including mobile navigation.
document.querySelectorAll('.sections-toggle').forEach(btn=>btn.addEventListener('click',e=>{
  e.preventDefault();
  const wrap=btn.closest('.nav-sections');
  const open=wrap.classList.toggle('open');
  btn.setAttribute('aria-expanded',open?'true':'false');
}));
document.addEventListener('click',e=>{
  if(!e.target.closest('.nav-sections')) document.querySelectorAll('.nav-sections.open').forEach(w=>{
    w.classList.remove('open');
    w.querySelector('.sections-toggle')?.setAttribute('aria-expanded','false');
  });
});
