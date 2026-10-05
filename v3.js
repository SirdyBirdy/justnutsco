(() => {
  const products = [
    {id:'roasted-pistachios',name:'Roasted Pistachios',group:'nuts',image:'pistachios.jpg',price:649,weight:'250 g',tag:'Bestseller',description:'A satisfyingly crunchy, savoury favourite for snack bowls and sharing moments.'},
    {id:'golden-cashews',name:'Golden Cashews',group:'nuts',image:'cashews.jpg',price:549,weight:'250 g',tag:'',description:'Creamy, golden cashews made for the everyday snack ritual.'},
    {id:'whole-almonds',name:'Whole Almonds',group:'nuts',image:'almonds.jpg',price:499,weight:'250 g',tag:'',description:'Classic whole almonds for a delicious little pick-me-up.'},
    {id:'chocolate-collection',name:'Chocolate Collection',group:'chocolate',image:'chocolates.jpg',price:899,weight:'Box of 9',tag:'A little treat',description:'A generous collection of chocolate bites for sharing, gifting or keeping.'},
    {id:'berry-mix',name:'Berry Mix',group:'dry-fruits',image:'berries.jpg',price:499,weight:'200 g',tag:'',description:'A colourful mix of sweet dried berries for anytime snacking.'},
    {id:'signature-hamper',name:'Signature Hamper',group:'gifts',image:'hamper.jpg',price:2499,weight:'Gift box',tag:'Gift-ready',description:'An occasion-ready assortment of nuts and sweet bites, all in one thoughtful box.'},
    {id:'pistachio-snack-pack',name:'Pistachio Snack Pack',group:'nuts',image:'pistachios.jpg',price:399,weight:'150 g',tag:'',description:'The pistachios you love in a smaller snack-friendly pack.'},
    {id:'dark-chocolate-bites',name:'Dark Chocolate Bites',group:'chocolate',image:'chocolates.jpg',price:599,weight:'Box of 6',tag:'',description:'Rich chocolate bites made for a small, satisfying moment.'}
  ];
  const money = value => `₹${value.toLocaleString('en-IN')}`;
  const params = new URLSearchParams(location.search);
  const card = p => `<article class="product" data-category="${p.group}"><div class="product-image"><a href="mockup-03-product.html?product=${p.id}" aria-label="View ${p.name}"><img src="assets/${p.image}" alt="${p.name}" loading="lazy"></a>${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}</div><div class="product-info"><div><h3><a class="product-title" href="mockup-03-product.html?product=${p.id}">${p.name}</a></h3><small>${p.weight}</small></div><span class="product-price">${money(p.price)}</span></div><button data-add="${p.name}" data-price="${p.price}">Add to bag +</button></article>`;
  const homeGrid = document.querySelector('[data-home-products]');
  if (homeGrid) homeGrid.innerHTML = products.map(card).join('');
  const collectionGrid = document.querySelector('[data-collection-products]');
  if (collectionGrid) {
    const categories = {all:{title:'Shop everything',description:'Good things for every craving and every occasion.',image:'market.jpg'},nuts:{title:'Nuts & seeds',description:'Crunchy, satisfying favourites for the everyday snack shelf.',image:'pistachios.jpg'},'dry-fruits':{title:'Dry fruits',description:'Colourful, naturally sweet picks for a little lift.',image:'berries.jpg'},chocolate:{title:'Chocolate',description:'Something sweet for any moment that calls for it.',image:'chocolates.jpg'},gifts:{title:'Hampers & gifts',description:'Thoughtful, delicious gestures for every celebration.',image:'gifting.jpg'}};
    const current = Object.hasOwn(categories,params.get('category')) ? params.get('category') : 'all';
    const info = categories[current];
    document.querySelector('[data-collection-title]').textContent = info.title;
    document.querySelector('[data-collection-description]').textContent = info.description;
    document.querySelector('[data-collection-image]').src = `assets/${info.image}`;
    document.querySelector('[data-collection-image]').alt = info.title;
    document.title = `${info.title} — Just Nuts | Concept 03`;
    document.querySelectorAll('[data-collection-chip]').forEach(a => a.classList.toggle('active',a.dataset.collectionChip === current));
    let visible = products.filter(p => current === 'all' || p.group === current);
    const query = params.get('q')?.trim().toLowerCase();
    if (query) {
      visible = products.filter(p => `${p.name} ${p.group} ${p.description}`.toLowerCase().includes(query));
      document.querySelector('[data-collection-title]').textContent = `Results for “${params.get('q')}”`;
      document.querySelector('[data-collection-description]').textContent = 'Your good-food matches, all in one place.';
    }
    const render = () => {
      const sort = document.querySelector('[data-sort]').value;
      const sorted = [...visible].sort((a,b) => sort === 'low' ? a.price-b.price : sort === 'high' ? b.price-a.price : 0);
      collectionGrid.innerHTML = sorted.length ? sorted.map(card).join('') : '<div class="empty-state"><h2>No matches found</h2><p>Try another search or browse all products.</p><a class="text-link" href="mockup-03-collection.html">Shop everything ↗</a></div>';
      document.querySelector('[data-result-count]').textContent = `${visible.length} products`;
    };
    document.querySelector('[data-sort]').addEventListener('change',render);render();
  }
  const pdp = document.querySelector('[data-pdp]');
  if (pdp) {
    const product = products.find(p => p.id === params.get('product')) || products[0];
    const image = `assets/${product.image}`;
    document.title = `${product.name} — Just Nuts | Concept 03`;
    document.querySelector('[data-product-crumb]').textContent = product.name;
    document.querySelector('[data-product-name]').textContent = product.name;
    document.querySelector('[data-product-description]').textContent = product.description;
    document.querySelector('[data-product-image]').src = image;
    document.querySelector('[data-product-image]').alt = product.name;
    document.querySelector('[data-product-price]').textContent = money(product.price);
    document.querySelector('[data-product-weight]').textContent = product.weight;
    document.querySelector('[data-product-add]').dataset.add = product.name;
    document.querySelector('[data-product-add]').dataset.price = product.price;
    document.querySelector('[data-related]').innerHTML = products.filter(p => p.id !== product.id && (p.group === product.group || p.group === 'gifts')).slice(0,4).map(card).join('');
    const thumbs = document.querySelector('[data-gallery-thumbs]');
    const galleryImages = [product.image,product.group === 'gifts' ? 'gifting.jpg' : 'market.jpg',product.group === 'chocolate' ? 'reel-chocolate.jpg' : product.group === 'gifts' ? 'reel-gifting.jpg' : 'reel-pistachios.jpg'];
    thumbs.innerHTML = galleryImages.map((file,i) => `<button type="button" class="${i === 0 ? 'active' : ''}" data-thumb="${file}" aria-label="View product image ${i+1}"><img src="assets/${file}" alt=""></button>`).join('');
    thumbs.addEventListener('click',e => {const button=e.target.closest('[data-thumb]');if(!button)return;document.querySelector('[data-product-image]').src=`assets/${button.dataset.thumb}`;thumbs.querySelectorAll('button').forEach(el=>el.classList.toggle('active',el===button));});
    let quantity=1;
    document.querySelectorAll('.quantity [data-quantity]').forEach(button => button.addEventListener('click',() => {quantity=Math.max(1,Math.min(20,quantity+Number(button.dataset.quantity)));document.querySelector('[data-quantity-value]').textContent=quantity;document.querySelector('[data-product-add]').dataset.quantity=quantity;}));
    document.querySelectorAll('[data-pack]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-pack]').forEach(el=>el.classList.toggle('active',el===button));const price=Math.round(product.price*Number(button.dataset.pack));document.querySelector('[data-product-price]').textContent=money(price);document.querySelector('[data-product-add]').dataset.price=price;document.querySelector('[data-product-add]').dataset.add=`${product.name} (${button.textContent.trim()})`;}));
  }
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = searchOverlay?.querySelector('input');
  const results = searchOverlay?.querySelector('.search-results');
  const updateResults = () => {if(!results || !searchInput)return;const query=searchInput.value.trim().toLowerCase();results.innerHTML=(query ? products.filter(p=>p.name.toLowerCase().includes(query)).slice(0,4) : products.slice(0,3)).map(p=>`<a href="mockup-03-product.html?product=${p.id}"><img src="assets/${p.image}" alt="">${p.name} · ${money(p.price)}</a>`).join('') || '<p>No matching products. Try another search.</p>';};
  searchInput?.addEventListener('input',updateResults);updateResults();
  document.querySelectorAll('[data-reel]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();const id=link.dataset.reel;const target=document.querySelector(`[data-reel-dialog="${id}"]`);target?.showModal();}));
  document.querySelectorAll('[data-close-reel]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog')?.close()));
})();
