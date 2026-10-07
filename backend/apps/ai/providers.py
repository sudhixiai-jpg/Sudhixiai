"""
AI provider abstraction layer.

Business/view code depends only on AIProvider, never on a specific vendor
SDK. Concrete provider classes are intentionally left unimplemented as
abstract interfaces (per project rule: no fake/hardcoded-success
implementations) until a real integration is required and its API key is
actually configured.

Frontend -> Django API -> AI service layer -> this abstraction -> vendor.
Provider API keys live only in environment variables read here; they are
never sent to or exposed by the browser.
"""

from __future__ import annotations

import abc
import os
import time
import uuid
from dataclasses import dataclass, field


@dataclass
class AIResult:
    text: str = ""
    input_tokens: int = 0
    output_tokens: int = 0
    latency_ms: int = 0
    request_id: str = field(default_factory=lambda: uuid.uuid4().hex)
    raw: dict | None = None


class AIProviderError(Exception):
    def __init__(self, code: str, message: str):
        self.code = code
        self.message = message
        super().__init__(message)


class AIProvider(abc.ABC):
    """Interface every vendor integration must implement."""

    name: str = "base"

    def __init__(self, *, model: str, timeout_seconds: int = 30, max_retries: int = 2):
        self.model = model
        self.timeout_seconds = timeout_seconds
        self.max_retries = max_retries

    @abc.abstractmethod
    def generate(self, prompt: str, **kwargs) -> AIResult: ...

    @abc.abstractmethod
    def chat(self, messages: list[dict], **kwargs) -> AIResult: ...

    @abc.abstractmethod
    def embed(self, text: str, **kwargs) -> AIResult: ...

    def classify(self, text: str, labels: list[str], **kwargs) -> AIResult:
        raise NotImplementedError("classify is not implemented for this provider yet.")

    def summarize(self, text: str, **kwargs) -> AIResult:
        raise NotImplementedError("summarize is not implemented for this provider yet.")


class UnconfiguredProvider(AIProvider):
    """
    Returned when no provider is active/configured. Raising a clear,
    typed error here (instead of a fake successful response) is
    deliberate: the AI feature is foundation-only until a real provider
    key is supplied and enabled in AIProviderConfig.
    """

    name = "unconfigured"

    def generate(self, prompt: str, **kwargs) -> AIResult:
        raise AIProviderError("provider_not_configured", "No AI provider is currently configured.")

    def chat(self, messages, **kwargs) -> AIResult:
        raise AIProviderError("provider_not_configured", "No AI provider is currently configured.")

    def embed(self, text: str, **kwargs) -> AIResult:
        raise AIProviderError("provider_not_configured", "No AI provider is currently configured.")


def get_active_provider() -> AIProvider:
    """
    Resolve the active AIProviderConfig row and return the matching provider
    instance. Real vendor clients (OpenAI/Anthropic/Google SDKs) should be
    added here behind the same AIProvider interface as they are implemented;
    intentionally not stubbed with fake success responses today.
    """
    from .models import AIProviderConfig

    config = AIProviderConfig.objects.filter(is_active=True).first()
    if config is None:
        return UnconfiguredProvider(model="none")

    api_key_env = {
        AIProviderConfig.Provider.OPENAI: "OPENAI_API_KEY",
        AIProviderConfig.Provider.ANTHROPIC: "ANTHROPIC_API_KEY",
        AIProviderConfig.Provider.GOOGLE: "GOOGLE_AI_API_KEY",
    }.get(config.provider)

    if api_key_env and not os.environ.get(api_key_env):
        return UnconfiguredProvider(model=config.model_name)

    # No concrete vendor client is wired in yet -- fall through to the
    # explicit "unconfigured" interface rather than pretending to call out.
    return UnconfiguredProvider(model=config.model_name)
