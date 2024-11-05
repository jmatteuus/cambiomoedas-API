function converterdereal(){
    let resultado = document.getElementById('resultado');
    let real = document.getElementById('real').value;
    let dolar = 5.79;
    let euro = 6.30;
    let libra = 7.50;
    let convertido = 0;

    if(isNaN(real) || real <= 0){
        alert('Coloque algum valor');
        return;
    }

    if(document.getElementById('dolar').checked){
        convertido = real / dolar;
        resultado.innerHTML = `R$${real} Reais em Dólar é US$${convertido.toFixed(2)}`;
    }
    if(document.getElementById('euro').checked){
        convertido = real / euro;
        resultado.innerHTML = `R$${real} Reais em Euro é €${convertido.toFixed(2)}`;
    }
    if(document.getElementById('libra').checked){
        convertido = real / libra;
        resultado.innerHTML = `R$${real} Reais em Libra é £${convertido.toFixed(2)}`;
    }
}

function converterparareal(){
    let moeda = document.getElementById('escolher').value;
    let valor = document.getElementById('moedas').value;
    let convertido = 0

    if(isNaN(valor) || valor <= 0){
        alert('Digite algum valor');
        return;
    }

    if(moeda == 'dolar'){
        convertido = valor * 5.79;
        resultado2.innerHTML = `US$${valor} Dólar em Reais é R$${convertido.toFixed(2)}`;
    }
    
    if(moeda == 'euro'){
        convertido = valor * 6.30;
        resultado2.innerHTML = `€${valor} Euro em Reais é R$${convertido.toFixed(2)}`;
    }

    if(moeda == 'libra'){
        convertido = valor * 7.50;
        resultado2.innerHTML = `£${valor} Libra em Reais é R$${convertido.toFixed(2)}`;
    }
}
