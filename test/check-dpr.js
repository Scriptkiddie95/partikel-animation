const width = 800;
const height = 300;
const dprs = [0.5, 1, 1.25, 1.5, 2, 2.5, 3];

for (const dpr of dprs) {
  const offWidth = Math.floor(width * dpr);
  const offHeight = Math.floor(height * dpr);
  const dataLength = offWidth * offHeight * 4;
  const offWidthCSS = Math.floor(offWidth / dpr);
  const offHeightCSS = Math.floor(offHeight / dpr);

  let maxIdx = 0;
  for (let y = 0; y < offHeightCSS; y += 2) {
    for (let x = 0; x < offWidthCSS; x += 2) {
      const idx = ((y * dpr) * offWidth + (x * dpr)) * 4;
      if (idx + 3 >= dataLength) {
        throw new Error(`Index out of bounds for dpr ${dpr} at (${x},${y})`);
      }
      if (idx > maxIdx) maxIdx = idx;
    }
  }
  console.log(`dpr ${dpr} - maxIdx ${maxIdx} within ${dataLength}`);
}
