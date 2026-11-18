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
  const link = element('a', '', 'catalog-product-link')
  const action = item.direct ? `View on ${shops[item.shop]}` : `Search ${shops[item.shop]}`
  link.href = item.url
  link.setAttribute('aria-label', `${action} for ${item.name}, ${orderLabel(item.count)}`)

  if (item.previewUrl) {
    const image = element('img', '', 'catalog-product-preview')
    image.alt = ''
    image.loading = 'lazy'
    image.decoding = 'async'
    image.referrerPolicy = 'no-referrer'
    image.addEventListener('error', () => image.remove(), { once: true })
    image.src = item.previewUrl
    link.append(image)
  }

  const body = element('div', '', 'catalog-card-body')
  const meta = element('p', shops[item.shop], 'catalog-card-meta')
  meta.append(element('span', orderLabel(item.count), 'order-count'))
  const title = element(compact ? 'h3' : 'h2', item.name)
  body.append(meta, title)

  const footer = element('div', '', 'catalog-card-footer')
  footer.append(element('span', action, 'catalog-card-action'))
  if (!compact && item.favourite) footer.append(element('span', 'Favourite'))
  body.append(footer)

  link.append(body)
  card.append(link)
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

function renderGallery(items) {
  const gallery = preview.querySelector('.catalog-gallery')
  const toolbar = preview.querySelector('.gallery-toolbar')
  const [previous, next] = toolbar.querySelectorAll('button')
  const galleryItems = [...items].sort((a, b) => Number(!!b.airFryer) - Number(!!a.airFryer))
  gallery.replaceChildren(...galleryItems.map(item => makeCard(item, true)))
  toolbar.querySelector('.gallery-total').textContent = `${galleryItems.length} products`
  toolbar.hidden = galleryItems.length === 0

  function updateButtons() {
    previous.disabled = gallery.scrollLeft <= 1
    next.disabled = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 1
  }

  function scroll(direction) {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const [first, second] = gallery.children
    if (!second) return
    const cardStep = second.offsetLeft - first.offsetLeft
    const fullCards = Math.max(1, Math.floor(gallery.clientWidth / cardStep))
    gallery.scrollBy({ left: direction * fullCards * cardStep, behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  previous.addEventListener('click', () => scroll(-1))
  next.addEventListener('click', () => scroll(1))
  gallery.addEventListener('scroll', updateButtons, { passive: true })
  new ResizeObserver(updateButtons).observe(gallery)
  updateButtons()
}

try {
  const response = await fetch(new URL('./favourites.json', import.meta.url), { cache: 'no-cache' })
  if (!response.ok) throw new Error('Could not load the catalogue')
  const data = await response.json()
  const items = [...data.items].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'en-GB'))
  if (list) renderList(data, items)
  if (preview) renderGallery(items)
} catch {
  const status = list?.querySelector('.catalog-status') ?? preview?.querySelector('.gallery-status')
  if (status) status.textContent = 'Couldn’t load the catalogue. Reload to try again.'
}
