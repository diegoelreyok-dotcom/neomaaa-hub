#!/usr/bin/env python3
"""
NEOMAAA Hub — Markdown to PDF Generator
Converts all markdown documents in src/content/es/ and src/content/ru/ to professional PDFs.
Uses: reportlab (for PDF generation)

Output structure:
  public/pdf/es/{section}-{slug}.pdf     (Spanish)
  public/pdf/ru/ru-{section}-{slug}.pdf  (Russian)
"""

import os
import re
import sys

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    KeepTogether, HRFlowable
)

# ─── Colors ───────────────────────────────────────────────────────────────────
GREEN_PRIMARY = HexColor("#00D4AA")
GREEN_DARK = HexColor("#006B55")
GREEN_LIGHT = HexColor("#E6FFF8")
GREEN_HEADER_BG = HexColor("#006B55")
TEXT_DARK = HexColor("#1a1a1a")
TEXT_BODY = HexColor("#333333")
TEXT_MUTED = HexColor("#666666")
BG_LIGHT = HexColor("#f9f9f9")
BG_CODE = HexColor("#f4f4f5")
BORDER_LIGHT = HexColor("#e5e7eb")
BORDER_TABLE = HexColor("#d1d5db")

# ─── Configuration ────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONTENT_DIR = os.path.join(BASE_DIR, "src", "content")

LANGUAGES = {
    "es": {
        "content_dir": os.path.join(CONTENT_DIR, "es"),
        "output_dir": os.path.join(BASE_DIR, "public", "pdf", "es"),
        "prefix": "",  # No prefix for ES: {section}-{slug}.pdf
        "header_text": "NEOMAAA Markets — Documento Interno",
        "page_label": "Página",
    },
    "ru": {
        "content_dir": os.path.join(CONTENT_DIR, "ru"),
        "output_dir": os.path.join(BASE_DIR, "public", "pdf", "ru"),
        "prefix": "ru-",  # Prefix for RU: ru-{section}-{slug}.pdf
        "header_text": "NEOMAAA Markets — Внутренний документ",
        "page_label": "Страница",
    },
}

EXCLUDE_FILES = {"_sidebar.md", "README.md", "404.md", "dashboard.md"}

PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN = 20 * mm


def get_styles():
    """Create custom paragraph styles for the PDF."""
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(
        name='DocTitle',
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=28,
        textColor=TEXT_DARK,
        spaceAfter=4 * mm,
        spaceBefore=0,
    ))

    styles.add(ParagraphStyle(
        name='H1Custom',
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=26,
        textColor=TEXT_DARK,
        spaceBefore=10 * mm,
        spaceAfter=4 * mm,
    ))

    styles.add(ParagraphStyle(
        name='H2Custom',
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=21,
        textColor=GREEN_DARK,
        spaceBefore=8 * mm,
        spaceAfter=3 * mm,
    ))

    styles.add(ParagraphStyle(
        name='H3Custom',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=TEXT_DARK,
        spaceBefore=6 * mm,
        spaceAfter=2 * mm,
    ))

    styles.add(ParagraphStyle(
        name='H4Custom',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=TEXT_BODY,
        spaceBefore=4 * mm,
        spaceAfter=2 * mm,
    ))

    styles.add(ParagraphStyle(
        name='BodyCustom',
        fontName='Helvetica',
        fontSize=10,
        leading=16,
        textColor=TEXT_BODY,
        spaceAfter=3 * mm,
        alignment=TA_JUSTIFY,
    ))

    styles.add(ParagraphStyle(
        name='BulletCustom',
        fontName='Helvetica',
        fontSize=10,
        leading=16,
        textColor=TEXT_BODY,
        leftIndent=8 * mm,
        spaceAfter=1.5 * mm,
        bulletIndent=2 * mm,
    ))

    styles.add(ParagraphStyle(
        name='BulletNested',
        fontName='Helvetica',
        fontSize=10,
        leading=16,
        textColor=TEXT_BODY,
        leftIndent=16 * mm,
        spaceAfter=1.5 * mm,
        bulletIndent=10 * mm,
    ))

    styles.add(ParagraphStyle(
        name='NumberedCustom',
        fontName='Helvetica',
        fontSize=10,
        leading=16,
        textColor=TEXT_BODY,
        leftIndent=8 * mm,
        spaceAfter=1.5 * mm,
        bulletIndent=2 * mm,
    ))

    styles.add(ParagraphStyle(
        name='CodeBlock',
        fontName='Courier',
        fontSize=8.5,
        leading=13,
        textColor=TEXT_DARK,
        backColor=BG_CODE,
        leftIndent=4 * mm,
        rightIndent=4 * mm,
        spaceBefore=2 * mm,
        spaceAfter=3 * mm,
        borderPadding=(3 * mm, 3 * mm, 3 * mm, 3 * mm),
    ))

    styles.add(ParagraphStyle(
        name='BlockQuote',
        fontName='Helvetica-Oblique',
        fontSize=10,
        leading=16,
        textColor=GREEN_DARK,
        leftIndent=8 * mm,
        spaceBefore=3 * mm,
        spaceAfter=3 * mm,
        borderPadding=(2 * mm, 2 * mm, 2 * mm, 4 * mm),
    ))

    return styles


