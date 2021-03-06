type Meta = {
  hid?: string,
  content?: string,
} & ({ name: string } | { property: string })

interface MetaDescription {
  url: string,
  title: string,
  site_name: string,
  description: string,
  img: string,
  img_size: { width: string, height: string },
  locale: string,
  twitter: string,
  twitter_card: string,
  theme_color: string,
}

export function socialMeta (options: Partial<MetaDescription>): Meta[] {
  // All meta tags
  const metaTags = [
    // Global
    { name: 'author', content: options.url },
    { name: 'publisher', content: options.url },
    { name: 'apple-mobile-web-app-title', content: options.title },
    { name: 'theme-color', content: options.theme_color },
    { name: 'description', content: options.description },

    // Facebook & LinkedIn
    { property: 'og:title', content: options.title },
    { property: 'og:description', content: options.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: options.url },
    { property: 'og:image', content: options.img },
    { property: 'og:image:width', content: options.img_size?.width },
    { property: 'og:image:height', content: options.img_size?.height },
    { property: 'og:locale', content: options.locale },
    { property: 'og:site_name', content: options.site_name },

    // Twitter
    { name: 'twitter:card', content: options.twitter_card },
    { name: 'twitter:site', content: options.twitter },
    { name: 'twitter:creator', content: options.twitter },
    { name: 'twitter:title', content: options.title },
    { name: 'twitter:description', content: options.description },
    { name: 'twitter:image', content: options.img },
    { name: 'twitter:image:width', content: options.img_size?.width },
    { name: 'twitter:image:height', content: options.img_size?.height },
  ]

  const meta: Meta[] = []

  // Add meta tags to head
  metaTags.forEach((tag) => {
    if (tag.content !== undefined && tag.content !== null) {
      if (Object.prototype.hasOwnProperty.call(tag, 'name')) {
        meta.push({
          hid: tag.name,
          name: tag.name as string,
          content: tag.content,
        })
      }
      else if (Object.prototype.hasOwnProperty.call(tag, 'property')) {
        meta.push({
          hid: tag.property,
          property: tag.property as string,
          content: tag.content,
        })
      }
    }
  })

  return meta
}
