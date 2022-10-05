#!/ usr/bin/ python3
import cgi
import json
import nltk
from langdetect import detect


def getPostDataAsJson(environ):
    post_json = {}
    storage = cgi.FieldStorage(fp=environ['wsgi.input'], environ=environ, keep_blank_values=True)
    for k in storage.keys():
        post_json[k] = storage.getvalue(k)

    return post_json


def application(environ, start_response):
    form_params = getPostDataAsJson(environ)

    token = []
    words = []
    pos1 = []
    pos2 = []
    ner = []
    data = []

    if detect(str(form_params)) == 'en':
        data.append("English")

    token = nltk.tokenize.sent_tokenize(str(form_params))

    for i in token:
        words.append(nltk.word_tokenize(i))

    for i in words:
        pos1.append(nltk.pos_tag(i, tagset='universal'))
        pos2.append(nltk.pos_tag(i))

    data.append(pos1)
    data.append(pos2)

    for i in pos2:
        ner.append(nltk.chunk.tree2conlltags(nltk.ne_chunk(i)))

    data.append(ner)

    conttype = 'application/json'
    response_body = [bytes(json.dumps(data), encoding='utf-8')]

    content_length = sum([len(s) for s in response_body])

    status = '200 OK'
    response_headers = [('Content-Type', conttype), ('Content-Length', str(content_length))]

    start_response(status, response_headers)
    return response_body