def make_header_footer(header_text, page_label):
    """Create a header/footer function with the given language text."""
    def header_footer(canvas, doc):
        canvas.saveState()

        # Header: right-aligned text
        canvas.setFont('Helvetica', 7)
        canvas.setFillColor(TEXT_MUTED)
        canvas.drawRightString(
            PAGE_WIDTH - MARGIN,
            PAGE_HEIGHT - 12 * mm,
            header_text
        )

        # Thin green line under header
        canvas.setStrokeColor(GREEN_PRIMARY)
        canvas.setLineWidth(0.5)
        canvas.line(MARGIN, PAGE_HEIGHT - 14 * mm, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 14 * mm)

        # Footer: page number centered
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(TEXT_MUTED)
        canvas.drawCentredString(
            PAGE_WIDTH / 2,
            10 * mm,
            f"{page_label} {doc.page}"
        )

        # Thin line above footer
        canvas.setStrokeColor(BORDER_LIGHT)
        canvas.setLineWidth(0.3)
        canvas.line(MARGIN, 14 * mm, PAGE_WIDTH - MARGIN, 14 * mm)

        canvas.restoreState()

    return header_footer


def sanitize_text(text):
    """Clean text for reportlab Paragraph (escape XML-invalid chars)."""
    if not text:
        return ""
    text = text.replace("&", "&amp;")
    text = text.replace("<", "&lt;")
    text = text.replace(">", "&gt;")
    return text


def format_inline(text):
    """Convert inline markdown formatting to reportlab XML tags."""
    if not text:
        return ""

    # Escape XML entities first
    text = text.replace("&", "&amp;")

    # Bold + Italic (***text*** or ___text___)
    text = re.sub(r'\*\*\*(.+?)\*\*\*', r'<b><i>\1</i></b>', text)
    text = re.sub(r'___(.+?)___', r'<b><i>\1</i></b>', text)

    # Bold (**text** or __text__)
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    text = re.sub(r'__(.+?)__', r'<b>\1</b>', text)

    # Italic (*text* or _text_)
    text = re.sub(r'(?<!\w)\*([^\*]+?)\*(?!\w)', r'<i>\1</i>', text)
    text = re.sub(r'(?<!\w)_([^_]+?)_(?!\w)', r'<i>\1</i>', text)

    # Inline code (`text`)
    text = re.sub(r'`([^`]+?)`', r'<font name="Courier" size="9" color="#1a1a1a">\1</font>', text)

    # Links [text](url)
    text = re.sub(r'\[([^\]]+?)\]\(([^\)]+?)\)', r'<font color="#006B55"><u>\1</u></font>', text)

    # Strikethrough ~~text~~
    text = re.sub(r'~~(.+?)~~', r'<strike>\1</strike>', text)

    return text


def _safe_paragraph_text(text):
    """Strip potentially unbalanced HTML tags that crash reportlab paraparser."""
    # Drop all tags, keep text only.
    clean = re.sub(r'<[^>]+>', ' ', text)
    # Collapse whitespace
    clean = re.sub(r'\s+', ' ', clean).strip()
    return clean


