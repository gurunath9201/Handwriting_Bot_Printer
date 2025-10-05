import os

class Config:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'temp')
    OUTPUT_FOLDER = os.path.join(BASE_DIR, 'outputs')
    FONTS_FOLDER = os.path.join(BASE_DIR, 'fonts')
    TEMPLATES_FOLDER = os.path.join(BASE_DIR, 'templates')
    
    # A4 paper dimensions at 300 DPI
    A4_WIDTH = 2480  # pixels (210mm at 300dpi)
    A4_HEIGHT = 3508  # pixels (297mm at 300dpi)
    
    # Handwriting parameters - OPTIMIZED FOR CLEAN HINDI TEXT
    LINE_HEIGHT = 90  # Good spacing between lines
    MARGIN_LEFT = 180  # Reduced left margin
    MARGIN_RIGHT = 100  # SIGNIFICANTLY REDUCED right margin
    MARGIN_TOP = 350   # Good top margin
    MARGIN_BOTTOM = 250  # Good bottom margin
    
    # Create directories
    for folder in [UPLOAD_FOLDER, OUTPUT_FOLDER, FONTS_FOLDER, TEMPLATES_FOLDER]:
        os.makedirs(folder, exist_ok=True)