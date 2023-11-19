function getUrlKey(name) {
  const reg = (new RegExp(`[?|&]${name}=` + "([^&;]+?)(&|#|;|$)").exec(
    location.href
  ) || [, ""])[1].replace(/\+/g, "%20");
  return decodeURIComponent(reg) || null;
}

function jsonToParams(json) {
  return Object.keys(json)
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`;
    })
    ?.join("&")
    ?.replaceAll("undefined", "");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

function Modal(options) {
  var modal = document.getElementById("myModal");
  var modalTitle = document.getElementById("modalTitle");
  var modalDescription = document.getElementById("modalDescription");
  var button1 = document.getElementById("button1");
  var button2 = document.getElementById("button2");

  function openModal() {
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function onButton1Click() {
    if (options.onButton1Click) {
      options.onButton1Click();
    }
    closeModal();
  }

  function onButton2Click() {
    if (options.onButton2Click) {
      options.onButton2Click();
    }
    closeModal();
  }

  if (options.title) {
    modalTitle.innerText = options.title;
  }

  if (options.titleClass) {
    modalTitle.className = options.titleClass;
  }

  if (options.description) {
    modalDescription.innerText = options.description;
  }

  if (options.descriptionClass) {
    modalDescription.className = options.descriptionClass;
  }

  if (options.showButton1) {
    button1.style.display = "inline-block";
    button1.innerText = options.button1Text || "按钮1";
    button1.onclick = onButton1Click;
  }

  if (options.showButton2) {
    button2.style.display = "inline-block";
    button2.innerText = options.button2Text || "按钮2";
    button2.onclick = onButton2Click;
  }

  return {
    open: openModal,
    close: closeModal,
  };
}
