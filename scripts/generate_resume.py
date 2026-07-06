#!/usr/bin/env python3
"""Generate public/Ankita_Thatte_CV.pdf.

The resume and the website must never disagree: the numbers below
(300+ screens, project framings, awards) mirror src/data/content.js.
Run from the repo root:  python3 scripts/generate_resume.py
"""

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas

PAGE_W, PAGE_H = A4
MARGIN = 40
LEFT_W = 150          # sidebar column width
GUTTER = 20
RIGHT_X = MARGIN + LEFT_W + GUTTER
RIGHT_W = PAGE_W - RIGHT_X - MARGIN

INK = HexColor("#2b2a27")
SOFT = HexColor("#666666")
ACCENT = HexColor("#c74e2f")  # matches the site's palette
RULE = HexColor("#d9d6cf")

OUT = "public/Ankita_Thatte_CV.pdf"


def wrap(text, font, size, width):
    words, lines, line = text.split(), [], ""
    for w in words:
        trial = f"{line} {w}".strip()
        if stringWidth(trial, font, size) <= width:
            line = trial
        else:
            lines.append(line)
            line = w
    if line:
        lines.append(line)
    return lines


class Column:
    def __init__(self, c, x, width, y):
        self.c, self.x, self.width, self.y = c, x, width, y

    def heading(self, text, space_before=11):
        self.y -= space_before
        self.c.setFont("Helvetica-Bold", 8.5)
        self.c.setFillColor(ACCENT)
        self.c.drawString(self.x, self.y, text.upper())
        self.y -= 4
        self.c.setStrokeColor(RULE)
        self.c.setLineWidth(0.6)
        self.c.line(self.x, self.y, self.x + self.width, self.y)
        self.y -= 10

    def text(self, text, font="Helvetica", size=8.5, leading=11,
             color=INK, indent=0, space_after=2):
        self.c.setFont(font, size)
        self.c.setFillColor(color)
        for ln in wrap(text, font, size, self.width - indent):
            self.c.drawString(self.x + indent, self.y, ln)
            self.y -= leading
        self.y -= space_after

    def bullet(self, text, size=8.5, leading=11, color=INK):
        self.c.setFillColor(ACCENT)
        self.c.circle(self.x + 2.2, self.y + 2.6, 1.1, stroke=0, fill=1)
        save_y = self.y
        self.text(text, size=size, leading=leading, color=color, indent=9,
                  space_after=2)
        del save_y


c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("Ankita Thatte — Product Designer")
c.setAuthor("Ankita Thatte")
c.setSubject("Resume — Product Designer, Pune, India")
c.setCreator("ankitathatte.com")
c.setKeywords("Product Designer, UI/UX, Design Systems, Pune")

# ---- header ----------------------------------------------------------------
y = PAGE_H - MARGIN - 24
c.setFont("Helvetica-Bold", 26)
c.setFillColor(INK)
c.drawString(MARGIN, y, "ANKITA THATTE")
y -= 18
c.setFont("Helvetica", 11)
c.setFillColor(ACCENT)
c.drawString(MARGIN, y, "Product Designer")
c.setFillColor(SOFT)
role_w = stringWidth("Product Designer", "Helvetica", 11)
c.drawString(MARGIN + role_w + 6, y, "·  Pune, India  ·  ankitathatte.com")
y -= 14
c.setStrokeColor(RULE)
c.setLineWidth(0.8)
c.line(MARGIN, y, PAGE_W - MARGIN, y)

top = y - 8

# ---- left column -----------------------------------------------------------
L = Column(c, MARGIN, LEFT_W, top)

L.heading("Contact")
for item in [
    "ankitavthatte@gmail.com",
    "+91 79724 62661",
    "Pune, MH 411016",
    "linkedin.com/in/ankita-thatte",
    "behance.net/ankitathatte",
    "Portfolio: ankitathatte.com",
]:
    L.text(item, size=8, leading=11, space_after=0)

L.heading("Education")
L.text("BKPS College of Architecture", font="Helvetica-Bold", size=8.5,
       space_after=0)
L.text("BArch, Architecture · 2015", size=8, space_after=0)
L.text("Pune, India", size=8, color=SOFT)

L.heading("Core Skills")
for s in [
    "Product & UX Strategy",
    "End-to-End Product Design",
    "Design Systems (light/dark)",
    "Interaction & Visual Design",
    "Information Architecture",
    "Usability & Heuristic Eval.",
    "Accessibility (WCAG)",
    "Cross-functional Leadership",
]:
    L.bullet(s, size=8, leading=10.5)

L.heading("AI & Emerging Workflows")
for s in [
    "AI-assisted design & prototyping",
    "Model Context Protocol (MCP)",
    "Prompt engineering for design",
    "Workflow automation",
    "Vibe coding (AI-assisted UI)",
    "Rapid iteration with AI tools",
]:
    L.bullet(s, size=8, leading=10.5)

