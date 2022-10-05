function postFieldDatatoOurServer (){
    var fdata = new FormData ();
    var request = new XMLHttpRequest ();
    var jresp;
    var inpField1 = document.getElementById ("inpField1");
    var outputDiv = document.querySelector(".output");
    var textbox = document.getElementById("inpField1").value;

    fdata.append ("field1", inpField1.value);

    request.open ("POST", "/python2" , false);
    request.send (fdata); 

    jresp = JSON.parse (request.responseText);

    outputDiv.innerHTML = '' // resets output div

    if(jresp[0] != "English"){
        alert("Please enter an English sentence.");
    } else if(textbox == ""){
        alert("Please enter text into the text box");
    } else {
        for(i = 4; i < jresp[1][0].length - 3; i++){ // starts from 4 and ends 3 before in order to ignore {} in array
            console.log(jresp[1][0][i][0]);
            switch(jresp[1][0][i][1]){
                case "ADJ":
                    outputDiv.innerHTML += `<p class="tagAdjective">${jresp[1][0][i][0]} - ${jresp[2][0][i][1]} - ${jresp[3][0][i][2]}</p>`
                    break;

                case "ADV":
                    outputDiv.innerHTML += `<p class="tagAdverb">${jresp[1][0][i][0]} - ${jresp[2][0][i][1]} - ${jresp[3][0][i][2]}</p>`
                    break;
                
                case "CONJ":
                    outputDiv.innerHTML += `<p class="tagConjunction">${jresp[1][0][i][0]} - ${jresp[2][0][i][1]} - ${jresp[3][0][i][2]}</p>`
                    break;

                case "DET":
                    outputDiv.innerHTML += `<p class="tagDeterminer">${jresp[1][0][i][0]} - ${jresp[2][0][i][1]} - ${jresp[3][0][i][2]}</p>`
                    break;

                case "NOUN":
                    outputDiv.innerHTML += `<p class="tagNoun">${jresp[1][0][i][0]} - ${jresp[2][0][i][1]} - ${jresp[3][0][i][2]}</p>`
                    break;

                case "NUM":
                    outputDiv.innerHTML += `<p class="tagNumber">${jresp[1][0][i][0]} - ${jresp[2][0][i][1]} - ${jresp[3][0][i][2]}</p>`
                    break;

                case "ADP":
                    outputDiv.innerHTML += `<p class="tagPreposition">${jresp[1][0][i][0]} - ${jresp[2][0][i][1]} - ${jresp[3][0][i][2]}</p>`
                    break;

                case "PRON":
                    outputDiv.innerHTML += `<p class="tagPronoun">${jresp[1][0][i][0]} - ${jresp[2][0][i][1]} - ${jresp[3][0][i][2]}</p>`
                    break;

                case "VERB":    
                    outputDiv.innerHTML += `<p class="tagVerb">${jresp[1][0][i][0]} - ${jresp[2][0][i][1]} - ${jresp[3][0][i][2]}</p>`
                    break;

                default:
                    console.log("Unregistered Tag");
            }
        }
    }

    console.log(jresp);
}