let role = localStorage.getItem("role") || "";
let names = document.getElementById("myAction");
let nameL = localStorage.getItem("name") || "";
let temp = document.querySelector('.renTemp').content ;
let bods = document.querySelector('.tBody') ;
let token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
if(!token) return window.location.href = "/"

names.textContent = "A";

async function handlePut(id) {
    const req = await fetch(`http://localhost:4000/api/action/update/${id}`, {
        method : "PUT",
        headers : {
            "Content-type" : "application/json",
        },
        body : JSON.stringify({status : 1}),
    }) ;
    const res = await req.json() ;
    if(req.ok){
        alert('Admin tasdiqlagunicha kutib turing !') ;
        window.location.reload();
    }
}

async function handlerErender(data) {
    let frags = document.createDocumentFragment() ;
    data.forEach(element => {
        let clone = temp.cloneNode(true) ;
        clone.querySelector('.card-title').textContent = element.techId ;
        clone.querySelector('.card-text').textContent = element.date ;
        let btn = clone.querySelector('.statusB') ;
        btn.dataset.id = element.id ;
        btn.textContent = element.status == 0 ? "Tayyor" : "1" || element.status == 1 ? "Adminga so'rov yuborilgan !" : "e"
        
        btn.addEventListener("click", (evt) => {
            handlePut(evt.target.dataset.id);
        })

        frags.append(clone) ;
    });
    bods.append(frags) ;
}

async function get() {
    const req = await fetch('http://localhost:4000/api/action/client') ;
    const res = await req.json() ;
    handlerErender(res.data)
}
get() ;

