import os, re
from html.parser import HTMLParser
from dotenv import load_dotenv
from pymongo import MongoClient
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, HRFlowable

load_dotenv('/app/backend/.env')
db = MongoClient(os.environ['MONGO_URL'])[os.environ['DB_NAME']]
tpl = db.contract_templates.find_one({"type": "teilzeit"})
assert tpl, "teilzeit template not found"

title = tpl.get("title", "ARBEITSVERTRAG")
subtitle = tpl.get("subtitle", "Teilzeitbeschäftigung")
body = tpl.get("body_html", "")
# Platzhalter durch Leerlinie ersetzen (Blankovertrag)
body = re.sub(r"\{\{[^}]+\}\}", "____________", body)

styles = getSampleStyleSheet()
S = {
    "h3": ParagraphStyle("h3", parent=styles["Normal"], fontName="Helvetica-Bold",
                          fontSize=11, spaceBefore=10, spaceAfter=4, textColor="#1877F2"),
    "body": ParagraphStyle("body", parent=styles["Normal"], fontName="Helvetica",
                            fontSize=9.5, leading=13, alignment=TA_JUSTIFY, spaceAfter=4),
    "li": ParagraphStyle("li", parent=styles["Normal"], fontName="Helvetica",
                          fontSize=9.5, leading=13, leftIndent=14, spaceAfter=2),
    "center_title": ParagraphStyle("ct", parent=styles["Normal"], fontName="Helvetica-Bold",
                                    fontSize=18, alignment=TA_CENTER, spaceAfter=2),
    "center_sub": ParagraphStyle("cs", parent=styles["Normal"], fontName="Helvetica",
                                  fontSize=11, alignment=TA_CENTER, spaceAfter=10),
    "party": ParagraphStyle("pty", parent=styles["Normal"], fontName="Helvetica",
                            fontSize=10, leading=13),
    "party_b": ParagraphStyle("ptyb", parent=styles["Normal"], fontName="Helvetica-Bold",
                              fontSize=10, leading=14, spaceBefore=6),
    "party_i": ParagraphStyle("ptyi", parent=styles["Normal"], fontName="Helvetica-Oblique",
                              fontSize=9, leading=12, spaceAfter=6),
}

def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

class Conv(HTMLParser):
    def __init__(self):
        super().__init__()
        self.flow = []
        self.buf = ""
        self.mode = None
    def handle_starttag(self, tag, attrs):
        if tag in ("p", "h3", "li"):
            self.buf = ""; self.mode = tag
        elif tag in ("strong", "b"):
            self.buf += "<b>"
        elif tag in ("em", "i"):
            self.buf += "<i>"
        elif tag == "br":
            self.buf += "<br/>"
    def handle_endtag(self, tag):
        if tag in ("p", "h3", "li"):
            text = re.sub(r"\s+", " ", self.buf).strip()
            if text:
                if tag == "h3":
                    self.flow.append(Paragraph(text, S["h3"]))
                elif tag == "li":
                    self.flow.append(Paragraph("&bull;&nbsp;&nbsp;" + text, S["li"]))
                else:
                    self.flow.append(Paragraph(text, S["body"]))
            self.buf = ""; self.mode = None
        elif tag in ("strong", "b"):
            self.buf += "</b>"
        elif tag in ("em", "i"):
            self.buf += "</i>"
    def handle_data(self, data):
        if self.mode:
            self.buf += esc(data)

conv = Conv()
conv.feed(body)

story = []
story.append(Paragraph(esc(title), S["center_title"]))
story.append(Paragraph(esc(subtitle), S["center_sub"]))
story.append(HRFlowable(width="100%", thickness=1, color="#1877F2", spaceAfter=10))

# Parteien
story.append(Paragraph("zwischen", S["party_b"]))
for line in ["NEXURA GmbH", "Lohnrößlerweg 12", "81829 München, Deutschland",
             "vertreten durch Johannes Liebert (Geschäftsführer)"]:
    story.append(Paragraph(line, S["party"]))
story.append(Paragraph("- nachfolgend Arbeitgeber genannt -", S["party_i"]))
story.append(Paragraph("und", S["party_b"]))
for line in ["____________________________ (Name, Vorname)",
             "____________________________ (Anschrift)"]:
    story.append(Paragraph(line, S["party"]))
story.append(Paragraph("- nachfolgend Arbeitnehmer genannt -", S["party_i"]))
story.append(Paragraph("wird folgender Arbeitsvertrag geschlossen:", S["party"]))
story.append(Spacer(1, 8))

# Vertragstext
story.extend(conv.flow)

# Unterschriften
story.append(Spacer(1, 24))
story.append(HRFlowable(width="100%", thickness=0.5, color="#999999", spaceAfter=10))
story.append(Paragraph("<b>Unterschriften</b>", S["party"]))
story.append(Spacer(1, 10))
story.append(Paragraph("München, den ____________", S["party"]))
story.append(Spacer(1, 40))
story.append(Paragraph("____________________________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;____________________________", S["party"]))
story.append(Paragraph("Arbeitnehmer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NEXURA GmbH, Johannes Liebert", S["party"]))

out = "/app/frontend/public/nexura-teilzeit-arbeitsvertrag.pdf"
doc = SimpleDocTemplate(out, pagesize=A4, leftMargin=2*cm, rightMargin=2*cm,
                        topMargin=2*cm, bottomMargin=2*cm,
                        title="Arbeitsvertrag Teilzeit - NEXURA GmbH")
doc.build(story)
print("PDF erstellt:", out, "-", os.path.getsize(out), "Bytes")
