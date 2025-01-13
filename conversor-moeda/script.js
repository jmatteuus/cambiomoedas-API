async function obterTaxasDeCambio() {
    const resposta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL');
    const dados = await resposta.json();
    return {
        dolar: parseFloat(dados.USDBRL.bid),
        euro: parseFloat(dados.EURBRL.bid),
        libra: parseFloat(dados.GBPBRL.bid),
    };
}


const btn1 = document.querySelector('#btn1');
btn1.onclick = async function converterdereal(){
    const taxas = await obterTaxasDeCambio();
    let resultado = document.getElementById('resultado');
    let real = document.getElementById('real').value;
    let convertido = 0;

    if(isNaN(real) || real <= 0){
        alert('Coloque algum valor');
        return;
    }

    if(document.getElementById('dolar').checked){
        convertido = real / taxas.dolar;
        resultado.textContent = `R$${real} Reais em Dólar é US$${convertido.toFixed(2)}`;
    }
    if(document.getElementById('euro').checked){
        convertido = real / taxas.euro;
        resultado.textContent = `R$${real} Reais em Euro é €${convertido.toFixed(2)}`;
    }
    if(document.getElementById('libra').checked){
        convertido = real / taxas.libra;
        resultado.textContent = `R$${real} Reais em Libra é £${convertido.toFixed(2)}`;
    }
}


const btn2 = document.querySelector('#btn2');
btn2.onclick = async function converterparareal(){
    const taxas = await obterTaxasDeCambio();
    let moeda = document.getElementById('escolher').value;
    let valor = document.getElementById('moedas').value;
    let convertido = 0;
    let resultado2 = document.getElementById('resultado2');

    if(isNaN(valor) || valor <= 0){
        alert('Digite algum valor');
        return;
    }

    if(moeda == 'dolar'){
        convertido = valor * taxas.dolar;
        resultado2.textContent = `US$${valor} Dólar em Reais é R$${convertido.toFixed(2)}`;
    }
    
    if(moeda == 'euro'){
        convertido = valor * taxas.euro;
        resultado2.textContent = `€${valor} Euro em Reais é R$${convertido.toFixed(2)}`;
    }

    if(moeda == 'libra'){
        convertido = valor * taxas.libra;
        resultado2.textContent = `£${valor} Libra em Reais é R$${convertido.toFixed(2)}`;
    }
}