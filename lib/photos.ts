// Free photos from Unsplash (Unsplash License), loaded from their CDN.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=75`;

export const photos = {
  hero: unsplash("1600334089648-b0d9d3028eb2"),
  services: {
    body: unsplash("1741522509438-a120c0bb5e88"),
    stone: unsplash("1544161515-4ab6ce6db874"),
    head: unsplash("1706795033728-9232ef548a16"),
    facial: unsplash("1570172619644-dfd03ed5d881"),
    combo: unsplash("1775133262667-316bd4d9e5b5"),
  } as Record<string, string>,
  why: unsplash("1601479604588-68d9e6d386b5"),
  offer: unsplash("1545558509-ebcff83ba6c1"),
};