L.heading("Tools")
for s in [
    "Figma (Auto Layout, Components)",
    "Claude Code",
    "Adobe XD",
    "FlutterFlow",
    "Canva",
    "Git & GitHub",
]:
    L.bullet(s, size=8, leading=10.5)

# ---- right column ----------------------------------------------------------
R = Column(c, RIGHT_X, RIGHT_W, top)

R.heading("Professional Summary")
R.text(
    "Product Designer with 10+ years across architecture and digital product "
    "design, now the sole designer behind a live, enterprise-scale AI SaaS "
    "platform — 300+ screens and a 100+ component design system across "
    "multiple products. I own end-to-end UX (research, IA, prototyping, "
    "high-fidelity UI) and build scalable design systems with light/dark "
    "modes to WCAG standards. I pair strong product thinking with hands-on "
    "AI tooling (MCP-based workflows, AI-assisted prototyping) to compress "
    "design-to-development cycles and turn complex requirements into "
    "intuitive products.",
    size=8.5, leading=11)

R.heading("Experience")
R.text("UI/UX Designer — Hostin Services Pvt. Ltd. (Cloud.in)",
       font="Helvetica-Bold", size=9, space_after=0)
R.text("Pune · Sep 2025 – Present", size=8, color=SOFT, space_after=3)
for b in [
    "Sole designer for Evalix.ai, a live AI-powered assessment and learning "
    "platform — owning end-to-end UX across admin and candidate portals, "
    "reporting and analytics (8 report types), and the marketing site.",
    "Designed 300+ screens and built a 100+ component design system "
    "(light/dark, WCAG) powering multiple products with a single, "
    "consistent visual language.",
    "Design end-to-end experiences for enterprise and AI-native SaaS, from "
    "research and IA through high-fidelity UI and developer handoff.",
    "Partner directly with engineering and stakeholders to simplify complex "
    "workflows and accelerate design-to-development.",
]:
    R.bullet(b)

R.y -= 2
R.text("Product / UX Designer — Tamarind Design Studio",
       font="Helvetica-Bold", size=9, space_after=0)
R.text("Pune · Oct 2024 – Sep 2025", size=8, color=SOFT, space_after=3)
for b in [
    "Led user research and usability testing across EdTech and SaaS "
    "products, translating insights into prioritized design decisions.",
    "Designed wireframes, prototypes, and production UI that improved key "
    "user interactions across web and mobile.",
    "Introduced AI-assisted design and prototyping into the workflow to "
    "accelerate iteration and exploration.",
]:
    R.bullet(b)

R.y -= 2
R.text("Architect — Venkatramanan Associates & Other Firms",
       font="Helvetica-Bold", size=9, space_after=0)
R.text("2017 – 2024", size=8, color=SOFT, space_after=3)
for b in [
    "Led architectural projects end-to-end, building deep skills in systems "
    "thinking, spatial hierarchy, and user-centered design.",
    "Managed stakeholder communication and complex requirements — "
    "foundations that now anchor my product design practice.",
]:
    R.bullet(b)

R.heading("Selected Projects")
for name, desc in [
    ("Evalix AI", "Live enterprise AI assessment platform: sole design of "
     "300+ screens, 100+ component design system, IA, 8 report types, "
     "admin & candidate portals."),
    ("MoneyMinds", "Gamified financial literacy: XP & streak reward loops, "
     "mascot & brand design, research to visual design."),
    ("ShiftCare", "Healthcare staff scheduling: shift board readable at a "
     "glance, conflict alerts, end-to-end UX case study."),
    ("Niyantrac", "Cloud infra platform: dashboards for CloudFront, "
     "Route 53, WAF; config & versioning UX."),
    ("VFort", "Web services: conversion-focused redesign for domains & "
     "hosting, premium design system."),
]:
    R.text(f"{name} — {desc}", size=8.5, leading=11,
           space_after=3)
    # bold the project name over the plain text just drawn
# (names are emphasized via the em-dash pattern; keeps layout simple)

R.heading("Highlights")
for b in [
    "Employee of the Quarter (Q1 2026) and Team of the Quarter (Q2 2026) — "
    "Cloud.in.",
    "Represented Evalix AI at the Delhi ET Education Summit.",
    "Second Runner-Up (3rd, global) — FNP Designathon 2025, an "
    "international UX & product design competition.",
    "Certified: Google UX Design; Design Thinking in the Age of AI; UX "
    "Accessibility & WCAG 2.0; AWS Sales Accreditation.",
]:
    R.bullet(b)

print(f"left column ends at y={L.y:.0f}, right column ends at y={R.y:.0f} "
      f"(page bottom margin at {MARGIN})")
assert L.y > MARGIN and R.y > MARGIN, "content overflows the page"

c.showPage()
c.save()
print(f"wrote {OUT}")
