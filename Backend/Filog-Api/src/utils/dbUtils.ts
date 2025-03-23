/**
 * Generates a DiceBear avatar URL based on the provided seed.
 * @param seed - The seed string used to generate the avatar.
 * @returns The URL of the generated avatar.
 */
export function getDiceBearAvatar(seed:string){
  return `https://api.dicebear.com/9.x/micah/webp?seed=${seed}&scale=100&flip=true&baseColor=f9c9b6&seed=raghav&backgroundColor=194FE6`
}