def parse_markdown_to_elements(md_text, styles):
    """Parse markdown text and return a list of reportlab flowable elements."""
    elements = []
    lines = md_text.split('\n')
    i = 0
    first_h1 = True

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Skip empty lines
        if not stripped:
            i += 1
            continue

        # Horizontal rule
        if re.match(r'^(-{3,}|\*{3,}|_{3,})$', stripped):
            elements.append(Spacer(1, 2 * mm))
            elements.append(HRFlowable(
                width="100%", thickness=0.5,
                color=BORDER_LIGHT, spaceBefore=2 * mm, spaceAfter=4 * mm
            ))
            i += 1
            continue

        # Headers
        header_match = re.match(r'^(#{1,6})\s+(.+)$', stripped)
        if header_match:
            level = len(header_match.group(1))
            text = format_inline(header_match.group(2))

            if level == 1:
                if first_h1:
                    elements.append(Paragraph(text, styles['DocTitle']))
                    elements.append(HRFlowable(
                        width="100%", thickness=2,
                        color=GREEN_PRIMARY, spaceBefore=0, spaceAfter=6 * mm
                    ))
                    first_h1 = False
                else:
                    elements.append(Paragraph(text, styles['H1Custom']))
                    elements.append(HRFlowable(
                        width="100%", thickness=2,
                        color=GREEN_PRIMARY, spaceBefore=0, spaceAfter=4 * mm
                    ))
            elif level == 2:
                elements.append(Paragraph(text, styles['H2Custom']))
            elif level == 3:
                elements.append(Paragraph(text, styles['H3Custom']))
            else:
                elements.append(Paragraph(text, styles['H4Custom']))

            i += 1
            continue

        # Fenced code block
        if stripped.startswith('```'):
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith('```'):
                code_lines.append(lines[i])
                i += 1
            i += 1  # skip closing ```

            code_text = sanitize_text('\n'.join(code_lines))
            code_text = code_text.replace('\n', '<br/>')
            code_text = code_text.replace(' ', '&nbsp;')
            elements.append(Paragraph(code_text, styles['CodeBlock']))
            continue

        # Blockquote
        if stripped.startswith('>'):
            quote_lines = []
            while i < len(lines) and lines[i].strip().startswith('>'):
                quote_text = re.sub(r'^>\s*', '', lines[i].strip())
                quote_lines.append(quote_text)
                i += 1

            quote_content = format_inline(' '.join(quote_lines))

            quote_para = Paragraph(quote_content, styles['BlockQuote'])
            quote_table = Table(
                [[quote_para]],
                colWidths=[PAGE_WIDTH - 2 * MARGIN - 10 * mm],
            )
            quote_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, -1), GREEN_LIGHT),
                ('LEFTPADDING', (0, 0), (-1, -1), 4 * mm),
                ('RIGHTPADDING', (0, 0), (-1, -1), 3 * mm),
                ('TOPPADDING', (0, 0), (-1, -1), 2 * mm),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 2 * mm),
                ('LINEBEFOREDECOR', (0, 0), (0, -1), 3, GREEN_PRIMARY),
            ]))
            elements.append(Spacer(1, 2 * mm))
            elements.append(quote_table)
            elements.append(Spacer(1, 2 * mm))
            continue

        # Table
        if '|' in stripped and i + 1 < len(lines):
            table_lines = []
            start_i = i
            while i < len(lines) and '|' in lines[i].strip():
                table_lines.append(lines[i].strip())
                i += 1

            if len(table_lines) >= 2:
                parsed_rows = []
                separator_idx = None
                for idx, tl in enumerate(table_lines):
                    cells = [c.strip() for c in tl.strip('|').split('|')]
                    if all(re.match(r'^[-:]+$', c.strip()) for c in cells if c.strip()):
                        separator_idx = idx
                        continue
                    parsed_rows.append(cells)

                if parsed_rows:
                    max_cols = max(len(r) for r in parsed_rows)
                    for row in parsed_rows:
                        while len(row) < max_cols:
                            row.append('')

                    available_width = PAGE_WIDTH - 2 * MARGIN - 4 * mm
                    col_width = available_width / max_cols

                    table_data = []
                    for row_idx, row in enumerate(parsed_rows):
                        table_row = []
                        for cell in row:
                            cell_text = format_inline(cell)
                            if row_idx == 0 and separator_idx is not None:
                                style = ParagraphStyle(
                                    'TableHeader',
                                    parent=styles['BodyCustom'],
                                    fontName='Helvetica-Bold',
                                    fontSize=9,
                                    leading=13,
                                    textColor=white,
                                    spaceAfter=0,
                                    spaceBefore=0,
                                    alignment=TA_LEFT,
                                )
                            else:
                                style = ParagraphStyle(
                                    'TableCell',
                                    parent=styles['BodyCustom'],
                                    fontSize=9,
                                    leading=13,
                                    spaceAfter=0,
                                    spaceBefore=0,
                                    alignment=TA_LEFT,
                                )
                            table_row.append(Paragraph(cell_text, style))
                        table_data.append(table_row)

                    if not table_data:
                        continue

                    t = Table(table_data, colWidths=[col_width] * max_cols)

                    style_cmds = [
                        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_TABLE),
                        ('TOPPADDING', (0, 0), (-1, -1), 2 * mm),
                        ('BOTTOMPADDING', (0, 0), (-1, -1), 2 * mm),
                        ('LEFTPADDING', (0, 0), (-1, -1), 2 * mm),
                        ('RIGHTPADDING', (0, 0), (-1, -1), 2 * mm),
                        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                    ]

                    if separator_idx is not None and len(table_data) > 0:
                        style_cmds.append(('BACKGROUND', (0, 0), (-1, 0), GREEN_HEADER_BG))
                        style_cmds.append(('TEXTCOLOR', (0, 0), (-1, 0), white))
                        for row_idx in range(1, len(table_data)):
                            if row_idx % 2 == 0:
                                style_cmds.append(('BACKGROUND', (0, row_idx), (-1, row_idx), BG_LIGHT))

                    t.setStyle(TableStyle(style_cmds))
                    elements.append(Spacer(1, 2 * mm))
                    elements.append(KeepTogether([t]))
                    elements.append(Spacer(1, 3 * mm))
                continue

        # Checkbox list items
        checkbox_match = re.match(r'^[-*]\s+\[( |x|X)\]\s+(.+)$', stripped)
        if checkbox_match:
            checked = checkbox_match.group(1).lower() == 'x'
            item_text = format_inline(checkbox_match.group(2))
            marker = "+" if checked else "o"
            elements.append(Paragraph(
                f"{marker}&nbsp;&nbsp;{item_text}",
                styles['BulletCustom']
            ))
            i += 1
            continue

        # Unordered list items
        ul_match = re.match(r'^(\s*)([-*+])\s+(.+)$', stripped)
        if ul_match:
            indent = len(line) - len(line.lstrip())
            item_text = format_inline(ul_match.group(3))
            if indent >= 2:
                elements.append(Paragraph(
                    f"  -&nbsp;&nbsp;{item_text}",
                    styles['BulletNested']
                ))
            else:
                elements.append(Paragraph(
                    f"&bull;&nbsp;&nbsp;{item_text}",
                    styles['BulletCustom']
                ))
            i += 1
            continue

        # Ordered list items
        ol_match = re.match(r'^(\d+)[.)]\s+(.+)$', stripped)
        if ol_match:
            num = ol_match.group(1)
            item_text = format_inline(ol_match.group(2))
            elements.append(Paragraph(
                f"{num}.&nbsp;&nbsp;{item_text}",
                styles['NumberedCustom']
            ))
            i += 1
            continue

        # Regular paragraph
        para_lines = []
        while i < len(lines):
            cl = lines[i].strip()
            if not cl:
                break
            if cl.startswith('#') or cl.startswith('```') or cl.startswith('>'):
                break
            if cl.startswith('|') and i + 1 < len(lines) and '|' in lines[i + 1]:
                break
            if re.match(r'^(-{3,}|\*{3,}|_{3,})$', cl):
                break
            if re.match(r'^[-*+]\s+', cl):
                break
            if re.match(r'^\d+[.)]\s+', cl):
                break
            para_lines.append(cl)
            i += 1

        if para_lines:
            para_text = format_inline(' '.join(para_lines))
            elements.append(Paragraph(para_text, styles['BodyCustom']))
            continue

        # Fallback: skip line
        i += 1

    return elements


