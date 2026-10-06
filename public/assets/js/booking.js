/**
 * Nordmann Automotive — reserveringsformulier
 * Er is (nog) geen backend: het formulier stelt een WhatsApp-bericht op
 * en opent wa.me met de ingevulde gegevens. Er wordt niets opgeslagen.
 * Alle controles staan hier in JavaScript: HTML-attributen als min en maxlength
 * zijn in de browser te verwijderen en dus geen echte beveiliging.
 */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "31629207716";
  var MAX_NAME = 80;          // gelijk aan maxlength in de HTML
  var MAX_NOTE = 500;
  var MAX_MONTHS_AHEAD = 12;  // reserveren kan tot een jaar vooruit

  var form = document.querySelector("[data-booking-form]");
  if (!form) return;

  var fields = {
    name: form.elements.namedItem("name"),
    car: form.elements.namedItem("car"),
    from: form.elements.namedItem("from"),
    to: form.elements.namedItem("to"),
    note: form.elements.namedItem("note")
  };

  // Datum als "jjjj-mm-dd" in lokale tijd, zoals een datumveld die teruggeeft
  function toIso(date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }
  function todayIso() {
    return toIso(new Date());
  }
  function maxIso() {
    var d = new Date();
    d.setMonth(d.getMonth() + MAX_MONTHS_AHEAD);
    return toIso(d);
  }
  // Alleen een echte datum telt: "2026-02-31" of tekst die via de ontwikkelaarstools is ingevoerd niet
  function isValidIso(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    var d = new Date(value + "T00:00:00");
    return !isNaN(d) && toIso(d) === value;
  }

  // min/max helpen alleen de kalender; de echte controle staat in validate(),
  // omdat deze attributen in de browser te verwijderen zijn
  fields.from.min = fields.to.min = todayIso();
  fields.from.max = fields.to.max = maxIso();
  fields.from.addEventListener("change", function () {
    fields.to.min = isValidIso(fields.from.value) ? fields.from.value : todayIso();
  });

  // De knop staat in de HTML uit, zodat het formulier zonder dit script niet op de
  // gewone manier wordt verstuurd (met naam en datums in de URL). Nu het script draait: aan.
  var submitButton = form.querySelector("[data-booking-submit]");
  if (submitButton) submitButton.disabled = false;

  // "Deze auto aanvragen" vult de auto alvast in
  document.querySelectorAll("[data-select-car]").forEach(function (link) {
    link.addEventListener("click", function () {
      fields.car.value = link.getAttribute("data-select-car");
    });
  });

  function formatDate(value) {
    if (!value) return "";
    var parts = value.split("-");
    return parts[2] + "-" + parts[1] + "-" + parts[0];
  }

  // message: lege tekst = geen fout, anders de foutmelding voor dat veld
  function setError(name, message) {
    var hasError = Boolean(message);
    var field = fields[name].closest(".field");
    field.classList.toggle("is-invalid", hasError);
    fields[name].setAttribute("aria-invalid", String(hasError));
    var msg = form.querySelector('[data-error-for="' + name + '"]');
    if (msg) {
      msg.id = msg.id || "err-" + name;
      if (hasError) {
        msg.textContent = message;
        fields[name].setAttribute("aria-describedby", msg.id);
      } else {
        fields[name].removeAttribute("aria-describedby");
      }
    }
    return hasError;
  }

  function nameError(value) {
    if (!value) return "Vul uw naam in.";
    if (value.length > MAX_NAME) return "Gebruik maximaal " + MAX_NAME + " tekens.";
    return "";
  }

  function carError(value) {
    var known = [].some.call(fields.car.options, function (o) { return o.value === value; });
    return value && known ? "" : "Kies een auto.";
  }

  function fromError(value, today, max) {
    if (!value) return "Kies een ophaaldatum.";
    if (!isValidIso(value)) return "Kies een geldige datum.";
    if (value < today) return "Kies een ophaaldatum vanaf vandaag.";
    if (value > max) return "Reserveren kan tot een jaar vooruit.";
    return "";
  }

  function toError(value, from, max) {
    if (!value) return "Kies een terugbrengdatum.";
    if (!isValidIso(value)) return "Kies een geldige datum.";
    if (isValidIso(from) && value < from) return "Kies een datum op of na de ophaaldatum.";
    if (value > max) return "Reserveren kan tot een jaar vooruit.";
    return "";
  }

  function validate() {
    var today = todayIso();
    var max = maxIso();
    var errors = [
      setError("name", nameError(fields.name.value.trim())),
      setError("car", carError(fields.car.value)),
      setError("from", fromError(fields.from.value, today, max)),
      setError("to", toError(fields.to.value, fields.from.value, max))
    ];
    return errors.indexOf(true) === -1;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) {
      var first = form.querySelector(".is-invalid input, .is-invalid select");
      if (first) first.focus();
      return;
    }

    var lines = [
      "Hallo Nordmann Automotive,",
      "",
      "Ik wil graag een auto huren.",
      "Naam: " + fields.name.value.trim(),
      "Auto: " + fields.car.value,
      "Ophalen: " + formatDate(fields.from.value),
      "Terugbrengen: " + formatDate(fields.to.value)
    ];
    var note = fields.note.value.trim().slice(0, MAX_NOTE);
    if (note) lines.push("Opmerking: " + note);

    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  });
})();
