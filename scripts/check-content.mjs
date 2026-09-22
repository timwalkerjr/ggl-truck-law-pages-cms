import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { load } from 'cheerio';

const build = () => execFileSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], {stdio: 'pipe'});
const html = route => load(fs.readFileSync(`dist/${route ? route + '/' : ''}index.html`, 'utf8'));
const temporary = [];
const fixture = (path, content) => {
  assert(!fs.existsSync(path), `Fixture already exists: ${path}`);
  fs.writeFileSync(path, content);
  temporary.push(path);
};

try {
  const service = JSON.parse(fs.readFileSync('src/content/services/jackknife-accidents.json', 'utf8'));
  fixture('src/content/services/cms-smoke-test.json', JSON.stringify({...service, title:'CMS service fixture', heading:'CMS service fixture', order:-1}));
  fixture('src/content/services/cms-draft-test.json', JSON.stringify({...service, title:'CMS draft fixture', draft:true}));
  fixture('src/content/faq/cms-smoke-test.json', JSON.stringify({title:'CMS FAQ fixture', answer:'CMS answer fixture', order:-1, draft:false}));
  fixture('src/content/faq/cms-draft-test.json', JSON.stringify({title:'CMS draft fixture', answer:'Hidden answer', draft:true}));
  fixture('src/content/team/cms-draft-test.md', '---\ntitle: CMS draft fixture\njobTitle: Test\nimage: /test.jpg\ndraft: true\n---\nHidden biography');
  const verdict = JSON.parse(fs.readFileSync('src/content/verdicts/featured-1.json','utf8'));
  fixture('src/content/verdicts/cms-draft-test.json',JSON.stringify({...verdict,detail:'CMS draft fixture',draft:true}));
  build();
  const home = html('');
  assert.equal(home('#faq h3').filter((_,el)=>home(el).text().includes('CMS FAQ fixture')).length,1);
  assert.equal(home('#faq .lg\\:col-span-8 h3').first().text(),'CMS FAQ fixture');
  assert(home('a[href="/cms-smoke-test/"]').length >= 3, 'New services must appear in desktop, mobile, and footer navigation');
  assert.equal(html('cms-smoke-test')('h1').text().trim(),'CMS service fixture DYNAMICS');
  assert(!fs.existsSync('dist/cms-draft-test/index.html'));
  for(const route of ['', 'team', 'verdicts']) assert(!html(route)('body').text().includes('CMS draft fixture'));
  assert.equal(home('#contact-form').attr('action'),process.env.PUBLIC_FORMSPREE_ENDPOINT);
  assert.equal(home('meta[name="robots"]').attr('content'),'noindex, nofollow');
  console.log('PASS: collection creation, ordering, service routes/navigation, draft filtering, Formspree action, and noindex.');
} finally {
  for (const path of temporary) fs.unlinkSync(path);
  build();
}
