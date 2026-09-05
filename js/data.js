/* ============================================================
   Serenity Spa & Wellness — Shared Data Source
   Single source of truth for treatments, therapists and plans.
   Rendered dynamically across Home, Treatments, Therapists,
   Membership and the Client Dashboard.
   ============================================================ */

const TREATMENTS = [
  // ---------- Massage Therapy ----------
  {
    id: "swedish-60",
    category: "massage",
    name: "Swedish Massage",
    duration: "60 min",
    price: 2500,
    desc: "A gentle, flowing full-body massage using long strokes to ease tension and improve circulation.",
    img: "images/treatments/swedish-60.png",
    featured: true
  },
  {
    id: "swedish-90",
    category: "massage",
    name: "Swedish Massage (Extended)",
    duration: "90 min",
    price: 3500,
    desc: "Our signature Swedish massage, extended for deeper full-body relaxation and stress release.",
    img: "images/treatments/swedish-90.png"
  },
  {
    id: "deep-tissue",
    category: "massage",
    name: "Deep Tissue Massage",
    duration: "60 min",
    price: 2800,
    desc: "Targeted, firm pressure to release chronic muscle tension in the neck, shoulders and back.",
    img: "images/treatments/deep-tissue.png",
    featured: true
  },
  {
    id: "hot-stone",
    category: "massage",
    name: "Hot Stone Massage",
    duration: "75 min",
    price: 3200,
    desc: "Warm basalt stones melt away tension while a therapist works out deep-seated knots.",
    img: "images/treatments/hot-stone.png",
    featured: true
  },
  {
    id: "thai-massage",
    category: "massage",
    name: "Thai Massage",
    duration: "60 min",
    price: 2700,
    desc: "An energising, assisted-stretch massage that improves flexibility and restores balance.",
    img: "images/treatments/thai-massage.png",
    featured2: true
  },
  {
    id: "prenatal-massage",
    category: "massage",
    name: "Prenatal Massage",
    duration: "60 min",
    price: 2600,
    desc: "A specially adapted, gentle massage designed for comfort and relaxation during pregnancy.",
    img: "images/treatments/prenatal-massage.png"
  },

  // ---------- Body Wraps & Scrubs ----------
  {
    id: "detox-mud-wrap",
    category: "wraps",
    name: "Detox Mud Wrap",
    duration: "60 min",
    price: 3000,
    desc: "Mineral-rich mud draws out impurities and leaves skin refined, smooth and re-mineralised.",
    img: "images/treatments/detox-mud-wrap.png",
    featured: true
  },
  {
    id: "sea-salt-scrub",
    category: "wraps",
    name: "Sea Salt Body Scrub",
    duration: "45 min",
    price: 2200,
    desc: "An invigorating full-body exfoliation that buffs away dull skin, leaving it silky soft.",
    img: "images/treatments/sea-salt-scrub.png"
  },
  {
    id: "herbal-body-wrap",
    category: "wraps",
    name: "Herbal Body Wrap",
    duration: "60 min",
    price: 2900,
    desc: "A warm herbal-infused wrap that soothes muscles and deeply moisturises the skin.",
    img: "images/treatments/herbal-body-wrap.png"
  },
  {
    id: "coconut-milk-wrap",
    category: "wraps",
    name: "Coconut Milk Wrap",
    duration: "60 min",
    price: 2800,
    desc: "A nourishing tropical wrap that hydrates and softens skin with rich coconut extracts.",
    img: "images/treatments/coconut-milk-wrap.png",
    featured2: true
  },
  {
    id: "charcoal-scrub",
    category: "wraps",
    name: "Charcoal Detox Scrub",
    duration: "45 min",
    price: 2300,
    desc: "A purifying activated-charcoal exfoliation that draws out toxins and leaves skin visibly clearer.",
    img: "images/treatments/charcoal-scrub.png"
  },
  {
    id: "rose-clay-wrap",
    category: "wraps",
    name: "Rose Clay Body Wrap",
    duration: "60 min",
    price: 3100,
    desc: "A mineral-rich rose clay wrap that gently tightens, hydrates and leaves skin subtly glowing.",
    img: "images/treatments/rose-clay-wrap.png"
  },

  // ---------- Aromatherapy ----------
  {
    id: "aroma-massage",
    category: "aromatherapy",
    name: "Essential Oil Aromatherapy Massage",
    duration: "60 min",
    price: 2900,
    desc: "A calming full-body massage using a custom blend of pure essential oils chosen for you.",
    img: "images/treatments/aroma-massage.png",
    featured: true,
    featured2: true
  },
  {
    id: "lavender-ritual",
    category: "aromatherapy",
    name: "Lavender Calm Ritual",
    duration: "75 min",
    price: 3300,
    desc: "A deeply restful ritual pairing lavender aromatherapy with slow, soothing massage strokes.",
    img: "images/treatments/lavender-ritual.png"
  },
  {
    id: "citrus-energy",
    category: "aromatherapy",
    name: "Citrus Energy Therapy",
    duration: "60 min",
    price: 2700,
    desc: "An uplifting citrus-oil massage designed to refresh the senses and revive tired muscles.",
    img: "images/treatments/citrus-energy.png"
  },
  {
    id: "aroma-facial",
    category: "aromatherapy",
    name: "Aromatherapy Facial",
    duration: "45 min",
    price: 2400,
    desc: "A radiance-boosting facial combining gentle massage with pure botanical essential oils.",
    img: "images/treatments/aroma-facial.png"
  },
  {
    id: "eucalyptus-steam",
    category: "aromatherapy",
    name: "Eucalyptus Steam Therapy",
    duration: "60 min",
    price: 2800,
    desc: "A decongesting eucalyptus-oil massage paired with gentle steam to clear the senses and ease tension.",
    img: "images/treatments/eucalyptus-steam.png"
  },
  {
    id: "sandalwood-serenity",
    category: "aromatherapy",
    name: "Sandalwood Serenity Massage",
    duration: "75 min",
    price: 3400,
    desc: "A grounding, slow-paced massage with warm sandalwood oil, designed to quiet a busy mind.",
    img: "images/treatments/sandalwood-serenity.png",
    featured2: true
  }
];

