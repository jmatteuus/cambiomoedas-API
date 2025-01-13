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


function validarValor(moeda, mensagem) {
    if (isNaN(moeda) || moeda <= 0) {
        alert(mensagem);
        return false;
    }
    return true;
};

function calculo(valor, taxa) {
    const convertido = valor / taxa;
    return (valor / taxa).toFixed(2);
}


document.querySelector('#btn1').onclick = async function () {
    const taxas = await obterTaxasDeCambio();
    if (!taxas) return;

    let resultado = document.getElementById('resultado');
    let real = parseFloat(document.getElementById('real').value);

    if (!validarValor(real, 'Coloque um valor válido em reais!')) return;

    if (document.getElementById('dolar').checked) {
        resultado.textContent = `R$${real} Reais em Dolar é $${calculo(real, taxas.dolar)}`
    } else if (document.getElementById('euro').checked) {
        resultado.textContent = `R$${real} Reais em Euro é €${calculo(real, taxas.euro)}`
    } else if (document.getElementById('libra').checked) {
        resultado.textContent = `R$${real} Reais em Libra é £${calculo(real, taxas.libra)}`
    }
}


document.querySelector('#btn2').onclick = async function () {
    const taxas = await obterTaxasDeCambio();
    if (!taxas) return;

    let moeda = document.getElementById('escolher').value;
    let valor = parseFloat(document.getElementById('moedas').value);
    let resultado2 = document.getElementById('resultado2');

    if (!validarValor(valor, 'Coloque um valor válido da sua moeda escolhida')) return;

    switch (moeda) {
        case 'dolar':
            resultado2.textContent = `$${valor} Dolar em Reais é R$${calculo(valor, taxas.dolar)}`
            break;
        case 'euro':
            resultado2.textContent = `€${valor} Euro em Reais é R$${calculo(valor, taxas.euro)}`
            break;
        case 'libra':
            resultado2.textContent = `£${valor} Libra em Reais é R${calculo(valor, taxas.libra)}`;

            break;
        default:
            alert('Selecione uma moeda válida!');
    }
}