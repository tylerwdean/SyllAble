from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Inches

document = Document()

section = document.sections[0]
header = section.header

headerParagraph = header.add_paragraph()

run = headerParagraph.add_run()
run.add_picture('FUS_Logo.png', width=Inches(5))

headerParagraph.alignment = WD_ALIGN_PARAGRAPH.CENTER

#Gets the last paragraph and centers it
#lastParagraph = document.paragraphs[-1]
#lastParagraph.alignment = WD_ALIGN_PARAGRAPH.CENTER

document.save("image.docx")