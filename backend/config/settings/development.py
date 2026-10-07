from .base import *  # noqa

DEBUG = True

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Local disk storage, permissive CORS limited to the local frontend only.
USE_S3_STORAGE = False

REST_FRAMEWORK["DEFAULT_PERMISSION_CLASSES"] = ["rest_framework.permissions.IsAuthenticatedOrReadOnly"]

# Convenient for local iteration; production.py hardens all of this.
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
ALLOWED_HOSTS = ["*"]

# Execute tasks synchronously in dev so no Redis daemon is needed
CELERY_TASK_ALWAYS_EAGER = True
CELERY_TASK_EAGER_PROPAGATES = True

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
    }
}