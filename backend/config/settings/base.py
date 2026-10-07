"""
Base settings shared by development and production. Anything environment-
specific lives in development.py / production.py, never here.
"""

import os
from datetime import timedelta
from pathlib import Path

import environ

BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = environ.Env(
    DJANGO_DEBUG=(bool, False),
)
environ.Env.read_env(BASE_DIR / ".env")

SECRET_KEY = env("DJANGO_SECRET_KEY", default="unsafe-development-key-change-me")
DEBUG = env.bool("DJANGO_DEBUG", default=False)
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=["localhost", "127.0.0.1"])

DJANGO_APPS = [
    # Unfold must come BEFORE django.contrib.admin
    "unfold",
    "unfold.contrib.filters",
    "unfold.contrib.forms",
    "unfold.contrib.inlines",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

THIRD_PARTY_APPS = [
    "rest_framework",
    "django_filters",
    "corsheaders",
    "drf_spectacular",
]

# NOTE: apps are referenced by python path; each app's AppConfig.label
# controls the short name used in migrations/relations (see apps/*/apps.py).
LOCAL_APPS = [
    "apps.common",
    "apps.file_storage",
    "apps.accounts",
    "apps.company",
    "apps.services",
    "apps.products",
    "apps.insights",
    "apps.industries",
    "apps.technology",
    "apps.careers",
    "apps.contact",
    "apps.newsletter",
    "apps.organizations",
    "apps.ai",
    "apps.automation",
    "apps.notifications",
    "apps.audit",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# ---------------------------------------------------------------------------
# UNFOLD — Custom Admin Theme
# ---------------------------------------------------------------------------
from django.urls import reverse_lazy  # noqa: E402

UNFOLD = {
    "SITE_TITLE": "SUDHIXAI Admin",
    "SITE_HEADER": "SUDHIXAI",
    "SITE_SUBHEADER": "Operations Console",
    "SITE_URL": "/",
    "SITE_ICON": None,
    "SITE_SYMBOL": "bolt",        # Material Symbols icon name
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": True,
    "SHOW_BACK_BUTTON": True,
    "ENVIRONMENT": "apps.common.admin_helpers.environment_callback",
    "DASHBOARD_CALLBACK": "apps.common.admin_helpers.dashboard_callback",
    "COLORS": {
        "font": {
            "subtle-light": "107 114 128",
            "subtle-dark": "156 163 175",
            "default-light": "17 24 39",
            "default-dark": "243 244 246",
            "important-light": "0 0 0",
            "important-dark": "255 255 255",
        },
        "primary": {
            "50":  "240 253 255",
            "100": "207 250 254",
            "200": "165 243 252",
            "300": "103 232 249",
            "400": "34  211 238",
            "500": "6   182 212",
            "600": "8   145 178",
            "700": "14  116 144",
            "800": "21  94  117",
            "900": "22  78  99",
            "950": "8   51  68",
        },
    },
    "EXTENSIONS": {
        "modeltranslation": {
            "flags": {},
        },
    },
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": False,
        "navigation": [
            {
                "title": "Dashboard",
                "separator": False,
                "collapsible": False,
                "items": [
                    {
                        "title": "Overview",
                        "icon": "dashboard",
                        "link": reverse_lazy("admin:index"),
                        "permission": lambda request: request.user.is_staff,
                    },
                ],
            },
            {
                "title": "Content",
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": "Insights / Articles",
                        "icon": "article",
                        "link": reverse_lazy("admin:insights_insight_changelist"),
                    },
                    {
                        "title": "Authors",
                        "icon": "person",
                        "link": reverse_lazy("admin:insights_insightauthor_changelist"),
                    },
                    {
                        "title": "Categories",
                        "icon": "category",
                        "link": reverse_lazy("admin:insights_insightcategory_changelist"),
                    },
                ],
            },
            {
                "title": "Products & Services",
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": "Products",
                        "icon": "inventory_2",
                        "link": reverse_lazy("admin:products_product_changelist"),
                    },
                    {
                        "title": "Services",
                        "icon": "layers",
                        "link": reverse_lazy("admin:services_service_changelist"),
                    },
                    {
                        "title": "Industries",
                        "icon": "factory",
                        "link": reverse_lazy("admin:industries_industry_changelist"),
                    },
                    {
                        "title": "Technologies",
                        "icon": "memory",
                        "link": reverse_lazy("admin:technology_technology_changelist"),
                    },
                ],
            },
            {
                "title": "Leads & CRM",
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": "Contact Submissions",
                        "icon": "mail",
                        "link": reverse_lazy("admin:contact_contactsubmission_changelist"),
                    },
                    {
                        "title": "Newsletter Subscribers",
                        "icon": "rss_feed",
                        "link": reverse_lazy("admin:newsletter_newslettersubscriber_changelist"),
                    },
                ],
            },
            {
                "title": "Company",
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": "Site Configuration",
                        "icon": "settings",
                        "link": reverse_lazy("admin:company_siteconfiguration_changelist"),
                    },
                    {
                        "title": "Careers",
                        "icon": "work",
                        "link": reverse_lazy("admin:careers_job_changelist"),
                    },
                ],
            },
            {
                "title": "Users & Access",
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": "Users",
                        "icon": "group",
                        "link": reverse_lazy("admin:accounts_user_changelist"),
                    },
                    {
                        "title": "Organizations",
                        "icon": "corporate_fare",
                        "link": reverse_lazy("admin:organizations_organization_changelist"),
                    },
                    {
                        "title": "Audit Log",
                        "icon": "history",
                        "link": reverse_lazy("admin:audit_auditlog_changelist"),
                    },
                ],
            },
        ],
    },
    "TABS": [],
}

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "apps.common.middleware.RequestIDMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env("DB_NAME", default="sudhixiai"),
        "USER": env("DB_USER", default="postgres"),
        "PASSWORD": env("DB_PASSWORD", default=""),
        "HOST": env("DB_HOST", default="localhost"),
        "PORT": env("DB_PORT", default="5432"),
    }
}

