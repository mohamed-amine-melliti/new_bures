var h = Object.defineProperty;
var w = (o, t, n) => t in o ? h(o, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : o[t] = n;
var a = (o, t, n) => w(o, typeof t != "symbol" ? t + "" : t, n);
import { getAemNamespace as L } from "@b2x/std/helpers/environment.mjs";
import { subscribeIam as A } from "@b2x/authentication";
import { storage as l } from "@b2x/std/core/storage.mjs";
import { isDebuggerGrouped as b, isDebuggerEnable as y } from "@b2x/std/core/debug.mjs";
import { isLocalhost as E } from "@b2x/std/core/utilities.mjs";
import { consola as m } from "@b2x/std/logger/consola.mjs";
import { BrowserReporter as $ } from "@b2x/std/logger/reporters/browser.mjs";
/**
 * @preserve
 * Licenses of bundled dependencies can be found in dependencies-licenses.txt
 */
const d = "2.104.6", f = "2.4.2025, 10:00:17", r = "B2X@LAL";
function k() {
  return m.setLogger(r, {
    reporters: [
      new $({
        title: `LAL@${d}-${f}`,
        namespace: r,
        delay: 1500,
        grouped: b(r),
        enabled: y(r) || E()
      })
    ]
  }), {
    createLogger: (o) => m.createLoggerGroup(r, o)
  };
}
const s = k(), D = s.createLogger("HELPERS");
function F(o, t) {
  return {
    authState: {
      jwe: o.jwe,
      email: o.email || ""
    },
    currentPage: window.location.href,
    country: t
  };
}
const N = () => {
  const o = document.querySelector('script[type="importmap"]');
  if (o != null && o.textContent)
    try {
      return JSON.parse(o.textContent);
    } catch {
      D.error("Error parsing import map");
    }
  return {
    imports: {}
  };
};
async function C() {
  return await new Promise((o) => {
    A((t) => {
      o(t);
    });
  });
}
function p(o, t) {
  const n = new CustomEvent(o, {
    bubbles: !0,
    detail: t
  });
  document.dispatchEvent(n);
}
function M(o) {
  o.isLoggedIn ? l.session.set("ow_aem_loginstate", "logged_in", !1) : l.session.set("ow_aem_loginstate", "logged_out", !1);
}
const c = s.createLogger("FLOW-RUNNER");
class P {
  constructor(t, n, i) {
    a(this, "actionName");
    a(this, "importPrefix", "@b2x/loginaction/");
    a(this, "importMap");
    a(this, "loginData");
    a(this, "importMapActionUrl");
    var g;
    this.actionName = t, this.importMap = i, this.loginData = n, this.importMapActionUrl = (g = this.importMap) == null ? void 0 : g.imports[`${this.importPrefix}${this.actionName}`];
  }
  async runCondition() {
    const t = this.importMapActionUrl.split("/");
    t[t.length - 1] = "condition.js";
    const i = await (await import(t.join("/"))).default(this.loginData);
    return c.info(`Checking condition for action: ${this.actionName}`, i ? "🚧" : "❌"), i;
  }
  async runAction() {
    await (await import(
      /* @vite-ignore */
      this.importMapActionUrl
    )).default(this.loginData), c.info(` ✅ Executed action: ${this.actionName}`);
  }
  async run() {
    c.info(`🚀 Running action: ${this.actionName}`);
    try {
      await this.runCondition() && await this.runAction();
    } catch (t) {
      c.warn(`⛔️ Error running condition or action: ${this.actionName}`, t);
    }
  }
}
async function S(o, t) {
  const n = N();
  for (const i of o)
    n.imports[`@b2x/loginaction/${i}`] && await new P(i, t, n).run();
}
const O = s.createLogger("FLOW"), U = [
  "declarationOfConsent",
  "checkForConsentUpdates",
  // this ones should not be actions
  "loadAndPersistVehicleDataWko",
  "loadAndPersistDealersDataWko"
], e = [
  "checkNationalConsentStatus",
  "checkForConsentUpdates",
  // this ones should not be actions
  "loadAndPersistVehicleDataWko",
  "loadAndPersistDealersDataWko"
], u = {
  ba: null,
  rs: null,
  hk: e,
  jp: e,
  kr: e,
  la: e,
  mo: e,
  my: e,
  sg: e,
  vn: e,
  standard: U
};
function R(o) {
  const t = l.local.get("b2x.lal_flow");
  return t ? (O.warn("Using custom flow", t), t) : u[o] || u.standard;
}
const x = s.createLogger("BOOTSTRAP");
async function _(o, t) {
  try {
    const n = R(o.toLowerCase()), i = F(t, o);
    await S(n, i), p("login-action:done", { country: o });
  } catch (n) {
    p("login-action:failed", { country: o }), x.error("Error initializing login actions library", n);
  }
}
const v = s.createLogger("BOOTSTRAP");
async function j() {
  v.info(`Login Actions library ${d} - ${f}`);
  const { country: o } = L().pageEnvironmentVariables, t = await C();
  M(t), t.isLoggedIn && _(o, t);
}
j();
//# sourceMappingURL=bootstrap.mjs.map
