/* ============================================================
   VEYRA — منطق الصفحات
   ============================================================ */
(function (global) {
  "use strict";

  const V = global.Veyra;
  const I = global.VeyraI18n;
  const D = global.VEYRA_DATA;
  const P = D.products;
  const page = document.body.dataset.page || "";
  const t = I.t;
  const loc = V.localized;

  /* ===================== الرئيسية ===================== */
  function initHome() {
    V.renderGrid("#gridNew", P.filter(p => p.featured === "new"));
    V.renderGrid("#gridBest", P.filter(p => p.featured === "bestseller"));
    V.renderGrid("#gridSignature", P.filter(p => p.featured === "signature"));
  }

  /* ===================== المجموعات ===================== */
  const filterState = { type: "all", color: "all", material: "all", price: "all", sort: "featured", q: "", featured: "all" };

  function option(value, label, current) {
    return `<option value="${value}" ${current === value ? "selected" : ""}>${label}</option>`;
  }

  let collectionControls = null;

  function collectionOptions() {
    return {
      type: option("all", t("all"), filterState.type) +
        Object.entries(D.taxonomy.types).map(([k, v]) => option(k, loc(v), filterState.type)).join(""),
      color: option("all", t("all"), filterState.color) +
        Object.entries(D.taxonomy.colors).map(([k, v]) => option(k, loc(v), filterState.color)).join(""),
      material: option("all", t("all"), filterState.material) +
        Object.entries(D.taxonomy.materials).map(([k, v]) => option(k, loc(v), filterState.material)).join(""),
      price: [
        option("all", t("all"), filterState.price),
        option("under", t("price_under"), filterState.price),
        option("mid", t("price_mid"), filterState.price),
        option("high", t("price_high"), filterState.price)
      ].join(""),
      sort: ["featured", "low", "high", "new"].map(k => option(k, t("sort_" + k), filterState.sort)).join("")
    };
  }

  function paintCollectionOptions() {
    if (!collectionControls) return;
    const opts = collectionOptions();
    Object.entries(collectionControls).forEach(([key, sel]) => {
      if (!sel) return;
      sel.innerHTML = opts[key];
      sel.value = filterState[key];
    });
  }

  function buildCollectionControls() {
    collectionControls = {
      type: document.getElementById("filterType"),
      color: document.getElementById("filterColor"),
      material: document.getElementById("filterMaterial"),
      price: document.getElementById("filterPrice"),
      sort: document.getElementById("sortSelect")
    };
    if (!collectionControls.type) return;
    paintCollectionOptions();
    const c = collectionControls;
    c.type.addEventListener("change", e => { filterState.type = e.target.value; renderCollections(); });
    c.color.addEventListener("change", e => { filterState.color = e.target.value; renderCollections(); });
    c.material.addEventListener("change", e => { filterState.material = e.target.value; renderCollections(); });
    c.price.addEventListener("change", e => { filterState.price = e.target.value; renderCollections(); });
    c.sort.addEventListener("change", e => { filterState.sort = e.target.value; renderCollections(); });
    document.getElementById("clearFilters")?.addEventListener("click", () => {
      Object.assign(filterState, { type: "all", color: "all", material: "all", price: "all", sort: "featured", q: "", featured: "all" });
      paintCollectionOptions();
      renderCollections();
    });
  }

  function initCollections() {
    const params = new URLSearchParams(location.search);
    filterState.q = params.get("q") || "";
    const cat = params.get("cat");
    const featuredMap = { new: "new", best: "bestseller", bestseller: "bestseller", signature: "signature" };
    filterState.featured = featuredMap[cat] || "all";
    if (filterState.featured !== "all") {
      filterState.sort = "featured";
      filterState.q = "";
    }
    buildCollectionControls();
    const catBanner = document.getElementById("collectionKicker");
    if (cat) {
      const key = { new: "cat_new", best: "cat_best", signature: "cat_signature" }[cat];
      if (key && catBanner) catBanner.textContent = t(key);
    }
    renderCollections();
  }

  function renderCollections() {
    let list = P.slice();
    const f = filterState;
    if (f.featured !== "all") list = list.filter(p => p.featured === f.featured);
    if (f.type !== "all") list = list.filter(p => p.type === f.type);
    if (f.color !== "all") list = list.filter(p => p.color === f.color || p.colors.includes(f.color));
    if (f.material !== "all") list = list.filter(p => p.material === f.material);
    if (f.price === "under") list = list.filter(p => p.price < 1500);
    if (f.price === "mid") list = list.filter(p => p.price >= 1500 && p.price <= 2500);
    if (f.price === "high") list = list.filter(p => p.price > 2500);
    if (f.q) {
      const q = f.q.toLowerCase();
      list = list.filter(p => loc(p.name).toLowerCase().includes(q) || p.id.includes(q) ||
        V.typeLabel(p.type).toLowerCase().includes(q) || V.colorLabel(p.color).toLowerCase().includes(q));
    }
    if (f.sort === "low") list.sort((a, b) => a.price - b.price);
    if (f.sort === "high") list.sort((a, b) => b.price - a.price);
    if (f.sort === "new") list.sort((a, b) => Number(b.badge?.ar === "جديد") - Number(a.badge?.ar === "جديد"));
    V.renderGrid("#productsGrid", list);
    const count = document.getElementById("resultsCount");
    if (count) count.textContent = `${list.length} ${t("results")}`;
  }

  /* ===================== صفحة المنتج ===================== */
  let selectedColor = null;
  let productQty = 1;
  let productInitialised = false;

  function initProduct() {
    const id = new URLSearchParams(location.search).get("id");
    const p = V.productById(id) || P[0];
    if (!productInitialised || !p.colors.includes(selectedColor)) selectedColor = p.colors[0];
    if (!productInitialised) productQty = 1;
    productInitialised = true;

    document.getElementById("breadcrumbName")?.replaceChildren(document.createTextNode(loc(p.name)));
    document.title = `${loc(p.name)} | VEYRA`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", loc(p.description));

    const main = document.getElementById("mainImage");
    const lightbox = document.getElementById("lightbox");
    if (main) {
      main.src = p.images[0];
      main.alt = loc(p.alt)[0];
      main.onclick = () => lightbox?.classList.add("is-open");
    }
    document.getElementById("lightboxImage")?.setAttribute("src", p.images[0]);
    if (lightbox) {
      document.getElementById("lightboxClose").onclick = () => lightbox.classList.remove("is-open");
      lightbox.onclick = e => { if (e.target.id === "lightbox") lightbox.classList.remove("is-open"); };
    }

    const thumbs = document.getElementById("galleryThumbs");
    if (thumbs) {
      thumbs.innerHTML = p.images.map((src, i) => `
        <button class="thumb ${i === 0 ? "is-active" : ""}" type="button" data-index="${i}" aria-label="${I.lang === "ar" ? "صورة" : "Image"} ${i + 1}">
          <img src="${src}" alt="${V.esc(loc(p.alt)[i])}" loading="lazy" width="1200" height="1500">
        </button>`).join("");
      thumbs.onclick = e => {
        const btn = e.target.closest("[data-index]");
        if (!btn) return;
        const i = Number(btn.dataset.index);
        main.src = p.images[i];
        main.alt = loc(p.alt)[i];
        document.getElementById("lightboxImage").src = p.images[i];
        thumbs.querySelectorAll(".thumb").forEach(b => b.classList.toggle("is-active", b === btn));
      };
    }

    const info = document.getElementById("productInfo");
    if (info) {
      const details = loc(p.details);
      const wish = V.inWishlist(p.id);
      info.innerHTML = `
        <p class="product-type">${V.typeLabel(p.type)} · ${V.materialLabel(p.material)}</p>
        <h1>${V.esc(loc(p.name))}</h1>
        <div class="product-price product-price--large"><strong>${V.money(p.price)}</strong>${p.oldPrice ? `<s>${V.money(p.oldPrice)}</s>` : ""}</div>
        <p class="product-desc">${V.esc(loc(p.description))}</p>
        ${p.stock <= 4 ? `<p class="stock-note"><span></span> ${t("product_limited")} (${p.stock})</p>` : ""}
        <div class="selector">
          <span class="selector-label">${t("product_color")}: <strong id="colorName">${V.colorLabel(p.colors[0])}</strong></span>
          <div class="swatches">
            ${p.colors.map(c => `<button type="button" class="swatch ${c === selectedColor ? "is-active" : ""}" data-color="${c}" style="--swatch:${D.taxonomy.colors[c].hex}" aria-label="${V.colorLabel(c)}"></button>`).join("")}
          </div>
        </div>
        <div class="selector">
          <span class="selector-label">${t("product_qty")}</span>
          <div class="qty-control">
            <button type="button" data-qty-minus>−</button>
            <span id="qtyValue">1</span>
            <button type="button" data-qty-plus>+</button>
          </div>
        </div>
        <div class="product-actions">
          <button class="btn btn-primary" type="button" id="addToCartBtn">${t("product_add")}</button>
          <button class="btn btn-outline wish-btn-inline ${wish ? "is-active" : ""}" type="button" data-wish="${p.id}">♥ ${t(wish ? "product_wishlisted" : "product_wishlist")}</button>
        </div>
        <div class="mini-trust">
          <span>✦ ${t("trust_secure")}</span><span>✦ ${t("trust_return")}</span>
        </div>
        <div class="accordion" id="productAccordion">
          <div class="acc-item is-open">
            <button type="button">${t("product_details")} <span>+</span></button>
            <div class="acc-body">
              <p><strong>${t("product_material")}:</strong> ${details.material}</p>
              <p><strong>${t("product_size")}:</strong> ${details.size}</p>
              <p><strong>${t("product_care")}:</strong> ${details.care}</p>
            </div>
          </div>
          <div class="acc-item"><button type="button">${t("product_shipping")} <span>+</span></button><div class="acc-body"><p>${t("product_shipping_text")}</p></div></div>
          <div class="acc-item"><button type="button">${t("product_returns")} <span>+</span></button><div class="acc-body"><p>${t("product_returns_text")}</p></div></div>
        </div>`;

      document.getElementById("qtyValue").textContent = productQty;
      info.onclick = e => {
        const swatch = e.target.closest("[data-color]");
        if (swatch) {
          selectedColor = swatch.dataset.color;
          info.querySelectorAll(".swatch").forEach(s => s.classList.toggle("is-active", s === swatch));
          document.getElementById("colorName").textContent = V.colorLabel(selectedColor);
          return;
        }
        if (e.target.closest("[data-qty-minus]")) {
          productQty = Math.max(1, productQty - 1);
          document.getElementById("qtyValue").textContent = productQty;
          return;
        }
        if (e.target.closest("[data-qty-plus]")) {
          productQty = Math.min(p.stock, productQty + 1);
          document.getElementById("qtyValue").textContent = productQty;
          return;
        }
        if (e.target.closest("#addToCartBtn")) {
          V.addToCart(p.id, selectedColor, productQty);
          return;
        }
        const accBtn = e.target.closest(".acc-item > button");
        if (accBtn) accBtn.parentElement.classList.toggle("is-open");
      };
    }

    V.renderGrid("#relatedGrid", P.filter(x => x.id !== p.id).slice(0, 4));

    const ld = document.getElementById("productSchema");
    if (ld) {
      ld.textContent = JSON.stringify({
        "@context": "https://schema.org/", "@type": "Product", name: loc(p.name),
        image: p.images, description: loc(p.description), brand: { "@type": "Brand", name: "Veyra" },
        offers: { "@type": "Offer", priceCurrency: "SAR", price: p.price, availability: "https://schema.org/InStock" }
      });
    }
  }

  /* ===================== السلة ===================== */
  function initCart() {
    renderCart();
    document.getElementById("discountApply")?.addEventListener("click", () => {
      const val = document.getElementById("discountInput").value.trim().toUpperCase();
      if (val === "VEYRA10") {
        V.setExtras({ discount: true });
        V.toast(I.lang === "ar" ? "تم تطبيق الخصم ١٠٪" : "10% discount applied");
      } else V.toast(t("cart_invalid"));
    });
    document.getElementById("giftToggle")?.addEventListener("change", e => V.setExtras({ gift: e.target.checked }));
  }

  let cartListenersBound = false;

  function renderCart() {
    const body = document.getElementById("cartBody");
    const empty = document.getElementById("cartEmpty");
    const shell = document.getElementById("cartShell");
    const cart = V.getCart();
    const items = cart.map(x => ({ ...x, p: V.productById(x.id) })).filter(x => x.p);

    if (!items.length) {
      if (shell) shell.hidden = true;
      if (empty) empty.hidden = false;
      return;
    }
    if (shell) shell.hidden = false;
    if (empty) empty.hidden = true;

    if (body) {
      body.innerHTML = items.map(x => `
        <div class="cart-item">
          <a href="product.html?id=${x.p.id}"><img src="${x.p.images[0]}" alt="${V.esc(loc(x.p.alt)[0])}" loading="lazy" width="1200" height="1500"></a>
          <div class="cart-item__info">
            <h3><a href="product.html?id=${x.p.id}">${V.esc(loc(x.p.name))}</a></h3>
            <p>${V.colorLabel(x.color)} · ${V.typeLabel(x.p.type)}</p>
            <div class="qty-control qty-control--sm">
              <button type="button" data-minus="${x.id}|${x.color}">−</button>
              <span>${x.qty}</span>
              <button type="button" data-plus="${x.id}|${x.color}">+</button>
            </div>
          </div>
          <strong>${V.money(x.p.price * x.qty)}</strong>
          <button class="cart-remove" type="button" data-remove="${x.id}|${x.color}" aria-label="${t("cart_remove")}">×</button>
        </div>`).join("");

      if (!cartListenersBound) {
        cartListenersBound = true;
        body.addEventListener("click", e => {
          const minus = e.target.closest("[data-minus]"), plus = e.target.closest("[data-plus]"), rem = e.target.closest("[data-remove]");
          const parse = v => { const [id, color] = v.split("|"); return [id, color]; };
          if (minus) { const [id, c] = parse(minus.dataset.minus); V.setQty(id, c, V.getCart().find(i => i.id === id && i.color === c).qty - 1); renderCart(); }
          if (plus) { const [id, c] = parse(plus.dataset.plus); V.setQty(id, c, V.getCart().find(i => i.id === id && i.color === c).qty + 1); renderCart(); }
          if (rem) { const [id, c] = parse(rem.dataset.remove); V.removeFromCart(id, c); renderCart(); }
        });
      }
    }

    const sum = V.totals();
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set("sumSubtotal", V.money(sum.sub));
    set("sumDiscount", sum.discount ? `−${V.money(sum.discount)}` : "—");
    set("sumShipping", sum.shipping ? V.money(sum.shipping) : t("cart_free"));
    set("sumTotal", V.money(sum.total));
    const gift = document.getElementById("giftToggle");
    if (gift) gift.checked = V.getExtras().gift;
  }

  /* ===================== الدفع ===================== */
  function initCheckout() {
    renderCheckoutSummary();
    const form = document.getElementById("checkoutForm");
    form?.addEventListener("submit", e => {
      e.preventDefault();
      if (!form.checkValidity()) return V.toast(t("required"));
      if (!V.getCart().length) return V.toast(t("cart_empty"));
      V.clearCart();
      document.getElementById("checkoutView").hidden = true;
      document.getElementById("checkoutSuccess").hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function renderCheckoutSummary() {
    const box = document.getElementById("checkoutItems");
    if (!box) return;
    const items = V.getCart().map(x => ({ ...x, p: V.productById(x.id) })).filter(x => x.p);
    box.innerHTML = items.map(x => `
      <div class="checkout-item">
        <img src="${x.p.images[0]}" alt="" loading="lazy" width="1200" height="1500">
        <div><strong>${V.esc(loc(x.p.name))}</strong><span>${V.colorLabel(x.color)} × ${x.qty}</span></div>
        <b>${V.money(x.p.price * x.qty)}</b>
      </div>`).join("");
    const s = V.totals();
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set("paySubtotal", V.money(s.sub));
    set("payShipping", s.shipping ? V.money(s.shipping) : t("cart_free"));
    set("payDiscount", s.discount ? `−${V.money(s.discount)}` : "—");
    set("payGift", s.gift ? V.money(s.gift) : "—");
    set("payTotal", V.money(s.total));
  }

  /* ===================== الأسئلة الشائعة ===================== */
  function initFaq() {
    document.querySelectorAll("[data-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.tab;
        document.querySelectorAll("[data-tab]").forEach(b => b.classList.toggle("is-active", b === btn));
        document.querySelectorAll("[data-panel]").forEach(p => p.hidden = p.dataset.panel !== name);
      });
    });
    document.querySelectorAll(".acc-item > button").forEach(btn => {
      btn.addEventListener("click", () => btn.parentElement.classList.toggle("is-open"));
    });
  }

  /* ===================== نموذج التواصل ===================== */
  function initContact() {
    document.getElementById("contactForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = e.currentTarget;
      if (!form.checkValidity()) return V.toast(t("required"));
      const name = form.name.value, email = form.contactEmail.value, message = form.message.value;
      const text = `${t("contact_form")}%0A%0A${t("contact_name")}: ${name}%0A${t("contact_email")}: ${email}%0A%0A${message}`;
      window.open(`https://wa.me/${V.WHATSAPP}?text=${text}`, "_blank", "noopener,noreferrer");
    });
  }

  function rerender() {
    if (page === "home") initHome();
    else if (page === "collections") { paintCollectionOptions(); renderCollections(); }
    else if (page === "product") initProduct();
    else if (page === "cart") renderCart();
    else if (page === "checkout") renderCheckoutSummary();
  }

  function init() {
    switch (page) {
      case "home": initHome(); break;
      case "collections": initCollections(); break;
      case "product": initProduct(); break;
      case "cart": initCart(); break;
      case "checkout": initCheckout(); break;
      case "faq": initFaq(); break;
      case "contact": initContact(); break;
    }
  }

  global.VeyraPages = { init, rerender };
})(window);