AUTH_USER_MODEL = "accounts.User"

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator", "OPTIONS": {"min_length": 10}},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"
PRIVATE_MEDIA_ROOT = BASE_DIR / "private_media"
USE_S3_STORAGE = env.bool("USE_S3_STORAGE", default=False)
STORAGE_BUCKET = env("STORAGE_BUCKET", default="")
STORAGE_REGION = env("STORAGE_REGION", default="")
STORAGE_ENDPOINT = env("STORAGE_ENDPOINT", default="")
STORAGE_ACCESS_KEY = env("STORAGE_ACCESS_KEY", default="")
STORAGE_SECRET_KEY = env("STORAGE_SECRET_KEY", default="")
AWS_STORAGE_BUCKET_NAME = STORAGE_BUCKET
AWS_S3_REGION_NAME = STORAGE_REGION
AWS_S3_ENDPOINT_URL = STORAGE_ENDPOINT or None
AWS_ACCESS_KEY_ID = STORAGE_ACCESS_KEY
AWS_SECRET_ACCESS_KEY = STORAGE_SECRET_KEY

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --- REST Framework -------------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticatedOrReadOnly"],
    "DEFAULT_PAGINATION_CLASS": "apps.common.pagination.StandardResultsPagination",
    "PAGE_SIZE": 12,
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
    "EXCEPTION_HANDLER": "apps.common.exceptions.api_exception_handler",
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_THROTTLE_CLASSES": ["rest_framework.throttling.ScopedRateThrottle"],
    "DEFAULT_THROTTLE_RATES": {
        "contact": "5/hour",
        "newsletter": "10/hour",
        "auth": "20/hour",
        "job_application": "10/hour",
        "ai": "30/hour",
    },
}

SPECTACULAR_SETTINGS = {
    "TITLE": "SUDHIXAI API",
    "DESCRIPTION": "Production API for the SUDHIXAI technology platform.",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}

# --- CORS / CSRF -----------------------------------------------------------
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default=["http://localhost:3000"])
CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS", default=["http://localhost:3000"])

# --- Sessions / cookies (HttpOnly cookie auth, per spec section 17) -------
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = "Lax"
CSRF_COOKIE_HTTPONLY = False  # frontend JS must read this to send X-CSRFToken
CSRF_COOKIE_SAMESITE = "Lax"
SESSION_ENGINE = "django.contrib.sessions.backends.cached_db"

# --- Redis / Celery ---------------------------------------------------------
REDIS_URL = env("REDIS_URL", default="redis://localhost:6379/0")
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": REDIS_URL,
    }
}
CELERY_BROKER_URL = REDIS_URL
CELERY_RESULT_BACKEND = REDIS_URL
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_TASK_TIME_LIMIT = 120
CELERY_TASK_ACKS_LATE = True

# --- Email -------------------------------------------------------------
EMAIL_PROVIDER = env("EMAIL_PROVIDER", default="django")
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL", default="no-reply@sudhixai.com")
CONTACT_NOTIFICATION_EMAIL = env("CONTACT_NOTIFICATION_EMAIL", default=None)
CONTACT_MAX_MESSAGE_LENGTH = 5000

# --- Frontend integration ---------------------------------------------------
FRONTEND_URL = env("NEXT_PUBLIC_FRONTEND_URL", default="http://localhost:3000")

# --- AI provider environment (keys only, never persisted to the DB) --------
OPENAI_API_KEY = env("OPENAI_API_KEY", default="")
ANTHROPIC_API_KEY = env("ANTHROPIC_API_KEY", default="")
GOOGLE_AI_API_KEY = env("GOOGLE_AI_API_KEY", default="")

# --- Security headers (tightened further in production.py) -----------------
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = "strict-origin-when-cross-origin"
X_FRAME_OPTIONS = "DENY"

# --- Logging -----------------------------------------------------------
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "json": {
            "format": (
                '{"timestamp": "%(asctime)s", "level": "%(levelname)s", '
                '"logger": "%(name)s", "message": "%(message)s"}'
            ),
        },
    },
    "handlers": {
        "console": {"class": "logging.StreamHandler", "formatter": "json"},
    },
    "root": {"handlers": ["console"], "level": "INFO"},
    "loggers": {
        "django": {"handlers": ["console"], "level": "INFO", "propagate": False},
        "sudhixai": {"handlers": ["console"], "level": "INFO", "propagate": False},
    },
}
