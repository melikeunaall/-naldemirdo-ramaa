import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react'
import heroGate from '@/assets/unal-ferforje-bahce-kapisi.jpg'
import workshopBench from '@/assets/unal-atolye-masa.jpg'
import loadingRamp from '@/assets/unal-yukleme-rampasi.jpg'
import steelStaircase from '@/assets/unal-celik-merdiven.jpg'
import workshopGate from '@/assets/unal-ferforje-kapi-atolye.jpg'
import teamWeldingOne from '@/assets/unal-ekip-kaynak-1.jpg'
import teamWeldingTwo from '@/assets/unal-ekip-kaynak-2.jpg'
import teamWeldingThree from '@/assets/unal-ekip-kaynak-3.jpg'
import teamWeldingFour from '@/assets/unal-ekip-kaynak-4.jpg'
import { submitQuote } from '@/server/quote'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Ünal Demir Doğrama Bolu | Demir Doğrama & Çelik İşleri' },
      {
        name: 'description',
        content:
          'Bolu Merkez’de mimari metal işleri, özel demir doğrama, çelik merdiven, korkuluk ve kapı imalatı. Ünal Demir Doğrama’dan teklif alın.',
      },
      { property: 'og:title', content: 'Ünal Demir Doğrama Bolu | Demir Doğrama & Çelik İşleri' },
      {
        property: 'og:description',
        content: 'Bolu Merkez’de mimari metal işleri ve projeye özel demir doğrama.',
      },
    ],
  }),
  component: Home,
})

const services = [
  {
    title: 'Mimari metal işleri',
    detail: 'Mimarlarla birlikte çizimden uygulamaya, mekâna özel metal detaylar.',
    tag: 'MİMARİ',
  },
  {
    title: 'Merdiven & korkuluk',
    detail: 'İç ve dış mekâna uyumlu çelik merdivenler, güvenli korkuluklar.',
    tag: 'YAPI',
  },
  {
    title: 'Kapı, bahçe & cephe',
    detail: 'Yapının karakterini tamamlayan giriş kapıları, çitler ve cephe işleri.',
    tag: 'DIŞ MEKÂN',
  },
  {
    title: 'Özel imalat & montaj',
    detail: 'İhtiyaca göre ölçülendirilen parçalar; atölyede üretim, sahada uygulama.',
    tag: 'PROJEYE ÖZEL',
  },
]

