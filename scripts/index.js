const all_cart_btn = document.querySelectorAll('.add-cart');
const all_count_btn = document.querySelectorAll('.count');
const list_group = document.querySelector('.list-group')
all_cart_btn.forEach(btn => {
    btn.addEventListener('click', function () {
        let item = this.closest('.item');

        let count_btn = item.querySelector('.count');
        let images = item.querySelectorAll('img');
        count_btn.style.zIndex = '1';
        for (let i = 0; i <= 2; i++) {
            images[i].style.border = '3px solid hsl(0, 63%, 54%)'
        }

        // if(current_quantity==0){
        //     for (let i=0; i<=2; i++){
        //     first_three[i].style.border='none';
        //     }
        //     count_btn.style.zIndex = '-1';
        // }
    })
})

all_count_btn.forEach(btn => {
    let item = btn.closest('.item');
    let increase = item.querySelector('.increase');
    let decrease = item.querySelector('.decrease');
    let quantity = item.querySelector('.quantity');
    let item_flavor = item.querySelector('.item-flavour');
    let price = item.querySelector('.price');
    let final_cost = 0;
    let val = 0;
    const div = document.createElement('div');
    increase.addEventListener('click', () => {
        val++;
        if (val > 99) {
            val = 0;
        }
        quantity.innerHTML = val;
        final_cost = val * price.textContent;
        display_Cart(div, item_flavor, price, val, final_cost)
        if (!list_group.contains(div))
            list_group.appendChild(div);
        update_Cart()
    })

    decrease.addEventListener('click', () => {
        val--;
        if (val < 0) val = 0;
        quantity.innerHTML = val;
        final_cost = val * price.textContent;
        display_Cart(div, item_flavor, price, val, final_cost)
        if (val == 0 && list_group.contains(div))
            list_group.removeChild(div)
        update_Cart()
    })
})

function display_Cart(div, item_flavor, price, val, final_cost) {
    div.classList.add('list')
    let list = `
      <div class="food">
        <p class="item-flavour">${item_flavor.textContent}</p>
        <div class="rate">
        <span class="price">${val}x</span><span class="food-cost">@$${price.textContent}</span><span class="total">$${final_cost}</span>
        </div>
      </div>
      <img class="remove" src="./assets/images/icon-remove-item.svg" alt="">`;
    div.innerHTML = list;
    list_group.appendChild(div);
    let remove = div.querySelector('.remove');
    remove.addEventListener('click', function () {
        list_group.removeChild(div);
        update_Cart()
    })

}

function update_Cart() {
    let total_cart = document.querySelector('.cart-total');
    let all_total = list_group.querySelectorAll('.price');
    let empty_cart = document.querySelector('.empty-cart')
    let item_cart = document.querySelector('.item-cart');
    let amount = document.querySelector('.amount');
    let total_amount = list_group.querySelectorAll('.total');
    let final_amt = 0
    total_amount.forEach(amt => {
        final_amt += parseFloat(amt.textContent.replace(/[^0-9.]/g, ''));
    })
    amount.innerHTML = final_amt.toFixed(2);
    let total = 0;
    all_total.forEach(all_to => {
        total += parseFloat(all_to.textContent.replace(/[^0-9.]/g, ''));
    })
    total_cart.innerHTML = total;

    if (total > 0) {
        item_cart.style.display = 'flex';
        empty_cart.style.display = 'none'
    }
    else {
        item_cart.style.display = 'none';
        empty_cart.style.display = 'flex'
    }
}