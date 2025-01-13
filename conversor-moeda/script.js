async function obterTaxasDeCambio() {
    try {
        const resposta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL');
        const dados = await resposta.json();
        return {
            dolar: parseFloat(dados.USDBRL.bid),
            euro: parseFloat(dados.EURBRL.bid),
            libra: parseFloat(dados.GBPBRL.bid),
        };
    } catch (error) {
        alert('Não foi possível obter as taxas de câmbio, Tente novamente mais tarde.')
        console.error(error);
    }
}


function validarValor(moeda, mensagem){
    if (isNaN(moeda) || moeda <= 0) {
        alert(mensagem);
        return;
    }
};

function calculo(valor, taxa){
    const convertido = valor / taxa;
    return `${convertido.toFixed(2)}`;
}


document.querySelector('#btn1').onclick = async function() {
    const taxas = await obterTaxasDeCambio();
    if(!taxas) return;

    let resultado = document.getElementById('resultado');
    let real = document.getElementById('real').value;

    if(!validarValor(real, 'Coloque um valor válido em reais!')) return;

    if (document.getElementById('dolar').checked) {
        resultado.textContent = `R$${real} em dolar é ${calculo(real, taxas.dolar)}`
    }else if (document.getElementById('euro').checked) {
        resultado.textContent = `R$${real} em euro é ${calculo(real, taxas.euro)}`
    }else if (document.getElementById('libra').checked) {
        resultado.textContent = `R$${real} em libra é ${calculo(real, taxas.libra)}`
    }
}


document.querySelector('#btn2').onclick = async function() {
    const taxas = await obterTaxasDeCambio();
    if(!taxas) return;

    let moeda = document.getElementById('escolher').value;
    let valor = document.getElementById('moedas').value;
    let convertido = 0;
    let resultado2 = document.getElementById('resultado2');

    if(!validarValor(moeda, 'Coloque um valor válido da sua moeda escolhida')) return;

    if (moeda == 'dolar') {
        convertido = valor * taxas.dolar;
        resultado2.textContent = `US$${valor} Dólar em Reais é R$${convertido.toFixed(2)}`;
    }

    if (moeda == 'euro') {
        convertido = valor * taxas.euro;
        resultado2.textContent = `€${valor} Euro em Reais é R$${convertido.toFixed(2)}`;
    }

    if (moeda == 'libra') {
        convertido = valor * taxas.libra;
        resultado2.textContent = `£${valor} Libra em Reais é R$${convertido.toFixed(2)}`;
    }
}