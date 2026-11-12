import { useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowRight,
  Check,
  Clock3,
  FileImage,
  Film,
  Heart,
  Instagram,
  Layers3,
  Mail,
  Menu,
  MessageCircle,
  Palette,
  PenLine,
  Presentation,
  Send,
  Sparkles,
  Ticket,
  X,
} from 'lucide-react';
import {
  Link,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  delivery: string;
  color: string;
  icon: typeof Film;
  tag: string;
};

const products: Product[] = [
  { id: 'video-editing', name: 'Video editing', price: 25, description: 'Little clips with a lot of feeling, music and magic.', delivery: '2–4 days', color: '#f7aabe', icon: Film, tag: 'For your memories' },
  { id: 'powerpoint-presentation', name: 'PowerPoint presentation', price: 30, description: 'Slides that make your ideas easy to follow and lovely to look at.', delivery: '2–3 days', color: '#f8d46a', icon: Presentation, tag: 'For school & work' },
  { id: 'digital-invitation', name: 'Digital invitation', price: 15, description: 'A tiny digital hello for birthdays, weddings and everything worth gathering for.', delivery: '1–2 days', color: '#89d4c2', icon: Mail, tag: 'For good news' },
  { id: 'poster-design', name: 'Poster design', price: 20, description: 'A bold little poster to help your event, idea or announcement shine.', delivery: '2–3 days', color: '#c9b5ec', icon: FileImage, tag: 'For your big idea' },
  { id: 'logo-starter', name: 'Logo starter', price: 45, description: 'A sweet, simple starting point for your small business or side project.', delivery: '3–5 days', color: '#f3a36c', icon: Palette, tag: 'For your small shop' },
  { id: 'event-ticket', name: 'Event ticket', price: 10, description: 'A cute ticket design that makes getting in feel like part of the event.', delivery: '1–2 days', color: '#a9c8f4', icon: Ticket, tag: 'For your next event' },
];

function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy' },
  ];
  return (
    <div className="site-shell">
      <div className="site-content">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 md:px-8">
          <Link href="/" className="group flex items-center gap-3" data-testid="link-brand">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#f7aabe] text-[#f7aabe] transition-transform group-hover:rotate-12">
              <Sparkles size={17} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#f8d46a]" />
            </span>
            <span className="hand text-3xl font-bold leading-none text-[#f7aabe]">Mira's Designs</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex" aria-label="Main navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={`nav-link ${location === link.href ? 'text-[#f7aabe]' : 'text-[#fff4df]/75'}`} data-testid={`link-nav-${link.label.toLowerCase()}`}>
                {link.label}
              </Link>
            ))}
            <Link href="/order" className="btn-primary rounded-full px-5 py-2.5 text-sm font-bold" data-testid="link-nav-order">Start an order</Link>
          </nav>
          <button type="button" className="rounded-full border border-[#fff4df]/30 p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu" data-testid="button-mobile-menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>
        {menuOpen && (
          <nav className="mx-5 mb-5 flex flex-col gap-1 rounded-2xl border border-[#fff4df]/15 bg-[#24203e] p-3 md:hidden" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-[#fff4df]/85 hover:bg-[#fff4df]/10" data-testid={`link-mobile-${link.label.toLowerCase()}`}>{link.label}</Link>
            ))}
            <Link href="/order" onClick={() => setMenuOpen(false)} className="btn-primary mt-1 rounded-xl px-4 py-3 text-center font-bold" data-testid="link-mobile-order">Start an order</Link>
          </nav>
        )}
        <main>{children}</main>
        <footer className="mx-auto mt-24 flex w-full max-w-6xl flex-col gap-7 border-t border-[#fff4df]/15 px-5 py-9 text-sm text-[#fff4df]/65 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="hand text-2xl text-[#f7aabe]">made with care in Egypt</p>
            <p className="mt-1">Mira's Designs · tiny studio, big feelings</p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="nav-link" data-testid="link-footer-privacy">Privacy</Link>
            <a href="mailto:hello@mirasdesigns.com" className="nav-link" data-testid="link-footer-email">Email Mira</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="nav-link" aria-label="Instagram" data-testid="link-footer-instagram"><Instagram size={18} /></a>
          </div>
        </footer>
      </div>
    </div>
  );
}

