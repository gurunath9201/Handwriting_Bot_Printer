#!/usr/bin/env python3
"""
Setup script to initialize the handwriting bot backend
"""

import os
import sys
from utils.font_utils import FontManager
from config import Config

def setup_project():
    """Setup project structure and download required fonts"""
    
    print("="*50)
    print("Handwriting Bot Backend Setup")
    print("="*50)
    
    # Create required directories
    config = Config()
    directories = [
        config.UPLOAD_FOLDER,
        config.OUTPUT_FOLDER,
        config.FONTS_FOLDER,
        config.TEMPLATES_FOLDER,
        os.path.join(config.FONTS_FOLDER, 'english'),
        os.path.join(config.FONTS_FOLDER, 'hindi'),
    ]
    
    print("\n1. Creating directories...")
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"   ✓ {directory}")
    
    # Download fonts
    print("\n2. Downloading handwriting fonts...")
    font_manager = FontManager()
    font_manager.setup_fonts()
    
    # Create sample ruled paper template
    print("\n3. Creating paper template...")
    from utils.paper_generator import PaperGenerator
    paper_gen = PaperGenerator()
    sample_paper = paper_gen.create_ruled_paper()
    sample_paper.save(os.path.join(config.TEMPLATES_FOLDER, 'ruled_paper.png'))
    print("   ✓ Ruled paper template created")
    
    print("\n" + "="*50)
    print("Setup complete! You can now run the server with:")
    print("python app.py")
    print("="*50)

if __name__ == '__main__':
    setup_project()