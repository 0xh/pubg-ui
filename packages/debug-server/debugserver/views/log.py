from __future__ import print_function

import json

import tornado.escape
# import tornado.gen
# import tornado.httpclient
# import tornado.httpserver
# import tornado.ioloop
# import tornado.netutil
# import tornado.process
# import tornado.simple_httpclient
# import tornado.web
from pygments import highlight, lexers, formatters

from debugserver.views.common import CommonRequestHandler


class LogHandler(CommonRequestHandler):
    def __init__(self, *args, **kwargs):
        self.json_args = None
        super(LogHandler, self).__init__(*args, **kwargs)

    def prepare(self):
        content_type = self.request.headers.get("Content-Type")
        if content_type and content_type.startswith("application/json"):
            self.json_args = tornado.escape.json_decode(self.request.body)

    def post(self):
        if not self.json_args:
            self.set_status(400)
            return

        pretty_print = json.dumps(self.json_args, indent=4, sort_keys=True)
        print(highlight(
            tornado.escape.utf8(pretty_print),
            lexers.JsonLexer(),
            formatters.TerminalFormatter(),
        ))
