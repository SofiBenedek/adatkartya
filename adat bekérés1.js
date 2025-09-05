(() => {
  const LS_KEY = "cards";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function readForm() {
    const get = (name) => {
      const val = ($(`input[name="${name}"]`)?.value || "").trim();
      return val || "no adat";
    };
    return {
      "Name": get("nev"),
      "Zipcode": get("code"),
      "Phone": get("tel"),
      "Street": get("str"),
      "Number": get("num"),
    };
  }

  function getCards() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function setCards(arr) {
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
  }

  function clearForm() {
    $$('#megad input').forEach(i => i.value = "");
  }

  function save() {
    const cards = getCards();
    const formData = readForm();
    

    if (cards.length > 0) {
      cards[0] = formData; 
    } else {
      cards.push(formData); 
    }
    
    setCards(cards);
    render();  
    clearForm();  
  }

  function render() {
    const container = $(".kartyak");
    container.innerHTML = "";

    const cards = getCards();
    if (!cards.length) {
      container.innerHTML = "<p>Nincs elmentett kártya.</p>";
      return;
    }

    cards.forEach((adat, i) => {
      const div = document.createElement("div");
      div.className = "kartya";

      div.innerHTML = `
        <button class="torol" title="Kártya törlése" data-i="${i}">×</button>
        ${Object.entries(adat)
          .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
          .join("")}
      `;

      container.appendChild(div);
    });
  }

  function removeAt(index) {
    const cards = getCards();
    cards.splice(index, 1);
    setCards(cards);
    render();
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".torol");
    if (btn) {
      const i = parseInt(btn.dataset.i, 10);
      if (!Number.isNaN(i)) removeAt(i);
    }
  });

  window.save = save;
  window.loadCards = render;
})();
