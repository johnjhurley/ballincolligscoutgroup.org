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

/* =========================================================
   UP NEXT
   ========================================================= */

(function () {

    const container = document.getElementById("upNext");

    if (!container || !window.groupEvents) {
        return;
    }

    // Today at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find future events and sort by date
    const upcoming = window.groupEvents
    .filter(event => {

        const startDate =
            new Date(event.date + "T00:00:00");

        const endDate =
            event.endDate
                ? new Date(event.endDate + "T23:59:59")
                : startDate;

        // Include the event while it is still running
        return endDate >= today;
    })
        .sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

    if (!upcoming.length) {
        container.innerHTML = `
            <div class="up-label">Up Next</div>

            <div class="up-copy">
                <h2>More adventures coming soon</h2>
                <p>Check back for upcoming Group events.</p>
            </div>

            <a class="arrow-link" href="calendar.html">
                View calendar →
            </a>
        `;

        return;
    }

    const event = upcoming[0];
    const endDate = event.endDate
    ? new Date(event.endDate + "T23:59:59")
    : date;

    const isHappeningNow =
        date < today && endDate >= today;

    const date = new Date(event.date + "T00:00:00");

    let day;
    let month;

    if (isHappeningNow) {

        day = "NOW";
        month = "ON NOW";

    } else {

        day = date.getDate();

        month = date
            .toLocaleDateString("en-IE", {
                month: "short"
            })
            .toUpperCase();
    }

    container.innerHTML = `
        <div class="up-label">
            Up Next
        </div>

        <div class="date-box">
            <b>${day}</b>
            <span>${month}</span>
        </div>

        <div class="up-copy">
            <h2>${event.title}</h2>
            <p>
                ${event.description || ""}
                ${event.location ? " · " + event.location : ""}
            </p>
        </div>

        <a class="arrow-link" href="calendar.html">
            View calendar →
        </a>
    `;

})();