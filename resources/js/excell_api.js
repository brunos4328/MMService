    let CLIENT_ID = '953513774849-mlcjao2pltno8fvk94e112i540r2ggul.apps.googleusercontent.com'; // Seu Client ID
    let API_KEY = 'AIzaSyDaHSOEzqVbDVlHdNcCkx4eIVCR3Injpas'; // Sua API Key

    let DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    let SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";


        function handleClientLoad() {
            gapi.load('client:auth2', initClient);
        }

        function initClient() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            }).then(function () {
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            }, function (error) {
                console.log(JSON.stringify(error, null, 2));
            });
        }

        function listValues() {
            gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: '1hyHcIQX3mRpXb0BQRmeg7ALEwQtSSPjpH1CAr2D0rqU', // Substitua pelo ID da sua planilha no Google Sheets
                range: 'Sheet1!A1:I29', // Defina o intervalo que deseja ler
            }).then(function (response) {
                let range = response.result;
                if (range.values.length > 0) {
                    for (let i = 0; i < range.values.length; i++) {
                        let row = range.values[i];
                        console.log(row); // Aqui você pode manipular os dados do Google Sheets
                    }
                } else {
                    console.log('No data found.');
                }
            }, function (response) {
                console.log('Error: ' + response.result.error.message);
            });
        }