// src/components/SEO.tsx
import { Helmet } from 'react-helmet';

type SEOProps = {
  title?: string;
  description?: string;
  noIndex?: boolean;
};

const defaultTitle = "Fiat – Santuário Digital Católico";
const defaultDescription = "Terço guiado com áudio, liturgia diária, orações completas, catequese e comunidades de oração. Tudo num só lugar.";

export default function SEO({ title, description, noIndex }: SEOProps) {
  const pageTitle = title ? `${title} | Fiat Católico` : defaultTitle;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://fiatcatolico.com.br/og-image.jpg" />
      {noIndex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
}
