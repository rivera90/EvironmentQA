$(function () {
    'use strict'
    $("img").on("click", function () {
        console.log($(this).index());

        if ($(this).index() == 1) {
            console.log($(this).closest("tr")[0].childNodes[1].innerHTML);
            var json = new Object();
            json.id = $(this).closest("tr")[0].childNodes[1].innerHTML
            json.validar = 2;
            var strURLPath = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1] + "/archivos/Delete"

            $.ajax({
                url: strURLPath,
                data: json,
                method: "post"
            }).done(function () {
                console.log("exito");
                location.reload();
            }).fail(function () {
                console.log("error")
            });
        }
    })

    $("#NomBusqueda").on("keyup", function (event) {
        //$("tbody").each(function () {
        //    console.log($(this).find("search"))
        //})
        var busqueda = $(this).val().trim().toLowerCase();
        var conteiner = document.querySelectorAll(".show");
        $.each(conteiner,function (i,element) {
            
            var archivo = $(this).text().trim().toLowerCase();
            
            var compare = archivo.indexOf(busqueda) !== -1
            console.log(compare)
            if (compare) {
                $(this).parent().show();
            } else {
                console.log($(this).parent());
                $(this).parent().hide();
            }
        })
    })

   
    $("#BuscarIsr").click(function () {

        var renglones = document.querySelectorAll("table .Datos");
        console.log(renglones)
        var grid = document.getElementsByTagName("table");
        for (var i=0; i < renglones.length; i++) {
            renglones[i].remove();
        }

        var json = new Object();
        json.ISR = $("#isrBusqueda").val();
        json.validador = 4;

        var isr = document.getElementById("isrBusqueda").value;
        var strURLPath = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1] + '/archivos/BuscarUNISR?ISR=' + isr + '&validador=4';
        
        var tabla = document.getElementById('tablaPrueba');
        var renglones = tabla.rows.length;
        for (var i = 1; i < renglones; i++) {

            tabla.deleteRow(1);
        }

        fetch(strURLPath, {
            method: 'GET', // or 'PUT'
            //body: json, // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log('Success:', response)
                generarTabla(response)                                                                                       

            });
    })

    $("td").on("click", function () {
        console.log($(this).index())
        if ($(this).index() == 7) {
            console.log($(this)[0])
            var texto = $(this)[0].innerText;
            var json = new Object();
            json.ruta = texto;
            var strURLPath = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1] + '/AbrirFileServer';

            $.ajax({
                url: strURLPath,
                crossDomain: true,
                data: json,
                method: "post"
            }).done(function () {
                console.log("exito");

                location.reload();
            }).fail(function () {
                console.log("error")
            });
            //var range = document.createRange();
            //range.selectNode(texto);
            //window.getSelection().addRange(range);

            try {
                // intentar copiar el contenido seleccionado
                //var resultado = document.execCommand('copy');
                console.log(resultado ? 'Ruta copiado' : 'No se pudo copiar la Ruta');
            } catch (err) {
                console.log('ERROR al intentar copiar la Ruta');
            }

            // eliminar el texto seleccionado
            //window.getSelection().removeAllRanges();

        }
    })
    
    var butoncerrar = document.getElementById("CerrarISR"); 
    if (butoncerrar) {

    
        butoncerrar.addEventListener('click', function () {

            var json = new Object();
            json.ISR = document.getElementById("isrBusqueda").value;
            json.validador = 3;
            var res = confirm("Desea Cerrar el ISR?");
            var strURLPath = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1] + '/archivos/CerrarISR';
            var url = strURLPath;
            if (res == true) {

                fetch(strURLPath, {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(json), // data can be `string` or {object}!
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                    .catch(error => { console.log('Error:', error) })
                    .then(response => {
                        console.log('Success:', response)
                        location.reload();
                    });
            }


        }, false);
    }
    

    function generarTabla(response) {
        var z = document.getElementsByTagName("tbody")[0];
        var itemDesarrollador = "";
        for (var i = 0; i < response.length; i++) {

            
            if (itemDesarrollador == "" || response[i].Desarrollador != itemDesarrollador) {
                itemDesarrollador = response[i].Desarrollador;

                var node = document.createElement("tr");
                node.setAttribute("class", "collapsible");
                var td = document.createElement("td");
                td.setAttribute("colspan","8")
                var texto = document.createTextNode(response[i].Desarrollador);
                td.appendChild(texto);
                node.appendChild(td);
                z.appendChild(node);
            }

            var node = document.createElement("tr");
            node.setAttribute("class", "Datos");
            node.setAttribute("dato-responsable", response[i].Desarrollador);
            var td = document.createElement("td");
            var texto = document.createTextNode(response[i].IdArchivo);
            td.appendChild(texto);
            node.appendChild(td);

            var td = document.createElement("td");
            td.setAttribute("class", "show");
            var texto = document.createTextNode(response[i].NomArchivo);
            td.appendChild(texto);
            node.appendChild(td);

            var td = document.createElement("td");
            var texto = document.createTextNode(response[i].RutaArchivo);
            td.appendChild(texto);
            node.appendChild(td);

            var td = document.createElement("td");
            var texto = document.createTextNode(response[i].ISR);
            td.appendChild(texto);
            node.appendChild(td);

            var td = document.createElement("td");
            var texto = document.createTextNode(response[i].NomISR);
            td.appendChild(texto);
            node.appendChild(td);

            var td = document.createElement("td");
            var texto = document.createTextNode(response[i].Ambiente);
            td.appendChild(texto);
            node.appendChild(td);

            var td = document.createElement("td");
            var texto = document.createTextNode(response[i].FechaModificacion);
            td.appendChild(texto);
            node.appendChild(td);

            var td = document.createElement("td");
            var texto = document.createTextNode(response[i].RutaFileServer);
            td.appendChild(texto);
            node.appendChild(td);

            var td = document.createElement("td");
            td.setAttribute("id", response[i].IdArchivo)
            var img = document.createElement("img");
            img.setAttribute("class", "deleteIMG");
            img.setAttribute("src", "/fonts/open-iconic-master/svg/circle-x.svg");
            img.setAttribute("alt", "icon name");
            td.appendChild(img);
            node.appendChild(td);

            z.appendChild(node);
        }       
    }

    function BuscarIsr() {
       
    }

    $("#btnExcel").click(function () {
        var json = new Object();
        json.fechaInicial = document.getElementById("fechaInicial").value;
        json.fechaFinal = document.getElementById("fechaFinal").value;
        var strURLPath = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1] + '/archivos/ExcelNew';
        $.ajax({
            url: strURLPath,
            crossDomain: true,
            data: json,
            method: "post"
        }).done(function () {
            console.log("exito");

            location.reload();
        }).fail(function () {
            console.log("error")
        });
    })

    $("#btnSemana").click(function () {
        var json = new Object();
        json.fechaInicial = document.getElementById("fechaInicial").value;
        json.fechaFinal = document.getElementById("fechaFinal").value;

        var strURLPath = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1] + '/archivos/SemanaISRs';

        var tabla = document.getElementById('tablasemana');
        var renglones = tabla.rows.length;
        for (var i = 1; i < renglones; i++) {
            console.log(i)
            tabla.deleteRow(1);
        }

        $.ajax({
            url: strURLPath ,
            crossDomain: true,
            data: json,
            method: "post"
        }).done(function (response) {
            console.log("exito");
            var tabla = document.getElementById("tablasemana");

            console.log(JSON.parse(response)); 
            var objson = JSON.parse(response);
            for (var i = 0; i < objson.length; i++) {
                var nodetr = document.createElement("tr");
                var nodetd = document.createElement("td");
                var texto = document.createTextNode(objson[i].ISR);
                nodetd.appendChild(texto);
                nodetr.appendChild(nodetd);

                var nodetd = document.createElement("td");
                var texto = document.createTextNode(objson[i].nombreResponsable);
                nodetd.appendChild(texto);
                nodetr.appendChild(nodetd);

                var nodetd = document.createElement("td");
                var texto = document.createTextNode(objson[i].NomISR);
                nodetd.appendChild(texto);
                nodetr.appendChild(nodetd);

                var nodetd = document.createElement("td");
                var texto = document.createTextNode(objson[i].FechaCierre);
                nodetd.appendChild(texto);
                nodetr.appendChild(nodetd);

                tabla.appendChild(nodetr);
            }
            
        }).fail(function () {
            console.log("error")
        });

    });
    var modal = document.getElementById("myModal");

    var btn = document.getElementById("myBtn");
    if (btn) {
        // When the user clicks the button, open the modal 
        btn.onclick = function () {
            modal.style.display = "block";
        }
    }

    var span = document.getElementsByClassName("close")[0];
    if (span) {
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            var tabla = document.getElementById('tablasemana');
            var renglones = tabla.rows.length;
            for (var i = 1; i < renglones; i++) {
                
                tabla.deleteRow(1);
            }
            modal.style.display = "none";
        }
    }        

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function () {
            this.classList.toggle("active");
            var renglones = document.querySelectorAll("[dato-responsable='" + this.innerText +"']");
            for (var x = 0; x < renglones.length; x++) {
                
                if (renglones[x].style.display === 'visible' || renglones[x].style.display === '') {
                    renglones[x].style.display = "none";
                    
                } else {
                    renglones[x].style.display = null;
                    
                }
            }                       
           
        });
    }

    $('#btnPasarEnvironment').click(function () {
        var json = new Object();
        json.ISR = parseInt(document.getElementById('ISR').value);
        json.validador = 4;
        var strURLPath = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1] + '/PasarAmbiente';
        console.log(json)
        $.ajax({
            url: strURLPath,
            crossDomain: true,
            data: json,
            method: "post"
        }).done(function () {
            console.log("exito");
  
        }).fail(function () {
            console.log("error")
        });
    })
});