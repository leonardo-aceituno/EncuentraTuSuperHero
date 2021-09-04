$(document).ready(function () {

    $('form').submit((event) => {
        event.preventDefault();
        limpiar()
        let num = $('#input__buscar').val()
        let resultadoValidacion = validar(num)
        if (resultadoValidacion == true) {
            buscaHeroe(num);

        }
    })

    let limpiar = () => {
        $('#alerta').text("")
    }

    let validar = (num) => {
        let validar = true;
        let validacionNum = /[1-9]/gim;;
        if (validacionNum.test(num) == false) {
            $('#alerta').text("* Este campo solo permite numeros mayores que cero");
            validar = false;
        }
        return validar
    }

    let buscaHeroe = (num) => {
        $.ajax({
            type: 'GET',
            url: "https://www.superheroapi.com/api.php/10223601774605467/" + num,
            dataType: 'json',
            success: function (data) {
                // console.log(data.name);
                // console.log(data);
                pintar(data)
            }
        })
    }

    let pintar = data => {
        $('#section__container').removeClass('d-none')
        $('#image').attr("src",data.image.url);
        $('#name').text(`Nombre: ${data.name}`)             
        $('#connections').text(`Connexiones: ${data.connections["group-affiliation"]}`)
        $('#publisher').text(`Publicado por: ${data.biography.publisher}`)
        $('#occupation').text(`Ocupación: ${data.work.occupation}`)
        $('#first-appearance').text(`Primera Aparición: ${data.biography.publisher}`)
        $('#height').text(`Altura: ${data.appearance.height}`)
        $('#weight').text(`Peso: ${data.appearance.weight}`)
        $('#aliases').text(`Alianzas: ${data.biography.aliases}`)
        canvas(data.name,data.powerstats)
             
    }


    let canvas = (nombre,data) => {
        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: `Estadisticas de poder para ${nombre}`
            },
            data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - ({y}) ",
                dataPoints: [
                    { y: data.combat, label: "combat" },
                    { y: data.durability, label: "durability" },
                    { y: data.intelligence, label: "intelligence" },
                    { y: data.power, label: "power" },
                    { y: data.speed, label: "speed" },
                    { y: data.strength, label: "strength" }
                   
                ]
            }]
        });
        chart.render();
        
    }















    // fin document ready
})



