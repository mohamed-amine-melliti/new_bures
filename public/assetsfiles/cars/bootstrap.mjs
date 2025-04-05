import { d as s, p as c, i as f, P as e, e as I, f as C, Q as l, c as p, g as E, F as m, h as A, j as O, k as P, l as R, m as F, n as T, I as B, U as j, o as N, N as U, v as G, q as $, s as y, t as v } from "./chunks/cias-login.mjs";
import { getQueryParameter as w, removeQueryParametersForSeamlessRouter as V } from "@b2x/std/core/url.mjs";
import { initTranslations as _ } from "@b2x/std/i18n.mjs";
/**
 * @preserve
 * Licenses of bundled dependencies can be found in dependencies-licenses.txt
 */
/*! B2X@AUTH 0.4.6 */
const u = s.createLogger("LOGGED_IN_BIAS");
async function k(n) {
  u.info("Logged in flow");
  const i = n.claims.exp * 1e3, o = (/* @__PURE__ */ new Date()).getTime();
  if (i > o)
    return u.info("Session is still valid"), await c(n);
  if (f(e.BIAS)) {
    u.info("Session expired on private page, expecting redirect to login");
    const a = new URL("/passengercars/sales-mode/overview", window.location.origin);
    return I({ redirectUrl: a.toString() });
  }
  u.info("Session expired on public page, publish empty state"), await c({
    jwe: null,
    claims: null,
    identityProvider: null
  });
}
const D = s.createLogger("LOGGED_IN_CIAS");
async function H(n) {
  D.info("Logged in flow");
  let i = n;
  try {
    const o = C();
    if (!await o.validate(n.jwe).then(() => !0).catch(() => !1)) {
      const r = await o.refreshToken(n.jwe), g = await o.fetchClaims(r);
      i = {
        jwe: r,
        claims: g,
        identityProvider: e.CIAS
      };
    }
  } catch (o) {
    if (f()) {
      const a = new URL(window.location.origin);
      return a.searchParams.append(l.ERROR, o.id), p({ targetUrl: a.toString() });
    }
    throw i = {
      jwe: null,
      claims: null,
      identityProvider: null
    }, o;
  } finally {
    await c(i);
  }
}
const L = s.createLogger("GET_FLOW");
async function S() {
  const n = w(l.FLOW), i = w(l.PROVIDER), o = w(l.ERROR);
  L.info("Flow, provider, error", n, i, o), V([
    l.FLOW,
    l.PROVIDER,
    l.ERROR,
    l.CIAS_ERROR
  ]);
  const a = await E.get(), r = [
    () => z(o, i),
    () => M(n, i),
    () => K(a),
    () => J(a),
    () => Y(o, i),
    () => x(n, i),
    () => Q(n, i),
    () => W(a),
    () => q(a),
    () => X()
  ];
  for (const g of r) {
    const h = g();
    if (h)
      return await h();
  }
}
function x(n, i) {
  if (n === m.LOGIN && i === e.CIAS)
    return A;
}
function M(n, i) {
  if (n === m.LOGIN && i === e.BIAS)
    return O;
}
function Q(n, i) {
  if (n === m.LOGOUT && i === e.CIAS)
    return P;
}
function W(n) {
  if (n != null && n.jwe && (n == null ? void 0 : n.identityProvider) === e.CIAS)
    return async () => await H(n);
}
function K(n) {
  if (n != null && n.jwe && (n == null ? void 0 : n.identityProvider) === e.BIAS)
    return async () => await k(n);
}
function q(n) {
  if (!(n != null && n.jwe) && f() && !window.location.pathname.includes("sales-mode"))
    return async () => R();
}
function J(n) {
  if (!(n != null && n.jwe) && f(e.BIAS) && window.location.pathname.includes("sales-mode"))
    return async () => I();
}
function Y(n, i) {
  if (n && i === e.CIAS) {
    const o = F(n);
    return async () => {
      throw await c({
        // TODO: test this
        claims: null,
        identityProvider: null,
        jwe: null
      }), o;
    };
  }
}
function z(n, i) {
  if (n && i === e.BIAS) {
    const o = T(n);
    return async () => {
      throw await c({
        claims: null,
        identityProvider: null,
        jwe: null
      }), o;
    };
  }
}
function X() {
  return L.info("Anonymous flow, publishing empty state"), async () => await c({
    claims: null,
    identityProvider: null,
    jwe: null
  });
}
async function Z(n) {
  const { t: i } = await _({
    projectId: "64493c99bbf09b7c6885ac9995dfcf08",
    country: window.aemNamespace.pageEnvironmentVariables.country,
    language: window.aemNamespace.pageEnvironmentVariables.language,
    fallbackLanguage: "en",
    fallbackCountry: "EN"
  });
  return i(n);
}
const d = s.createLogger("PUBLISH_ERROR");
async function nn(n) {
  d.error("Error occurred", n);
  let i = null;
  if (n instanceof B ? n.shouldNotify && (i = n) : i = new j(), i) {
    try {
      i.message = await Z(i.translationKey);
    } catch (r) {
      d.error("Error occurred while translating notification", r);
    }
    d.info("Setting error in legacy connection", i), N.setError(i);
    const { renderNotification: o } = await import(
      /* @vite-ignore */
      "@oneweb/notification"
    ), a = {
      message: i.message,
      theme: "light",
      variant: i.type.toLowerCase()
    };
    i.type !== U.ERROR && (a.lifetime = 2e4), o(a);
  }
}
const t = s.createLogger("AUTHENTICATION_BOOTSTRAP"), on = s.createLogger("TRACKING");
function b() {
  return t.info(`Bootstrapping authentication ${G} - ${$}`), console.time("authPublish"), S().catch(nn).finally(() => {
    en(), rn(), an(), tn();
  });
}
async function an() {
  t.info("Handle visibility change");
  const n = await E.get();
  n != null && n.jwe && document.addEventListener("visibilitychange", i);
  function i() {
    document.visibilityState === "visible" && (t.info("Visibility change to ", document.visibilityState), document.removeEventListener("visibilitychange", i), b());
  }
}
async function en() {
  t.info("Handle login hash"), n(), window.addEventListener("hashchange", n);
  function n() {
    location.hash === "#login" && (t.info("Login hash detected, users login state is:", y.state.isLoggedIn), history.replaceState(null, "", window.location.pathname + window.location.search), y.state.isLoggedIn || (t.info("Triggering login since user is not logged in"), window.removeEventListener("hashchange", n), R()));
  }
}
function tn() {
  t.info("Handle event from other tabs"), v.subscribe("logout", async () => {
    t.info("Received logout event from other tab"), await c({
      jwe: null,
      claims: null,
      identityProvider: null
    });
  }), v.subscribe("login", async ({ payload: n }) => {
    t.info("Received login event from other tab"), await c(n);
  });
}
function rn() {
  const n = /* @__PURE__ */ new Map();
  document.addEventListener("api-tracking", (i) => {
    const o = n.get(i.detail.owner) || [], { method: a, tenant: r, version: g } = i.detail;
    o.push({ method: a, tenant: r, version: g }), n.set(i.detail.owner, o);
  }), window.addEventListener("pagehide", (i) => {
    i.persisted || on.info("API USAGE TRACKING", JSON.stringify([...n], null, 2));
  });
}
queueMicrotask(b);
//# sourceMappingURL=bootstrap.mjs.map
