"""
Storage abstraction. Views/models never talk to S3 or the filesystem
directly -- they use `public_storage` for assets that are safe to expose
(product images, insight covers, logos) and `private_storage` for
customer/user files (resumes) that must never be reachable via a public URL.

Backend selection (local disk in development, S3-compatible object storage
in production) is controlled entirely by settings/environment variables,
matching the STORAGE_* variables documented in .env.example.
"""

from django.conf import settings
from django.core.files.storage import FileSystemStorage

try:
    from storages.backends.s3boto3 import S3Boto3Storage
    HAS_S3 = True
except ImportError:  # django-storages not installed in this environment yet
    HAS_S3 = False


class PublicFileSystemStorage(FileSystemStorage):
    location = settings.MEDIA_ROOT
    base_url = settings.MEDIA_URL


class PrivateFileSystemStorage(FileSystemStorage):
    """Local-disk private storage; not served by the public media URL config."""

    location = settings.PRIVATE_MEDIA_ROOT
    base_url = None  # never resolve to a public URL


def _s3_storage(bucket_kwargs):
    return S3Boto3Storage(**bucket_kwargs)


def get_public_storage():
    if settings.USE_S3_STORAGE and HAS_S3:
        return _s3_storage({"default_acl": "public-read", "querystring_auth": False})
    return PublicFileSystemStorage()


def get_private_storage():
    if settings.USE_S3_STORAGE and HAS_S3:
        return _s3_storage({"default_acl": "private", "querystring_auth": True, "querystring_expire": 300})
    return PrivateFileSystemStorage()


public_storage = get_public_storage()
private_storage = get_private_storage()
