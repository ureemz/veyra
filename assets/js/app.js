/* ============================================================
   VEYRA — النواة المشتركة: السلة، المفضلة، البطاقات، التفاعلات
   ============================================================ */
(function (global) {
  "use strict";

  const I = global.VeyraI18n;
  const D = global.VEYRA_DATA;
  const CART_KEY = "veyra_cart";
  const EXTRA_KEY = "veyra_cart_extras";
  const WISH_KEY = "veyra_wishlist";
  const WHATSAPP = "966542308267"; // رقم واتساب الفعلي: 0542308267 (بصيغة دولية لـ wa.me)
  const PHONE_DISPLAY = "0542308267"; // الرقم كما يظهر للعميل

  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* noop */ }
  }

  /* ---------- أدوات مساعدة ---------- */
  function money(n) {
    const value = new Intl.NumberFormat("en-US").format(Math.round(n));
    return I.lang === "ar" ? `${value} ر.س` : `SAR ${value}`;
  }
  function localized(obj) {
    if (!obj) return "";
    return typeof obj === "string" ? obj : (obj[I.lang] || obj.ar || "");
  }
  function typeLabel(key) { return localized(D.taxonomy.types[key] || { ar: key, en: key }); }
  function colorLabel(key) { return localized(D.taxonomy.colors[key] || { ar: key, en: key }); }
  function materialLabel(key) { return localized(D.taxonomy.materials[key] || { ar: key, en: key }); }
  function productById(id) { return D.products.find(p => p.id === id); }
  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ---------- السلة ---------- */
  function getCart() { return read(CART_KEY, []); }
  function saveCart(cart) { write(CART_KEY, cart); updateCartCount(); window.dispatchEvent(new CustomEvent("veyra:cart")); }
  function addToCart(id, color, qty) {
    const cart = getCart();
    const item = cart.find(x => x.id === id && x.color === color);
    if (item) item.qty += qty || 1;
    else cart.push({ id, color, qty: qty || 1 });
    saveCart(cart);
    toast(I.t("product_added"));
  }
  function setQty(id, color, qty) {
    const cart = getCart();
    const item = cart.find(x => x.id === id && x.color === color);
    if (!item) return;
    if (qty <= 0) return removeFromCart(id, color);
    item.qty = qty;
    saveCart(cart);
  }
  function removeFromCart(id, color) {
    saveCart(getCart().filter(x => !(x.id === id && x.color === color)));
  }
  function clearCart() { saveCart([]); write(EXTRA_KEY, { discount: false, gift: false }); }
  function cartCount() { return getCart().reduce((s, x) => s + x.qty, 0); }
  function getExtras() { return read(EXTRA_KEY, { discount: false, gift: false }); }
  function setExtras(extra) { write(EXTRA_KEY, { ...getExtras(), ...extra }); window.dispatchEvent(new CustomEvent("veyra:cart")); }
  function totals() {
    const sub = getCart().reduce((sum, item) => {
      const p = productById(item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
    const extra = getExtras();
    const discount = extra.discount ? Math.round(sub * 0.1) : 0;
    const shipping = sub === 0 || sub >= 1500 ? 0 : 35;
    const gift = extra.gift ? 50 : 0;
    return { sub, discount, shipping, gift, total: sub - discount + shipping + gift };
  }
  function updateCartCount() {
    document.querySelectorAll("[data-cart-count]").forEach(el => {
      el.textContent = cartCount();
      el.hidden = cartCount() === 0;
    });
  }

  /* ---------- المفضلة ---------- */
  function getWishlist() { return read(WISH_KEY, []); }
  function inWishlist(id) { return getWishlist().includes(id); }
  function toggleWishlist(id) {
    const list = getWishlist();
    const i = list.indexOf(id);
    if (i >= 0) list.splice(i, 1); else list.push(id);
    write(WISH_KEY, list);
    window.dispatchEvent(new CustomEvent("veyra:wish"));
    return i < 0;
  }

  /* ---------- بطاقة المنتج ---------- */
  function productCard(p) {
    const name = localized(p.name);
    const href = `product.html?id=${encodeURIComponent(p.id)}`;
    const badge = p.badge ? `<span class="badge ${p.stock <= 4 ? "badge--limited" : ""}">${localized(p.badge)}</span>` : "";
    const wish = inWishlist(p.id);
    return `
      <article class="product-card reveal">
        <div class="product-media">
          <a href="${href}" aria-label="${esc(name)}">
            <img src="${p.images[0]}" alt="${esc(localized(p.alt)[0])}" loading="lazy" width="1200" height="1500">
            <img class="product-media__alt" src="${p.images[1]}" alt="${esc(localized(p.alt)[1])}" loading="lazy" width="1200" height="1500">
          </a>
          ${badge}
          <button class="wish-btn ${wish ? "is-active" : ""}" type="button" data-wish="${p.id}" aria-label="${I.t(wish ? "product_wishlisted" : "product_wishlist")}">♥</button>
        </div>
        <div class="product-info">
          <p class="product-type">${typeLabel(p.type)} · ${colorLabel(p.color)}</p>
          <h3><a href="${href}">${esc(name)}</a></h3>
          <div class="product-price"><strong>${money(p.price)}</strong>${p.oldPrice ? `<s>${money(p.oldPrice)}</s>` : ""}</div>
        </div>
      </article>`;
  }

  function renderGrid(target, list) {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return;
    el.innerHTML = list.length ? list.map(productCard).join("") : `<p class="empty-note">${I.t("cart_empty_sub")}</p>`;
    observeReveals(el);
  }

  /* ---------- تنبيهات ---------- */
  let toastTimer;
  function toast(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.querySelector("span")?.remove();
    el.innerHTML = `<span>${esc(message)}</span>`;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2600);
  }

  /* ---------- حركات ظهور بسيطة ---------- */
  let observer;
  function observeReveals(root) {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
      return;
    }
    observer = observer || new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    (root || document).querySelectorAll(".reveal:not(.is-visible)").forEach(el => observer.observe(el));
  }

  /* ---------- تفاعلات مشتركة ---------- */
  function initCommon() {
    updateCartCount();
    observeReveals();

    document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });

    // القائمة الجوال
    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("mainNav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        menuBtn.setAttribute("aria-expanded", String(open));
      });
      nav.addEventListener("click", e => {
        if (e.target.closest("a")) nav.classList.remove("is-open");
      });
    }

    // تبديل اللغة
    document.querySelectorAll("[data-lang-toggle]").forEach(btn => {
      btn.addEventListener("click", () => I.set(I.lang === "ar" ? "en" : "ar"));
    });

    // البحث
    const searchBtn = document.getElementById("searchBtn");
    const searchPanel = document.getElementById("searchPanel");
    const searchClose = document.getElementById("searchClose");
    const searchForm = document.getElementById("searchForm");
    if (searchBtn && searchPanel) {
      searchBtn.addEventListener("click", () => searchPanel.classList.add("is-open"));
      searchClose?.addEventListener("click", () => searchPanel.classList.remove("is-open"));
      searchForm?.addEventListener("submit", e => {
        e.preventDefault();
        const q = searchForm.querySelector("input").value.trim();
        location.href = "collections.html" + (q ? `?q=${encodeURIComponent(q)}` : "");
      });
    }

    // أزرار المفضلة (تفويض)
    document.addEventListener("click", e => {
      const wish = e.target.closest("[data-wish]");
      if (wish) {
        e.preventDefault();
        const id = wish.dataset.wish;
        const added = toggleWishlist(id);
        document.querySelectorAll(`[data-wish="${id}"]`).forEach(b => b.classList.toggle("is-active", inWishlist(id)));
        toast(I.t(added ? "product_wishlisted" : "cart_remove"));
      }
      const add = e.target.closest("[data-add]");
      if (add) {
        e.preventDefault();
        addToCart(add.dataset.add, add.dataset.color || productById(add.dataset.add)?.colors[0], Number(add.dataset.qty || 1));
      }
    });

    // النشرة البريدية
    document.querySelectorAll("[data-newsletter]").forEach(form => {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const input = form.querySelector("input[type=email]");
        if (!input.checkValidity()) return toast(I.t("invalid_email"));
        toast(I.t("newsletter_success"));
        input.value = "";
      });
    });

    // تحديث البطاقات عند تغيير اللغة أو السلة
    window.addEventListener("veyra:lang", () => {
      updateCartCount();
      if (global.VeyraPages?.rerender) global.VeyraPages.rerender();
    });
    window.addEventListener("veyra:wish", () => {
      document.querySelectorAll("[data-wish]").forEach(b => b.classList.toggle("is-active", inWishlist(b.dataset.wish)));
    });
  }

  global.Veyra = {
    money, localized, typeLabel, colorLabel, materialLabel, productById, esc,
    getCart, saveCart, addToCart, setQty, removeFromCart, clearCart, cartCount, updateCartCount,
    getExtras, setExtras, totals, getWishlist, inWishlist, toggleWishlist,
    productCard, renderGrid, toast, observeReveals, initCommon, WHATSAPP, PHONE_DISPLAY
  };
})(window);
