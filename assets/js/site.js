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
   HOMEPAGE - UP NEXT
   ========================================================= */

(function () {

    const container = document.getElementById("upNext");

    // Only run on pages containing Up Next
    if (!container) {
        return;
    }

    if (!Array.isArray(window.groupEvents)) {
        console.error("groupEvents not found. Check events.js is loaded.");
        return;
    }


    /* -----------------------------------------------------
       Today
       ----------------------------------------------------- */

    const today = new Date();

    today.setHours(0, 0, 0, 0);


    /* -----------------------------------------------------
       Find events which have not finished
       ----------------------------------------------------- */

    const upcoming = window.groupEvents
        .filter(event => {

            const startDate =
                new Date(event.date + "T00:00:00");

            const endDate =
                event.endDate
                    ? new Date(event.endDate + "T23:59:59")
                    : new Date(event.date + "T23:59:59");


            return endDate >= today;

        })
        .sort((a, b) => {

            return (
                new Date(a.date + "T00:00:00") -
                new Date(b.date + "T00:00:00")
            );

        });


    /* -----------------------------------------------------
       No upcoming events
       ----------------------------------------------------- */

    if (!upcoming.length) {

        container.innerHTML = `
            <div class="up-label">
                Up Next
            </div>

            <div class="up-copy">
                <h2>More adventures coming soon</h2>
                <p>Check the calendar for upcoming activities.</p>
            </div>

            <a class="arrow-link"
               href="calendar.html">
                View Calendar →
            </a>
        `;

        return;
    }


    /* -----------------------------------------------------
       Next event
       ----------------------------------------------------- */

    const event = upcoming[0];


    const startDate =
        new Date(event.date + "T00:00:00");


    const endDate =
        event.endDate
            ? new Date(event.endDate + "T23:59:59")
            : new Date(event.date + "T23:59:59");


    /*
     * Event started before today and
     * has not yet finished.
     */

    const isHappeningNow =
        startDate < today &&
        endDate >= today;


    /* -----------------------------------------------------
       Date display
       ----------------------------------------------------- */

    let day;
    let month;


    if (isHappeningNow) {

        day = "NOW";
        month = "ON NOW";

    } else {

        day = startDate.getDate();

        month = startDate
            .toLocaleDateString(
                "en-IE",
                {
                    month: "short"
                }
            )
            .toUpperCase();

    }


    /* -----------------------------------------------------
       Description
       ----------------------------------------------------- */

    let details = "";


    if (event.description) {
        details += event.description;
    }


    if (event.location) {

        if (details) {
            details += " · ";
        }

        details += event.location;

    }


    /* -----------------------------------------------------
       Render
       ----------------------------------------------------- */

    container.innerHTML = `

        <div class="up-label">
            ${isHappeningNow ? "Happening Now" : "Up Next"}
        </div>

        <div class="date-box">

            <b>${day}</b>

            <span>
                ${month}
            </span>

        </div>

        <div class="up-copy">

            <h2>
                ${event.title}
            </h2>

            <p>
                ${details}
            </p>

        </div>

        <a class="arrow-link"
           href="calendar.html">
            View Calendar →
        </a>

    `;

})();