def preprocess_for_pdf(md_text):
    """
    Clean up JSX/React-specific syntax and complex HTML components so reportlab
    can parse the markdown safely. Strips neo-* component divs entirely
    (they render visually in Next.js but reportlab can't layout them).
    """
    # Convert JSX className -> HTML class (reportlab doesn't know JSX)
    md_text = re.sub(r'\bclassName=', 'class=', md_text)

    # Strip neo-* visual components (timeline, stat-grid, pyramid, compare, step-list, formula, badge)
    # These render in the web UI but break reportlab parser. Replace with plain text fallback.
    # Match <div class="neo-...">...</div> with nested content, replace with extracted text.
    def _flatten_component(match):
        inner = match.group(1)
        # Extract text content from spans/divs inside, drop tags
        text = re.sub(r'<[^>]+>', ' ', inner)
        text = re.sub(r'\s+', ' ', text).strip()
        return text + '\n\n' if text else '\n'

    md_text = re.sub(
        r'<div class="neo-[^"]*">(.*?)</div>\s*</div>',
        _flatten_component,
        md_text,
        flags=re.DOTALL,
    )
    md_text = re.sub(
        r'<div class="neo-[^"]*">(.*?)</div>',
        _flatten_component,
        md_text,
        flags=re.DOTALL,
    )
    md_text = re.sub(
        r'<span class="neo-[^"]*">(.*?)</span>',
        lambda m: m.group(1),
        md_text,
        flags=re.DOTALL,
    )

    # Clean up any leftover empty placeholder markers like <b><i><i></i></b>
    # that the content audit agent left in email placeholders.
    md_text = re.sub(r'<b><i><i></i></b><b><i></i></i></b>', '', md_text)
    md_text = re.sub(r'<i><i></i></i>', '', md_text)
    md_text = re.sub(r'<b><b>', '<b>', md_text)
    md_text = re.sub(r'</b></b>', '</b>', md_text)

    # Long underscore runs (fill-in-the-blank placeholders like ______________)
    # confuse the markdown parser which interprets them as italic/bold marks.
    # Replace with visible dotted line instead.
    md_text = re.sub(r'_{4,}', '............', md_text)

    # Escape `<` and `>` that are prose text (e.g. "<USD 10K", ">$500K"),
    # not real HTML tags. Whitelist of tags reportlab understands:
    VALID_TAGS = r'(?:b|i|u|s|strong|em|font|sub|sup|br|para|a|link|img)'

    def _escape_stray_brackets(line):
        # Skip blockquote lines (markdown `> text`)
        if line.lstrip().startswith('>'):
            return line
        # Escape `<` not followed by a valid tag name or closing slash.
        line = re.sub(
            rf'<(?!/?{VALID_TAGS}\b)',
            '&lt;',
            line,
        )
        # Escape `>` that are clearly prose (after letter/number/space, before $ or digit).
        line = re.sub(r'(?<=[a-zA-Z0-9 ])>(?=\$|\d)', '&gt;', line)
        return line

    md_text = '\n'.join(_escape_stray_brackets(l) for l in md_text.split('\n'))

    return md_text


