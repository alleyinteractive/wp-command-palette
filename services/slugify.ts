const slugify = (text: string) => text.toLowerCase().replace(/: /g, '-').replace(/\s+/g, '-');

export default slugify;
