/**
 * Nordmann Automotive — reserveringsformulier
 * Er is (nog) geen backend: het formulier stelt een WhatsApp-bericht op
 * en opent wa.me met de ingevulde gegevens. Er wordt niets opgeslagen.
 */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "31629207716";

  var form = document.querySelector("[data-booking-form]");
  if (!form) return;

  var fields = {
    name: form.elements.namedItem("name"),
    car: form.elements.namedItem("car"),
    from: form.elements.namedItem("from"),
    to: form.elements.namedItem("to"),
    note: form.elements.namedItem("note")
  };

  // Geen datums in het verleden
  var today = new Date();
  var iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  fields.from.min = iso;
  fields.to.min = iso;
  fields.from.addEventListener("change", function () {
    fields.to.min = fields.from.value || iso;
  });

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

  function setError(name, hasError) {
    var field = fields[name].closest(".field");
    field.classList.toggle("is-invalid", hasError);
    fields[name].setAttribute("aria-invalid", String(hasError));
    var msg = form.querySelector('[data-error-for="' + name + '"]');
    if (msg) {
      msg.id = msg.id || "err-" + name;
      if (hasError) fields[name].setAttribute("aria-describedby", msg.id);
      else fields[name].removeAttribute("aria-describedby");
    }
    return hasError;
  }

  function validate() {
    var errors = [
      setError("name", !fields.name.value.trim()),
      setError("from", !fields.from.value),
      setError("to", !fields.to.value || fields.to.value < fields.from.value)
    ];
    return errors.indexOf(true) === -1;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) {
      var first = form.querySelector(".is-invalid input");
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
    var note = fields.note.value.trim();
    if (note) lines.push("Opmerking: " + note);

    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  });
})();
