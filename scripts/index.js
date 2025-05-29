const add_cart = document.querySelectorAll('.add-cart');
const btn_one = document.querySelectorAll('.btn_one');
const count = document.querySelectorAll('.count');
let item = document.querySelectorAll('.item');
let list_group = document.querySelector('.list-group');
let cart_total = document.querySelector('.cart-total');
let empty_cart = document.querySelector('.empty-cart');
let item_cart = document.querySelector('.item-cart');
let total_cart = 0;

// visible the add the items button

btn_one.forEach(btn => {
    btn.addEventListener('click', function (event) {
        let new_div = document.createElement('div');
        let item = this.closest('.item');
        let quantity = item.querySelector('.count');

        count.forEach(function () {
            var event_target = event.target;
            event_target.style.zIndex = '-1';
        })

        let img = item.querySelectorAll('img');
        for (let i = 0; i <= 2; i++) {
            img[i].style.border = '3px solid hsl(0,63%, 54%)';
        }

        let spanlist = quantity.querySelectorAll('span');
        let increase = spanlist[0];
        let total_quantity = spanlist[1];
        let decrease = spanlist[2]
        let val = 0;
        let item_flavor = item.querySelector('.item-flavour');
        let price = item.querySelector('.price');
        let final_cost;
        increase.addEventListener('click', () => {
            if (cart_total.innerHTML < 0) {
                empty_cart.style.display = 'flex';
                item_cart.style.display = 'none';
            }
            else {
                empty_cart.style.display = 'none';
                item_cart.style.display = 'flex';
            }
            if (val > 1000)
                val = 0;
            val += 1;
            total_quantity.textContent = val;
            final_cost = price.textContent * val;
            total_cart += 1;
            cart_total.innerHTML = total_cart;
            new_div.classList.add('list');
            new_div.innerHTML = `
          <div class="food">
            <p class="item-flavour">${item_flavor.textContent}</p>
            <div class="rate">
            <span class="price">${val}x</span><span class="food-cost">@$${price.textContent}</span><span class="total">$${final_cost}</span>
            </div>
          </div>
          <img class="remove" src="./assets/images/icon-remove-item.svg" alt="">`;
            list_group.appendChild(new_div);
        })

        decrease.addEventListener('click', () => {
            val -= 1;
            if (val < 0)
                val = 0;

            if (total_cart < 0)
                total_cart = 0;
            total_quantity.textContent = val;
            final_cost = price.textContent * val;
            if (cart_total.innerHTML <= 0) {
                empty_cart.style.display = 'flex';
                item_cart.style.display = 'none';
            }
            else {
                empty_cart.style.display = 'none';
                item_cart.style.display = 'flex';
            }

            new_div.innerHTML = `
          <div class="food">
            <p class="item-flavour">${item_flavor.textContent}</p>
            <div class="rate">
            <span class="price">${val}x</span><span class="food-cost">@$${price.textContent}</span><span class="total">$${final_cost}</span>
            </div>
          </div>
          <img class="remove" src="./assets/images/icon-remove-item.svg" alt="">`;
            list_group.appendChild(new_div);
            let check = new_div.querySelector('.price').innerHTML;
            if (check[0] == 0) {
                list_group.removeChild(new_div)
            }
        })
        cart_total.innerHTML = val;

    })
})


