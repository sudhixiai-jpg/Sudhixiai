from rest_framework.throttling import AnonRateThrottle, ScopedRateThrottle


class ContactSubmissionThrottle(ScopedRateThrottle):
    scope = "contact"


class NewsletterThrottle(ScopedRateThrottle):
    scope = "newsletter"


class AuthThrottle(ScopedRateThrottle):
    scope = "auth"


class AIThrottle(ScopedRateThrottle):
    scope = "ai"


class JobApplicationThrottle(ScopedRateThrottle):
    scope = "job_application"
