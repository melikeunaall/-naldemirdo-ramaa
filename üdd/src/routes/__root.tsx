import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { Toaster } from '@/components/ui/sonner'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  // Site-wide document head. Every value below is a PLACEHOLDER to replace
  // with the real project's copy on the first build — title and description
  // are what search results and link previews actually show, so generic
  // defaults must never survive into a published app.
  //
  // Per-route `head()` overrides these; write real, specific copy there for
  // any page worth finding (see the app's own routes).
  //
  // Deliberately NO og:image here: the hosting layer injects the project's
  // social preview at serve time (an explicit image, or the latest build
  // screenshot), so a hardcoded one would only fight it.
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Ünal Demir Doğrama Bolu | Demir Doğrama & Çelik İşleri' },
      { name: 'description', content: 'Bolu Merkez’de mimari metal işleri ve projeye özel demir doğrama çözümleri.' },
      { name: 'google-site-verification', content: 'alGZ9mastOSOwMwy0GD8Y4wsU0Qrg1ZNQpVZnrOaMIU' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Ünal Demir Doğrama Bolu | Demir Doğrama & Çelik İşleri' },
      { property: 'og:description', content: 'Bolu Merkez’de mimari metal işleri ve projeye özel demir doğrama çözümleri.' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      // PLACEHOLDER favicon — replace it with the project's real mark
      // (generate one, write it to public/, and update this link).
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'canonical', href: 'https://unal-demir-dograma.firevibe.dev/' },
      // Fonts belong here as explicit weight lists (preconnect + one css2
      // URL), so the browser fetches exactly the faces the design uses.
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {/* Toast surface (sonner) — mounted once here so `toast(...)` works
            from any component with zero setup. */}
        <Toaster />
        {/* No devtools overlay: the preview IS the dev server, so anything
            dev-only would sit on every user's live preview. */}
        <Scripts />
      </body>
    </html>
  )
}
