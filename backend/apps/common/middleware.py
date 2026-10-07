import uuid

REQUEST_ID_HEADER = "X-Request-ID"


class RequestIDMiddleware:
    """Attaches a unique request_id to every request and echoes it in the response."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        incoming = request.headers.get(REQUEST_ID_HEADER)
        request.request_id = incoming or uuid.uuid4().hex
        response = self.get_response(request)
        response[REQUEST_ID_HEADER] = request.request_id
        return response
