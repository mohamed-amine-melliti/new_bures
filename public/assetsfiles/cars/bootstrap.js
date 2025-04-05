var j = Object.defineProperty;
var z = (e, s, n) => s in e ? j(e, s, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[s] = n;
var E = (e, s, n) => z(e, typeof s != "symbol" ? s + "" : s, n);
import { a as w, R as P, l as r, i as l, P as p, b, O as V, p as W, c as R, d as L, e as f, S as H, j as _, Y as $, E as x, v as X, f as Y, T as k, n as Q } from "./chunks/index-B2R_i_dU.js";
import { SeamlessConnection as q, initializeStore as F } from "@seamless/store";
import { c as y, O as A, S as U, d as O, P as h, A as v, E as B, B as J } from "./chunks/constants-C-GGezYh.js";
import { subscribe as M, getDispatchers as K } from "@seamless/one-context";
import { B as g, P as m, Q as Z } from "./chunks/enums-DYl8a0Fj.js";
import { r as ee, g as se } from "./chunks/fetch-CinwFj9_.js";
import { getIdentityProvider as ne, IdentityProvider as C, isOnBehalfModeActive as D, isLoggedIn as G, getClaims as te } from "@b2x/authentication-library";
/**
 * @preserve
 * Licenses of bundled dependencies can be found in dependencies-licenses.txt
 */
/*! B2X@LIBRARY 2.131.1 */
function ie() {
  M(y, {
    tenant: A,
    componentName: "PL",
    callback: async (e) => {
      const { meta: s } = e;
      if (s.status === U.FAILURE) {
        const { renderNotification: n } = await import(
          /* @vite-ignore */
          "@oneweb/notification"
        ), { t: i } = w();
        n({
          message: i(P.NOTIFICATIONS_PROFILES_NOT_AVAILABLE),
          variant: "error"
        }), r("Sending notification to the user as the profile is not available", {
          args: [s.status, s.message],
          group: p.NOTIFICATIONS,
          level: l.INFO
        });
      }
    }
  });
}
const oe = {
  get emhContextConfig() {
    return (async () => {
      var s, n;
      const [e] = await W((i) => [i.find((t) => {
        var o;
        return (o = t.payload) == null ? void 0 : o.userContextType;
      })]);
      return {
        source: m.PAGE,
        businessType: (s = e == null ? void 0 : e.payload) != null && s.forceUserContextType && ((n = e.payload) == null ? void 0 : n.userContextType.toUpperCase()) || null,
        profileId: null
      };
    })();
  },
  get urlPathAvailable() {
    return (async () => {
      var o, a, c;
      let e = null, s = null;
      const n = location.href.includes("/my-area"), i = location.href.includes("/my-area/business");
      return ["/profile-overview", "/my-wishlist", "/logout-successful"].some((d) => location.href.includes(d)) ? e = null : i ? (e = g.B2B, s = ((c = (a = (o = b.session.get("swsp:B2X_ACTIVE_PROFILE")) == null ? void 0 : o.company) == null ? void 0 : a.domainRef) == null ? void 0 : c.meId) || null) : n && (e = g.B2C), {
        source: m.PAGE,
        businessType: e,
        profileId: s
      };
    })();
  },
  get ctxAvailable() {
    return (async () => {
      let e = V(Z.CTX);
      return e && (e = e.toUpperCase()), {
        source: m.URL,
        businessType: e,
        profileId: null
      };
    })();
  },
  get localAvailable() {
    return (async () => {
      const { businessType: e, profileId: s = null } = b.local.get(O) || {};
      return {
        source: m.PERSISTED,
        businessType: e,
        profileId: s
        // remember last used company profile
      };
    })();
  }
}, ae = [g.B2B, g.B2C];
async function re() {
  const { profileId: e = null } = b.local.get(O) || {}, s = {
    source: m.PERSISTED,
    businessType: g.B2C,
    profileId: e
  };
  for await (const n of Object.values(oe))
    if (n.businessType && ae.includes(n.businessType)) {
      const { source: i, businessType: t, profileId: o } = n;
      return s.businessType = t, s.source = i, o && (s.profileId = o), s;
    }
  return s;
}
const le = (...e) => {
};
class ce extends q {
  constructor(n) {
    super(h);
    E(this, "defaultState");
    this.initialState = n;
  }
  get initialState() {
    return Object.seal({ ...this.defaultState });
  }
  set initialState(n) {
    this.defaultState = { ...n }, R(O, n);
  }
  getReducer() {
    return (n, i) => {
      switch (i.type) {
        case this.getActionType(v):
          return { ...n, ...i.payload };
        default:
          return n;
      }
    };
  }
  getPublicDispatchers() {
    return r(`


 🚨 Using deprecated dispatchers!`, {
      args: [
        `

 ⛔ ProfileConnection is scheduled for removal! Please upgrade to OneContext! `,
        `

 ⛔ Migrate to OneContext: https://pages.git.i.mercedes-benz.com/dh-io-seamless/documentation/v7/guidelines/one-context/connections/profile-connection.html 


`
      ],
      level: l.WARN,
      group: p.CONNECTION
    }), {
      setBusinessType: (n) => (r(`


 🚨 Using deprecated setBusinessType dispatcher!`, {
        args: [
          `

 ⛔ ProfileConnection is scheduled for removal! Please upgrade to OneContext! `,
          `

 ⛔ Migrate to OneContext: https://pages.git.i.mercedes-benz.com/dh-io-seamless/documentation/v7/guidelines/one-context/connections/profile-connection.html 


`
        ],
        level: l.WARN,
        group: p.CONNECTION
      }), (i, t) => {
        this.setContextAction({ dispatch: i, getState: t, options: n });
      }),
      setActiveProfile: (n) => (r(`


 🚨 Using deprecated setActiveProfile dispatcher!`, {
        args: [
          `

 ⛔ ProfileConnection is scheduled for removal! Please upgrade to OneContext! `,
          `

 ⛔ Migrate to OneContext: https://pages.git.i.mercedes-benz.com/dh-io-seamless/documentation/v7/guidelines/one-context/connections/profile-connection.html 


`
        ],
        level: l.WARN,
        group: p.CONNECTION
      }), (i, t) => {
        this.setContextAction({ dispatch: i, getState: t, options: n });
      }),
      setStateProfile: (n) => (i) => {
        r(`


 🚨 Using deprecated setStateProfile dispatcher!`, {
          args: [
            `

 ⛔ ProfileConnection is scheduled for removal! Please upgrade to OneContext! `,
            `

 ⛔ Migrate to OneContext: https://pages.git.i.mercedes-benz.com/dh-io-seamless/documentation/v7/guidelines/one-context/connections/profile-connection.html 


`
          ],
          level: l.WARN,
          group: p.CONNECTION
        });
        const { activeProfile: t, availableProfiles: o, source: a, meta: c } = n;
        i(this.getAction(v, { activeProfile: t, availableProfiles: o, source: a, meta: c }));
      },
      setRefetchProfiles: (n, i = le) => async (t) => {
        r(`


 🚨 Using deprecated setRefetchProfiles dispatcher!`, {
          args: [
            `

 ⛔ ProfileConnection is scheduled for removal! Please upgrade to OneContext! `,
            `

 ⛔ Migrate to OneContext: https://pages.git.i.mercedes-benz.com/dh-io-seamless/documentation/v7/guidelines/one-context/connections/profile-connection.html 


`
          ],
          level: l.WARN,
          group: p.CONNECTION
        });
        const { businessType: o, meId: a = null, source: c = m.PAL } = n, [d, u] = await ee(o, a, c);
        t(this.getAction(v, d)), t(() => i(u ?? void 0)), r("Refetch Profiles", {
          args: [n, u, d],
          level: l.WARN,
          group: p.CONNECTION
        });
      }
    };
  }
  async onStateChange(n) {
    return r("Profile state changed and persisted", {
      args: [n],
      level: l.WARN,
      group: p.CONNECTION
    }), R(O, n), Promise.resolve();
  }
  setContextAction(n) {
    const { dispatch: i, getState: t, options: o } = n, { source: a = m.USER, businessType: c, profileID: d = null } = o, { B2XCORE_PROFILE: u } = t(), T = L(
      { businessType: c, profileId: d },
      u.availableProfiles
    );
    r("Context changed:", {
      args: [
        `Source: ${a} |`,
        `New: ${T.businessType} |`,
        `Old: ${u == null ? void 0 : u.activeProfile.businessType}`
      ],
      group: p.CONNECTION,
      level: l.INFO
    }), i(
      this.getAction(v, {
        activeProfile: T,
        availableProfiles: u.availableProfiles,
        source: a,
        meta: u.meta
      })
    );
  }
}
async function ue(e, s, n) {
  const i = ne(e), [t, { profiles: o, meta: a }] = de(e, s) ? await se(e) : [null, { profiles: s.availableProfiles, meta: s.meta }];
  if (t)
    return B.businessType = n.businessType, {
      profiles: [B],
      meta: a
    };
  if (i === C.BIAS && !D(e) && G(e)) {
    const c = te(e), { given_name: d = "", family_name: u = "" } = c || {}, T = `${d} ${u}`.trim();
    return {
      profiles: [...o.map((N) => (N.businessType === g.B2C && (N.displayName = T), N)).filter((N) => N.businessType !== g.B2B)],
      meta: a
    };
  }
  return {
    profiles: o,
    meta: a
  };
}
function de(e, s) {
  var c, d;
  const i = [
    "my-area/my-settings",
    "my-area/business/create-company",
    "my-area/business/company-dashboard",
    "my-area/business/company-profile"
  ].find((u) => document.referrer.includes(u)), t = (c = s.availableProfiles) == null ? void 0 : c.find((u) => u.businessType === g.B2C), o = !!(t != null && t.meId), a = !!(t != null && t.displayName);
  if (!s.activeProfile)
    return r("Profiles will be fetched: ", {
      args: ["Reason:", "Profiles have not been initialized."],
      group: f.BOOTSTRAP,
      level: l.INFO
    }), !0;
  if (((d = s.meta) == null ? void 0 : d.status) === U.FAILURE)
    return r("Profiles will be fetched: ", {
      args: ["Reason:", "Error fetching data.", s.meta.message],
      group: f.BOOTSTRAP,
      level: l.INFO
    }), !0;
  if (s.activeProfile.businessType === "B2E")
    return r("Profiles will be fetched: ", {
      args: ["Reason:", "Business type is B2E which no longer exists."],
      group: f.BOOTSTRAP,
      level: l.INFO
    }), !0;
  if (i)
    return r("Profiles will be fetched: ", {
      args: ["Reason:", "User was on a page that could lead to profile change"],
      group: f.BOOTSTRAP,
      level: l.INFO
    }), !0;
  if (!e.jwe && (a || o))
    return r("Profiles will be fetched: ", {
      args: ["Reason:", "User logged out, but PL still has their profile in the session."],
      group: f.BOOTSTRAP,
      level: l.INFO
    }), !0;
  switch (e.identityProvider) {
    case C.CIAS:
      return fe(e, o);
    case C.BIAS:
      return pe(e, o, a);
    default:
      return !1;
  }
}
function fe(e, s) {
  return e.jwe && !s ? (r("Profiles will be fetched: ", {
    args: ["Reason:", "User logged in, but PL does not have their profiles in the session."],
    group: f.BOOTSTRAP,
    level: l.INFO
  }), !0) : !1;
}
function pe(e, s, n) {
  const i = D(e);
  return i && !s ? (r("Profiles will be fetched: ", {
    args: ["Reason:", "Sales expert starts an on-behalf session"],
    group: f.BOOTSTRAP,
    level: l.INFO
  }), !0) : !i && s ? (r("Profiles will be fetched: ", {
    args: ["Reason:", "Sales expert stops an on-behalf session"],
    group: f.BOOTSTRAP,
    level: l.INFO
  }), !0) : e.jwe && !n ? (r("Profiles will be fetched: ", {
    args: ["Reason:", "User logged in, but PL does not have their SEM profile in the session."],
    group: f.BOOTSTRAP,
    level: l.INFO
  }), !0) : !1;
}
async function S(e) {
  const s = F(), n = {
    activeProfile: null,
    availableProfiles: [],
    source: null,
    meta: null
  }, i = b.session.get(
    O,
    n
  );
  r("Initialize Profile Connection", {
    args: [!!e.jwe, e.identityProvider],
    group: f.BOOTSTRAP,
    level: l.LOG
  });
  const t = await re();
  r("Resolved business context", {
    args: [t],
    group: f.BOOTSTRAP,
    level: l.INFO
  });
  const o = await ue(e, i, t), a = L(t, o.profiles);
  r("Resolved Active and Available Profiles", {
    args: [a, o],
    group: f.BOOTSTRAP,
    level: l.INFO
  });
  const c = {
    availableProfiles: o.profiles,
    activeProfile: a,
    source: t.source,
    meta: o.meta
  };
  await H(h, 1) ? (await _(h)).setStateProfile(c) : await s.addConnection(new ce(c));
  const { setProfileState: d } = await K(A, y);
  d({
    activeProfile: a,
    availableProfiles: o.profiles,
    meta: o.meta
  });
}
async function ge() {
  const e = await Pe(), s = await _("HP_HEADER_CONNECTION");
  if (!s || Object.keys(s).length === 0) {
    r("No header dispatchers found.", {
      args: [],
      group: p.NAVIGATION_ITEM,
      level: l.WARN
    });
    return;
  }
  M(y, {
    tenant: A,
    componentName: "PL",
    callback: async (n) => {
      const i = await $(x.AUTH_CONNECTION_NAME), t = me(i, n.activeProfile, e);
      s.setNavigationItemsConfiguration(t), r("Update OneHeader navigation item with", {
        args: [t.at(0)],
        group: p.NAVIGATION_ITEM,
        level: l.INFO
      });
    }
  });
}
async function Pe() {
  var s, n;
  let e = (s = Object.values(window.aemNamespace.componentData).find((i) => {
    const t = i == null ? void 0 : i.payload;
    return t && (t.menuEntriesPrivate || t.overviewEntriesPrivate || t.settingsEntriesPrivate || t.userProfileAria);
  })) == null ? void 0 : s.payload;
  return e || (e = (n = Object.values(window.aemNamespace.componentData).find((i) => {
    var t;
    return (t = i.payload) == null ? void 0 : t.userMenu;
  })) == null ? void 0 : n.payload.userMenu.data.payload), {
    loginLabel: (e == null ? void 0 : e.loginLabel) || "Login",
    isProfileSelectionEnabled: !!(e != null && e.isProfileSelectionEnabled)
  };
}
function me(e, s, n) {
  const { t: i } = w(), { loginLabel: t, isProfileSelectionEnabled: o } = n, a = G(e), c = a ? Oe(s, i) : t, d = o ? Te(s, a, i) : void 0, u = Ne(s), T = be(s), I = s.profilePicture;
  return [
    {
      name: "iam-user-menu-v3",
      label: c,
      subLabel: d,
      avatar: {
        fullName: u,
        icon: T,
        image: I
      }
    }
  ];
}
function Oe(e, s) {
  return e.businessType === "B2C" ? e.displayName || s(P.PRIVATE) : e.displayName || s(P.GUEST_COMPANY);
}
function Te(e, s, n) {
  const i = e.businessType === "B2C";
  if (!s)
    return n(i ? P.GUEST_PRIVATE : P.GUEST_COMPANY);
  if (i)
    return n(P.PRIVATE);
  if (e.displayName)
    return n(P.COMPANY);
}
function Ne(e) {
  return e.displayName ? e.businessType === "B2C" ? e.displayName : e.displayName.charAt(0) : "";
}
function be(e) {
  return e.businessType === "B2C" ? "bds/user/24" : "company/24";
}
window.GLOBAL_PL_AVAILABLE = !0;
async function ve() {
  r(`Profile library ${X} - ${Y}`, {
    args: [],
    group: f.BOOTSTRAP,
    level: l.INFO
  });
  const e = F();
  await new Promise((s) => {
    const n = setTimeout(async () => {
      r("Unable to retrieve auth connection on expected time", {
        args: [],
        group: f.BOOTSTRAP,
        level: l.WARN
      }), await S({
        jwe: null,
        claims: null,
        identityProvider: "",
        isPending: !1
      }), s(null);
    }, 3e4), i = e.subscribe(x.AUTH_CONNECTION_NAME, async (a) => {
      a.isPending || (s(await S(a)), clearTimeout(n));
    }), t = new BroadcastChannel(J);
    t.onmessage = async (a) => {
      const { key: c, value: d } = a.data;
      c === O && b.session.set(O, d);
    };
    const o = () => {
      r("Page is being hidden", {
        args: [],
        group: f.BOOTSTRAP,
        level: l.LOG
      }), i.unsubscribe(), t.close();
    };
    window.addEventListener("pagehide", o);
  }), await k("a6b17e3617922fdb78965d810593d828", Q), ie(), await ge();
}
ve();
