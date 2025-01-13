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


document.querySelector('#btn1').onclick = async function() {
    const taxas = await obterTaxasDeCambio();
    if(!taxas) return;

    let resultado = document.getElementById('resultado');
    let real = document.getElementById('real').value;
    let convertido = 0;

    if(!validarValor(real, 'Coloque um valor válido em reais!')) return;

    if (document.getElementById('dolar').checked) {
        convertido = real / taxas.dolar;
        resultado.textContent = `R$${real} Reais em Dólar é US$${convertido.toFixed(2)}`;
    }
    if (document.getElementById('euro').checked) {
        convertido = real / taxas.euro;
        resultado.textContent = `R$${real} Reais em Euro é €${convertido.toFixed(2)}`;
    }
    if (document.getElementById('libra').checked) {
        convertido = real / taxas.libra;
        resultado.textContent = `R$${real} Reais em Libra é £${convertido.toFixed(2)}`;
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