def generate_pdf(md_filepath, output_filepath, styles, header_footer_fn):
    """Convert a single markdown file to PDF."""
    with open(md_filepath, 'r', encoding='utf-8') as f:
        md_text = f.read()

    md_text = preprocess_for_pdf(md_text)
    elements = parse_markdown_to_elements(md_text, styles)

    if not elements:
        print(f"  WARNING: No content parsed from {md_filepath}")
        return False

    doc = SimpleDocTemplate(
        output_filepath,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN + 4 * mm,
        bottomMargin=MARGIN,
        title=os.path.basename(md_filepath).replace('.md', ''),
        author="NEOMAAA Markets",
    )

    try:
        doc.build(elements, onFirstPage=header_footer_fn, onLaterPages=header_footer_fn)
        return True
    except Exception as e:
        print(f"  ERROR building PDF: {e}")
        return False


def collect_md_files(content_dir):
    """Find all .md files to process, respecting exclusions."""
    md_files = []
    for root, dirs, files in os.walk(content_dir):
        # Skip pdf directory
        rel_root = os.path.relpath(root, content_dir)
        if 'pdf' in rel_root.split(os.sep):
            continue

        for f in sorted(files):
            if f.endswith('.md') and f not in EXCLUDE_FILES:
                md_files.append(os.path.join(root, f))

    return sorted(md_files)


