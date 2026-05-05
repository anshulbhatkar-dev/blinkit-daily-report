const SCRIPT = 'https://script.google.com/macros/s/AKfycby58qLbdb5Vxo03sXHgKZkI4jAtaEQvTXE6saHRcgGiqfWRAJ-qnN07nYFtZJnowMk9tA/exec';

export default async function handler(req, res) {
  const tab = req.query.tab || '';
  if (!tab) return res.status(400).send('missing tab');

  try {
    const r    = await fetch(`${SCRIPT}?tab=${tab}`);
    const text = await r.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(text);
  } catch (err) {
    res.status(502).send('proxy error: ' + err.message);
  }
}
