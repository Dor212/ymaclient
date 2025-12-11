import { Helmet } from "react-helmet-async";
import { SITE } from "./seo.config";

type Props = {
  title?: string; description?: string; path?: string; image?: string; jsonLd?: object[];
};

export default function PageSEO({
  title = SITE.defaultTitle,
  description = SITE.defaultDescription,
  path = "/",
  image = SITE.defaultImage,
  jsonLd = [],
}: Props) {
  const url = `${SITE.baseUrl}${path}`;
  return (
    <Helmet>
      <html lang={SITE.lang} dir={SITE.dir} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.brand} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE.baseUrl}${image}`} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd.map((o, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(o)}</script>
      ))}
      <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
    </Helmet>
  );
}
