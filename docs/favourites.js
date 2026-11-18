const shops = { zapp: 'Zapp', zoom: 'Zoom by Ocado' }
const list = document.querySelector('[data-favourites-list]')
const preview = document.querySelector('[data-favourites-preview]')

function element(tag, text, className) {
  const node = document.createElement(tag)
  if (text) node.textContent = text
  if (className) node.className = className
  return node
}

function orderLabel(count) {
  return `${count} ${count === 1 ? 'order' : 'orders'}`
}

function makeCard(item, compact) {
  const card = element('li', '', 'catalog-card')
  if (compact) {
    const image = element('img')
    image.src = `./assets/grocery-${item.photo}.webp`
    image.alt = ''
    image.loading = 'lazy'
    image.width = 360
    image.height = 360
    card.append(image)
  }

  const body = element('div', '', 'catalog-card-body')
  const meta = element('p', shops[item.shop], 'catalog-card-meta')
  meta.append(element('span', orderLabel(item.count), 'order-count'))
  const title = element(compact ? 'h3' : 'h2')
  if (compact) {
    const link = element('a', item.name)
    link.href = `./favourites.html?product=${encodeURIComponent(item.name)}&shop=${item.shop}`
    title.append(link)
  } else {
    title.textContent = item.name
  }
  body.append(meta, title)

  if (!compact) {
    const footer = element('div', '', 'catalog-card-footer')
    const link = element('a', item.direct ? `View on ${shops[item.shop]}` : `Find on ${shops[item.shop]}`)
    link.href = item.url
    footer.append(link)
    if (item.favourite) footer.append(element('span', 'Favourite'))
    body.append(footer)
  }

  card.append(body)
  return card
}

function renderList(data, items) {
  const controls = list.querySelector('.catalog-controls')
  const input = controls.querySelector('input[type="search"]')
  const shop = controls.querySelector('select')
  const favouritesOnly = controls.querySelector('input[type="checkbox"]')
  const status = list.querySelector('.catalog-status')
  const grid = list.querySelector('.catalog-grid')
  list.querySelector('[data-coverage]').textContent = data.coverage
  const params = new URLSearchParams(location.search)
  input.value = params.get('product') ?? ''
  if (Object.hasOwn(shops, params.get('shop'))) shop.value = params.get('shop')

  function render() {
    const query = input.value.trim().toLowerCase()
    const matches = items.filter(item =>
      (!shop.value || item.shop === shop.value) &&
      (!favouritesOnly.checked || item.favourite) &&
      item.name.toLowerCase().includes(query)
    )
    grid.replaceChildren(...matches.map(item => makeCard(item, false)))
    status.textContent = matches.length
      ? `${matches.length} ${matches.length === 1 ? 'product' : 'products'}`
      : 'No matching products.'
  }

  input.addEventListener('input', render)
  shop.addEventListener('change', render)
  favouritesOnly.addEventListener('change', render)
  controls.hidden = false
  render()
}

try {
  const response = await fetch(new URL('./favourites.json', import.meta.url), { cache: 'no-cache' })
  if (!response.ok) throw new Error('Could not load the catalogue')
  const data = await response.json()
  const items = [...data.items].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'en-GB'))
  if (list) renderList(data, items)
  if (preview) {
    const featured = items.slice(0, 5)
    if (featured.every(item => item.shop === featured[0].shop)) {
      const otherShopItems = items.filter(item => item.shop !== featured[0].shop && item.count > 0)
      const photosShown = new Set(featured.slice(0, -1).map(item => item.photo))
      const otherShop = otherShopItems.find(item =>
        item.count === otherShopItems[0].count && !photosShown.has(item.photo)
      ) ?? otherShopItems[0]
      if (otherShop) featured[featured.length - 1] = otherShop
    }
    preview.querySelector('ul').replaceChildren(...featured.map(item => makeCard(item, true)))
  }
} catch {
  if (list) list.querySelector('.catalog-status').textContent = 'Couldn’t load the catalogue. Reload to try again.'
}
