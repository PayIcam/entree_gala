<?php

session_start();

$mois = ["", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

header("Content-Type: text/xml");
echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>";

echo "<root>";

require('data/config.php');
require ('include/db_functions.php');

$connexion = connect_to_db();

$recherche = $_GET["recherche"];

$invite = determination_recherche($recherche, 0);

echo "<nb_result name='affichage de " . count($invite) . "/" . $_SESSION['count_recherche'] . " résultats' />";
echo "<nb_entrees name='" . nb_entrees() . "/" . nb_participants() . " entrées' />";

for ($i = 0; $i < count($invite); $i++) {
	echo "<row ";
    echo 'id="' . $invite[$i]["id"] . '" ';
    echo 'bracelet="' . $invite[$i]["bracelet_id"] . '" ';
    echo 'prenom="' . $invite[$i]["prenom"] . '" ';
    echo 'nom="' . $invite[$i]["nom"] . '" ';
    echo 'tickets_boisson="' . $invite[$i]["tickets_boisson"] . '" ';
    echo 'promo="' . $invite[$i]["promo"] . '" ';
    echo 'creneau="' . $invite[$i]["plage_horaire_entrees"] . '" ';

    echo 'nb_invites="' . nombre_invites($invite[$i]["id"]) . '" ';

    echo 'inscription="' . $invite[$i]["DAY(inscription)"] . " " . $mois[$invite[$i]["MONTH(inscription)"]] . '" ';
    echo 'est_arrive="' . has_arrived($invite[$i]["id"]) . '" ';



    if(is_icam($invite[$i]["id"])){
        $invites = get_guests($invite[$i]["id"]);
        echo "table_title='Liste de ses invités :' ";
        echo "invites='";
        for ($j = 0; $j < count($invites); $j++) {
            echo $invites[$j]["prenom"] . ":" . $invites[$j]["nom"] . ";";
        }
        echo "' ";
    }else{
        $invites = get_inviter($invite[$i]["id"]);
        echo "table_title='A été invité par :' ";
        if(count($invites)!=0){
            echo "invites='" . $invites[0]["prenom"] . ":" . $invites[0]["nom"] . ";' ";
        }else{
            echo "invites='inconnu:;' ";
        }
        
    }

    if (repas($invite[$i]["id"]) ==1 or buffet($invite[$i]["id"])==1) {
        if (repas($invite[$i]["id"]) ==1 and buffet($invite[$i]["id"]) ==1) {
        echo "repas='Dîner et conférence' ";
        } elseif (repas($invite[$i]["id"]) ==1 and !buffet($invite[$i]["id"]) ==1) {
        echo "repas='Dîner' ";
        } else {
        echo "repas='Conférence' ";
        }
    } else {
        echo "repas='Pas d`options' ";
    }

    echo "/>";
}

echo "</root>";
?>