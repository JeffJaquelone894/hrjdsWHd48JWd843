"""HTML-Bereinigung für admin-editierbare Vertragsvorlagen und
Escaping für nutzergelieferte Felder (Name, Adresse, Auftragnehmer)."""
import html as _html
import bleach

# Erlaubte Tags/Attribute für Vertragsvorlagen (Formatierung, kein Script)
ALLOWED_TAGS = [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "br", "hr", "ul", "ol", "li",
    "strong", "b", "em", "i", "u", "small",
    "span", "div", "table", "thead", "tbody", "tr", "td", "th",
    "a", "blockquote",
]
ALLOWED_ATTRS = {
    "*": ["style", "class"],
    "a": ["href", "target", "rel"],
    "td": ["colspan", "rowspan"],
    "th": ["colspan", "rowspan"],
}
ALLOWED_PROTOCOLS = ["http", "https", "mailto"]


def sanitize_template_html(raw: str) -> str:
    """Entfernt <script>, Event-Handler etc. aus admin-editierbarem HTML."""
    if not raw:
        return raw
    return bleach.clean(
        raw,
        tags=ALLOWED_TAGS,
        attributes=ALLOWED_ATTRS,
        protocols=ALLOWED_PROTOCOLS,
        strip=True,
    )


def esc(value) -> str:
    """HTML-escape für nutzergelieferte Textfelder."""
    return _html.escape(str(value or ""))