function NotebookIllustration() {
  return (
    <div className="relative mx-auto h-[330px] w-full max-w-[430px] md:h-[400px]" aria-label="Decorated notebook illustration">
      <div className="absolute left-[11%] top-[12%] h-[74%] w-[73%] rotate-[-7deg] rounded-[27px] border-2 border-[#fff4df]/20 bg-[#282345] shadow-2xl" />
      <div className="paper absolute left-[15%] top-[8%] h-[76%] w-[73%] rotate-[5deg] rounded-[27px] p-6 shadow-2xl">
        <div className="absolute right-[-7px] top-[-9px] h-16 w-16 rotate-12 rounded-full border-2 border-[#191631] bg-[#89d4c2]" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-center justify-between text-[#5a4a70]">
            <span className="hand text-2xl">little ideas</span>
            <Heart size={18} fill="#f7aabe" className="text-[#f7aabe]" />
          </div>
          <div className="sketch-frame mx-auto flex h-36 w-44 flex-col items-center justify-center gap-2 text-[#5a4a70]">
            <Sparkles size={34} className="text-[#e99aae]" />
            <span className="hand text-3xl">made for you</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-[#8a7087]">
            <span>notes from Mira</span><span>01 / 24</span>
          </div>
        </div>
      </div>
      <span className="sticker absolute bottom-[10%] left-[4%] rotate-[-8deg]">made in Egypt</span>
      <span className="sticker sticker-yellow absolute right-[4%] top-[18%]">for your moment</span>
      <Sparkles className="absolute bottom-[18%] right-[16%] text-[#f8d46a]" size={28} />
    </div>
  );
}

function Home() {
  return (
    <div className="page-enter">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-20 pt-8 md:grid-cols-[1.06fr_.94fr] md:px-8 md:pb-28 md:pt-16">
        <div>
          <div className="mb-6 flex items-center gap-3 text-[#f8d46a]"><span className="h-px w-10 bg-[#f8d46a]" /><span className="eyebrow">a tiny design studio from cairo</span></div>
          <h1 className="max-w-xl text-5xl font-bold leading-[.98] tracking-[-.055em] text-[#fff4df] md:text-7xl">Your moment,<br /><span className="scribble text-[#f7aabe]">made pretty.</span></h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-[#fff4df]/72">Mira's Designs is a one-person studio for affordable, custom digital designs. Invitations, posters, slides and little things that make a special day feel more like yours.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-bold" data-testid="link-home-shop">Browse the little shop <ArrowRight size={17} /></Link>
            <Link href="/contact" className="btn-outline inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-[#fff4df]" data-testid="link-home-contact">Say hello <MessageCircle size={16} /></Link>
          </div>
          <div className="mt-9 flex items-center gap-3 text-sm text-[#fff4df]/60"><span className="flex -space-x-2"><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#191631] bg-[#f7aabe] text-xs font-bold text-[#191631]">S</span><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#191631] bg-[#f8d46a] text-xs font-bold text-[#191631]">N</span><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#191631] bg-[#89d4c2] text-xs font-bold text-[#191631]">A</span></span><span>small designs, happy people</span></div>
        </div>
        <div className="floaty"><NotebookIllustration /></div>
      </section>
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="paper relative grid gap-8 overflow-hidden rounded-[28px] p-7 md:grid-cols-[.8fr_1.2fr] md:p-11">
          <div className="tape" />
          <div><span className="eyebrow text-[#a26f83]">how it works</span><h2 className="mt-3 max-w-sm text-3xl font-bold leading-tight md:text-4xl">No big agency energy. Just good ideas.</h2><p className="mt-4 max-w-sm leading-7 text-[#191631]/65">Tell me what you’re imagining, and I’ll turn it into something you’re excited to send, share or print.</p></div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              ['01', 'Pick a design', 'Choose a starting point from the shop.'],
              ['02', 'Tell me the details', 'Share your colors, words and wishes.'],
              ['03', 'Receive your magic', 'I design, refine and send it over.'],
            ].map(([number, title, copy]) => <div key={number} className="border-t-2 border-[#f7aabe] pt-4"><span className="hand text-2xl text-[#b87991]">{number}</span><h3 className="mt-2 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#191631]/60">{copy}</p></div>)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-4 pt-24 md:px-8">
        <div className="flex items-end justify-between gap-5"><div><span className="eyebrow text-[#89d4c2]">a peek inside</span><h2 className="mt-2 text-3xl font-bold md:text-4xl">Little things I love making</h2></div><Link href="/shop" className="hidden items-center gap-2 text-sm font-bold text-[#f7aabe] md:flex" data-testid="link-home-see-all">See the full shop <ArrowRight size={16} /></Link></div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {products.slice(0, 3).map((product, index) => <ProductCard key={product.id} product={product} compact index={index} />)}
        </div>
        <Link href="/shop" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#f7aabe] md:hidden" data-testid="link-home-see-all-mobile">See the full shop <ArrowRight size={16} /></Link>
      </section>
    </div>
  );
}

function ProductCard({ product, compact = false, index = 0 }: { product: Product; compact?: boolean; index?: number }) {
  const Icon = product.icon;
  return (
    <article className={`paper lift relative overflow-hidden rounded-[24px] ${compact ? 'p-5' : 'p-6'}`} data-testid={`card-product-${product.id}`}>
      <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[70px]" style={{ backgroundColor: product.color }} />
      <div className="relative flex items-start justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: product.color }}><Icon size={23} /></div><span className="text-xs font-bold text-[#191631]/45">0{index + 1}</span></div>
      <p className="mt-7 text-xs font-bold uppercase tracking-[.13em] text-[#9b647b]">{product.tag}</p>
      <h3 className="mt-2 text-2xl font-bold">{product.name}</h3>
      <p className="mt-3 min-h-12 text-sm leading-6 text-[#191631]/65">{product.description}</p>
      <div className="mt-6 flex items-end justify-between border-t border-[#191631]/10 pt-4"><div><span className="text-xs text-[#191631]/50">starting at</span><p className="text-xl font-bold">{product.price} <span className="text-sm">LE</span></p></div><Link href={`/order?product=${product.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-[#9b647b]" data-testid={`link-order-${product.id}`}>Order <ArrowRight size={15} /></Link></div>
    </article>
  );
}

function Shop() {
  return (
    <div className="page-enter mx-auto w-full max-w-6xl px-5 pb-12 pt-8 md:px-8 md:pt-16">
      <div className="max-w-2xl"><span className="eyebrow text-[#89d4c2]">the little shop</span><h1 className="mt-4 text-5xl font-bold leading-none tracking-[-.04em] md:text-6xl">Choose your starting point.</h1><p className="mt-6 text-lg leading-8 text-[#fff4df]/70">Everything is a starting price. Once you send your details, Mira will reply with a final quote before any work begins.</p></div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
      <div className="mt-14 flex flex-col items-start gap-5 rounded-[25px] border border-[#fff4df]/15 bg-[#24203e] p-6 md:flex-row md:items-center md:justify-between md:p-8"><div className="flex gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f8d46a] text-[#191631]"><PenLine size={20} /></div><div><h2 className="font-bold">Not sure what fits?</h2><p className="mt-1 text-sm leading-6 text-[#fff4df]/65">Tell me about your moment and I’ll point you in the right direction.</p></div></div><Link href="/contact" className="btn-outline rounded-full px-5 py-2.5 text-sm font-bold" data-testid="link-shop-contact">Ask Mira</Link></div>
    </div>
  );
}

function Order() {
  const [location, setLocation] = useLocation();
  const selectedId = new URLSearchParams(location.split('?')[1] ?? '').get('product');
  const selected = products.find((product) => product.id === selectedId);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', details: '', deadline: '', budget: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Tell me your name so I know who I’m designing for.';
    if (!form.email.includes('@')) next.email = 'Please add a valid email so Mira can reply.';
    if (!form.details.trim()) next.details = 'A few details help me picture your idea.';
    setErrors(next);
    if (!Object.keys(next).length) setSubmitted(true);
  };
  if (submitted) {
    return <div className="page-enter mx-auto flex w-full max-w-3xl flex-col items-center px-5 pb-16 pt-16 text-center md:pt-24"><div className="paper relative w-full overflow-hidden rounded-[30px] p-8 md:p-14"><div className="tape" /><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#89d4c2] text-[#191631]"><Check size={32} /></div><span className="eyebrow mt-7 block text-[#a26f83]">message received</span><h1 className="mt-3 text-4xl font-bold md:text-5xl">It’s on Mira’s desk.</h1><p className="mx-auto mt-5 max-w-md leading-7 text-[#191631]/65">Thanks, {form.name.split(' ')[0] || 'friend'}! Your {selected?.name.toLowerCase() ?? 'design'} idea is safely noted. Mira will reply to {form.email} within 1–2 days with the next steps.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><button type="button" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', details: '', deadline: '', budget: '' }); setErrors({}); }} className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold" data-testid="button-start-another-order">Start another order <ArrowRight size={16} /></button><Link href="/" className="rounded-full border border-[#191631]/20 px-6 py-3 font-bold" data-testid="link-confirmation-home">Back home</Link></div></div></div>;
  }
  return (
    <div className="page-enter mx-auto grid w-full max-w-6xl gap-10 px-5 pb-14 pt-8 md:grid-cols-[.72fr_1.28fr] md:px-8 md:pt-14">
      <div><span className="eyebrow text-[#f8d46a]">a note to Mira</span><h1 className="mt-4 text-5xl font-bold leading-[.98] tracking-[-.05em] md:text-6xl">Let’s make<br /><span className="text-[#f7aabe]">your thing.</span></h1><p className="mt-6 max-w-sm leading-7 text-[#fff4df]/68">No perfect brief needed. A rough idea, a date and a way to reach you is a lovely place to start.</p><div className="mt-9 space-y-4 text-sm text-[#fff4df]/65"><div className="flex gap-3"><Clock3 className="shrink-0 text-[#89d4c2]" size={18} /><span>Replies usually land within 1–2 days.</span></div><div className="flex gap-3"><Heart className="shrink-0 text-[#f7aabe]" size={18} /><span>Prices are confirmed before any design work begins.</span></div><div className="flex gap-3"><Send className="shrink-0 text-[#f8d46a]" size={18} /><span>Digital delivery, wherever you are in Egypt.</span></div></div></div>
      <form onSubmit={submit} className="paper paper-lines relative rounded-[27px] p-6 md:p-9" noValidate><div className="tape" /><div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-[#191631]/15 pb-5"><div><span className="eyebrow text-[#a26f83]">order details</span><h2 className="mt-1 text-2xl font-bold">Tell me the good bits</h2></div>{selected ? <div className="rounded-full bg-[#f7aabe] px-3 py-2 text-xs font-bold" data-testid="text-selected-product">For: {selected.name}</div> : <span className="text-sm text-[#191631]/55">Pick a design below</span>}</div>
        {!selected && <div className="mb-6"><label htmlFor="product" className="mb-2 block text-sm font-bold">What would you like?</label><select id="product" className="input-field" defaultValue="" onChange={(event) => setLocation(`/order?product=${event.target.value}`)} data-testid="select-product"><option value="" disabled>Select a starting point</option>{products.map((product) => <option key={product.id} value={product.id}>{product.name} · from {product.price} LE</option>)}</select></div>}
        <div className="grid gap-5 md:grid-cols-2"><Field label="Your name" id="name" value={form.name} onChange={(value) => update('name', value)} placeholder="e.g. Salma Hassan" error={errors.name} /><Field label="Email address" id="email" type="email" value={form.email} onChange={(value) => update('email', value)} placeholder="where can Mira reach you?" error={errors.email} /></div>
        <div className="mt-5"><label htmlFor="details" className="mb-2 block text-sm font-bold">Tell me about it <span className="font-normal text-[#191631]/45">(the fun part)</span></label><textarea id="details" rows={5} value={form.details} onChange={(event) => update('details', event.target.value)} placeholder="What are you making? What should it say? Any colors, references or tiny details to include?" className="input-field resize-none" data-testid="input-details" />{errors.details && <p className="mt-1 text-xs font-semibold text-[#b14f62]" data-testid="error-details">{errors.details}</p>}</div>
        <div className="mt-5 grid gap-5 md:grid-cols-2"><Field label="When do you need it?" id="deadline" value={form.deadline} onChange={(value) => update('deadline', value)} placeholder="e.g. 18 October" /><Field label="Your budget (optional)" id="budget" value={form.budget} onChange={(value) => update('budget', value)} placeholder="e.g. around 100 LE" /></div>
        <div className="mt-7 flex flex-col items-start justify-between gap-4 border-t border-[#191631]/15 pt-5 sm:flex-row sm:items-center"><p className="max-w-xs text-xs leading-5 text-[#191631]/50">By sending this note, you’re asking for a friendly quote — not making a payment.</p><button type="submit" className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold" data-testid="button-submit-order">Send my idea <Send size={16} /></button></div>
      </form>
    </div>
  );
}

function Field({ label, id, value, onChange, placeholder, error, type = 'text' }: { label: string; id: string; value: string; onChange: (value: string) => void; placeholder: string; error?: string; type?: string }) {
  return <div><label htmlFor={id} className="mb-2 block text-sm font-bold">{label}</label><input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="input-field" data-testid={`input-${id}`} />{error && <p className="mt-1 text-xs font-semibold text-[#b14f62]" data-testid={`error-${id}`}>{error}</p>}</div>;
}

function Contact() {
  return <div className="page-enter mx-auto max-w-5xl px-5 pb-14 pt-10 md:px-8 md:pt-16"><div className="grid gap-10 md:grid-cols-[1fr_.85fr] md:items-center"><div><span className="eyebrow text-[#89d4c2]">hello hello</span><h1 className="mt-4 max-w-lg text-5xl font-bold leading-[.98] tracking-[-.05em] md:text-7xl">A real person is on the other side.</h1><p className="mt-7 max-w-lg text-lg leading-8 text-[#fff4df]/70">Have a question before ordering? Not sure which design is right? Mira is happy to chat — no formal brief required.</p><div className="mt-9 flex flex-col items-start gap-4"><a href="mailto:hello@mirasdesigns.com" className="btn-primary inline-flex items-center gap-3 rounded-full px-6 py-3.5 font-bold" data-testid="link-contact-email"><Mail size={18} /> hello@mirasdesigns.com</a><a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn-outline inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold" data-testid="link-contact-instagram"><Instagram size={17} /> @mirasdesigns</a></div></div><div className="paper relative rotate-[2deg] rounded-[28px] p-8 md:p-10"><div className="tape" /><span className="hand text-3xl text-[#a26f83]">a little note</span><p className="mt-7 text-xl font-bold leading-8">I’ll always tell you what’s possible, what it costs and when you can expect it.</p><div className="mt-9 border-t border-[#191631]/15 pt-5 text-sm leading-6 text-[#191631]/60"><p>Studio hours</p><p className="font-bold text-[#191631]">Sunday — Thursday · 10am — 6pm</p><p className="mt-4">Based in Cairo, working with lovely people everywhere.</p></div><div className="mt-8 flex justify-end text-[#f7aabe]"><Sparkles size={30} /></div></div></div><div className="mt-20 grid gap-5 border-t border-[#fff4df]/15 pt-8 sm:grid-cols-3"><div><span className="eyebrow text-[#f8d46a]">01</span><h2 className="mt-2 font-bold">Before you order</h2><p className="mt-2 text-sm leading-6 text-[#fff4df]/60">Ask anything. There are no silly design questions here.</p></div><div><span className="eyebrow text-[#f7aabe]">02</span><h2 className="mt-2 font-bold">After you order</h2><p className="mt-2 text-sm leading-6 text-[#fff4df]/60">You’ll get a reply and a clear quote in 1–2 days.</p></div><div><span className="eyebrow text-[#89d4c2]">03</span><h2 className="mt-2 font-bold">During the design</h2><p className="mt-2 text-sm leading-6 text-[#fff4df]/60">We’ll keep chatting until the design feels like yours.</p></div></div></div>;
}

function Privacy() {
  return <div className="page-enter mx-auto max-w-3xl px-5 pb-14 pt-10 md:px-8 md:pt-16"><span className="eyebrow text-[#f8d46a]">the quiet page</span><h1 className="mt-4 text-5xl font-bold tracking-[-.05em] md:text-6xl">A small privacy note.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#fff4df]/70">Your ideas belong to you. Here’s the plain-English version of what happens when you send a note through Mira’s Designs.</p><article className="paper paper-lines relative mt-12 rounded-[27px] p-7 md:p-11"><div className="tape" /><div className="space-y-9"><PrivacyBlock title="What I collect" text="When you send an order, I see the name, email address and project details you choose to share. That’s it — no accounts, no tracking scrapbook." /><PrivacyBlock title="Why I need it" text="Your contact details are only used to reply to your message, ask useful questions and deliver your design. Project details help me make something that fits." /><PrivacyBlock title="Who sees it" text="Mira handles messages personally. Your information isn’t sold, rented or added to a newsletter without your clear permission." /><PrivacyBlock title="Want something removed?" text="Just email hello@mirasdesigns.com and ask. I’ll happily delete your project details from my working notes." /></div><div className="mt-10 flex items-center gap-2 border-t border-[#191631]/15 pt-6 text-sm text-[#191631]/55"><Layers3 size={17} className="text-[#a26f83]" /> Last updated: October 2024</div></article></div>;
}

function PrivacyBlock({ title, text }: { title: string; text: string }) {
  return <section><h2 className="text-xl font-bold">{title}</h2><p className="mt-2 leading-7 text-[#191631]/65">{text}</p></section>;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/order" component={Order} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Shell><Router /></Shell>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
