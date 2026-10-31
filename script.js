/* ============================================================
   script.js — Interaksi CV online Ziaulhaq (JavaScript murni)
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Tandai bahwa JavaScript aktif (dipakai CSS untuk animasi muncul)
  document.documentElement.classList.add("js");

  /* ---------- 1. Tema gelap/terang + ingat pilihan ---------- */
  var tema = document.getElementById("tema");

  try {
    if (localStorage.getItem("tema") === "terang") {
      tema.checked = true;
    }
  } catch (e) {
    /* localStorage tidak tersedia, abaikan */
  }

  tema.addEventListener("change", function () {
    try {
      localStorage.setItem("tema", tema.checked ? "terang" : "gelap");
    } catch (e) {
      /* abaikan */
    }
  });

  /* ---------- 2. Tahun otomatis di footer ---------- */
  var tahun = document.getElementById("tahun");
  if (tahun) {
    tahun.textContent = new Date().getFullYear();
  }

  /* ---------- 3. Animasi muncul saat di-scroll ---------- */
  var elemenReveal = document.querySelectorAll(".card, .judul");
  elemenReveal.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var pengamatReveal = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("tampil");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    elemenReveal.forEach(function (el) {
      pengamatReveal.observe(el);
    });
  } else {
    elemenReveal.forEach(function (el) {
      el.classList.add("tampil");
    });
  }

  /* ---------- 4. Menu aktif sesuai bagian yang sedang dilihat ---------- */
  var linkMenu = document.querySelectorAll(".menu a");
  var bagian = document.querySelectorAll("main section[id]");

  function tandaiMenu(id) {
    linkMenu.forEach(function (a) {
      a.classList.toggle("aktif", a.getAttribute("href") === "#" + id);
    });
  }

  if ("IntersectionObserver" in window) {
    var pengamatMenu = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            tandaiMenu(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    bagian.forEach(function (s) {
      pengamatMenu.observe(s);
    });
  }

  /* ---------- 5. Tombol kembali ke atas ---------- */
  var tombolAtas = document.getElementById("ke-atas");
  if (tombolAtas) {
    window.addEventListener("scroll", function () {
      tombolAtas.classList.toggle("muncul", window.scrollY > 500);
    });
    tombolAtas.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
