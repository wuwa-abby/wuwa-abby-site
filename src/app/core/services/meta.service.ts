import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor() {}

  /*
    This service is used to set the meta tags of the document.
    
    Find more information about meta tags here:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
  */

  public setTitle(title: string): void {
    document.title = title;

    // meta og:title
    const ogTitle = document.head.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.setAttribute('content', title);
      document.head.appendChild(meta);
    }

    // meta twitter:title
    const twitterTitle = document.head.querySelector(
      'meta[name="twitter:title"]'
    );
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'twitter:title');
      meta.setAttribute('content', title);
      document.head.appendChild(meta);
    }

    // meta title
    const titleTag = document.head.querySelector('title');
    if (titleTag) {
      titleTag.textContent = title;
    } else {
      const titleElem = document.createElement('title');
      titleElem.textContent = title;
      document.head.appendChild(titleElem);
    }
  }

  public setDescription(description: string): void {
    // meta description
    const descriptionTag = document.head.querySelector(
      'meta[name="description"]'
    );
    if (descriptionTag) {
      descriptionTag.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      meta.setAttribute('content', description);
      document.head.appendChild(meta);
    }

    // meta og:description
    const ogDescription = document.head.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.setAttribute('content', description);
      document.head.appendChild(meta);
    }

    // meta twitter:description
    const twitterDescription = document.head.querySelector(
      'meta[name="twitter:description"]'
    );
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'twitter:description');
      meta.setAttribute('content', description);
      document.head.appendChild(meta);
    }
  }

  public setKeywords(keywords: string): void {
    // meta keywords
    const keywordsTag = document.head.querySelector('meta[name="keywords"]');
    if (keywordsTag) {
      keywordsTag.setAttribute('content', keywords);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'keywords');
      meta.setAttribute('content', keywords);
      document.head.appendChild(meta);
    }

    // meta og:keywords
    const ogKeywords = document.head.querySelector(
      'meta[property="og:keywords"]'
    );
    if (ogKeywords) {
      ogKeywords.setAttribute('content', keywords);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:keywords');
      meta.setAttribute('content', keywords);
      document.head.appendChild(meta);
    }
  }

  public setAuthor(author: string): void {
    // meta author
    const authorTag = document.head.querySelector('meta[name="author"]');
    if (authorTag) {
      authorTag.setAttribute('content', author);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'author');
      meta.setAttribute('content', author);
      document.head.appendChild(meta);
    }

    // meta og:author
    const ogAuthor = document.head.querySelector('meta[property="og:author"]');
    if (ogAuthor) {
      ogAuthor.setAttribute('content', author);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:author');
      meta.setAttribute('content', author);
      document.head.appendChild(meta);
    }

    // meta article:author
    const articleAuthor = document.head.querySelector(
      'meta[property="article:author"]'
    );
    if (articleAuthor) {
      articleAuthor.setAttribute('content', author);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'article:author');
      meta.setAttribute('content', author);
      document.head.appendChild(meta);
    }

    // meta twitter:creator
    const twitterCreator = document.head.querySelector(
      'meta[name="twitter:creator"]'
    );
    if (twitterCreator) {
      twitterCreator.setAttribute('content', author);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'twitter:creator');
      meta.setAttribute('content', author);
      document.head.appendChild(meta);
    }

    // meta twitter:site
    const twitterSite = document.head.querySelector(
      'meta[name="twitter:site"]'
    );
    if (twitterSite) {
      twitterSite.setAttribute('content', author);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'twitter:site');
      meta.setAttribute('content', author);
      document.head.appendChild(meta);
    }
  }

  public setPublisher(publisher: string): void {
    // meta article:publisher
    const articlePublisher = document.head.querySelector(
      'meta[property="article:publisher"]'
    );
    if (articlePublisher) {
      articlePublisher.setAttribute('content', publisher);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'article:publisher');
      meta.setAttribute('content', publisher);
      document.head.appendChild(meta);
    }

    // meta og:publisher
    const ogPublisher = document.head.querySelector(
      'meta[property="og:publisher"]'
    );
    if (ogPublisher) {
      ogPublisher.setAttribute('content', publisher);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:publisher');
      meta.setAttribute('content', publisher);
      document.head.appendChild(meta);
    }

    // meta twitter:site
    const twitterSite = document.head.querySelector(
      'meta[name="twitter:site"]'
    );
    if (twitterSite) {
      twitterSite.setAttribute('content', publisher);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'twitter:site');
      meta.setAttribute('content', publisher);
      document.head.appendChild(meta);
    }
  }

  public setUrl(url: string): void {
    // meta og:url
    const ogUrl = document.head.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', url);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:url');
      meta.setAttribute('content', url);
      document.head.appendChild(meta);
    }

    // meta twitter:url
    const twitterUrl = document.head.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) {
      twitterUrl.setAttribute('content', url);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'twitter:url');
      meta.setAttribute('content', url);
      document.head.appendChild(meta);
    }

    // link canonical
    const canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', url);
    } else {
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      document.head.appendChild(link);
    }
  }
}
