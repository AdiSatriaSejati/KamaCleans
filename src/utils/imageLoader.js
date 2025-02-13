export const loadImage = async (url, fallbackUrl) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Image load failed');
    return url;
  } catch (error) {
    console.warn(`Failed to load image: ${url}`, error);
    return fallbackUrl || '/images/placeholder.webp';
  }
};

export const imageWithFallback = (props) => {
  const { src, fallback, ...rest } = props;
  
  return (
    <img
      {...rest}
      src={src}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = fallback || '/images/placeholder.webp';
      }}
    />
  );
};