var tipo
var marca
var modelo
var ano

var selectTipo = document.getElementById("selectTipo")
selectTipo.addEventListener("change",function(){

    var selectTipo = document.getElementById("selectTipo")
    const valueSelectTipo = selectTipo.options[selectTipo.selectedIndex].value;
    tipo = valueSelectTipo
    var selectMarca = document.getElementById("selectMarca")
    selectMarca.innerHTML=`<option value="X" selected disabled hidden>Selecione um Marca...</option>`
    
    fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`)
    .then(res => res.json())
    .then(json => {
      
        
        
        for (var i = 0; i < json.length; i++) {
            selectMarca.innerHTML += `<option value="${json[i].codigo}">${json[i].nome}</option>`

        }

    })

})

selectMarca.addEventListener("change", function () {
    var selectMarca = document.getElementById("selectMarca")
    const valueSelectMarca = selectMarca.options[selectMarca.selectedIndex].value
    marca = valueSelectMarca
    var selecModelo = document.getElementById("selectModelo")
    selecModelo.innerHTML = `<option value="X" selected disabled hidden>Selecione um modelo...</option>`

    fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${valueSelectMarca}/modelos`)
        .then(res => res.json())
        .then(json2 => {
            
            
            for (var i = 0; i < json2.modelos.length; i++) {
                selecModelo.innerHTML += `<option value="${json2.modelos[i].codigo}">${json2.modelos[i].nome}</option>`
            }
        })
})


selectModelo.addEventListener("change", function () {
    var selectModelo = document.getElementById("selectModelo")
    const valueSelectModelo = selectModelo.options[selectModelo.selectedIndex].value;
    modelo = valueSelectModelo
    var selectAno = document.getElementById("selectAno")
    selectAno.innerHTML = `<option value="X" selected disabled hidden>Selecione um Ano...</option>`

    fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${valueSelectModelo}/anos`)
        .then(res => res.json())
        .then(json3 => {
            
            
            for (var i = 0; i < json3.length; i++) {
                selectAno.innerHTML += `<option value="${json3[i].codigo}">${json3[i].nome}</option>`
            }
        })
})

selectAno.addEventListener("change",function(){
    var selectAno = document.getElementById("selectAno")
    const valueSelectAno = selectAno.options[selectAno.selectedIndex].value;
    ano = valueSelectAno

    fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${modelo}/anos/${ano}`)
    .then(res => res.json())
    .then(json4 =>{
        console.log(json4)
        var div = document.getElementById("dale")
        var anoF = json4.AnoModelo
        var codigoF = json4.CodigoFipe
        var combustF = json4.Combustivel
        var MarcaF = json4.Marca
        var modeloF = json4.Modelo
        var Valorf = json4.Valor

        div.innerHTML=` 
        <h1>Marca:${MarcaF}</h1>
        <h3>Modelo:${modeloF}</h3>
        <h3>Ano:${anoF}</h3>
        <p>Código FIPE:${codigoF}</p>
        <p>Combustivel:${combustF}</p>
        <h3>Preço:${Valorf}</h3>
        
        `
    })

})