const CATEGORY_LABELS = {
  massage: "Massage Therapy",
  wraps: "Body Wraps & Scrubs",
  aromatherapy: "Aromatherapy"
};

const THERAPISTS = [
  {
    id: "ananya-sharma",
    name: "Ananya Sharma",
    title: "Senior Massage Therapist",
    specialties: ["Swedish Massage", "Deep Tissue"],
    experience: 12,
    bio: "Ananya has spent over a decade refining her touch across Swedish and deep-tissue modalities, helping clients release chronic tension.",
    img: "images/therapists/ananya-sharma.png",
    featured: true
  },
  {
    id: "rohan-mehta",
    name: "Rohan Mehta",
    title: "Massage Therapist",
    specialties: ["Thai Massage", "Sports Massage"],
    experience: 8,
    bio: "Rohan blends Thai stretching techniques with sports-massage precision, favoured by clients recovering from strain.",
    img: "images/therapists/rohan-mehta.png",
    featured: true
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    title: "Aromatherapy Specialist",
    specialties: ["Aromatherapy", "Facials"],
    experience: 10,
    bio: "Priya is our resident aromatherapy expert, crafting bespoke essential-oil blends for every skin type and mood.",
    img: "images/therapists/priya-nair.png",
    featured: true
  },
  {
    id: "karan-kapoor",
    name: "Karan Kapoor",
    title: "Massage Therapist",
    specialties: ["Hot Stone", "Deep Tissue"],
    experience: 7,
    bio: "Karan's grounded, methodical style makes his hot-stone sessions some of our most requested treatments.",
    img: "images/therapists/karan-kapoor.png",
    featured2: true
  },
  {
    id: "meera-iyer",
    name: "Meera Iyer",
    title: "Body Treatment Specialist",
    specialties: ["Body Wraps", "Scrubs"],
    experience: 9,
    bio: "Meera specialises in detoxifying wraps and scrubs, tailoring each treatment to individual skin goals.",
    img: "images/therapists/meera-iyer.png",
    featured2: true
  },
  {
    id: "arjun-rao",
    name: "Arjun Rao",
    title: "Senior Therapist",
    specialties: ["Prenatal Massage", "Reflexology"],
    experience: 11,
    bio: "Arjun is trained in prenatal-safe techniques and reflexology, known for his calm and reassuring manner.",
    img: "images/therapists/arjun-rao.png"
  },
  {
    id: "divya-menon",
    name: "Divya Menon",
    title: "Wellness Therapist",
    specialties: ["Aromatherapy", "Relaxation Massage"],
    experience: 6,
    bio: "Divya focuses on gentle, restorative treatments designed to quiet the mind as much as the body.",
    img: "images/therapists/divya-menon.png"
  },
  {
    id: "sanjay-verma",
    name: "Sanjay Verma",
    title: "Spa Director & Master Therapist",
    specialties: ["All Modalities"],
    experience: 15,
    bio: "Sanjay leads our therapist team and trains every new hire personally, ensuring a consistent, expert standard.",
    img: "images/therapists/sanjay-verma.png",
    featured2: true
  }
];

