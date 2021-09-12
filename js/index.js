let fruits = [
    {
        id: 1,
        title: 'Яблоки',
        price: 20,
        img: 'https://calorizator.ru/sites/default/files/imagecache/product_512/product/apple-6.jpg'
    },
    {
        id: 2,
        title: 'Апельсик',
        price: 30,
        img: 'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_1000.jpg'
    },
    {
        id: 3,
        title: 'Манго',
        price: 40,
        img: 'https://nebanan.com.ua/wp-content/uploads/2019/11/dizajn-bez-nazvaniya-29-e1602670749739.jpg'
    }
]

const toHTML = fruit => `
  <div class="col">
    <div class="card" style="width: 20rem; margin-bottom: 2rem;">
      <img src="${fruit.img}" alt="${fruit.title}" class="card-img-top" style="height: 300px;">
      <div class="card-body">
          <h5 class="card-title">${fruit.title}</h5>
          <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
          <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
      </div>
    </div>
  </div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '500px',
    footerButtons: [
        {
            text: 'Закрыть', type: 'primary', handler() {
                priceModal.close()
            }
        },
    ]
})


document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContext(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(()=> {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(()=>{
            console.log('Cancel')
        })
    }
})
