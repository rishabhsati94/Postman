console.log('this is test');

// Utility function to get DOM element from string

function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
// Chose Request type
let get = document.getElementById('get');
get.addEventListener('click', () => {
    document.getElementById('content').style.display = 'none';
    document.getElementById('parameterBox').style.display = 'none';

})

let post = document.getElementById('post');
post.addEventListener('click', () => {
    document.getElementById('content').style.display = 'block';

})



// No of Parameters
let addedParamsCount = 0;
let box = 0;

// Hide the Parameter Box
let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = 'none';

// Hide the Json Box
let requestJsonBox = document.getElementById('requestJsonBox');
requestJsonBox.style.display = 'none';

// Show the Json Box click & Hide the Parameter Box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parameterBox').style.display = 'none';
})

// Hide the Json Box click & Show the Parameter Box
let customRadio = document.getElementById('customRadio');
customRadio.addEventListener('click', () => {
    document.getElementById('parameterBox').style.display = 'block';
    document.getElementById('requestJsonBox').style.display = 'none';
});

// Add another Parameters click on Button
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `
                <div class="row my-3 " id='box${box + 0}'>
                    <label for="Parameter" class="col-sm-2 col-form-label"></label>
                    <div class="col">
                        <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter Key">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}" placeholder="Enter Parameter Value">
                    </div>
                    <div class="col">
                        <button class="btn btn-primary deleteParam">-</button>
                    </div>   
                </div>`;

    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // Delete the Parameters
    let deleteParam = document.getElementsByClassName('deleteParam');
    console.log(deleteParam);
    let del;
    for (let item of deleteParam) {
        del = item;
        // console.log(del);
    }
    del.addEventListener('click', (e) => {
        let conf = confirm("Press a button!");
        if (conf == true) {
            e.target.parentElement.parentElement.remove();
            // console.log(item);
        }
    })
    box++;
    addedParamsCount++;
});

// Submit Button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {

    document.getElementById('response').value = "Please wait ... Fetching response";
    let url = document.getElementById('url').value;
    let requsetType = document.querySelector("input[name='requestType']:checked").value;
    // let contentType = document.querySelector("input[name='contentType']:checked").value;
    // if (contentType == 'CUSTOM') {
    //     data = {};
    //     for (let i = 0; i < addedParamsCount + 1; i++) {
    //         if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
    //             let key = document.getElementById('parameterKey' + (i + 1)).value;
    //             let value = document.getElementById('parameterValue' + (i + 1)).value;
    //             data[key] = value;
    //         }
    //     }
    //     data = JSON.stringify(data);
    // }

    // else {
    //     data = document.getElementById('requestJsonText').value;
    // }

    if (requsetType == 'GET') {

        fetch(url, { method: "GET" })
            .then(
                (response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }

                    response.text().then((text) => {
                        
                        document.getElementById('response').value = text;
                    });
                }
            )
            .catch((err) => {
                console.log('Fetch Error :-S', err);
            });
    }

    else if (requsetType == 'POST') {
        let contentType = document.querySelector("input[name='contentType']:checked").value;
        if (contentType == 'CUSTOM') {
            data = {};
            for (let i = 0; i < addedParamsCount + 1; i++) {
                if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                    let key = document.getElementById('parameterKey' + (i + 1)).value;
                    let value = document.getElementById('parameterValue' + (i + 1)).value;
                    data[key] = value;
                }
            }
            data = JSON.stringify(data);
        }

        else {
            data = document.getElementById('requestJsonText').value;
        }


        fetch(url, {
            method: "POST",
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(
                (response) => {

                    response.text().then((text) => {
                        
                        document.getElementById('response').value = text;
                    });
                }
            )
            .catch((err) => {
                console.log('Fetch Error :-S', err);
            });
    }
})