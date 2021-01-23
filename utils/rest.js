/*
  These rest utilities are used to REST other server.
*/
function status(response) {
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then(function (err) {
      err.status = response.status;
      throw err;
    });
  }
}

function jsonStatus(response) {
  if (response.ok) {
    return response.text();
  } else {
    return response.text().then(function (err) {
      err.status = response.status;
      throw err;
    });
  }
}

function commonRest(promise, res) {
  return promise.then(status)
    .then(json => {
      return res ? res.status(200).json(json) : json;
    })
    .catch(error => {  
      if(!error.status || error.status != 403)
        console.log(`Request REST failed ${JSON.stringify(error, null, 2)}`);
      if (res) {
        let apiError = error.errors || { message: 'internal error' };
        res.status(error.status || 500).json({ 'error': apiError.message, 'sysMsgKey': error.sysMsgKey })
      } else {
        throw error;
      }
    });
}

function callAPIGet(url, res) {
  console.log(`API [GET] : ${url}`);
  const promise = fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
  return commonRest(promise, res);
}

function callAPIPost(url, body, res) {
  console.log(`API [POST] : ${url}`);
  console.log(`API [POST] body: ${JSON.stringify(body)}`);

  const promise = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: typeof body === 'object' ? JSON.stringify(body) : body
  });

  return commonRest(promise, res);
}

function callAPIPut(url, body, res) {
  console.log(`API [Put] : ${url}`);
  console.log(`API [Put] body: ${JSON.stringify(body)}`);

  const promise = fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: typeof body === 'object' ? JSON.stringify(body) : body
  });

  return commonRest(promise, res);
}

function callAPIDelete(url, res) {
  console.log(`API [DELETE] : ${url}`);

  const promise = fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  });

  return commonRest(promise, res);
}

function callJSGet(url, res) {
    return test = fetch(url, { method: 'GET' })
      .then(jsonStatus)
      .then(text => {
        let cleanArea = text.replace(/^[\s\uFEFF\xa0\u3000]+|[\uFEFF\xa0\u3000\s]+$/g, ""); // 過濾 BOM
        cleanArea = JSON.parse(cleanArea);
  
        return res ? res.status(200).json(cleanArea) : cleanArea;
      })
      .catch(error => {
        logger.error(`Request REST failed ${JSON.stringify(error, null, 2)}`);
  
        let apiError = error.errors || { message: 'internal error' };
        res.status(error.status || 500).json({ 'error': apiError.message, 'sysMsgKey': error.sysMsgKey });
      });
  }

module.exports = {
  callAPIGet, callJSGet, callAPIPost, callAPIPut, callAPIDelete,
};