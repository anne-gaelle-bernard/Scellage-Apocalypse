const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  await page.goto('http://localhost:5174');
  await page.waitForTimeout(800);

  await page.evaluate(() => {
    const verses = {};
    [['1','1'],['1','2'],['1','3']].forEach(([c,v]) => {
      verses[c+':'+v] = { chap: +c, verse: +v, text: 'Révélation de Jésus-Christ que Dieu lui a donnée.' };
    });
    localStorage.setItem('apoc_selected', JSON.stringify(verses));
  });
  await page.reload();
  await page.waitForTimeout(600);

  const navItems = await page.locator('.nav-item').all();

  const pages = [
    { name: 'home', idx: 0 },
    { name: 'flashcard', idx: 24 },
    { name: 'lacunes', idx: 25 },
    { name: 'recitation', idx: 26 },
    { name: 'notes', idx: 27 },
  ];

  // Also grab lecture page
  await navItems[1].click({ force: true });
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/lecture_full.png', fullPage: false });

  for (const { name, idx } of pages) {
    await navItems[idx].click({ force: true });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `/tmp/${name}_full.png`, fullPage: false });
    console.log('Shot', name);
  }

  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
