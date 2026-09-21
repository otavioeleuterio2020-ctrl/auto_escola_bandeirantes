/* ===== CONFIGURAÇÃO (edite aqui) ===== */
var SITE = {
  phone: "(16) 3724-0800",          // visto na porta do carro da autoescola
  whatsapp: "",                      // ex.: "5516999999999" (DDI+DDD+número). Vazio = botões ligam para o telefone
  whatsappMsg: "Olá! Gostaria de informações sobre a habilitação na Autoescola Bandeirantes.",
  address: "Av. Major Nicácio, 1498, Centro",
  city: "Franca - SP",
  hours: "",                         // ex.: "Segunda a sexta, 8h às 18h"
  instagram: "",                     // ex.: "autoescolabandeirantes"
  showPlaceholders: true,            // false quando o site estiver completo
  testimonials: [                    // { text, name, detail }  (use apenas depoimentos reais)
  ]
};
/* ===================================== */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x) e.textContent = x; return e; }

  var tel = "tel:+55" + SITE.phone.replace(/\D/g, "");
  var cta = SITE.whatsapp ? "https://wa.me/" + SITE.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(SITE.whatsappMsg) : tel;
  $$("[data-cta]").forEach(function (a) { a.href = cta; if (SITE.whatsapp) { a.target = "_blank"; a.rel = "noopener"; } });
  $("#yr").textContent = new Date().getFullYear();

  // menu mobile
  var bg = $(".burger"), nav = $("#menu");
  bg.addEventListener("click", function () { bg.setAttribute("aria-expanded", nav.classList.toggle("open")); });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") { nav.classList.remove("open"); bg.setAttribute("aria-expanded", "false"); } });

  // contato + mapa
  var info = $("#info");
  function row(k, v, href) {
    if (!v && !SITE.showPlaceholders) return;
    var d = el("div"); d.appendChild(el("dt", "", k)); var dd = el("dd");
    if (v && href) { var a = el("a", "", v); a.href = href; dd.appendChild(a); } else if (v) dd.textContent = v; else { dd.textContent = "A informar"; dd.className = "todo"; }
    d.appendChild(dd); info.appendChild(d);
  }
  row("Telefone", SITE.phone, tel);
  if (SITE.whatsapp) row("WhatsApp", "Chamar no WhatsApp", cta);
  row("Endereço", SITE.address + (SITE.city ? " · " + SITE.city : ""));
  row("Horário de funcionamento", SITE.hours);
  if (SITE.instagram) row("Instagram", "@" + SITE.instagram, "https://instagram.com/" + SITE.instagram);
  var q = encodeURIComponent("Autoescola Bandeirantes, " + SITE.address + ", " + SITE.city);
  $("#map iframe").src = "https://www.google.com/maps?q=" + q + "&output=embed";
  $("#route").href = "https://www.google.com/maps/dir/?api=1&destination=" + q;

  // depoimentos
  var qs = $("#quotes"), list = SITE.testimonials.slice();
  if (!list.length && SITE.showPlaceholders) for (var i = 0; i < 3; i++) list.push({ text: "Espaço reservado para o depoimento de um aluno. Adicione apenas relatos reais, com autorização.", name: "Nome do aluno", detail: "Categoria", ph: 1 });
  list.forEach(function (t) {
    var f = el("figure", "quote" + (t.ph ? " ph" : ""));
    f.appendChild(el("blockquote", "", t.text));
    var c = el("figcaption"); c.appendChild(el("strong", "", t.name)); c.appendChild(document.createTextNode(t.detail ? " · " + t.detail : ""));
    f.appendChild(c); qs.appendChild(f);
  });
  if (!list.length) $("#depoimentos").hidden = true;

  // carrossel
  var tr = $("#track");
  $$(".arrow").forEach(function (b) { b.addEventListener("click", function () { tr.scrollBy({ left: b.dataset.dir * tr.clientWidth * 0.7, behavior: "smooth" }); }); });

  // lightbox
  var lb = $("#lb"), slides = $$(".slide"), cur = 0, im = $("img", lb), cp = $("figcaption", lb);
  function show(i) { cur = (i + slides.length) % slides.length; var s = slides[cur]; im.src = s.dataset.full; im.alt = s.dataset.cap; cp.textContent = s.dataset.cap; }
  slides.forEach(function (s, i) { s.addEventListener("click", function () { show(i); lb.showModal(); }); });
  $(".lb-x", lb).addEventListener("click", function () { lb.close(); });
  $$(".lb-n", lb).forEach(function (b) { b.addEventListener("click", function () { show(cur + +b.dataset.d); }); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") show(cur + 1); if (e.key === "ArrowLeft") show(cur - 1); });

  // estrada do processo desenha ao entrar na tela
  var road = $("#road");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en, o) { if (en[0].isIntersecting) { road.classList.add("in"); o.disconnect(); } }, { threshold: 0.25 }).observe(road);
  } else road.classList.add("in");
})();
