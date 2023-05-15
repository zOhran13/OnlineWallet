import axios from 'axios';
const API_URL = "http://siprojekat.duckdns.org:5051";



export function getAllClaims(token) {
	return axios(API_URL + '/api/transactions/user/claims', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	});
}

export function acceptClaim(token, claim) {
	return axios(API_URL + '/api/User/allAdmin', {
		method: 'PATCH',
		data: claim,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	});
}

export function sloveClaim(token, claim) {
	return axios(API_URL + '/api/User/allAdmin', {
		method: 'PATCH',
		data: claim,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	});
}
export function addClaimMessage(token, request) {
	return axios(API_URL + '/api/transactions/claim/message', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	});
}

export function getSingleClaim(token, claimId) {
    return axios(API_URL + '/api/transactions/claim/' + claimId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
        },
    });
}

export function fileTransactionClaim(request, myToken) {
    return axios(API_URL + '/api/transactions/claim', {
      method: 'POST',
      data: request,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + myToken,
      },
    });
};

export function getDocumentById(token, docId) {
	return axios(API_URL + '/api/transactions/documents/' + docId, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	});
}