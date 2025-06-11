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

const confirm_order = document.querySelector('.btn');
const container = document.querySelector('.container');
const body_ = document.querySelector('body');
const order_confirmation = document.querySelector('.order-confirmation');
confirm_order.addEventListener('click', () => {
    container.style.zIndex = '-1';
    order_confirmation.style.display = 'flex';
    order_confirmation.classList.add('animate')
    body_.style.backgroundColor= '';
    const all_list = list_group.querySelectorAll('.list');
    const list_group_two = order_confirmation.querySelector('.list-group-two');
    const div_two = document.createElement('div');
    div_two.classList.add('list');
    let correct_img=0;
    all_list.forEach(li =>{
        let item_flav = li.querySelector('.item-flavour');
        let item_quan = li.querySelector('.price').textContent.replace(/[^0-9.]/g,'');
        let item_co = li.querySelector('.food-cost').textContent.replace(/[^0-9.]/g,'');
        let item_to = li.querySelector('.total').textContent.replace(/[^0-9.]/g,'');
        let img_arr = ['image-baklava-thumbnail', 'image-brownie-thumbnail', 'image-cake-thumbnail', 'image-brulee-thumbnail', 'image-macaron-thumbnail', 'image-meringue-thumbnail', 'image-meringue-thumbnail', 'image-tiramisu-thumbnail', 'image-waffle-thumbnail'];
        let index;
        let formated_flav = item_flav.textContent.toLowerCase();
        for (let i in img_arr){
           let formated_img =  img_arr[i].
            replace('image-','').
            replace('-thumbnail','').
            replaceAll('-',' ').
            toLowerCase();
            if(formated_flav.includes(formated_img)){
              index=formated_img;
            }
        }
        console.log(index)

        let inner_content = `
                  <div class="food-detail">
            <img src="./assets/images/image-brownie-thumbnail.jpg" alt="">
            <div class="name-price">
              <p class="item-flavour">${item_flav.textContent}</p>
              <span class="price">${item_quan}x</span>
              <span class="food-cost">@$${item_co}</span>
            </div>
          </div>
          <span class="total">$${parseFloat(item_to).toFixed(2)}</span>`;
              div_two.innerHTML = inner_content;
    list_group_two.appendChild(div_two);
    })

})

function scrollToSection() {
    document.getElementById("topSection").scrollIntoView({ behavior: "smooth" });
}

let aflj = 'Waffle with Berries';
let jbf = 'waffle'

if(aflj.includes(jbf))
    console.log('correct')
else
    console.log('not')