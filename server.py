from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
from scripts.contact_handler import save_contact_data

class ContactFormHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/submit-contact':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            form_data = json.loads(post_data.decode('utf-8'))
            
            # Save contact data
            save_contact_data(
                form_data['name'],
                form_data['email'],
                form_data['subject'],
                form_data['message']
            )
            
            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'success'}).encode())
        else:
            self.send_error(404)
    
    def do_GET(self):
        # Handle normal file serving
        SimpleHTTPRequestHandler.do_GET(self)

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, ContactFormHandler)
    print('Server running on port 8000...')
    httpd.serve_forever()
