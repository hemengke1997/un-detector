export type BrowserDefinition = (string | RegExp)[]

export const browsers: BrowserDefinition[] = [
  ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
  ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
  ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/],
  ['edge', /Edge\/([0-9\._]+)/],
  ['edge', /Edg\/([0-9\._]+)/],
  ['ie', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/],
  ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ['ie', /MSIE\s(7\.0)/],
  ['safari', /Version\/([0-9\._]+).*Safari/],
  ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ['android', /Android\s([0-9\.]+)/],
  ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
  ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
]
