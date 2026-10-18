const r = require('C:/Users/OMAR/AppData/Local/Temp/opencode/shots/report.json')
for (const o of r.overflow) {
  console.log('==', o.width, o.route, 'doc=' + o.doc, 'vw=' + o.vw)
  for (const x of o.over.slice(0, 8)) console.log('   ', x.sel.slice(0, 70), x.left, '->', x.right)
}