const projects = [
  {
    image: heroGate,
    title: 'Ferforje bahçe kapısı',
    category: 'KONUT · DIŞ MEKÂN',
    className: 'project-featured',
    position: '50% 52%',
  },
  {
    image: steelStaircase,
    title: 'Atölye içi çelik merdiven',
    category: 'ATÖLYE · YAPI',
    className: '',
    position: '50% 50%',
  },
  {
    image: loadingRamp,
    title: 'Araç yükleme rampaları',
    category: 'ÖZEL İMALAT',
    className: '',
    position: '50% 62%',
  },
  {
    image: workshopGate,
    title: 'İşlemeli ferforje kapılar',
    category: 'ATÖLYE · EL İŞÇİLİĞİ',
    className: '',
    position: '50% 56%',
  },
  {
    image: workshopBench,
    title: 'Atölye imalat tezgâhı',
    category: 'ATÖLYE · ÜRETİM',
    className: '',
    position: '50% 53%',
  },
]

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [sent, setSent] = useState(false)
  const [whatsappMessage, setWhatsappMessage] = useState('')

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    const form = event.currentTarget
    const values = new FormData(form)
    setSending(true)
    setFeedback('')
    setSent(false)
    setWhatsappMessage('')
    const quote = {
      name: String(values.get('name') ?? ''),
      email: String(values.get('email') ?? ''),
      phone: String(values.get('phone') ?? ''),
      projectType: String(values.get('projectType') ?? ''),
      message: String(values.get('message') ?? ''),
    }
    try {
      const result = await submitQuote({ data: quote })
      if (result.success) {
        const messageForWhatsapp = [
          'Merhaba, web sitenizden teklif talebi oluşturdum.',
          '',
          `Ad soyad: ${quote.name}`,
          `E-posta: ${quote.email}`,
          `Telefon: ${quote.phone || 'Belirtilmedi'}`,
          `İşin türü: ${quote.projectType}`,
          '',
          `Proje detayı: ${quote.message}`,
        ].join('\n')
        setWhatsappMessage(messageForWhatsapp)
        setSent(true)
        setFeedback('Talebiniz kaydedildi. Aynı mesajı iki WhatsApp numarasına da iletmek için bağlantıları ayrı ayrı açıp Gönder’e dokunun.')
        form.reset()
      } else {
        setSent(false)
        setFeedback('Talebiniz şu an iletilemedi. Lütfen yeniden deneyin.')
      }
    } catch {
      setSent(false)
      setFeedback('Talebiniz şu an iletilemedi. Lütfen yeniden deneyin.')
    } finally {
      setSending(false)
    }
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'GeneralContractor',
            name: 'Ünal Demir Doğrama',
            description: 'Bolu Merkez’de mimari metal işleri ve projeye özel demir doğrama çözümleri.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Yeni Akçakavak Köyü, Aladdin Yılmaz Bulvarı, B-2 Blok 33/32',
              addressLocality: 'Bolu Merkez',
              addressRegion: 'Bolu',
              addressCountry: 'TR',
            },
            telephone: '+90-536-247-1548',
            contactPoint: [
              { '@type': 'ContactPoint', telephone: '+90-535-396-3116', contactType: 'customer service', name: 'Ramazan Mert Ünal' },
            ],
            areaServed: { '@type': 'City', name: 'Bolu' },
            hasMap: 'https://www.google.com/maps?q=Yeni%20Ak%C3%A7akavak%20K%C3%B6y%C3%BC%2C%20Aladdin%20Y%C4%B1lmaz%20Bulvar%C4%B1%20B-2%20Blok%2033%2F32%2C%20Bolu%20Merkez%2C%20Bolu',
          }),
        }}
      />
      <header className={scrolled ? 'site-header scrolled' : 'site-header'}>
        <a className="wordmark" href="#anasayfa" aria-label="Ünal Demir Doğrama ana sayfa">
          ÜNAL<span>DEMİR DOĞRAMA</span>
        </a>
        <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Ana menü">
          <a href="#hizmetler" onClick={() => setMenuOpen(false)}>Hizmetler</a>
          <a href="#projeler" onClick={() => setMenuOpen(false)}>Uygulamalar</a>
          <a href="#hakkimizda" onClick={() => setMenuOpen(false)}>Hakkımızda</a>
        </nav>
        <a className="header-cta" href="#teklif">
          Teklif alın <ArrowUpRight size={16} strokeWidth={2.2} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      <section className="hero" id="anasayfa" style={{ backgroundImage: `url(${heroGate})` }}>
        <div className="hero-scrim" />
        <div className="hero-topline">
          <span>ATÖLYEDEN SAHAYA — PROJEYE ÖZEL METAL İŞLERİ</span>
          <span className="hero-index">ÜD / 01</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> ÜNAL DEMİR DOĞRAMA</p>
          <h1>DEMİRDE<br />SAĞLAM<br /><span>İŞÇİLİK.</span></h1>
          <div className="hero-aside">
            <span className="aside-rule" />
            <p>Detayında hassasiyet.<br />Her projede güven.</p>
          </div>
        </div>
        <div className="hero-bottom">
          <p>Ölçüden montaja, projeye göre<br className="desktop-break" /> tasarlanmış metal çözümler.</p>
          <a href="#hizmetler" className="scroll-cue">AŞAĞI İN <ArrowDown size={15} /></a>
          <span className="hero-coordinate">ÇELİK · DEMİR · İŞÇİLİK</span>
        </div>
      </section>

      <section className="intro-band" aria-label="Ünal Demir Doğrama yaklaşımı">
        <p>İŞİNİZİ ANLIYORUZ.</p>
        <h2>İyi iş, doğru<br className="mobile-only" /> <span>detayla başlar.</span></h2>
        <div className="intro-note">
          <span className="note-bar" />
          <p>İster yeni bir yapı, ister yenilenen bir yaşam alanı olsun; ihtiyacı dinler, ölçüsüne göre üretir, işimizi yerinde tamamlarız.</p>
        </div>
      </section>

      <section className="services section-pad" id="hizmetler">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark-eyebrow">NE YAPIYORUZ</p>
            <h2>Metal işleriniz<br />için <span>sağlam çözüm.</span></h2>
          </div>
          <p className="section-lede">İhtiyacınıza ve projenizin ölçeğine uygun, baştan sona özenle yürütülen metal uygulamalar.</p>
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <article className="service-item" key={service.title}>
              <span className="service-count">0{index + 1}</span>
              <div className="service-main">
                <span className="service-tag">{service.tag}</span>
                <h3>{service.title}</h3>
                <p>{service.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="projects section-pad" id="projeler">
        <div className="projects-heading">
          <div>
            <p className="eyebrow dark-eyebrow">ATÖLYEDEN GERÇEK UYGULAMALAR</p>
            <h2>İşimiz,<br /><span>yerinde belli.</span></h2>
          </div>
          <p>Ünal Demir Doğrama’dan<br />atölye ve uygulama kareleri.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card ${project.className}`} key={project.title}>
              <div className="project-image-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  style={{ objectPosition: project.position }}
                />
              </div>
              <div className="project-caption">
                <div><p className="project-category">{project.category}</p><h3>{project.title}</h3></div>
                <span className="project-number">0{index + 1}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="gallery-note">Ünal Demir Doğrama’dan gerçek atölye ve uygulama fotoğrafları</p>
      </section>

      <section className="workshop-band">
        <div className="workshop-image"><img src={steelStaircase} alt="Atölyede imalatı yapılan çelik merdiven" loading="lazy" /></div>
        <div className="workshop-copy">
          <p className="eyebrow"><span className="live-dot" /> İŞİN BAŞINDA DA SONUNDA DA</p>
          <h2>Çizimden<br />son sıkıma<br /><span>kadar.</span></h2>
          <p>İhtiyacı birlikte netleştirir, üretim ve uygulamayı aynı özenle takip ederiz. Çünkü işin sağlamlığı, daha ilk ölçüde başlar.</p>
          <a className="text-link light-link" href="#teklif">Projenizi konuşalım <ArrowRight size={17} /></a>
        </div>
        <span className="workshop-stamp">USTALIK<br />İŞİNDE BELLİ</span>
      </section>

      <section className="about section-pad" id="hakkimizda">
        <div className="about-label"><p className="eyebrow dark-eyebrow">ÜNAL DEMİR DOĞRAMA HAKKINDA</p><span className="about-mark">ÜD—</span></div>
        <div className="about-main">
          <h2>İşin hakkını<br />veren <span>bir ekip.</span></h2>
          <div className="about-copy">
            <p>Ünal Demir Doğrama; müteahhitler, mimarlar, ev sahipleri ve işletmeler için proje odaklı demir doğrama ve metal imalat çözümleri sunar.</p>
            <p>Bizim için iyi sonuç; doğru malzeme, temiz işçilik ve iş takibinin bir araya gelmesidir. Her işi, ihtiyaçları baştan anlayarak ele alırız.</p>
            <a className="text-link" href="#teklif">Projenizi konuşalım <ArrowRight size={17} /></a>
          </div>
        </div>
        <div className="team-gallery" aria-label="Ünal Demir Doğrama ekibi atölyede çalışırken">
          <div className="team-gallery-heading">
            <p className="eyebrow dark-eyebrow">ATÖLYEDEN</p>
            <h3>İş başında,<br /><span>birlikte.</span></h3>
            <p>Her sağlam işin arkasında, işini bilen ve birlikte çalışan bir ekip var.</p>
          </div>
          <figure className="team-photo team-photo-lead">
            <img src={teamWeldingOne} alt="Ünal Demir Doğrama ustası atölyede metal kaynağı yaparken" loading="lazy" />
            <figcaption>Atölyede kaynak ve imalat</figcaption>
          </figure>
          <figure className="team-photo team-photo-tall">
            <img src={teamWeldingTwo} alt="Ekip üyesi metal imalat üzerinde çalışırken" loading="lazy" />
            <figcaption>Detaylı metal işçiliği</figcaption>
          </figure>
          <figure className="team-photo">
            <img src={teamWeldingThree} alt="İki usta atölyede metal parçayı birlikte kaynaklarken" loading="lazy" />
            <figcaption>Usta ve çırak, aynı işin başında</figcaption>
          </figure>
          <figure className="team-photo team-photo-last">
            <img src={teamWeldingFour} alt="Ünal Demir Doğrama ekibi atölyede kaynak çalışması yaparken" loading="lazy" />
            <figcaption>Birlikte üretim, sağlam sonuç</figcaption>
          </figure>
        </div>
      </section>

      <section className="quote-section" id="teklif">
        <div className="quote-info">
          <p className="eyebrow"><span className="live-dot" /> BİRLİKTE PLANLAYALIM</p>
          <h2>Projeniz<br />için <span>konuşalım.</span></h2>
          <p className="quote-description">Kısaca ihtiyacınızı anlatın. Projenize uygun çözümü birlikte değerlendirelim.</p>
          <div className="quote-contact-note"><span className="note-bar" /><p>Teklif taleplerini doğrudan ekibimiz inceler.</p></div>
          <div className="quote-contacts" aria-label="Ustalarımızla telefonla iletişim">
            <a href="tel:+905362471548"><span><Phone size={15} /> İbrahim ÜNAL</span><strong>0536 247 15 48</strong></a>
            <a href="tel:+905353963116"><span><Phone size={15} /> Ramazan Mert Ünal</span><strong>0535 396 31 16</strong></a>
          </div>
          <div className="workshop-location">
            <p className="location-label"><MapPin size={15} /> ATÖLYE ADRESİ</p>
            <a className="location-address" href="https://www.google.com/maps?q=Yeni%20Ak%C3%A7akavak%20K%C3%B6y%C3%BC%2C%20Aladdin%20Y%C4%B1lmaz%20Bulvar%C4%B1%20B-2%20Blok%2033%2F32%2C%20Bolu%20Merkez%2C%20Bolu" target="_blank" rel="noreferrer">
              Yeni Akçakavak Köyü, Aladdin Yılmaz Bulvarı<br />B-2 Blok 33/32, Bolu Merkez
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <iframe
              className="location-map"
              title="Ünal Demir Doğrama atölyesinin Bolu Merkez'deki konumu"
              src="https://www.google.com/maps?q=Yeni%20Ak%C3%A7akavak%20K%C3%B6y%C3%BC%2C%20Aladdin%20Y%C4%B1lmaz%20Bulvar%C4%B1%20B-2%20Blok%2033%2F32%2C%20Bolu%20Merkez%2C%20Bolu&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <form className="quote-form" onSubmit={handleSubmit}>
          <div className="form-heading"><span>YENİ PROJE TALEBİ</span><span>ÜD / 02</span></div>
          <div className="form-grid">
            <label>Adınız soyadınız<input name="name" autoComplete="name" required minLength={2} maxLength={120} placeholder="Ad soyad" /></label>
            <label>E-posta adresiniz<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="ornek@adres.com" /></label>
            <label className="phone-field">Telefon <span>(isteğe bağlı)</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="05xx xxx xx xx" /></label>
            <label className="type-field">İşin türü<select name="projectType" required defaultValue=""><option value="" disabled>Bir başlık seçin</option><option>Merdiven / korkuluk</option><option>Kapı / çit / bahçe</option><option>Mimari metal işleri</option><option>Özel imalat / montaj</option><option>Diğer</option></select></label>
            <label className="message-field">Projenizden bahsedin<textarea name="message" required minLength={10} maxLength={3000} rows={4} placeholder="İhtiyacınız, ölçüler veya aklınızdaki detaylar…" /></label>
          </div>
          <div className="form-submit-row">
            <p>Talebinizi göndererek sizinle iletişime geçmemize izin verirsiniz.</p>
            <button type="submit" disabled={sending}>{sending ? 'Gönderiliyor…' : <>Teklif isteyin <ArrowUpRight size={17} /></>}</button>
          </div>
          {feedback && <p className={sent ? 'form-feedback success' : 'form-feedback error'} role="status">{feedback}</p>}
          {sent && whatsappMessage && (
            <div className="whatsapp-actions" aria-label="Teklif mesajını WhatsApp üzerinden gönder">
              <a href={`https://wa.me/905362471548?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noreferrer">
                <MessageCircle size={18} aria-hidden="true" />
                <span><strong>İbrahim ÜNAL’a gönder</strong><small>0536 247 15 48</small></span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href={`https://wa.me/905353963116?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noreferrer">
                <MessageCircle size={18} aria-hidden="true" />
                <span><strong>Ramazan Mert Ünal’a gönder</strong><small>0535 396 31 16</small></span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          )}
        </form>
      </section>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#anasayfa">ÜNAL<span>DEMİR DOĞRAMA</span></a>
        <p>Sağlam işçilik, projeye özel çözümler.</p>
        <a href="#anasayfa" className="back-top">BAŞA DÖN <ArrowUpRight size={15} /></a>
        <span className="footer-rule" />
        <small>© {new Date().getFullYear()} ÜNAL DEMİR DOĞRAMA</small>
        <small>METALDE SAĞLAM İŞÇİLİK.</small>
      </footer>
    </main>
  )
}