const MEMBERSHIP_PLANS = [
  {
    id: "silver",
    name: "Silver Wellness",
    price: 2999,
    period: "month",
    sessions: 2,
    tagline: "A gentle start to regular self-care.",
    perks: [
      "2 treatment sessions per month",
      "10% off all retail products",
      "Priority online booking",
      "Complimentary herbal tea ritual"
    ]
  },
  {
    id: "gold",
    name: "Gold Rejuvenation",
    price: 5499,
    period: "month",
    sessions: 4,
    tagline: "Our most popular plan for consistent balance.",
    highlight: true,
    perks: [
      "4 treatment sessions per month",
      "15% off all retail products",
      "1 complimentary facial per quarter",
      "Priority scheduling with any therapist",
      "Free aromatherapy upgrade on every visit"
    ]
  },
  {
    id: "platinum",
    name: "Platinum Serenity",
    price: 9999,
    period: "month",
    sessions: 6,
    tagline: "The complete luxury wellness experience.",
    perks: [
      "6 treatment sessions per month",
      "20% off all retail products",
      "Complimentary monthly facial",
      "1 guest pass every quarter",
      "Dedicated senior therapist",
      "Signature spa robe & welcome gift"
    ]
  }
];

const TESTIMONIALS = [
  {
    name: "Kavita Desai",
    role: "Gold Member, 2 years",
    quote: "Serenity has become part of my monthly routine. The therapists genuinely listen and every session leaves me feeling reset.",
    rating: 5
  },
  {
    name: "Neha Kulkarni",
    role: "First-time client",
    quote: "From the calming reception to the hot stone massage itself, everything felt thoughtfully considered. I've already booked my next visit.",
    rating: 5
  },
  {
    name: "Vikram Singh",
    role: "Platinum Member, 1 year",
    quote: "The membership is genuinely worth it — booking is effortless and Sanjay's deep tissue work has fixed years of desk-job tension.",
    rating: 5
  }
];

// A second, distinct set of client stories — used on Home 2 so it doesn't
// repeat the exact testimonials shown on the main Home page.
const TESTIMONIALS_2 = [
  {
    name: "Rhea Chatterjee",
    role: "Silver Member, 8 months",
    quote: "I used to skip self-care entirely. Having sessions already scheduled through my membership means I actually show up for myself now.",
    rating: 5
  },
  {
    name: "Aditya Malhotra",
    role: "Frequent guest",
    quote: "The Thai massage with Rohan is unlike anything else in the city — firm, precise, and I leave noticeably taller and looser.",
    rating: 5
  },
  {
    name: "Sneha Reddy",
    role: "Gold Member, 6 months",
    quote: "Meera's coconut milk wrap is my monthly reset button. The whole space smells incredible and nobody rushes you out the door.",
    rating: 5
  }
];

const BLOG_CATEGORY_LABELS = {
  wellness: "Wellness",
  treatments: "Treatments",
  "self-care": "Self-Care",
  team: "Our Team"
};

