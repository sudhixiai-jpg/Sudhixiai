import logging
import uuid

from django.core.exceptions import PermissionDenied
from django.http import Http404
from rest_framework import exceptions as drf_exceptions
from rest_framework.response import Response
from rest_framework.views import exception_handler as drf_exception_handler

logger = logging.getLogger("sudhixai.api")


def api_exception_handler(exc, context):
    """
    Centralized DRF exception handler.

    Normalizes every error response to:
        {"success": false, "message": "...", "errors": {...}}
    Never leaks stack traces, DB errors, or internal infra details.
    """
    if isinstance(exc, Http404):
        exc = drf_exceptions.NotFound()
    elif isinstance(exc, PermissionDenied):
        exc = drf_exceptions.PermissionDenied()

    response = drf_exception_handler(exc, context)

    request = context.get("request")
    request_id = getattr(request, "request_id", None) if request else None

    if response is None:
        # Unhandled exception -> generic 500, full detail only in logs.
        logger.exception(
            "Unhandled exception (request_id=%s): %s", request_id, exc
        )
        return Response(
            {
                "success": False,
                "message": "An unexpected error occurred. Please try again later.",
                "errors": {},
                "request_id": request_id,
            },
            status=500,
        )

    if isinstance(exc.detail, dict):
        errors = exc.detail
        message = "One or more fields are invalid."
    elif isinstance(exc.detail, list):
        errors = {"non_field_errors": exc.detail}
        message = str(exc.detail[0]) if exc.detail else "Request failed."
    else:
        errors = {}
        message = str(exc.detail)

    response.data = {
        "success": False,
        "message": message,
        "errors": errors,
        "request_id": request_id,
    }
    return response