def get_output_name(md_file, content_dir, prefix):
    """
    Generate output filename.
    ES: {section}-{slug}.pdf          e.g. sales-primer-contacto.pdf
    RU: ru-{section}-{slug}.pdf       e.g. ru-sales-primer-contacto.pdf
    """
    rel_path = os.path.relpath(md_file, content_dir)
    # rel_path is like: sales/primer-contacto.md or encyclopedia/abc.md
    parts = rel_path.replace('.md', '').split(os.sep)
    # Join with dash
    name = '-'.join(parts)
    return f"{prefix}{name}.pdf"


def main():
    """Main entry point."""
    print("=" * 60)
    print("NEOMAAA Hub — PDF Generator")
    print("=" * 60)

    styles = get_styles()

    total_success = 0
    total_errors = 0
    all_errors = []
    all_generated = []

    for lang, config in LANGUAGES.items():
        content_dir = config["content_dir"]
        output_dir = config["output_dir"]
        prefix = config["prefix"]
        header_text = config["header_text"]
        page_label = config["page_label"]

        print(f"\n{'─' * 40}")
        print(f"Processing: {lang.upper()} ({content_dir})")
        print(f"Output to:  {output_dir}")
        print(f"{'─' * 40}")

        if not os.path.isdir(content_dir):
            print(f"  ERROR: Content directory not found: {content_dir}")
            continue

        os.makedirs(output_dir, exist_ok=True)

        md_files = collect_md_files(content_dir)
        print(f"  Found {len(md_files)} markdown files\n")

        header_footer_fn = make_header_footer(header_text, page_label)

        for md_file in md_files:
            rel_path = os.path.relpath(md_file, content_dir)
            output_name = get_output_name(md_file, content_dir, prefix)
            output_path = os.path.join(output_dir, output_name)

            print(f"  [{lang.upper()}] {rel_path} -> {output_name} ...", end=" ")

            try:
                result = generate_pdf(md_file, output_path, styles, header_footer_fn)
                if result:
                    size = os.path.getsize(output_path)
                    print(f"OK ({size:,} bytes)")
                    total_success += 1
                    all_generated.append((lang, rel_path, output_name, size))
                else:
                    print("FAILED (no content)")
                    total_errors += 1
                    all_errors.append((lang, rel_path, "No content parsed"))
            except Exception as e:
                print(f"ERROR: {e}")
                total_errors += 1
                all_errors.append((lang, rel_path, str(e)))

    # Summary
    print("\n" + "=" * 60)
    print(f"SUMMARY: {total_success} PDFs generated, {total_errors} errors")
    print("=" * 60)

    if all_errors:
        print("\nErrors:")
        for lang, path, err in all_errors:
            print(f"  [{lang.upper()}] {path}: {err}")

    if all_generated:
        total_size = sum(s for _, _, _, s in all_generated)
        print(f"\nTotal size: {total_size:,} bytes ({total_size / 1024 / 1024:.1f} MB)")

        # Count per language
        for lang in LANGUAGES:
            count = sum(1 for g in all_generated if g[0] == lang)
            lang_size = sum(s for g_lang, _, _, s in all_generated if g_lang == lang)
            print(f"  {lang.upper()}: {count} PDFs ({lang_size:,} bytes)")

    # Verify file sizes
    small_files = [(lang, name, size) for lang, _, name, size in all_generated if size < 5000]
    if small_files:
        print(f"\nWARNING: {len(small_files)} files are under 5KB:")
        for lang, name, size in small_files:
            print(f"  [{lang.upper()}] {name}: {size:,} bytes")

    return all_generated, all_errors


if __name__ == "__main__":
    generated, errors = main()
    sys.exit(1 if errors else 0)
