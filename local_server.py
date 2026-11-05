#!/usr/bin/env python3
"""Serve only the app and its bundled web fonts for local device testing."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys


ROOT = Path(__file__).resolve().parent
FONT_ROOT = (ROOT / "font" / "web").resolve()


class AppHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        request_path = unquote(urlsplit(self.path).path)
        if request_path in ("/", "/index.html"):
            target = ROOT / "index.html"
        elif request_path.startswith("/font/web/"):
            target = (ROOT / request_path.lstrip("/")).resolve()
            if not target.is_relative_to(FONT_ROOT) or target.suffix not in (".css", ".woff2"):
                self.send_error(404)
                return None
        else:
            self.send_error(404)
            return None
        if not target.is_file():
            self.send_error(404)
            return None
        self.path = "/" + target.relative_to(ROOT).as_posix()
        return super().send_head()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    ThreadingHTTPServer(("0.0.0.0", port), AppHandler).serve_forever()
