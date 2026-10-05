"use client";

import { useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  Clock3,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Search,
  X,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const categories = [
  "All",
  "Small Plates",
  "Mains",
  "Pizza",
  "Pasta",
  "Asian",
  "Cocktails",
  "Desserts",
] as const;

type Category = (typeof categories)[number];

type Dish = {
  name: string;
  description: string;
  price: number;
  category: Exclude<Category, "All">;
  image: string;
  tag?: string;
};

const dishes: Dish[] = [
  {
    name: "Truffle Parmesan Fries",
    description: "Hand-cut potatoes, aged parmesan, truffle oil, garden herbs.",
    price: 420,
    category: "Small Plates",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
    tag: "A house favourite",
  },
  {
    name: "Smoked Chicken Pizza",
    description: "Wood-fired crust, smoked chicken, mozzarella, chilli honey.",
    price: 620,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Creamy Pesto Pasta",
    description: "Basil pesto, parmesan cream, toasted pine nuts, sourdough.",
    price: 540,
    category: "Pasta",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
    tag: "Vegetarian",
  },
  {
    name: "Asian Glazed Chicken",
    description: "Sticky soy glaze, sesame, scallions, a little heat.",
    price: 580,
    category: "Asian",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Classic Negroni",
    description: "Gin, bittersweet vermouth, Campari, orange oils.",
    price: 550,
    category: "Cocktails",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=85",
    tag: "Cocktail hour",
  },
  {
    name: "Dark Chocolate Dessert",
    description: "70% chocolate crémeux, sea salt, hazelnut praline.",
    price: 390,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Burrata & Heirloom Tomato",
    description: "Creamy burrata, ripe tomatoes, basil, grilled focaccia.",
    price: 490,
    category: "Small Plates",
    image:
      "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Slow-Braised Short Rib",
    description: "Red wine jus, silky mash, crisp shallots.",
    price: 790,
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
    tag: "Slow cooked",
  },
  {
    name: "Chilli Garlic Noodles",
    description: "Wok-tossed noodles, crisp vegetables, house chilli oil.",
    price: 520,
    category: "Asian",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Espresso Martini",
    description: "Vodka, fresh espresso, coffee liqueur, a velvet finish.",
    price: 580,
    category: "Cocktails",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Burnt Basque Cheesecake",
    description: "Vanilla bean, caramelised top, seasonal berries.",
    price: 420,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85",
  },
];

const experiences = [
  {
    number: "01",
    title: "All Day Dining",
    description: "Comfortable plates designed for every hour.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
    alt: "A beautifully set table ready for dinner",
  },
  {
    number: "02",
    title: "Crafted Cocktails",
    description: "Signature cocktails and classics with a modern edge.",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=85",
    alt: "A freshly made cocktail at the bar",
  },
  {
    number: "03",
    title: "Late Night Energy",
    description: "A space that changes character as the evening unfolds.",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85",
    alt: "A warmly lit contemporary restaurant at night",
  },
];

const gallery = [
  {
    label: "A little something stirred",
    type: "Cocktails",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1100&q=85",
  },
  {
    label: "Made to be passed around",
    type: "At the table",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85",
  },
  {
    label: "Your corner of the city",
    type: "Interiors",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1100&q=85",
  },
  {
    label: "One more round?",
    type: "Good company",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1100&q=85",
  },
  {
    label: "Stay for the after-hours",
    type: "After dark",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1100&q=85",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="section-eyebrow">
      <span />
      {children}
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reservationSent, setReservationSent] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const visibleDishes = dishes.filter((dish) => {
    const matchesCategory =
      activeCategory === "All" || dish.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      `${dish.name} ${dish.description} ${dish.category}`
        .toLowerCase()
        .includes(query);
    return matchesCategory && matchesSearch;
  });
  const displayedDishes = showFullMenu
    ? visibleDishes
    : visibleDishes.slice(0, 6);

  function handleReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReservationSent(true);
  }

  function closeMobileMenu() {
    setMenuOpen(false);
  }

  const navItems = [
    ["Home", "#home"],
    ["Menu", "#menu"],
    ["Experience", "#experience"],
    ["Gallery", "#gallery"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="All Day home">
          <span className="brand-mark">A</span>
          <span className="brand-name">
            ALL DAY
            <small>KITCHEN &amp; BAR</small>
          </span>
        </a>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`}>
          {navItems.map(([label, href]) => (
            <a href={href} key={label} onClick={closeMobileMenu}>
              {label}
            </a>
          ))}
          <a className="mobile-reserve" href="#reserve" onClick={closeMobileMenu}>
            Reserve a table <ArrowUpRight size={15} />
          </a>
        </nav>
        <a className="header-reserve" href="#reserve">
          Reserve <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </header>

      <section className="hero" id="home" ref={heroRef}>
        <motion.div
          className="hero-image"
          aria-hidden="true"
          initial={{ scale: prefersReducedMotion ? 1 : 1.08 }}
          animate={{ scale: 1 }}
          style={{ y: prefersReducedMotion ? 0 : heroImageY }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="hero-shade" />
        <div className="hero-grain" />
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.13,
                delayChildren: prefersReducedMotion ? 0 : 0.2,
              },
            },
          }}
        >
          <motion.div variants={reveal} className="hero-location">
            <MapPin size={13} strokeWidth={1.5} />
            THANE · MUMBAI
          </motion.div>
          <motion.h1 variants={reveal}>
            Good Food.
            <br />
            <em>Good Drinks.</em>
            <br />
            All Day.
          </motion.h1>
          <motion.p variants={reveal} className="hero-subtitle">
            A contemporary kitchen and bar built for long lunches, evening
            conversations and nights worth remembering.
          </motion.p>
          <motion.div variants={reveal} className="hero-actions">
            <a className="button button-cream" href="#menu">
              Explore menu <ArrowDownRight size={16} />
            </a>
            <a className="button button-outline-light" href="#reserve">
              Reserve a table <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </motion.div>
        <div className="hero-side-note">A GOOD PLACE TO STAY A WHILE</div>
        <div className="hero-bottom">
          <span>Kitchen <i>·</i> Cocktails <i>·</i> Conversations</span>
          <a href="#experience">
            SCROLL TO DISCOVER <ArrowDown size={13} />
          </a>
        </div>
        <div className="hero-index">01 / 05</div>
      </section>

      <section className="intro-strip" aria-label="A place for every occasion">
        <span>For the first coffee</span>
        <span className="intro-dot">✳</span>
        <span>For the last cocktail</span>
        <span className="intro-dot">✳</span>
        <span>For everything in between</span>
      </section>

      <section className="experience section-pad" id="experience">
        <div className="section-topline">
          <SectionEyebrow>The all day feeling</SectionEyebrow>
          <span className="section-note">ONE TABLE. MANY MOODS.</span>
        </div>
        <div className="experience-heading">
          <h2>
            Made for <em>your kind</em>
            <br />
            of day.
          </h2>
          <p>
            Come as you are, stay as long as you like. There&apos;s always
            something good on the table — and someone worth sharing it with.
          </p>
        </div>
        <div className="experience-grid">
          {experiences.map((item, index) => (
            <motion.a
              className={`experience-card experience-card-${index + 1}`}
              href="#menu"
              key={item.title}
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{ duration: 0.65, delay: index * 0.1 }}
            >
              <div
                className="experience-image"
                style={{ backgroundImage: `url("${item.image}")` }}
                role="img"
                aria-label={item.alt}
              />
              <div className="experience-overlay" />
              <span className="experience-number">{item.number}</span>
              <div className="experience-card-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <span className="card-arrow">
                <ArrowUpRight size={17} />
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="menu-section section-pad" id="menu">
        <div className="menu-heading">
          <div>
            <SectionEyebrow>A little taste</SectionEyebrow>
            <h2>
              Something for <em>every craving.</em>
            </h2>
          </div>
          <p>
            Familiar favourites, a few lovely surprises, and always one more
            reason to order for the table.
          </p>
        </div>
        <div className="menu-tools">
          <div className="category-list" aria-label="Filter menu by category">
            {categories.map((category) => (
              <button
                className={`category-chip${activeCategory === category ? " active" : ""}`}
                type="button"
                key={category}
                aria-pressed={activeCategory === category}
                onClick={() => {
                  setActiveCategory(category);
                  setShowFullMenu(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="menu-search">
            <Search size={16} strokeWidth={1.5} />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setShowFullMenu(false);
              }}
              placeholder="Find something..."
              aria-label="Search the menu"
            />
          </label>
        </div>
        <p className="menu-demo-note">
          <span>CURATED SAMPLE MENU</span> · Demo dishes and prices for
          illustrative purposes.
        </p>
        {displayedDishes.length > 0 ? (
          <div className="dish-grid" aria-live="polite">
            {displayedDishes.map((dish, index) => (
              <motion.article
                className="dish-card"
                key={dish.name}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
              >
                <div className="dish-image-wrap">
                  <div
                    className="dish-image"
                    style={{ backgroundImage: `url("${dish.image}")` }}
                    role="img"
                    aria-label={dish.name}
                  />
                  {dish.tag && <span className="dish-tag">{dish.tag}</span>}
                  <span className="dish-category">{dish.category}</span>
                </div>
                <div className="dish-details">
                  <div>
                    <h3>{dish.name}</h3>
                    <p>{dish.description}</p>
                  </div>
                  <span className="dish-price">₹{dish.price}</span>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="empty-menu">
            Nothing on this part of the menu just yet. Try another search.
          </div>
        )}
        {visibleDishes.length > 6 && (
          <div className="menu-more">
            <button
              className="button button-outline-dark"
              type="button"
              onClick={() => setShowFullMenu((show) => !show)}
            >
              {showFullMenu ? "Show less" : "View full menu"}
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </section>

      <section className="story-section" id="about">
        <div className="story-image">
          <div className="story-photo" role="img" aria-label="Friends sharing a meal in a warmly lit restaurant" />
          <div className="story-stamp">
            <span>GOOD TIMES</span>
            <span>LIVE HERE</span>
            <i>✳</i>
          </div>
          <span className="story-image-caption">A little room for everyone</span>
        </div>
        <div className="story-copy">
          <SectionEyebrow>A seat at our table</SectionEyebrow>
          <h2>
            Come for the food.
            <br />
            <em>Stay for the</em>
            <br />
            atmosphere.
          </h2>
          <p>
            Some places just have a way of making the hours disappear. Maybe
            it&apos;s the first drink turning into dinner, the familiar faces
            across the table, or the feeling that no one is in a hurry.
          </p>
          <p>
            We made All Day for exactly that — good things to eat, something
            lovely in your glass, and room for the moments that happen in
            between.
          </p>
          <a className="text-link" href="#contact">
            A little more about us <ArrowUpRight size={16} />
          </a>
          <span className="story-scribble">Take your time.</span>
        </div>
      </section>

      <section className="gallery-section section-pad" id="gallery">
        <div className="gallery-heading">
          <div>
            <SectionEyebrow>Little moments, lately</SectionEyebrow>
            <h2>
              A feeling you <em>can almost taste.</em>
            </h2>
          </div>
          <a
            className="instagram-link"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            <Camera size={15} /> FIND US ON INSTAGRAM <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="gallery-track">
          {gallery.map((item, index) => (
            <motion.a
              className={`gallery-item gallery-item-${index + 1}`}
              href="#reserve"
              key={item.label}
              aria-label={`${item.type}: ${item.label}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
            >
              <div
                className="gallery-image"
                style={{ backgroundImage: `url("${item.image}")` }}
              />
              <div className="gallery-shade" />
              <span className="gallery-type">{item.type}</span>
              <span className="gallery-label">{item.label}</span>
              <span className="gallery-arrow">
                <ArrowUpRight size={17} />
              </span>
            </motion.a>
          ))}
        </div>
        <div className="gallery-scroll-note">
          <span /> A few scenes from around the table
        </div>
      </section>

      <section className="reservation-section" id="reserve">
        <div className="reservation-backdrop" />
        <div className="reservation-inner">
          <div className="reservation-copy">
            <SectionEyebrow>Your evening, sorted</SectionEyebrow>
            <h2>
              Your table
              <br />
              is <em>waiting.</em>
            </h2>
            <p>
              Date night, long lunch, or just because. We&apos;ll save you a
              seat.
            </p>
            <div className="reservation-contact-note">
              <Clock3 size={15} /> Daily, 12 noon till late
            </div>
            <a
              className="button button-outline-light reservation-whatsapp"
              href="https://wa.me/919876543210?text=Hi%20All%20Day%2C%20I%27d%20like%20to%20reserve%20a%20table."
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp us <ArrowUpRight size={16} />
            </a>
          </div>
          <form className="reservation-form" onSubmit={handleReservation}>
            <div className="form-heading">
              <span>MAKE IT A DATE</span>
              <span>01 — 04</span>
            </div>
            {reservationSent ? (
              <div className="reservation-success" role="status">
                <span className="success-icon"><Check size={21} /></span>
                <h3>Lovely choice.</h3>
                <p>
                  Your request is noted for this demo. To confirm a real table,
                  give us a call or drop us a WhatsApp.
                </p>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setReservationSent(false)}
                >
                  Make another request <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <>
                <label className="form-field">
                  <span>Your name</span>
                  <input name="name" type="text" placeholder="How should we call you?" required />
                </label>
                <div className="form-row">
                  <label className="form-field">
                    <span>Date</span>
                    <input name="date" type="date" required />
                  </label>
                  <label className="form-field">
                    <span>Time</span>
                    <select name="time" defaultValue="" required>
                      <option value="" disabled>Select a time</option>
                      <option>12:00 PM</option>
                      <option>1:00 PM</option>
                      <option>3:00 PM</option>
                      <option>6:00 PM</option>
                      <option>7:00 PM</option>
                      <option>8:00 PM</option>
                      <option>9:00 PM</option>
                      <option>10:00 PM</option>
                    </select>
                  </label>
                </div>
                <div className="form-row">
                  <label className="form-field">
                    <span>Party size</span>
                    <select name="guests" defaultValue="2 guests">
                      <option>1 guest</option>
                      <option>2 guests</option>
                      <option>3 guests</option>
                      <option>4 guests</option>
                      <option>5 guests</option>
                      <option>6 guests</option>
                    </select>
                  </label>
                  <label className="form-field">
                    <span>Phone number</span>
                    <input name="phone" type="tel" placeholder="+91" required />
                  </label>
                </div>
                <button className="button button-cream form-submit" type="submit">
                  Request a table <ArrowUpRight size={16} />
                </button>
                <p className="form-disclaimer">
                  Demo form only — no reservation is actually sent.
                </p>
              </>
            )}
          </form>
        </div>
      </section>

      <section className="location-section section-pad" id="contact">
        <div className="location-heading">
          <SectionEyebrow>Find your way over</SectionEyebrow>
          <h2>
            Right here in <em>Thane.</em>
          </h2>
        </div>
        <div className="location-grid">
          <div className="location-card">
            <span className="location-icon"><MapPin size={19} /></span>
            <span className="location-label">COME ON IN</span>
            <h3>We saved you a seat.</h3>
            <p>Hiranandani Estate, Thane West<br />Maharashtra 400607, India</p>
            <a
              className="text-link"
              href="https://maps.google.com/?q=Hiranandani+Estate+Thane+West"
              target="_blank"
              rel="noreferrer"
            >
              Get directions <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="location-card">
            <span className="location-icon"><Clock3 size={19} /></span>
            <span className="location-label">WHENEVER YOU&apos;RE READY</span>
            <h3>Here from noon till late.</h3>
            <p>Monday – Sunday<br />12:00 pm – 11:30 pm</p>
            <a className="text-link" href="#reserve">
              Find a time <ArrowRight size={15} />
            </a>
          </div>
          <div className="location-card">
            <span className="location-icon"><Phone size={19} /></span>
            <span className="location-label">LET&apos;S TALK</span>
            <h3>We&apos;re just a call away.</h3>
            <p>+91 98765 43210<br />For a table or just to say hello.</p>
            <div className="contact-links">
              <a className="text-link" href="tel:+919876543210">
                Call us <ArrowUpRight size={15} />
              </a>
              <a
                className="text-link"
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
        <p className="location-demo-note">Sample location and contact details for this demo.</p>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-block">
            <a className="brand footer-brand" href="#home">
              <span className="brand-mark">A</span>
              <span className="brand-name">
                ALL DAY
                <small>KITCHEN &amp; BAR</small>
              </span>
            </a>
            <p>Good things happen<br />when we sit down together.</p>
          </div>
          <div className="footer-links">
            <span className="footer-label">TAKE A LOOK</span>
            <a href="#menu">Menu</a>
            <a href="#experience">Experience</a>
            <a href="#gallery">Gallery</a>
          </div>
          <div className="footer-links">
            <span className="footer-label">COME ON OVER</span>
            <a href="#contact">Location</a>
            <a href="tel:+919876543210">Contact</a>
            <a href="#contact">Hours</a>
          </div>
          <div className="footer-social">
            <span className="footer-label">KEEP IN TOUCH</span>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram <ArrowUpRight size={15} />
            </a>
            <a href="#reserve">
              Reserve a table <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ALL DAY KITCHEN &amp; BAR</span>
          <span className="footer-signoff">Good food. Better company.</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