const BLOG_POSTS = [
  {
    id: "science-of-relaxation",
    category: "wellness",
    title: "The Science of Relaxation: What Happens to Your Body During a Massage",
    excerpt: "From lowered cortisol to better circulation — a look at what's actually happening beneath the surface during a massage.",
    author: "sanjay-verma",
    date: "2026-08-18",
    readTime: "6 min read",
    img: "images/blog/science-of-relaxation.png",
    featured: true,
    content: [
      {"type":"p","text":"A massage feels good in the moment, but the effects reach far beyond the hour on the table. When a therapist applies sustained, rhythmic pressure to muscle tissue, the body responds on several levels at once — nervous system, circulatory system and muscular system all shift into a different mode."},
      {"type":"h","text":"The nervous system downshifts"},
      {"type":"p","text":"Touch activates the parasympathetic nervous system — the body's \"rest and digest\" mode — which slows the heart rate, lowers blood pressure and reduces circulating cortisol, the primary stress hormone. This is why a well-paced massage can leave you feeling calm for hours afterward, not just relaxed in the moment."},
      {"type":"h","text":"Circulation improves measurably"},
      {"type":"p","text":"Manual pressure encourages blood flow through compressed or tense tissue, which helps deliver oxygen and nutrients to muscles that may have been under-supplied. This is part of why a deep tissue session can leave muscles feeling looser the next day, even though some soreness is normal in the first 24 hours."},
      {"type":"h","text":"Muscle tension releases gradually, not instantly"},
      {"type":"p","text":"Chronic tension — the kind built up over months of desk work or poor sleep — rarely releases in a single session. Regular sessions, spaced two to four weeks apart, give the nervous system time to \"unlearn\" the guarding pattern that keeps a muscle tight, which is one reason our membership plans are built around monthly, not one-off, visits."}
    ]
  },
  {
    id: "massage-benefits",
    category: "wellness",
    title: "5 Benefits of Regular Massage Therapy You Might Not Know",
    excerpt: "Beyond relaxation — how a consistent massage routine can support sleep, posture, and long-term stress management.",
    author: "ananya-sharma",
    date: "2026-08-05",
    readTime: "5 min read",
    img: "images/blog/massage-benefits.png",
    content: [
      {"type":"p","text":"Most people book their first massage for an obvious reason — a sore back, a stressful week, or simply a gift someone bought them. But clients who turn it into a regular habit often report benefits that go well beyond the original complaint."},
      {"type":"h","text":"1. Better sleep quality"},
      {"type":"p","text":"The drop in cortisol and rise in serotonin that follows a massage session can make it easier to fall — and stay — asleep for a night or two afterward."},
      {"type":"h","text":"2. Improved posture awareness"},
      {"type":"p","text":"Regular bodywork makes you more aware of where you're holding tension day to day, which often leads clients to naturally correct posture between sessions."},
      {"type":"h","text":"3. Fewer tension headaches"},
      {"type":"p","text":"Work on the neck, shoulders and upper back can reduce the frequency of headaches that stem from muscular tension rather than other causes."},
      {"type":"h","text":"4. More resilient stress response"},
      {"type":"p","text":"Clients on a monthly rhythm often describe feeling like they have \"more room\" to handle stressful weeks, rather than feeling permanently on edge."},
      {"type":"h","text":"5. A dedicated hour of unplugging"},
      {"type":"p","text":"In a always-on schedule, a booked massage is one of the few hours most people fully disconnect — no phone, no email, nothing to manage."}
    ]
  },
  {
    id: "choosing-aromatherapy-blend",
    category: "treatments",
    title: "How to Choose the Right Aromatherapy Blend for You",
    excerpt: "Lavender, citrus, or sandalwood? A simple guide to matching an essential oil blend to how you actually want to feel.",
    author: "priya-nair",
    date: "2026-07-22",
    readTime: "4 min read",
    img: "images/blog/choosing-aromatherapy-blend.png",
    content: [
      {"type":"p","text":"Aromatherapy works best when the blend matches your intention for the session, not just what smells nice on a shelf. Here's how we think about it when recommending a treatment."},
      {"type":"h","text":"If you want to wind down: lavender or chamomile"},
      {"type":"p","text":"These are the classic calming oils — gentle, slightly floral, and well-studied for their relaxing effect on the nervous system. Our Lavender Calm Ritual is built entirely around this."},
      {"type":"h","text":"If you're feeling low-energy: citrus or eucalyptus"},
      {"type":"p","text":"Bright, sharp scents like sweet orange or eucalyptus tend to feel energising and clarifying — better suited to a mid-afternoon session than a bedtime one."},
      {"type":"h","text":"If you want to feel grounded: sandalwood or cedarwood"},
      {"type":"p","text":"Warmer, woodier oils are often described as \"grounding\" — a good match for someone feeling scattered or overstimulated rather than simply tired."},
      {"type":"p","text":"When in doubt, tell your therapist how you want to feel afterward rather than naming a specific oil — we'll build the blend around that."}
    ]
  },
  {
    id: "body-wraps-guide",
    category: "treatments",
    title: "A Beginner's Guide to Body Wraps: What to Expect",
    excerpt: "Never had a body wrap before? Here's what actually happens during a session, from application to rinse-off.",
    author: "meera-iyer",
    date: "2026-07-10",
    readTime: "5 min read",
    img: "images/blog/body-wraps-guide.png",
    content: [
      {"type":"p","text":"Body wraps have a reputation for being mysterious — or worse, for being oversold as instant detox miracles. Here's a straightforward walkthrough of what actually happens in one of our sessions."},
      {"type":"h","text":"Step 1: A gentle exfoliation"},
      {"type":"p","text":"Most wraps start with a light scrub to remove dead skin, so the active ingredients in the wrap itself can absorb more evenly."},
      {"type":"h","text":"Step 2: The wrap is applied"},
      {"type":"p","text":"Depending on the treatment, this might be mineral-rich mud, warmed herbal paste, or a clay mask — applied over the whole body and then wrapped to hold in warmth."},
      {"type":"h","text":"Step 3: A short rest period"},
      {"type":"p","text":"You'll rest for 15–20 minutes while the wrap works, often with a scalp or foot massage included to make the time pass pleasantly."},
      {"type":"h","text":"Step 4: Rinse and moisturise"},
      {"type":"p","text":"The wrap is rinsed off in a private shower, followed by a hydrating lotion. Most clients leave with visibly smoother, firmer-feeling skin — the effect is real, even if it's temporary rather than a deep \"detox\"."}
    ]
  },
  {
    id: "self-care-between-visits",
    category: "self-care",
    title: "Self-Care Rituals to Practice Between Spa Visits",
    excerpt: "Simple, low-effort habits that help you hold onto that post-treatment calm for longer than a day.",
    author: "divya-menon",
    date: "2026-06-28",
    readTime: "4 min read",
    img: "images/blog/self-care-between-visits.png",
    content: [
      {"type":"p","text":"The calm you feel walking out of a treatment doesn't have to fade by the next morning. A few small habits can help stretch that feeling across the weeks between visits."},
      {"type":"h","text":"Keep one sense-based ritual"},
      {"type":"p","text":"Whether it's the same candle, the same tea, or the same playlist — repeating one small sensory cue from your spa visit at home helps your body associate it with calm."},
      {"type":"h","text":"Stretch for five minutes, not thirty"},
      {"type":"p","text":"Short, consistent movement does more for lingering muscle tension than an occasional long stretching session."},
      {"type":"h","text":"Protect one screen-free hour"},
      {"type":"p","text":"Most clients tell us the massage itself isn't the only thing that relaxes them — it's the forced hour without a phone. You can recreate a small version of that daily."}
    ]
  },
  {
    id: "day-in-the-life-therapist",
    category: "team",
    title: "Meet the Team: A Day in the Life of a Massage Therapist",
    excerpt: "We followed senior therapist Ananya Sharma through a typical day at Serenity — here's what it actually looks like.",
    author: "ananya-sharma",
    date: "2026-06-12",
    readTime: "6 min read",
    img: "images/blog/day-in-the-life-therapist.png",
    content: [
      {"type":"p","text":"Ananya has been with Serenity for over eight years and now leads our massage therapy team. We shadowed her through a typical Tuesday to see what the job actually involves beyond the treatment room."},
      {"type":"h","text":"8:30 AM — Prep and intention-setting"},
      {"type":"p","text":"Before the first client, Ananya reviews the day's bookings, noting any specific requests or history logged from previous visits."},
      {"type":"h","text":"10:00 AM to 1:00 PM — Back-to-back sessions"},
      {"type":"p","text":"Three sessions, each with a short reset in between — Ananya says the break matters as much as the massage itself, both for her and for keeping each client's experience unhurried."},
      {"type":"h","text":"2:00 PM — Mentoring a newer therapist"},
      {"type":"p","text":"Senior therapists at Serenity spend part of their week training newer hires, which Ananya says keeps her own technique sharp."},
      {"type":"h","text":"4:00 PM to 6:00 PM — Final sessions of the day"},
      {"type":"p","text":"\"By the end of the day, I need my own reset too,\" she says. \"That's part of why we rotate schedules — this work is physical, and doing it well means pacing yourself.\""}
    ]
  },
  {
    id: "membership-vs-paypervisit",
    category: "self-care",
    title: "Membership vs. Pay-Per-Visit: Which Is Right for You?",
    excerpt: "A practical breakdown of when a membership pays off — and when an occasional visit makes more sense.",
    author: "sanjay-verma",
    date: "2026-05-30",
    readTime: "4 min read",
    img: "images/blog/membership-vs-paypervisit.png",
    content: [
      {"type":"p","text":"We get this question often enough that it's worth answering plainly: membership isn't automatically the better deal for everyone. Here's how to think about it."},
      {"type":"h","text":"Membership tends to make sense if..."},
      {"type":"p","text":"You already visit at least twice a month, you value priority booking during busy weeks, or you know you're the type who benefits from a standing routine rather than booking \"when you remember to.\""},
      {"type":"h","text":"Pay-per-visit tends to make sense if..."},
      {"type":"p","text":"Your schedule is unpredictable, you're still exploring which treatments you like best, or you visit only occasionally for a specific reason like travel recovery or an event."},
      {"type":"p","text":"If you're unsure, our Silver plan is a low-commitment way to try the membership model — two sessions a month is close to what many occasional clients already spend, just with the added booking priority."}
    ]
  },
  {
    id: "organic-products-why",
    category: "treatments",
    title: "Why We Use Only Organic Products in Every Treatment",
    excerpt: "A behind-the-scenes look at how we source oils, clays and scrubs — and why it costs a little more.",
    author: "meera-iyer",
    date: "2026-05-14",
    readTime: "5 min read",
    img: "images/blog/organic-products-why.png",
    content: [
      {"type":"p","text":"\"Organic\" gets used loosely in the spa industry, so we want to be specific about what it means at Serenity and why we've built the entire treatment menu around it."},
      {"type":"h","text":"What \"organic\" means in our treatment rooms"},
      {"type":"p","text":"Our oils, clays, salts and wraps are sourced from suppliers who avoid synthetic fragrances and harsh preservatives — ingredients that can irritate skin during the extended contact time of a body treatment."},
      {"type":"h","text":"Why it matters more in a spa than in most skincare"},
      {"type":"p","text":"A body wrap keeps product in contact with skin for 15–20 minutes under a heat-retaining wrap — far longer than a quick application at home — so ingredient quality has an outsized effect on how skin reacts."},
      {"type":"h","text":"The trade-off, honestly"},
      {"type":"p","text":"Organic sourcing costs more, which is reflected in our pricing. We think it's the right trade-off for a treatment menu built around skin contact, but we're upfront that it's a choice, not a marketing label."}
    ]
  },
  {
    id: "how-often-massage",
    category: "wellness",
    title: "How Often Should You Really Get a Massage?",
    excerpt: "Weekly, monthly, or only when something hurts? A realistic guide to finding the right frequency for your body and budget.",
    author: "arjun-rao",
    date: "2026-04-27",
    readTime: "4 min read",
    img: "images/blog/how-often-massage.png",
    content: [
      {"type":"p","text":"There's no single correct answer here — the right frequency depends on why you're coming in, not a universal rule. Here's how we help clients think about it."},
      {"type":"h","text":"For chronic tension or pain management"},
      {"type":"p","text":"Every two to four weeks tends to be the sweet spot for keeping recurring tension from building back up between sessions, especially for desk-based or physically repetitive jobs."},
      {"type":"h","text":"For general stress relief and maintenance"},
      {"type":"p","text":"Once a month is enough for most people to notice a lasting difference in how they carry stress day to day — this is exactly what our Silver and Gold plans are built around."},
      {"type":"h","text":"For a specific injury or event"},
      {"type":"p","text":"Short, closer-together sessions over two to three weeks, then tapering off, usually works better than one-off deep sessions. Ask your therapist to help plan this out."}
    ]
  },
  {
    id: "meet-priya-nair",
    category: "team",
    title: "Getting to Know Priya Nair, Our Aromatherapy Specialist",
    excerpt: "How a decade of studying essential oils turned into Serenity's most requested aromatherapy sessions.",
    author: "priya-nair",
    date: "2026-04-09",
    readTime: "4 min read",
    img: "images/blog/meet-priya-nair.png",
    content: [
      {"type":"p","text":"Priya joined Serenity eight years ago and has spent the time since building a personal library of essential-oil blends that clients now request by name. We sat down with her to talk about the craft behind it."},
      {"type":"h","text":"On what makes a blend actually work"},
      {"type":"p","text":"\"People think it's about picking a nice smell,\" Priya says. \"It's closer to matching a mood you can't quite name yet — that's the part that takes years to get good at.\""},
      {"type":"h","text":"On her most-requested ritual"},
      {"type":"p","text":"The Lavender Calm Ritual remains her most-booked session, though she notes the Citrus Energy Therapy has grown steadily with clients coming from high-stress jobs."},
      {"type":"h","text":"Her advice for first-time aromatherapy clients"},
      {"type":"p","text":"\"Tell me how you want to feel afterward, not which oil you think you should pick. I'll build the blend around that every time.\""}
    ]
  }
];
