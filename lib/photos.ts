// Free photos from Unsplash (Unsplash License), loaded from their CDN.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=75`;

export const photos = {
  hero: unsplash("1600334089648-b0d9d3028eb2"),
  why: unsplash("1601479604588-68d9e6d386b5"),
  offer: unsplash("1545558509-ebcff83ba6c1"),
};
