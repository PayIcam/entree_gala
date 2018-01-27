function vider(){
    var element = document.getElementById("tableau");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
}

// Envoi de la requête AJAX
function chercher(recherche) {
    var xhr = getXMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            callback(xhr.responseXML);
        }
    };

    xhr.open("GET", "recherche.php?recherche=" + recherche, true);
    xhr.send(null);
}

// Fonction de callback AJAX
function callback(oData) {
    var tableau = document.getElementById("tableau");
    vider();
    var head = tableau.createTHead();
    var ligne = head.insertRow(0);  
    var colonne = ligne.insertCell(0);
    colonne.outerHTML = "<th>Bracelet</th>";
    var colonne = ligne.insertCell(1);
    colonne.outerHTML = "<th>Prénom</th>";
    var colonne = ligne.insertCell(2);
    colonne.outerHTML = "<th>Nom</th>";
    var colonne = ligne.insertCell(3);
    colonne.outerHTML = "<th>Tickets Boisson</th>";
    var colonne = ligne.insertCell(4);
    colonne.outerHTML = "<th>Promo</th>";
    var colonne = ligne.insertCell(5);
    colonne.outerHTML = "<th>Créneau</th>";
    var colonne = ligne.insertCell(6);
    colonne.outerHTML = "<th>Nb Invités</th>";
    var colonne = ligne.insertCell(7);
    colonne.outerHTML = "<th>Inscription</th>";
    var colonne = ligne.insertCell(8);
    colonne.outerHTML = "<th>Infos</th>";
    var colonne = ligne.insertCell(9);
    colonne.outerHTML = "<th>Est entré</th>";


    var rows = oData.getElementsByTagName("row");
    var i;
    for(i = rows.length - 1; i >= 0; i--) {
        var ligne = tableau.insertRow(-1);
        var colonne = ligne.insertCell(0);

        var id_bracelet = add_zeros(rows[i].getAttribute('bracelet'));
        if(rows[i].getAttribute('bracelet') == 0){
            colonne.innerHTML = "<span class='badge badge-warning'>" + id_bracelet + "</span>";
        }else if(rows[i].getAttribute('bracelet') <= 1050){
            colonne.innerHTML = "<span class='badge badge-primary'>" + id_bracelet + "</span>";
        }else if(rows[i].getAttribute('bracelet') <= 1900){
            colonne.innerHTML = "<span class='badge badge-success'>" + id_bracelet + "</span>";
        }else if(rows[i].getAttribute('bracelet') <= 2850){
            colonne.innerHTML = "<span class='badge badge-danger'>" + id_bracelet + "</span>";
        }else{
            colonne.innerHTML = "<span class='badge badge-warning'>" + id_bracelet + "</span>";
        }

        var colonne = ligne.insertCell(1);
        colonne.innerHTML = rows[i].getAttribute('prenom');
        var colonne = ligne.insertCell(2);
        colonne.innerHTML = rows[i].getAttribute('nom');
        var colonne = ligne.insertCell(3);
        if(rows[i].getAttribute('tickets_boisson') == 0){
            colonne.innerHTML = "<span class='badge badge-danger'>" + rows[i].getAttribute('tickets_boisson') + "</span>";
        }else if(rows[i].getAttribute('tickets_boisson') == 10){
            colonne.innerHTML = "<span class='badge badge-success'>" + rows[i].getAttribute('tickets_boisson') + "</span>";
        }else if(rows[i].getAttribute('tickets_boisson') == 20){
            colonne.innerHTML = "<span class='badge badge-warning'>" + rows[i].getAttribute('tickets_boisson') + "</span>";
        }else if(rows[i].getAttribute('tickets_boisson') == 30){
            colonne.innerHTML = "<span class='badge badge-info'>" + rows[i].getAttribute('tickets_boisson') + "</span>";
        }else if(rows[i].getAttribute('tickets_boisson') == 40){
            colonne.innerHTML = "<span class='badge badge-default'>" + rows[i].getAttribute('tickets_boisson') + "</span>";
        }else{
            colonne.innerHTML = "<span class='badge badge-primary'>" + rows[i].getAttribute('tickets_boisson') + "</span>";
        }
        var colonne = ligne.insertCell(4);
        colonne.innerHTML = rows[i].getAttribute('promo');
        var colonne = ligne.insertCell(5);

        switch (rows[i].getAttribute('creneau'))
        {
            case '21h-21h45':
                colonne.innerHTML = "<span class='badge badge-primary'>21h-21h35 </span>";
                break;
            case '21h45-22h30':
                colonne.innerHTML = "<span class='badge badge-danger'>21h50-22h25 </span>";
                break;
            case '22h30-23h':
                colonne.innerHTML = "<span class='badge badge-success'>22h40-23h10 </span>";
                break;
        }
        

        var colonne = ligne.insertCell(6);
        colonne.innerHTML = rows[i].getAttribute('nb_invites');
        var colonne = ligne.insertCell(7);
        colonne.innerHTML = rows[i].getAttribute('inscription');
        var colonne = ligne.insertCell(8);
        var modal = `
    <button role="button" href="#infoModal` + i + `"   id="infoBtn"   data-toggle="modal" class="btn btn-sm btn-info">ℹ</button>

    <div class="modal fade" id="infoModal` + i + `">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                      <h1 class="text-center">` + rows[i].getAttribute('prenom') + " " + rows[i].getAttribute('nom') + `</h1></br>
                      <p>` + rows[i].getAttribute('table_title') + `</p>
                      <table class="table table-striped" id="tblGrid">
                        <thead id="tblHead">
                          <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                          </tr>
                        </thead>
                        <tbody>`;

        for(j = (rows[i].getAttribute('invites').split(";").length - 1); j > 0; j--){
            modal += `
                <tr><td>` + rows[i].getAttribute('invites').split(";")[j - 1].split(":")[1] + `</td>
                <td>` + rows[i].getAttribute('invites').split(";")[j - 1].split(":")[0] + `</td>
                </tr>`;
        }

        modal += `
                        </tbody>
                      </table>
                      <p>` + rows[i].getAttribute('repas') + `</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary " data-dismiss="modal">Fermer</button>
                    </div>
                        
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->`;

        colonne.innerHTML = modal;
    
        var colonne = ligne.insertCell(9);

        if(rows[i].getAttribute('est_arrive') == 0){
            colonne.innerHTML = `<button role="button" class="btn btn-sm btn-danger" onclick="entree(` + rows[i].getAttribute('id') + `, 1);">✘</button>`;
        }else{
            colonne.innerHTML = `<button role="button" class="btn btn-sm btn-success" onclick="entree(` + rows[i].getAttribute('id') + `, 0);">✔</button>`;
        }
        

    }

    document.getElementById("nb_invites").innerHTML = oData.getElementsByTagName("nb_result")[0].getAttribute('name');
    document.getElementById("nb_entrees").innerHTML = oData.getElementsByTagName("nb_entrees")[0].getAttribute('name');
}

// Envoi de la requête AJAX
function entree(id, arrived) {
    var xhr = getXMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            chercher(document.getElementById("recherche").value);
        }
    };
    requete = "entree.php?id=" + id + "&arrived=" + arrived;
    xhr.open("GET", requete, true);
    xhr.send(null);
}

function add_zeros(number){
    if(number == 0){
        return "0000";
    }else if(number < 10){
        return "000" + number;
    }else if(number < 100){
        return "00" + number;
    }else if(number < 1000){
        return "0" + number;
    }else{
        return "" + number;
    }
}

chercher(document.getElementById("recherche").value);