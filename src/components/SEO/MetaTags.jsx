import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * Komponen MetaTags untuk pengelolaan SEO yang dinamis
 * 
 * @param {Object} props
 * @param {string} props.title - Judul halaman
 * @param {string} props.description - Deskripsi halaman
 * @param {string} props.keywords - Kata kunci halaman, dipisahkan dengan koma
 * @param {string} props.canonicalUrl - URL kanonik halaman
 * @param {string} props.ogImage - Gambar untuk Open Graph
 * @param {string} props.ogType - Tipe Open Graph (default: website)
 */
const MetaTags = ({
  title = "KamaCleans - Jasa Cuci Sepatu, Helm, Topi Terdekat di Tangerang",
  description = "Jasa cuci sepatu, helm, dan topi profesional di Tangerang. Melayani area Kutabumi, Tomang, Regency dengan layanan deep cleaning.",
  keywords = "cuci sepatu tangerang, cuci helm tangerang, cuci topi tangerang, laundry sepatu tangerang",
  canonicalUrl = "https://www.kamacleans.com/",
  ogImage = "https://www.kamacleans.com/images/logo.png",
  ogType = "website"
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

MetaTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ogImage: PropTypes.string,
  ogType: PropTypes.string
};

export default MetaTags; 