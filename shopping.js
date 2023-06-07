$(document).ready(function(){
    var price = 0
    function carttotal(x){
        price += x
        console.log("price",price)
        let rate = price.toFixed(2)
        $(".total-price").text(rate)
        return rate

    }

    // function invoice(){
    //     console.log(item.title)
    // }

    

    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=>{
        for (const product of json) {
            console.log('json', product);
            $("#products").append(`
                <div class="card col-3" >
                    <h4 class="pt-3" style="font-weight: bold; text-transform: capitalize">${product.category}</h4><br>
                    <div><img src=${product.image} style="width: 100%"></div><br>
                    <h5 style="font-weight: bold";>${product.title}</h5><br>
                    <h5 style="font-weight: bold";>Price: $${product.price}</h5>
                    <p class="description">${product.description}</p>
                    <div><button class='cart-btn' id="${product.id}" style='font-size:24px'>Add to cart <i class='fa fa-shopping-cart'></i></button></div>
                </div>
            `)
        

        }
    var id_list =[]
    var cart =[]
    var title = []
    var qty = []
    var cash = []

   
    // console.log("len",cart.length)

    $(".cart-btn").click(function(){
        let id = $(this).attr('id') - 1
        $("#cart-section").show()
        console.log(id_list)
        console.log("ID:",id)
        if (id_list.includes(id)){
            alert("Already in cart")
        }else{

            fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                products = json
                item = json[id]
                // console.log(item) 
                // console.log(products)
                
                $("#cart").append(`

                
                    <tr class="row container shadow-sm p-3 mb-5 bg-light rounded">
                        <td class="left-cart bg-light">
                            <img class="image-cart" src="${item.image}" alt="">
                        </td>
                        <td class="middle-cart bg-light">
                            <div class="middle-top bg-light" style="height: 60%;"><h5 class="item-title text-center p-1">${item.title}</h5></div>
                            <div class="middle-bottom bg-light" style="height: 40%;width: 200px;">
                                <div> <button class="btn btn-outline-secondary minus " id="minus${item.id}" style="height: auto; float: left;" type="button">-</button></div>
                                <input type="text" class="form-control text-center" style="float: left;width: 130px;" disabled>
                                <label id="value${item.id}" class="value">1</label>
                                <div> <button class="btn btn-outline-secondary plus " id="plus${item.id}" style="height: auto;float: left;" type="button">+</button></div>
                            </div>
                        </td>
                        <td class="price-cart">
                            <div style="height: 40%;"><p style="margin-top: 10px;">$ <span class="item-price" id="price${item.id}">${item.price}</span></p></div>
                        </td>

                        <td class="right-cart bg-light">
                            <div class="delete" style="height: 60%;"><button class="del-btn" id="del-btn${item.id}"style="font-size:24px"> <i class="fa fa-trash-o"></i></button></div>
                        </td>
                    </tr> 
                `)
                
                carttotal(item.price)
                id_list.push(id)
                title[id]=item.title
                qty[id]=$("#value"+item.id).text()
                cash[id]=$("#price"+item.id).text()
                // console.log("quaan ",qty[id])
                
                
                $(`#plus${item.id}`).click(function(){
                    // console.log(id)
                    product = products[id]
                    var value = $(`#value${product.id}`).text()
                    var num = $(`#price${product.id}`).text()
                    // console.log("value",value)
                    value ++
                    // console.log("a",value)
                    // console.log("b",$(`#value${product.id}`).text())
                    var total = value*product.price
                    // console.log("total",total)
                    $(`#value${product.id}`).text(value)
                    $(`#price${product.id}`).text(total)

                    qty[id]=$("#value"+product.id).text()
                    cash[id]=$("#price"+product.id).text()
                    
                    carttotal(total-num)
                })
                $(`#minus${item.id}`).click(function(){
                    product = products[id]
                    var value = $(`#value${product.id}`).text()
                    var num = $(`#price${product.id}`).text()
                    // console.log(value)
                    if(value > 1){
                        value --
                        var total = value*product.price
                        $(`#value${product.id}`).text(value)
                        $(`#price${product.id}`).text(total)

                        qty[id]=$("#value"+product.id).text()
                        cash[id]=$("#price"+product.id).text()
                        carttotal(total-num)
                    }else{
                        $(`#value${product.id}`).text(1)
                        $(`#price${product.id}`).text(product.price)
                    }
                })
                $(`#del-btn${item.id}`).click(function(){
                    product = products[id]
                    var num = $(`#price${product.id}`).text()
                    // console.log(num)
                    $(this).parentsUntil("#cart").remove()
                    carttotal(-num)
                    delete title[id]
                    delete qty[id]
                    delete cash[id]
                    
                })

                // invoice()  
            })
            
        }
                
    })
    
    

    $("#total").append(`
                <div class="container " style="width: 80%; height: 7rem; align-items: center;">
                    <table class="table-total" style="width: 100%; height: 100%;">
                        <td>
                            <h4 class="total-label text-center">Total Price</h4>
                        </td>
                        <td>
                            <h4 class="text-center">$ <span class="total-price" >0</span></h4>
                        </td>

                    </table>

                </div>
    `)

    $("#clear").click(function(){
        $("#cart").remove()
        $(".total-price").text(0)
    })

    $("#invoice").click(function(){
        
        console.log("title",title)
        console.log("quantity",qty)
        console.log("cash",cash)
        
        var total = $(".total-price").text()
        // console.log("total",total)
        var cart = [title,qty,cash,total]
        console.log("cart", cart)

        console.log("cart", $(`#value${item.id}`).text());
        window.localStorage.setItem("item",JSON.stringify(cart))
        window.location.href="invoice.html"
    })

    
       
        
    })


})
