import { initializeStore as L } from "@seamless/store";
import { i as P, s as p, g as y, l as b } from "./chunks/connection.js";
import { AUTHENTICATION_CONNECTION as A } from "@b2x/authentication-library";
import { PROFILE_CONNECTION as B } from "@b2x/profile-library";
import "https://assets.oneweb.mercedes-benz.com/npm/axios@1/+esm";
import "@seamless/one-context";
/**
 * @preserve
 * Licenses of bundled dependencies can be found in dependencies-licenses.txt
 */
const n = P("B2X-PAL_PL-SYNC");
window.GLOBAL_PAL_AVAILABLE = !0;
async function T() {
  const s = L();
  await p(s);
  const e = await y(), l = window.location.pathname, c = l.includes("/my-area/business"), u = l.includes("/deeplink.html");
  let r = !1, a = !1;
  const m = s.subscribe(A, (i) => {
    i.isPending || (r = !!i.jwe, c && (e == null || e.loadLastB2BStateFromBE()), setTimeout(() => {
      m == null || m.unsubscribe();
    }, 0));
  });
  if (c || u) {
    n.log("PAL is in the lead, so it will update PL, no need to subscribe to PL.");
    return;
  }
  const d = s.subscribe(B, (i) => {
    if (n.log("Received an update, PL state:", i), i.activeProfile.businessType === "B2E")
      return;
    let o;
    i.activeProfile.businessType === "B2B" && (o = {}, i.activeProfile.meId && (o = {
      domainRef: {
        meId: i.activeProfile.meId
      }
    }));
    const g = setTimeout(async () => {
      n.log("Entered timeout, company from PL:", o);
      const { company: t } = await b();
      n.log("Got the currentCompany from PAL", t);
      const f = !o && t || // from b2b to b2c
      o && !t || // from b2c to b2b
      JSON.stringify(o == null ? void 0 : o.domainRef) !== JSON.stringify(t == null ? void 0 : t.domainRef);
      n.log("isCompanyDifferent", f), n.log("syncPLDoneAtLeastOnce", a), (!a || f) && (a = !0, n.log("Will trigger setCompany on PAL"), e == null || e.setCompany(o, [], [], r, () => {
        n.log("Will trigger loadLastStateFromBE on PAL"), e == null || e.loadLastStateFromBE({
          businessType: i.activeProfile.businessType,
          ensureProperties: r ? ["company.name", "user.companies.name", "user.companies.domainRef.**"] : []
        });
      })), clearTimeout(g);
    }, 0);
  });
  window.addEventListener("pagehide", () => {
    d.unsubscribe();
  });
}
T();
