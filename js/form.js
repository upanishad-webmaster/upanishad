document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("googleForm");
  const formNext = document.getElementById("form-next");
  const fromBack = document.getElementById("form-back");
  const formPage1 = document.getElementById("form-page-1");
  const formPage2 = document.getElementById("form-page-2");

  formNext.addEventListener("click", function (e) {
    e.preventDefault();
    const page1Fields = form.querySelectorAll("#form-page-1 [required]");
    for (const field of page1Fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return;
      }
    }
    formPage2.classList.remove("hidden");
    formPage1.classList.add("hidden");
  });

  fromBack.addEventListener("click", function (e) {
    e.preventDefault();
    formPage2.classList.add("hidden");
    formPage1.classList.remove("hidden");
  });

  const formReset = document.getElementById("form-reset");
  const thankyouPage = document.getElementById("thank-you");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var fd = new FormData(form);

    var params = new URLSearchParams();
    fd.forEach(function (value, key) {
      params.append(key, value);
    });

    var callbackName = "jsonp_cb_" + Date.now();
    window[callbackName] = function () {};
    params.append("callback", callbackName);

    var script = document.createElement("script");
    script.src = form.action + "?" + params.toString();
    script.async = true;

    script.onerror = function () {
      formPage2.classList.add("hidden");
      thankyouPage.classList.remove("hidden");
      delete window[callbackName];
      document.head.removeChild(script);
    };

    document.head.appendChild(script);
  });

  formReset.addEventListener("click", function (e) {
    e.preventDefault();
    thankyouPage.classList.add("hidden");
    formPage1.classList.remove("hidden");
  });
});
