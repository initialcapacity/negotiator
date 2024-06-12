from urllib.parse import urlencode

from flask import Flask, request, Response, redirect, jsonify

app = Flask(__name__)


@app.get("/auth")
def auth():
    state = request.args['state']
    client_id = request.args['client_id']
    redirect_uri = request.args['redirect_uri']

    if client_id != 'some_client_id':
        return Response("Unauthorized", status=401)

    query_string = urlencode({'state': state, 'code': 'some_code'})

    return redirect(f'{redirect_uri}?{query_string}')


@app.post("/token")
def access_token():
    if (request.form['client_id'] != 'some_client_id'
            or request.form['client_secret'] != 'some_client_secret'
            or request.form['code'] != 'some_code'):
        return Response("Unauthorized", status=401)

    return jsonify({"access_token": "some_access_token"})


@app.get("/userinfo")
def userinfo():
    auth_header = request.headers["Authorization"]

    if auth_header != "Bearer some_access_token":
        return Response("Unauthorized", status=401)

    return jsonify({"email": "test_user@example.com"})


app.run(debug=True, host="0.0.0.0", port=8999)
