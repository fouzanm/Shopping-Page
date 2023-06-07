$(document).ready(function(){

    var bill = JSON.parse(localStorage.getItem("item"))
    console.log(bill)
    
    var title = bill[0]
    var qty = bill[1]
    var price = bill[2]
    var total = bill[3]

    console.log(title)
    console.log(qty)
    console.log(price)
    console.log(total)

    var title = title.filter(function (el) {
        return el != null;
      });
      var qty = qty.filter(function (el) {
        return el != null;
      });
      var price = price.filter(function (el) {
        return el != null;
      });

    console.log(title)
    console.log(qty)
    console.log(price)

    $("#bill").append(`
        <tr class="bill-row">
            <td class="invoice-title col-5"><h4>Product</h4></td>
            <td class="invoice-quantity col-3"><h4>Quantity</h4></td>
            <td class="invoice-price col-3"><h4>Price</h4></td>
        </tr>
    `)
    
    for (let i =0 ; i < title.length ; i++){
        $("#bill").append(`
            <tr class="bill-row">
                <td class="invoice-title col-5"><h6>${title[i]}</h6></td>
                <td class="invoice-quantity col-3"><h6>${qty[i]}</h6></td>
                <td class="invoice-price col-3"><h6>${price[i]}</h6></td>
            </tr>
        `)
    }

    $("#bill").append(`
        <tr class="bill-row">
            <td class="col-8 text-center " colspan="2"><h5 class="font-weight-bold">Total</h5></td>
            <td class="col-3 text-center"><h5 class="font-weight-bold">$ <span class="bill-price">${total}</span></h5></td>
        </tr>
    `)

    $("#upi").click(function(){
        alert("Payment Successful")
        window.location.href="shopping.html"
    })
    $("#cod").click(function(){
        alert("Product Ordered")
        window.location.href="shopping.html"
    })
})