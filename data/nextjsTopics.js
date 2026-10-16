// Next.js learning dashboard ka single source of truth.
// Naya topic add/remove/reorder karne ke liye bas yahan entry badlo —
// components/nextjs/NextJsDashboard.jsx ka sidebar apne aap update ho jayega.
// `sections` ek chhota structured format hai jo dashboard render karna jaanta hai:
//   { type: "text",  text }                      -> paragraph
//   { type: "list",  ordered?, items[] }         -> bullet / numbered list
//   { type: "code",  title?, code }              -> dark code block
//   { type: "table", head[], rows[][] }          -> comparison table
//   { type: "note",  text }                      -> highlighted callout

export const NEXT_TOPICS = [
  {
    id: "app-router",
    label: "App Router & Routing",
    icon: "route",
    title: "App Router & Routing",
    sections: [
      {
        heading: "Sabse pehle: \"Routing\" hai kya?",
        type: "text",
        text: "Socho user ne browser me type kiya localhost:3000/cards. Ab Next.js ko kaise pata chale ki kaunsi page dikhani hai? Ye decide karne ka system = Router. Routing = \"URL ka hisaab se sahi page dikhana.\"",
      },
      {
        heading: "App Router kya hai?",
        type: "text",
        text: "Next.js ka naya routing system jo app/ folder pe chalta hai. Iska ek hi golden rule hai:",
      },
      {
        type: "note",
        text: "Folder structure = URL structure. Aap files ko jo naam aur jagah dete ho, wahi aapka URL ban jaata hai. Isko kehte hain file-based routing (ya convention-based).",
      },
      {
        type: "text",
        text: "Do important files:",
      },
      {
        type: "table",
        head: ["File", "Kaam"],
        rows: [
          ["page.js", "Ye us URL par dikhne wali actual page hai"],
          ["layout.js", "Page ke aas-paar ka common dhaancha (jaise header/nav) jo har page pe repeat hota hai, aur navigation pe dobara render nahi hota"],
        ],
      },
      {
        heading: "Humare project se example (ye aapne banaya hai!)",
        type: "code",
        code: `app/
├── layout.js                 → root layout (sab pages ka wrapper)
├── page.js                   →  http://localhost:3000/
└── finpay-app/
    ├── layout.js             →  mobile app ka layout (BottomNav yahan)
    ├── page.js               →  /finpay-app           (dashboard)
    ├── cards/page.js         →  /finpay-app/cards
    ├── transfers/page.js     →  /finpay-app/transfers
    └── analytics/page.js     →  /finpay-app/analytics`,
      },
      {
        type: "text",
        text: "Dekho — folder ka naam hi URL ka hissa ban gaya:",
      },
      {
        type: "list",
        items: [
          "app/page.js → /",
          "app/finpay-app/page.js → /finpay-app",
          "app/finpay-app/cards/page.js → /finpay-app/cards",
        ],
      },
      {
        type: "note",
        text: "Nayi page banani hai? Bas naya folder + page.js. Koi config/route-file nahi likhni padti. Yahi App Router ki taqat hai.",
      },
      {
        heading: "layout.js ka jaadu",
        type: "text",
        text: "app/finpay-app/layout.js me BottomNav ek baar rakha — uske andar jo bhi page khule (cards, transfers...), BottomNav sabme dikhega bina baar-baar likhe. Aur page change karne pe bhi BottomNav dobara render nahi hota (smooth rahega). Layout = baar-baar repeat hone wala hissa ek jagah.",
      },
      {
        heading: "Aage ka step (bas naam yaad rakho)",
        type: "list",
        items: [
          "Dynamic routes: folder ka naam [id] jaisa → /products/123. Example: app/product/[slug]/page.js → har product ka apna page.",
          "Route groups, loading.js, error.js — ye baad me. Abhi core samjho.",
        ],
      },
      {
        heading: "🔊 Kisi ko samjhane ka script",
        type: "note",
        text: "\"Next.js me App Router file-based routing deta hai — matlab app/ folder ka structure hi URL decide karta hai. page.js = wo page jo URL pe dikhti hai, aur layout.js = uske aas-paar ka common dhaancha jo har page pe repeat hota hai. Jaise humne app/finpay-app/cards/page.js banaya to automatically /finpay-app/cards URL ban gaya — kahin route define karne ki zaroorat nahi.\"",
      },
      {
        heading: "\"Routing kaise kaam karti hai?\"",
        type: "note",
        text: "→ \"Next.js App Router file-based hai — app/page.js = /, app/finpay-app/page.js = /finpay-app.\"",
      },
    ],
  },
  {
    id: "server-client-components",
    label: "Server vs Client Components",
    icon: "dns",
    title: "Server vs Client Components",
    sections: [
      {
        heading: "Pehle samjho: \"Component\" = UI ka ek tukda",
        type: "text",
        text: "Button, card, navbar — sab components. Next.js me har component 2 jagah me se kisi ek par chalta hai: Server par ya Client (browser) par. Yahi farak samajhna hai.",
      },
      {
        heading: "Server Component (ye DEFAULT hai) ⚙️",
        type: "list",
        items: [
          "Kahan chalta hai: Server (computer ke peeche) par. Browser ko bas ready HTML milta hai.",
          "Kya kar sakta hai: Data dikhana, dusre components import karna.",
          "Kya NAHI kar sakta: ❌ useState, ❌ useEffect, ❌ onClick jaise events, ❌ browser wali cheezein.",
          "Fayda: kam JavaScript browser jaati hai → fast load.",
          "Humare project se: app/page.js (landing page) ek Server Component hai — usme koi import { useState } nahi, bas content dikha raha hai. Perfect.",
        ],
      },
      {
        heading: "Client Component (browser me chalta hai) 🖥️",
        type: "list",
        items: [
          "Kaise banaye: File ke sabse upar likho \"use client\";",
          "Kahan chalta hai: Browser me.",
          "Kya kar sakta hai: ✅ state, ✅ button clicks, ✅ data entry, ✅ animations — sab interactive cheezein.",
          "Kab chahiye: Jab user kuch click/tap/type kare aur screen badle.",
          "Humare project se: app/finpay-app/page.js (dashboard) me \"use client\" hai kyunki usme freeze toggle (useState) hai — card freeze/unfreeze hota hai. Aur components/finpay/BottomNav.jsx client hai kyunki wo usePathname() use karta hai (current route pe highlight).",
        ],
      },
      {
        heading: "Faisla kaise karein? (rule of thumb)",
        type: "table",
        head: ["Sawal", "Jawab → Component type"],
        rows: [
          ["Sirf content dikha raha hai?", "Server (default)"],
          ["Click, type, toggle, popup, live data?", "Client (\"use client\")"],
        ],
      },
      {
        type: "note",
        text: "Ek zaroori baat: \"use client\" ek boundary banata hai — us file se neeche jo bhi import ho, wo sab client ban jaata hai. Isliye jitna ho sake Server rakho, client sirf jahan zaroorat ho.",
      },
      {
        heading: "🔊 Kisi ko samjhane ka script",
        type: "note",
        text: "\"Next.js me har component ya to Server pe chalta hai ya Client (browser) pe. Server Component default hai — ye fast hai par isme useState ya onClick nahi chal sakta, bas content dikhata hai. Agar interactivity chahiye to file ke upar \"use client\" likhke Client Component bana dete hain — tab state aur events kaam karte hain. Jaise humari landing page Server hai (bas dikhati hai), par mobile app ka dashboard Client hai kyunki usme freeze-toggle jaisa interactive kaam hai.\"",
      },
      {
        heading: "Ek analogy se dono chipak jaayenge 🍽️",
        type: "list",
        items: [
          "Server Component = restaurant ka kitchen — khana server pe ban ke ready plate ki tarah aata hai (customer bas kha leta hai, plate me badlav nahi kar sakta).",
          "Client Component = table ka interactive screen/menu jise customer khud touch karke badal sakta hai (order change, toggle).",
        ],
      },
      {
        heading: "\"Server/Client component me kya farak?\"",
        type: "note",
        text: "→ \"Server component HTML bana ke bhejta hai, fast hai; Client component browser me chalta hai jab state ya event chahiye — main useState wale screens pe \"use client\" lagata tha.\"",
      },
    ],
  },
  {
    id: "naming-conventions",
    label: "Naming Conventions (JavaScript / React)",
    icon: "title",
    title: "Naming Conventions (JavaScript / React)",
    sections: [
      {
        heading: "\"Naming Conventions (JavaScript / React)\"",
        type: "text",
        text: "Iske andar 3 rules (jo maine bataye):",
      },
      {
        type: "list",
        items: [
          "SCREAMING_SNAKE_CASE → constants / fixed config data (HERO, STEPS)",
          "camelCase → variables, functions (userCount, handleSubmit)",
          "PascalCase → classes & React components (Header, MobileCard)",
        ],
      },
      {
        type: "text",
        text: "Ye convention officially in style guides se aati hai — note me reference daal sakte ho:",
      },
      {
        type: "list",
        items: [
          "Airbnb JavaScript Style Guide",
          "Google JavaScript Style Guide",
        ],
      },
      {
        heading: "Ek important Next.js/React-specific term",
        type: "text",
        text: "Jo cheez sach me React/Next.js-specific hai wo hai:",
      },
      {
        type: "note",
        text: "\"React components must be PascalCase\" — kyunki JSX bade akshar (capital) wale tags ko hi \"component\" maanta hai, chhote ko HTML tag. Isliye <Header /> = component, <div> = HTML. Ye ek language rule hai, sirf convention nahi.",
      },
    ],
  },
  {
    id: "context7-docs-note",
    label: "Context7 MCP — Live Docs Test",
    icon: "book",
    title: "Context7 MCP — Live Docs Test",
    sections: [
      {
        heading: "Ye note kya hai?",
        type: "note",
        text: "Context7 MCP server add karke uska LIVE TEST — test exactly isi tarike se kaam karta hai jo upar samjhaya: resolve-library-id se library ka ID dhoondhte hain, phir query-docs se us ID se official documentation + code examples laate hain. Aur ye poora content Context7 se real-time aaya hai (github.com/vercel/next.js ke canary docs se) — AI ki purani trained knowledge nahi."
      },
      {
        heading: "Test ka result: Next.js ki official docs ka answer",
        type: "text",
        text: "Sawal poocha tha: \"When to use Server Components vs Client Components, useEffect and event handlers\" — Context7 ne official Next.js docs se ye answer diya:"
      },
      {
        type: "text",
        text: "Use Client Components when you need:"
      },
      {
        type: "list",
        items: [
          "State and event handlers. E.g. onClick, onChange.",
          "Lifecycle logic. E.g. useEffect.",
          "Browser-only APIs. E.g. localStorage, window, navigator.geolocation, etc.",
          "Custom hooks."
        ]
      },
      {
        type: "text",
        text: "Use Server Components when you need:"
      },
      {
        type: "list",
        items: [
          "Fetch data from databases or APIs close to the source.",
          "Use API keys, tokens, and other secrets without exposing them to the client.",
          "Reduce the amount of JavaScript sent to the browser.",
          "Improve the First Contentful Paint (FCP), and stream content progressively to the client."
        ]
      },
      {
        heading: "Code example 1: useEffect se client-side data fetching (official docs se)",
        type: "code",
        title: "Source: next.js/docs — Client-side Rendering",
        code: `import React, { useState, useEffect } from 'react'

export function Page() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/data')
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`)
      }
      const result = await response.json()
      setData(result)
    }

    fetchData().catch((e) => {
      // handle the error as needed
      console.error('An error occurred while fetching the data: ', e)
    })
  }, [])

  return <p>{data ? \`Your data: \${data}\` : 'Loading...'}</p>
}`
      },
      {
        heading: "Code example 2: Browser API (window) safely use karna",
        type: "code",
        title: "Source: next.js/docs — Static Exports (Client Components me window sirf useEffect ke andar safe hai, kyunki build pe component server par prerender hota hai)",
        code: `'use client';

import { useEffect } from 'react';

export default function ClientComponent() {
  useEffect(() => {
    // You now have access to \`window\`
    console.log(window.innerHeight);
  }, [])

  return ...
}`
      },
      {
        heading: "Code example 3: Client Component ke onClick handler me Server Function bulana",
        type: "code",
        title: "Source: next.js/docs — Mutating Data (LikeButton example)",
        code: `'use client'

import { incrementLike } from './actions'
import { useState } from 'react'

export default function LikeButton({ initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)

  return (
    <>
      <p>Total Likes: {likes}</p>
      <button
        onClick={async () => {
          const updatedLikes = await incrementLike()
          setLikes(updatedLikes)
        }}
      >
        Like
      </button>
    </>
  )
}`
      },
      {
        heading: "Server Functions invoke karne ke 2 tareeke (docs ka note)",
        type: "list",
        items: [
          "Forms in Server and Client Components",
          "Event Handlers and useEffect in Client Components",
          "Good to know: Server Functions server-side mutations ke liye designed hain — client unhe ek time par ek-ek karke dispatch karta hai. Parallel data fetching chahiye to Server Components me data fetching use karo, ya ek hi Server Function/Route Handler ke andar parallel kaam karo."
        ]
      },
      {
        heading: "Context7 add karne ka poora process (jo humne kiya)",
        type: "code",
        title: "~/.qoder/mcp.json — stitch ke baad comma lagakar ye block add kiya",
        code: `"context7": {
  "command": "npx",
  "args": ["-y", "@upstash/context7-mcp"]
}`
      },
      {
        type: "list",
        items: [
          "Step 1: Settings ⚙️ → MCP → + Add Server, ya seedha ~/.qoder/mcp.json me upar wala block add karo (koi API key nahi chahiye, sirf npx).",
          "Step 2: Qoder restart karo ya MCP section me Refresh dabao — pehli baar npx package download karta hai, 10-20 second lag sakte hain.",
          "Step 3: MCP settings me context7 ka green dot / \"connected\" status check karo.",
          "Step 4: Chat me batao \"Context7 se X ka latest docs example laao\" — AI resolve-library-id → query-docs call karke real official docs se answer laayega."
        ]
      },
      {
        heading: "Test ka result (live) ✅",
        type: "table",
        head: ["Tool", "Kya kiya", "Result"],
        rows: [
          ["resolve-library-id", "\"Next.js\" search kiya", "/vercel/next.js mila — 5113 code snippets, High reputation, Benchmark 89.39"],
          ["query-docs", "Server vs Client components ka sawal bheja", "Official vercel/next.js docs (canary branch) se exact explanation + 3 code examples mile"]
        ]
      },
      {
        type: "note",
        text: "Fayda: AI ki trained knowledge purani ho sakti hai, par Context7 har baar LIVE official documentation lata hai — version-specific bhi (jaise /vercel/next.js/v15.1.8). Errors kam, latest syntax guarantee."
      },
      {
        heading: "🔊 Kisi ko samjhane ka script",
        type: "note",
        text: "\"Humne Qoder me Context7 naam ka MCP server add kiya hai. Ye kisi bhi library ki latest official documentation real-time mein lata hai — GitHub ke vercel/next.js docs se lekar version-specific examples tak. Pehle resolve-library-id se library ka ID milta hai, phir query-docs us ID se relevant docs aur code snippets nikaal ke deta hai. Isse AI ki outdated trained knowledge ki jagah actual current docs pe kaam hota hai.\""
      },
      {
        heading: "Dhyan do structure ka — JSON seekhne ke liye important hai:",
        type: "code",
        title: "mcp.json ka annotated structure",
        code: `"mcpServers": {          ← ye ek object hai jisme saare servers aate hain
  "stitch": { ... },     ← pehla server (comma zaroori!)
  "context7": {          ← naya server
    "command": "npx",    ← ise "stdio" server kehte hain — local pe chalta hai
    "args": ["-y", "@upstash/context7-mcp"]  ← -y = bina puche install kar lo
  }
}`
      },
      {
        type: "note",
        text: "Do type ke servers: stitch \"http\" type hai (remote URL + API key se chalta hai), context7 \"command\" type hai (stdio — tumhari machine pe npx se local process chalata hai, koi API key nahi). Dono ek hi mcpServers object me saath reh sakte hain."
      },
      {
        heading: "Context7 ka code likhne wale prompt pe kya asar hota hai?",
        type: "text",
        text: "Jab tum prompt dekar code likhwate ho, to AI ke paas do options hote hain:"
      },
      {
        type: "table",
        head: ["Source", "Kya hai", "Problem/Fayda"],
        rows: [
          ["🧠 Trained knowledge", "AI jo seekh ke aaya hai (purana data)", "Next.js jaise fast-changing framework me outdated syntax de sakta hai — jaise pages/ router ka zamana, ya params abhi bhi object samajhna jabki wo Promise ban chuka hai"],
          ["📡 Context7 (live docs)", "Aaj ki official documentation — vercel/next.js ke current GitHub docs", "Latest, version-specific syntax milta hai — galti kam"]
        ]
      },
      {
        heading: "Ek important nuance — ye automatic NAHI hai",
        type: "text",
        text: "Context7 ka code har prompt pe lazily use nahi hota. Flow aisa hai:"
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Tum prompt dete ho → AI sochta hai ki is kaam ke liye latest docs chahiye ya trained knowledge kaafi hai",
          "Agar framework/library-specific cheez hai (Next.js API, Tailwind config, koi naya feature) → AI Context7 call karta hai (resolve-library-id → query-docs)",
          "Jo live documentation + code examples milte hain, unki basis pe code likhta hai — apni purani memory ke andaaze pe nahi"
        ]
      },
      {
        type: "note",
        text: "Tumhari practical line yeh hai: \"Context7 on hone ka matlab hai ki AI ab guess nahi karta — wo jaake actual current official docs padh ke code likhta hai.\""
      },
      {
        heading: "Tip: force bhi kar sakte ho 😄",
        type: "text",
        text: "Agar kabhi doubt ho ki AI purana use kar raha hai, prompt me explicitly bolo:"
      },
      {
        type: "code",
        title: "Prompt examples",
        code: `"Context7 se Next.js ka latest docs fetch karke ye page banao"

// Ya library ka version bhi bata do — /vercel/next.js/v15.1.8 jaisa
// ID daal do, to us exact version ki documentation milegi.`
      },
      {
        type: "note",
        text: "Ek caveat: Context7 tabhi useful hai jab tak kaam library se related hai. Agar tum business logic ya plain JavaScript likhwate ho, to AI trained knowledge pe hi chalega (wahan docs ki zaroorat hi nahi). Context7 ka asli fayda un frameworks pe hai jo tezi se update hote hain — Next.js, React, Tailwind v4, etc."
      }
    ]
  },
  {
    id: "data-driven-patterns",
    label: "Data-driven UI, SSOT & Separation",
    icon: "account_tree",
    title: "Data-driven rendering / Data-driven UI",
    sections: [
      {
        type: "text",
        text: "Matlab: UI (jo screen par dikhta hai) data se banata hai, data hi UI ko \"chalata\" (drive karta) hai. \"Rendering\" = JSX ka browser me convert hona. \"Data-driven\" = ye convert hona data ke hisaab se hota hai.",
      },
      {
        heading: "Humare code me:",
        type: "text",
        text: "Section 4 ke 3 cards humne baar-baar hardcode nahi kiye. Bas likha:",
      },
      {
        type: "code",
        code: `{STEPS.map((s) => (
  <div>
    <h3>{s.title}</h3>   // data se aaya
    <p>{s.body}</p>       // data se aaya
  </div>
))}`,
      },
      {
        type: "text",
        text: "STEPS array me ek 4th step add kar do → card apne aap ban jayega, JSX ko chhuna nahi pada. UI data pe depend karta hai → isliye \"data-driven\".",
      },
      {
        type: "note",
        text: "Ek line: Content badlo, UI apne aap badal jaata hai — kyunki UI data se drive ho raha hai.",
      },
      {
        heading: "2. Single Source of Truth (SSOT)",
        type: "text",
        text: "Matlab: kisi information ki sirf EK asli jagah, jahan se sabko wo milti hai. Kahin duplicate nahi.",
      },
      {
        heading: "Humare code me:",
        type: "text",
        text: "Nav links pehle 2 jagah duplicate the — desktop <nav> me 4 <a> alag se, aur mobile menu me ek baar aur. Agar \"Pricing\" ka naam badalna hota to dono jagah badalne padte, aur ek bhool gaye → bug/inconsistency.",
      },
      {
        type: "text",
        text: "Ab sirf nav.js me ek baar:",
      },
      {
        type: "code",
        code: `export const NAV_LINKS = [{ label: "Pricing", href: "#" }, ...];`,
      },
      {
        type: "text",
        text: "Desktop bhi isi ko padhta hai, mobile bhi. Ek hi source, ek hi sach → \"single source of truth\".",
      },
      {
        type: "note",
        text: "Ek line: Ek cheez ki ek hi master copy — wahan badlo, jahan-jahan use hoti hai sab jagah update.",
      },
      {
        heading: "3. Separation of Content and Presentation",
        type: "text",
        text: "Matlab: \"kya dikhana hai\" (content = text, image URL) aur \"kaise dikhana hai\" (presentation = styling, layout, classes, <h1>, <br>) ko alag-alag files/rakho",
      },
      {
        heading: "Humare code me:",
        type: "table",
        head: ["File", "Isme kya hai", "Kaun badalta"],
        rows: [
          ["data/hero.js", "Content — heading, description text", "writer / content wala"],
          ["app/page.js", "Presentation — className, <h1>, grid, spacing", "developer / designer"],
        ],
      },
      {
        type: "text",
        text: "Heading ka text badalna hai? hero.js kholo, JSX ko haath nahi lagana. Layout badalna hai? page.js kholo, content ko haath nahi lagana. Do alag kaam, do alag jagah → \"separation\".",
      },
      {
        type: "note",
        text: "Ek line: Content (kya) aur design (kaise) ko alag rakho — ek tode bina doosra badal sako.",
      },
      {
        heading: "Ek analogy se teeno chipak jaayenge 🍔",
        type: "text",
        text: "Socho restaurant ka menu board:",
      },
      {
        type: "list",
        items: [
          "Data-driven: board ka dikhta hua content ek \"menu file\" se generate hota hai — price badlo, board apne aap update.",
          "Single source of truth: saari branches ek hi master menu copy use karti hain, har jagah alag se type nahi.",
          "Separation: kya likhna hai (item + price = content) vs board ka design/font/colour kaisa ho (presentation) — dono alag kaam hain.",
        ],
      },
      {
        heading: "Note me aise likh lena:",
        type: "note",
        text: "Data-driven rendering = UI data se banta hai. Single source of truth = info ek hi jagah se aati hai (no duplication). Separation of content & presentation = content (data/) aur design (page.js) alag. Teeno ek hi pattern ke 3 fayde.",
      },
      {
        heading: "\"Data-driven ka matlab?\"",
        type: "note",
        text: "→ \"Content ko alag data/ files me rakha, components sirf use map karke render karte hain — ek hi source of truth, baar-baar duplicate nahi.\"",
      },
    ],
  },
];
