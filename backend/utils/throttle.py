"""Gemeinsamer Brute-Force-Schutz für alle Login-Endpunkte.

Sperrt sowohl pro (IP + E-Mail) als auch pro E-Mail, damit ein Angreifer
den Schutz nicht durch Rotieren des X-Forwarded-For-Headers umgehen kann.
"""
import time
from fastapi import HTTPException, Request

FAILED_LOGIN_LIMIT = 5          # erlaubte Fehlversuche
LOCKOUT_SECONDS = 15 * 60       # Sperrdauer (15 Min)


def client_ip(request: Request) -> str:
    """Echte Client-IP hinter Nginx-Proxy ermitteln."""
    xff = request.headers.get("x-forwarded-for")
    if xff:
        return xff.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def login_identifiers(ip: str, email: str) -> list:
    email = (email or "").strip().lower()
    return [f"ip:{ip}:{email}", f"email:{email}"]


async def check_lockout(db, identifiers: list):
    """Wirft 429, falls einer der Identifier aktuell gesperrt ist."""
    now = time.time()
    for ident in identifiers:
        attempt = await db.login_attempts.find_one({"identifier": ident})
        if attempt and attempt.get("locked_until_ts", 0) > now:
            wait_min = int((attempt["locked_until_ts"] - now) // 60) + 1
            raise HTTPException(
                status_code=429,
                detail=f"Zu viele fehlgeschlagene Anmeldeversuche. Bitte versuchen Sie es in ca. {wait_min} Minute(n) erneut.",
            )


async def register_failure(db, identifiers: list):
    """Zählt einen Fehlversuch für alle Identifier hoch und sperrt bei Limit."""
    now = time.time()
    for ident in identifiers:
        attempt = await db.login_attempts.find_one({"identifier": ident})
        prev = attempt.get("failed_count", 0) if attempt else 0
        locked_until = attempt.get("locked_until_ts", 0) if attempt else 0
        if locked_until and locked_until <= now:
            prev = 0  # abgelaufene Sperre -> Zähler neu starten
        count = prev + 1
        update = {"failed_count": count, "last_attempt_ts": now}
        if count >= FAILED_LOGIN_LIMIT:
            update["locked_until_ts"] = now + LOCKOUT_SECONDS
        await db.login_attempts.update_one(
            {"identifier": ident}, {"$set": update}, upsert=True
        )


async def clear_attempts(db, identifiers: list):
    """Setzt die Fehlversuche nach erfolgreichem Login zurück."""
    for ident in identifiers:
        await db.login_attempts.delete_one({"identifier": ident})
