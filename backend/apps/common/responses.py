from rest_framework.response import Response


def success(message="", data=None, status=200):
    payload = {"success": True, "message": message}
    if data is not None:
        payload["data"] = data
    return Response(payload, status=status)


def failure(message="", errors=None, status=400):
    return Response(
        {"success": False, "message": message, "errors": errors or {}},
        status=status,
    )
